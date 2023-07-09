const { db } = require('../db.js');
const jwt = require('jsonwebtoken');

const getUserRequests = (req, res) => {
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json('Not authenticated');

  jwt.verify(token, 'jwtkey', (err, decoded) => {
    if (err) return res.status(403).json('Token is not valid');
    const userId = decoded.id;
    const q = 'SELECT * FROM user_requests WHERE user_id = ?';
    db.query(q, userId, (err, data) => {
      if (err) return res.status(500).send(err);
      return res.status(200).json(data);
    });
  });
};

const updateRequestStatus = (req, res) => {
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json('Not authenticated');

  jwt.verify(token, 'jwtkey', (err, decoded) => {
    if (err) return res.status(403).json('Token is not valid');
    const requestId = req.params.id;
    const { status } = req.body; // Get the new status from the request body

    let type;
    if (status === 1) {
      type = 'request';
    } else {
      // for map rendering purposes
      type = 'pending';
    }

    // Bottles number and user_id values
    const getRequestQuery =
      'SELECT bottles_number, user_id FROM user_requests WHERE request_id = ?';
    db.query(getRequestQuery, [requestId], (err, result) => {
      if (err) return res.status(500).send(err);

      if (result.length === 0) {
        return res.status(404).json('Request not found');
      }

      const { bottles_number, user_id } = result[0];
      console.log('Bottles: ' + bottles_number);
      console.log('User_id: ' + user_id);

      let recyclerId;
      const q = 'SELECT recycler_id FROM user_requests WHERE request_id = ?';
      db.query(q, [requestId], (err, result) => {
        if (err) return res.status(500).send(err);
        recyclerId = result[0].recycler_id;

        if (status === 4 || status === 1) {
          recyclerId = null;
        }

        const updateQ =
          'UPDATE user_requests SET `status`=?, `type`=?, `recycler_id`=? WHERE `request_id` = ?';
        db.query(
          updateQ,
          [status, type, recyclerId, requestId],
          (err, data) => {
            if (err) return res.status(500).send(err);

            // Update the user's amount if the status changed to 3
            if (status === 3) {
              const updateAmountQ =
                'UPDATE users SET amount = amount + ? WHERE ID = ?';
              db.query(
                updateAmountQ,
                [bottles_number, user_id],
                (err, data) => {
                  if (err) return res.status(500).send(err);

                  return res.status(200).json(data);
                }
              );
            } else {
              return res.status(200).json(data);
            }
          }
        );
      });
    });
  });
};

module.exports = {
  getUserRequests: getUserRequests,
  updateRequestStatus: updateRequestStatus,
};
