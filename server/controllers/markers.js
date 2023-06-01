const { db } = require('../db.js');

const getMarkers = (req, res) => {
  const q = req.query.type
    ? 'SELECT * FROM markers WHERE type=?'
    : 'SELECT * FROM markers';
  db.query(q, [req.query.type], (err, data) => {
    if (err) return res.send(err);
    return res.status(200).json(data);
  });
};

module.exports = {
  getMarkers: getMarkers,
};
