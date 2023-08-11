const { db } = require('../db.js');
const jwt = require('jsonwebtoken');

// recyclers join requests
const fetchRecyclerJoinRequests = (req, res) => {
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json('Not authenticated');

  jwt.verify(token, 'jwtkey', (err, userInfo) => {
    if (err) return res.status(403).json('Token is not valid!');

    // Check if the user is an administrator
    if (userInfo.role !== 4) {
      return res
        .status(403)
        .json('You are not authorized to access this resource');
    }

    // Get the status filter from the query parameters
    const statusFilter = req.query.status;

    // Construct the SQL query based on the status filter
    let selectQuery = 'SELECT * FROM recyclers_join_requests';
    if (statusFilter) {
      selectQuery += ' WHERE status = ?';
    }

    db.query(selectQuery, [statusFilter], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.json(data);
    });
  });
};

// Accept / Decline a join request
const updateRecyclerJoinRequestStatus = (req, res) => {
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json('Not authenticated');

  jwt.verify(token, 'jwtkey', (err, userInfo) => {
    if (err) return res.status(403).json('Token is not valid!');

    // Check if the user is a manager
    if (userInfo.role !== 4) {
      return res
        .status(403)
        .json('You are not authorized to access this resource');
    }

    const { joinID } = req.params;
    const newStatus = req.body.status;
    console.log('Join ID: ' + joinID);
    console.log('newStatus: ' + newStatus);

    const updateQuery =
      'UPDATE recyclers_join_requests SET status = ? WHERE join_id = ?';

    db.query(updateQuery, [newStatus, joinID], async (err, result) => {
      if (err) return res.status(500).json(err);
      if (result.affectedRows === 0) {
        return res.status(404).json('Join request not found');
      }

      // If the new status is 'Approved' (3), update the user's role to 4 (recycler manager)
      if (newStatus === 3) {
        try {
          // Update the user's role to 3 (recycler)
          const userQuery = 'UPDATE users SET role = ? WHERE ID = ?';
          await db.query(userQuery, [3, req.body.userID]);
        } catch (error) {
          console.error('Error updating user role:', error);
          return res.status(500).json('Error updating user role');
        }
      }

      return res.json('Join request status updated successfully');
    });
  });
};

module.exports = {
  fetchRecyclerJoinRequests: fetchRecyclerJoinRequests,
  updateRecyclerJoinRequestStatus: updateRecyclerJoinRequestStatus,
};
