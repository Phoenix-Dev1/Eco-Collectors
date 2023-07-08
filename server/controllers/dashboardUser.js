const { db } = require('../db.js');
const jwt = require('jsonwebtoken');

const getUserRequests = (req, res) => {
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json('Not authenticated');

  jwt.verify(token, 'jwtkey', (err, decoded) => {
    if (err) return res.status(403).json('Token is not valid');
    const userId = decoded.id;
    const q = 'SELECT * FROM user_requests WHERE user_id = ?';
    db.query(q, userId, (err, data) => {
      if (err) return res.status(500).send(err);
      return res.status(200).json(data);
    });
  });
};

const updateRequestStatus = (req, res) => {
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json('Not authenticated');

  jwt.verify(token, 'jwtkey', (err, decoded) => {
    if (err) return res.status(403).json('Token is not valid');
    const userId = decoded.id;
    const q = 'SELECT * FROM user_requests WHERE user_id = ?';
    db.query(q, userId, (err, data) => {
      if (err) return res.status(500).send(err);
      return res.status(200).json(data);
    });
  });
};

module.exports = {
  getUserRequests: getUserRequests,
  updateRequestStatus: updateRequestStatus,
};
