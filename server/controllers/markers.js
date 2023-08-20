const { db } = require('../db.js');

const getActiveMarkers = (req, res) => {
  const q = req.query.type
    ? 'SELECT * FROM markers WHERE type=? AND active=1'
    : 'SELECT * FROM markers WHERE active=1';
  db.query(q, [req.query.type], (err, data) => {
    if (err) return res.send(err);
    return res.status(200).json(data);
  });
};

const searchBinsWithinRadius = (req, res) => {
  console.log('In searchBinsWithinRadius');
  const { address, types, radius } = req.query;
  const query = `
    SELECT *
    FROM markers
    WHERE
      type IN (?) AND
      (
        6371 * ACOS(
          COS(RADIANS(?)) * COS(RADIANS(lat)) * COS(RADIANS(lng) - RADIANS(?)) +
          SIN(RADIANS(?)) * SIN(RADIANS(lat))
        )
      ) <= ?
  `;

  db.query(
    query,
    [types, address.lat, address.lng, address.lat, radius],
    (err, data) => {
      if (err) return res.status(500).json({ error: 'Internal server error' });
      return res.status(200).json(data);
    }
  );
};

module.exports = {
  getActiveMarkers: getActiveMarkers,
  searchBinsWithinRadius: searchBinsWithinRadius,
};
