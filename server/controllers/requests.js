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
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json('Not authenticated');

  jwt.verify(token, 'jwtkey', (err, decoded) => {
    if (err) return res.status(403).json('Token is not valid');
    const userRole = decoded.role;
    if (userRole === 1 || userRole === 3) {
      const q =
        'SELECT `request_id`,`user_id`,`full_name`,`req_lat`, `req_lng`, `req_address`,`phone_number`,`bottles_number`,`from_hour`,`to_hour`,`request_date`,`type` FROM user_requests WHERE request_id = ?';
      db.query(q, [req.params.id], (err, data) => {
        if (err) return res.status(500).send(err);
        return res.status(200).json(data[0]);
      });
    } else {
      return res.status(403).json('Invalid user role');
    }
  });
};

const addRequest = (req, res) => {
  const token = req.cookies.access_token;
  const reqStatus = 1;
  const reqType = 'request';
  //const reqLat = parseFloat(req.body.reqLat);
  //const reqLng = parseFloat(req.body.reqLng);
  if (!token) return res.status(401).json('Not authenticated');

  jwt.verify(token, 'jwtkey', (err, decoded) => {
    if (err) return res.status(403).json('Token is not valid');
    const userId = decoded.id;

    const q =
      'INSERT INTO user_requests (`user_id`,`full_name`,`req_lat`,`req_lng`,`req_address`,`phone_number`,`bottles_number`,`from_hour`,`to_hour`,`request_date`,`status`,`type`) VALUES (?)';

    const values = [
      userId,
      req.body.fullName,
      req.body.reqLat,
      req.body.reqLng,
      req.body.reqAddress,
      req.body.phoneNumber,
      req.body.bottlesNumber,
      req.body.fromTime,
      req.body.toTime,
      req.body.reqDate,
      reqStatus,
      reqType,
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

const updateRequestType = (req, res) => {
  const token = req.cookies.access_token;
  const type = 'pending';
  const status = 2;
  if (!token) return res.status(401).json('Not authenticated!');

  jwt.verify(token, 'jwtkey', (err, userInfo) => {
    if (err) return res.status(403).json('Token is not valid!');
    console.log('User Id:' + userInfo.id);
    const requestId = req.params.id;
    const q =
      'UPDATE user_requests SET `recycler_id`=?,`status`=?, `type`=? WHERE `request_id` = ?';
    const values = [userInfo.id, status, type];

    db.query(q, [...values, requestId], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.json('Request has been updated.');
    });
  });
};

module.exports = {
  getRequests: getRequests,
  getRequest: getRequest,
  addRequest: addRequest,
  deleteRequest: deleteRequest,
  updateRequestType: updateRequestType,
};
