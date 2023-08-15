const { db } = require('../db.js');
const jwt = require('jsonwebtoken');

const WelcomeRecyclerData = (req, res) => {
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json('Not authenticated');

  jwt.verify(token, 'jwtkey', (err, userInfo) => {
    if (err) {
      console.error('Error verifying token:', err);
      return res.status(403).json('Token is not valid!');
    }
  });
};

module.exports = {
  WelcomeRecyclerData: WelcomeRecyclerData,
};
