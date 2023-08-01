const { db } = require('../db.js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const updateUser = (req, res) => {
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json('Not authenticated');

  jwt.verify(token, 'jwtkey', (err, userInfo) => {
    if (err) return res.status(403).json('Token is not valid!');

    // Check if email already exists for another user
    const email = req.body.email;
    const selectQuery = 'SELECT * FROM users WHERE email = ? AND ID != ?';

    db.query(selectQuery, [email, userInfo.id], (err, data) => {
      if (err) return res.status(500).json(err);
      if (data.length) {
        return res.status(400).json('Email address already exists!');
      }

      const updateQuery =
        'UPDATE users SET `first_name`=?, `last_name`=?, `email`=?, `city`=?, `address`=?, `phone`=? WHERE ID=?';

      const queryParams = [
        req.body.first_name || userInfo.first_name,
        req.body.last_name || userInfo.last_name,
        req.body.email || userInfo.email,
        req.body.city || userInfo.city,
        req.body.address || userInfo.address,
        req.body.phone || userInfo.phone,
        userInfo.id,
      ];

      db.query(updateQuery, queryParams, (err, data) => {
        if (err) return res.status(500).json(err);
        if (data.affectedRows > 0) return res.json('Updated');
        return res.status(403).json('You can update only your account');
      });
    });
  });
};

module.exports = {
  updateUser: updateUser,
};
