const addRequest = (req, res) => {
  res.json('From request controller');
};

module.exports = {
  addRequest: addRequest,
};

/*

const { db } = require('../db.js');
const jwt = require('jsonwebtoken');

// to be Continued...
const getRequests = (req, res) => {
  const q = req.query.id
    ? 'Select * FROM user_requests WHERE ID=?'
    : 'Select * FROM user_requests';

  db.query(q, [req.query.id], (err, data) => {
    if (err) return res.status(500).send(err);

    return res.status(200).json(data);
  });
};
const getRequest = (req, res) => {
  res.json('From request controller');
};
const addRequest = (req, res) => {
  res.json('From request controller');
};
const deleteRequest = (req, res) => {
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json('Not authenticated!');

  jwt.verify(token, 'jwtkey', (err, userInfo) => {
    if (err) return res.status(403).json('Token is not valid!');

    const requestId = req.params.id;
    const q = 'DELETE FROM user_requests WHERE `ID` = ? AND `User_ID` = ?';

    db.query(q, [requestId, userInfo.id], (err, data) => {
      if (err)
        return res.status(403).json('You can delete only your requests!');

      return res.json('Request has been deleted!');
    });
  });
};
const updateRequest = (req, res) => {
  res.json('From request controller');
};

module.exports = {
  addRequest: addRequest,
};

*/
