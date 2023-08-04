const { db } = require('../db.js');
const jwt = require('jsonwebtoken');

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

    const selectQuery = 'SELECT * FROM users';

    db.query(selectQuery, (err, data) => {
      if (err) return res.status(500).json(err);
      return res.json(data);
    });
  });
};

module.exports = {
  getAllUsers: getAllUsers,
};
