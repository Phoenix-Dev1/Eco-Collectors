const { db } = require('../db.js');

const signUp = (req, res) => {
  // Check Existing user
  const q = 'SELECT * FROM recyclers_manager_join_requests WHERE email = ?';

  db.query(q, [req.body.email], (err, data) => {
    if (err) return res.json(err);
    if (data.length) {
      return res
        .status(400)
        .json('Please be patient we will be in contact soon!');
    }

    const q =
      'INSERT INTO recyclers_manager_join_requests(`join_date`,`first_name`,`last_name`,`email`,`phone`,`message`,`user_id`) VALUES (?, ?, ?, ?, ?, ?, ?)';
    const values = [
      req.body.join_date,
      req.body.first_name,
      req.body.last_name,
      req.body.email,
      req.body.phone,
      req.body.message,
      req.body.user_id,
    ];

    db.query(q, values, (err, data) => {
      if (err) return res.json(err);
      return res.status(200).json('Request has been sent');
    });
  });
};

module.exports = {
  signUp: signUp,
};
