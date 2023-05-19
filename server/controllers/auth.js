const bcrypt = require('bcryptjs');
const { db } = require('../db.js');

const register = (req, res) => {
  // Check Existing user
  const q = 'SELECT * FROM users WHERE email = ? OR username = ?';

  console.log(req.body);
  db.query(q, [req.body.email, req.body.name], (err, data) => {
    if (err) return res.json(err);
    if (data.length) return res.status(409).json('User already exists!');

    // Hash the password and create a user
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);

    const q = 'INSERT INTO users(`username`,`email`,`password`) VALUES (?)';
    const values = [req.body.username, req.body.email, hash];

    db.query(q, [values], (err, data) => {
      if (err) return res.json(err);
      return res.status(200).json('User has been created');
    });
  });
};

const login = (req, res) => {};

const logout = (req, res) => {};

module.exports = {
  register: register,
  login: login,
  logout: logout,
};
