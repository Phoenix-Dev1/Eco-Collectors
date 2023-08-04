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

const changePassword = (req, res) => {
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json('Not authenticated');

  jwt.verify(token, 'jwtkey', (err, decodedToken) => {
    if (err) return res.status(403).json('Token is not valid!');

    const { old_password, new_password } = req.body;
    const userId = decodedToken.id;
    //console.log('User ID: ' + userId);

    // Fetch the user's data from the database based on the user ID (userId)
    const selectQuery = 'SELECT * FROM users WHERE ID = ?';
    db.query(selectQuery, [userId], (err, data) => {
      if (err) return res.status(500).json(err);
      if (data.length === 0) return res.status(404).json('User not found!');

      // Check if the old password provided by the user matches the hashed password in the database
      const isPasswordCorrect = bcrypt.compareSync(
        old_password,
        data[0].password
      );
      if (!isPasswordCorrect) {
        return res.status(400).json('Invalid old password');
      }

      // Hash the new password
      const salt = bcrypt.genSaltSync(10);
      const hashedPassword = bcrypt.hashSync(new_password, salt);

      // Update the user's password in the database
      const updatePasswordQuery = 'UPDATE users SET password = ? WHERE ID = ?';
      db.query(updatePasswordQuery, [hashedPassword, userId], (err, result) => {
        if (err) return res.status(500).json(err);
        if (result.affectedRows > 0)
          return res.json('Password changed successfully!');
        return res.status(500).json('Failed to change password');
      });
    });
  });
};

const getUserInfo = (req, res) => {
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json('Not authenticated');

  jwt.verify(token, 'jwtkey', (err, decodedToken) => {
    if (err) return res.status(403).json('Token is not valid!');

    const userId = decodedToken.id;

    // Fetch the user's data from the database based on the user ID (userId)
    const selectQuery = 'SELECT * FROM users WHERE ID = ?';
    db.query(selectQuery, [userId], (err, data) => {
      if (err) return res.status(500).json(err);
      if (data.length === 0) return res.status(404).json('User not found!');

      const userData = data[0];
      res.json(userData);
    });
  });
};

const getUserRole = (req, res) => {
  const token = req.cookies.access_token;

  if (!token) {
    return res.status(401).json({ message: 'No token found' });
  }

  try {
    const decodedToken = jwt.verify(token, 'jwtkey');
    const role = decodedToken.role;
    res.status(200).json({ role });
  } catch (error) {
    return res.status(500).json({ message: 'Invalid token' });
  }
};

module.exports = {
  updateUser: updateUser,
  changePassword: changePassword,
  getUserInfo: getUserInfo,
  getUserRole: getUserRole,
};
