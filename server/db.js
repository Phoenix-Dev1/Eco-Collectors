const mysql = require('mysql');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'eco_collectors',
});

module.exports = {
  db: db,
};
