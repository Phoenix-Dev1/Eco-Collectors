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

    // Query 3: Calculate the average closing time for all users' requests
    const getAvgClosingTimeQuery = `
      SELECT AVG(TIMESTAMPDIFF(SECOND, request_date, completed_date)) AS avgClosingTime
      FROM user_requests
      WHERE completed_date IS NOT NULL
    `;

    // Execute Query 1: Total Requests
    db.query(getTotalRequestsQuery, (err, result1) => {
      if (err) {
        console.error('Error executing the total requests query:', err);
        return res.status(500).json('Internal server error');
      }
      const totalRequests = result1[0].totalRequests;

      // Execute Query 2: Total Recycled Bottles
      db.query(getTotalRecycledBottlesQuery, (err, result2) => {
        if (err) {
          console.error(
            'Error executing the total recycled bottles query:',
            err
          );
          return res.status(500).json('Internal server error');
        }
        const totalRecycledBottles = result2[0].totalRecycledBottles;

        // Execute Query 3: Average Closing Time
        db.query(getAvgClosingTimeQuery, (err, result3) => {
          if (err) {
            console.error('Error executing the avg closing time query:', err);
            return res.status(500).json('Internal server error');
          }

          const avgClosingTimeInSeconds = result3[0].avgClosingTime;
          const avgClosingTimeInMinutes = Math.floor(
            avgClosingTimeInSeconds / 60
          );

          // Convert to days, hours, and minutes
          const days = Math.floor(avgClosingTimeInMinutes / 1440);
          const hours = Math.floor((avgClosingTimeInMinutes % 1440) / 60);
          const minutes = avgClosingTimeInMinutes % 60;

          console.log('Total Requests:', totalRequests);
          console.log('Total Recycled Bottles:', totalRecycledBottles);
          console.log(
            'Average Closing Time:',
            `${days} days ${hours} hours ${minutes} minutes`
          );

          res.json({
            totalRequests,
            totalRecycledBottles,
            avgClosingTime: `${days} days ${hours} hours ${minutes}`,
          });
        });
      });
    });
  });
};

module.exports = {
  getWelcomeAdminData: getWelcomeAdminData,
};
