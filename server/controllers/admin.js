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

module.exports = {
  getAllUsers: getAllUsers,
  toggleUserActivation: toggleUserActivation,
};
