const { db } = require('../db.js');
const jwt = require('jsonwebtoken');

const fetchAllRequests = (req, res) => {
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json('Not authenticated');

  jwt.verify(token, 'jwtkey', async (err, userInfo) => {
    if (err) return res.status(403).json('Token is not valid!');

    // Check if the user is a recycler
    if (userInfo.role !== 3) {
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

// Update the request status per scenario
const updateRequestStatus = (req, res) => {
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json('Not authenticated');

  jwt.verify(token, 'jwtkey', (err, userInfo) => {
    if (err) return res.status(403).json('Token is not valid!');

    // Check if the user is a recycler
    if (userInfo.role !== 3) {
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

module.exports = {
  fetchAllRequests: fetchAllRequests,
  updateRequestStatus: updateRequestStatus,
};
