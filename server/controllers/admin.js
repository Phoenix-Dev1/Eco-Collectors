const { db } = require('../db.js');
const jwt = require('jsonwebtoken');

// Users
const getAllUsers = (req, res) => {
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json('Not authenticated');

  jwt.verify(token, 'jwtkey', (err, userInfo) => {
    if (err) return res.status(403).json('Token is not valid!');

    // Check if the user is an administrator
    if (userInfo.role !== 1) {
      return res
        .status(403)
        .json('You are not authorized to access this resource');
    }

    const selectQuery =
      'SELECT ID, role, first_name, last_name, email, city, address, phone, amount, active FROM users';

    db.query(selectQuery, (err, data) => {
      if (err) return res.status(500).json(err);
      return res.json(data);
    });
  });
};

const toggleUserActivation = (req, res) => {
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json('Not authenticated');

  jwt.verify(token, 'jwtkey', (err, userInfo) => {
    if (err) return res.status(403).json('Token is not valid!');

    // Check if the user is an administrator
    if (userInfo.role !== 1) {
      return res
        .status(403)
        .json('You are not authorized to access this resource');
    }

    const { userId } = req.params;
    const { active } = req.body;
    //console.log('User ID: ' + userId);
    //console.log('Active: ' + active);

    const updateQuery = 'UPDATE users SET active = ? WHERE ID = ?';

    db.query(updateQuery, [active, userId], (err, result) => {
      if (err) return res.status(500).json(err);
      if (result.affectedRows === 0) {
        return res.status(404).json('User not found');
      }
      return res.json('User activation status updated successfully');
    });
  });
};

// Recyclers Managers

const getAllJoinRequests = (req, res) => {
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json('Not authenticated');

  jwt.verify(token, 'jwtkey', (err, userInfo) => {
    if (err) return res.status(403).json('Token is not valid!');

    // Check if the user is an administrator
    if (userInfo.role !== 1) {
      return res
        .status(403)
        .json('You are not authorized to access this resource');
    }

    // Get the status filter from the query parameters
    const statusFilter = req.query.status;

    // Construct the SQL query based on the status filter
    let selectQuery = 'SELECT * FROM recyclers_manager_join_requests';
    if (statusFilter) {
      selectQuery += ' WHERE status = ?';
    }

    db.query(selectQuery, [statusFilter], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.json(data);
    });
  });
};

const updateJoinRequestStatus = (req, res) => {
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json('Not authenticated');

  jwt.verify(token, 'jwtkey', (err, userInfo) => {
    if (err) return res.status(403).json('Token is not valid!');

    // Check if the user is an administrator
    if (userInfo.role !== 1) {
      return res
        .status(403)
        .json('You are not authorized to access this resource');
    }

    const { joinID } = req.params;
    const newStatus = req.body.status;
    console.log('Join ID: ' + joinID);
    console.log('newStatus: ' + newStatus);

    const updateQuery =
      'UPDATE recyclers_manager_join_requests SET status = ? WHERE join_id = ?';

    db.query(updateQuery, [newStatus, joinID], async (err, result) => {
      if (err) return res.status(500).json(err);
      if (result.affectedRows === 0) {
        return res.status(404).json('Join request not found');
      }

      // If the new status is 'Approved' (3), update the user's role to 4 (recycler manager)
      if (newStatus === 3) {
        try {
          // Update the user's role to 4 (recycler manager)
          const userQuery = 'UPDATE users SET role = ? WHERE ID = ?';
          await db.query(userQuery, [4, req.body.userID]);
        } catch (error) {
          console.error('Error updating user role:', error);
          return res.status(500).json('Error updating user role');
        }
      }

      return res.json('Join request status updated successfully');
    });
  });
};

// Recycle Requests

const fetchAllRequests = (req, res) => {
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json('Not authenticated');

  jwt.verify(token, 'jwtkey', async (err, userInfo) => {
    if (err) return res.status(403).json('Token is not valid!');

    // Check if the user is an administrator
    if (userInfo.role !== 1) {
      return res
        .status(403)
        .json('You are not authorized to access this resource');
    }

    const { status } = req.query;

    let selectQuery = 'SELECT * FROM user_requests';
    const queryParams = [];

    if (status) {
      selectQuery += ' WHERE status = ?';
      queryParams.push(status);
    }

    db.query(selectQuery, queryParams, (err, data) => {
      if (err) return res.status(500).json(err);
      return res.json(data);
    });
  });
};

const updateRequestStatus = (req, res) => {
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json('Not authenticated');

  jwt.verify(token, 'jwtkey', (err, userInfo) => {
    if (err) return res.status(403).json('Token is not valid!');

    // Check if the user is an administrator
    if (userInfo.role !== 1) {
      return res
        .status(403)
        .json('You are not authorized to access this resource');
    }

    const { requestId } = req.params;
    const { status } = req.body;

    // Set 'type' field to 'pending' when changing status to 4 (Hold)
    const type = status === 4 ? 'hold' : null;

    const updateQuery =
      'UPDATE user_requests SET status = ?, type = ? WHERE request_id = ?';

    db.query(updateQuery, [status, type, requestId], (err, result) => {
      if (err) return res.status(500).json(err);
      if (result.affectedRows === 0) {
        return res.status(404).json('Request not found');
      }
      return res.json('Request status updated successfully');
    });
  });
};

// Recycle Bins
// All recycle Bins
const fetchAllRecycleBins = (req, res) => {
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json('Not authenticated');

  jwt.verify(token, 'jwtkey', async (err, userInfo) => {
    if (err) return res.status(403).json('Token is not valid!');

    // Check if the user is an administrator
    if (userInfo.role !== 1) {
      return res
        .status(403)
        .json('You are not authorized to access this resource');
    }

    const { type } = req.query;

    let selectQuery = 'SELECT * FROM markers';
    const queryParams = [];

    if (type) {
      selectQuery += ' WHERE type = ?';
      queryParams.push(type);
    }

    db.query(selectQuery, queryParams, (err, data) => {
      if (err) return res.status(500).json(err);
      return res.json(data);
    });
  });
};

// Deactivate Bin
const deactivateBin = (req, res) => {
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json('Not authenticated');

  jwt.verify(token, 'jwtkey', (err, userInfo) => {
    if (err) return res.status(403).json('Token is not valid!');

    // Check if the user is an administrator
    if (userInfo.role !== 1) {
      return res
        .status(403)
        .json('You are not authorized to access this resource');
    }

    const { binId } = req.params;

    const updateQuery = 'UPDATE markers SET active = 0 WHERE id = ?';

    db.query(updateQuery, [binId], (err, result) => {
      if (err) return res.status(500).json(err);
      if (result.affectedRows === 0) {
        return res.status(404).json('Bin not found');
      }
      return res.json('Bin deactivated successfully');
    });
  });
};

module.exports = {
  getAllUsers: getAllUsers,
  toggleUserActivation: toggleUserActivation,
  getAllJoinRequests: getAllJoinRequests,
  updateJoinRequestStatus: updateJoinRequestStatus,
  fetchAllRequests: fetchAllRequests,
  updateRequestStatus: updateRequestStatus,
  fetchAllRecycleBins: fetchAllRecycleBins,
  deactivateBin: deactivateBin,
};
