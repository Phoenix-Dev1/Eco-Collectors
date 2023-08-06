const bcrypt = require('bcryptjs');
const { db } = require('../db.js');
const jwt = require('jsonwebtoken');

const register = (req, res) => {
  // Check Existing user
  const q = 'SELECT * FROM users WHERE email = ?';

  db.query(q, [req.body.email], (err, data) => {
    console.log(req.body.email);
    if (err) return res.json(err);
    if (data.length) {
      return res.status(400).json('Email address already exists!');
    }

    // Encrypt the password and create a user
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);
    const role = 2;
    const active = 1;
    const q =
      'INSERT INTO users(`role`,`first_name`,`last_name`,`email`,`password`,`city`,`address`,`phone`,`active`) VALUES (?)';
    const values = [
      role,
      req.body.first_name,
      req.body.last_name,
      req.body.email,
      hash,
      req.body.city,
      req.body.address,
      req.body.phone,
      active,
    ];
    console.log(values);
    db.query(q, [values], (err, data) => {
      if (err) return res.json(err);
      return res.status(200).json('User has been created');
    });
  });
};

const login = (req, res) => {
  // Check User existence in db
  const q = 'SELECT * FROM users WHERE email = ?';
  db.query(q, [req.body.email], (err, data) => {
    if (err) {
      console.error('Error in login:', err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }

    if (data.length === 0) {
      return res.status(404).json({ error: 'User not found!' });
    }

    if (data[0].active === 0) {
      return res
        .status(401)
        .json({ error: 'Account is inactive. Login is not permitted.' });
    }

    // Check password
    const isPasswordCorrect = bcrypt.compareSync(
      req.body.password,
      data[0].password
    );

    if (!isPasswordCorrect) {
      return res.status(401).json({ error: 'Wrong username or password' });
    }

    // Using the user unique id to create a token
    const token = jwt.sign({ id: data[0].ID, role: data[0].role }, 'jwtkey', {
      expiresIn: '1d', // Set the expiration time for the token to 1 day
    });

    // removing the password from the data object so it will not be sent
    const { active, password, ...other } = data[0];

    // sending the user a secure cookie via the cookie-parser
    res
      .cookie('access_token', token, {
        httpOnly: true,
        secure: true, // Only transmit the cookie over HTTPS
      })
      .status(200)
      .json(other);
  });
};

const logout = (req, res) => {
  res
    .clearCookie('access_token', {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      expires: new Date(0),
      path: '/',
    })
    .status(200)
    .json('User has been logged out');
};

module.exports = {
  register: register,
  login: login,
  logout: logout,
};
