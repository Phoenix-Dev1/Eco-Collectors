const { db } = require('../db.js');
const jwt = require('jsonwebtoken');

const getRequests = (req, res) => {
  const q = 'SELECT * FROM user_requests WHERE status = 1 OR status = 2';
  db.query(q, (err, data) => {
    if (err) {
      console.error(err); // Log the error message
      return res.status(500).send(err);
    }
    return res.status(200).json(data);
  });
};

const getRequest = (req, res) => {
  const q =
    'SELECT `ID`,`first_name`,`last_name`,`username` FROM users u JOIN user_requests r ON u.ID=r.user_id   WHERE r.id=?';
  db.query(q, [req.params.id], (err, data) => {
    if (err) return res.status(500).send(err);

    return res.status(200).json(data[0]);
  });
};

const addRequest = (req, res) => {
  const token = req.cookies.access_token;
  const reqStatus = 1;
  //const reqLat = parseFloat(req.body.reqLat);
  //const reqLng = parseFloat(req.body.reqLng);
  if (!token) return res.status(401).json('Not authenticated');

  jwt.verify(token, 'jwtkey', (err, decoded) => {
    if (err) return res.status(403).json('Token is not valid');
    const userId = decoded.id;

    const q =
      'INSERT INTO user_requests (`user_id`,`full_name`,`req_lat`,`req_lng`,`req_address`,`bottles_number`,`from_hour`,`to_hour`,`request_date`,`status`,`type`) VALUES (?)';

    const values = [
      userId,
      req.body.fullName,
      req.body.reqLat,
      req.body.reqLng,
      req.body.reqAddress,
      req.body.bottlesNumber,
      req.body.fromTime,
      req.body.toTime,
      req.body.reqDate,
      reqStatus,
      req.body.type,
    ];
    db.query(q, [values], (err, data) => {
      if (err) return res.status(500).send(err);
      return res.status(200).json('Request has been created');
    });
  });
};

const deleteRequest = (req, res) => {
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json('Not authenticated');

  jwt.verify(token, 'jwtkey', (err, userInfo) => {
    if (err) return res.status(403).json('Token is not valid');
    const requestId = req.params.is;
    const q =
      'DELETE FROM user_request WHERE `request_id` = ? AND `user_id` = ?  ';

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
  getRequests: getRequests,
  getRequest: getRequest,
  addRequest: addRequest,
  deleteRequest: deleteRequest,
  updateRequest: updateRequest,
};
