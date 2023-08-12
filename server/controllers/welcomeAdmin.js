const { db } = require('../db.js');
const jwt = require('jsonwebtoken');

const getWelcomeAdminData = (req, res) => {
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json('Not authenticated');

  jwt.verify(token, 'jwtkey', (err) => {
    if (err) {
      console.error('Error verifying token:', err);
      return res.status(403).json('Token is not valid!');
    }

    // Query 1: Count the total requests from all users
    const getTotalRequestsQuery = `
      SELECT COUNT(*) AS totalRequests
      FROM user_requests
    `;

    // Query 2: Calculate the total recycled bottles by all users
    const getTotalRecycledBottlesQuery = `
      SELECT SUM(bottles_number) AS totalRecycledBottles
      FROM user_requests
    `;

    // Execute both queries in parallel
    Promise.all([
      new Promise((resolve, reject) => {
        db.query(getTotalRequestsQuery, (err, result1) => {
          if (err) {
            console.error('Error executing the total requests query:', err);
            reject(err);
          }
          const totalRequests = result1[0].totalRequests;
          resolve(totalRequests);
        });
      }),
      new Promise((resolve, reject) => {
        db.query(getTotalRecycledBottlesQuery, (err, result2) => {
          if (err) {
            console.error(
              'Error executing the total recycled bottles query:',
              err
            );
            reject(err);
          }
          const totalRecycledBottles = result2[0].totalRecycledBottles;
          resolve(totalRecycledBottles);
        });
      }),
    ])
      .then(([totalRequests, totalRecycledBottles]) => {
        console.log('Total Requests:', totalRequests);
        console.log('Total Recycled Bottles:', totalRecycledBottles);
        res.json({ totalRequests, totalRecycledBottles });
      })
      .catch((error) => {
        console.error('Error in queries:', error);
        res.status(500).json('Internal server error');
      });
  });
};

module.exports = {
  getWelcomeAdminData: getWelcomeAdminData,
};
