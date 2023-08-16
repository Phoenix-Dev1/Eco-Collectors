const { db } = require('../db.js');
const jwt = require('jsonwebtoken');

const WelcomeManagerData = (req, res) => {
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json('Not authenticated');

  jwt.verify(token, 'jwtkey', (err, decodedToken) => {
    if (err) {
      console.error('Error verifying token:', err);
      return res.status(403).json('Token is not valid!');
    }

    // SQL query to count the total requests picked up by recyclers
    const getTotalPickedUpRequestsQuery = `
      SELECT COUNT(*) AS totalPickedUpRequests
      FROM user_requests
      WHERE recycler_id IS NOT NULL
    `;

    // SQL query to sum the total recycled bottles for all recyclers
    const getTotalRecycledBottlesQuery = `
      SELECT SUM(bottles_number) AS totalRecycledBottles
      FROM user_requests
      WHERE recycler_id IS NOT NULL
    `;

    // SQL query to calculate the average closing time for all recyclers' requests
    const getAvgClosingTimeQuery = `
      SELECT AVG(TIMESTAMPDIFF(SECOND, request_date, completed_date)) AS avgClosingTime
      FROM user_requests
      WHERE recycler_id IS NOT NULL
      AND completed_date IS NOT NULL
    `;

    db.query(getTotalPickedUpRequestsQuery, (err, result1) => {
      if (err) {
        console.error(
          'Error executing the total picked up requests query:',
          err
        );
        return res.status(500).json('Internal server error');
      }

      const totalPickedUpRequests = result1[0].totalPickedUpRequests;

      db.query(getTotalRecycledBottlesQuery, (err, result2) => {
        if (err) {
          console.error(
            'Error executing the total recycled bottles query:',
            err
          );
          return res.status(500).json('Internal server error');
        }

        const totalRecycledBottles = result2[0].totalRecycledBottles;

        // Execute the query to get the average closing time
        db.query(getAvgClosingTimeQuery, (err, result3) => {
          if (err) {
            console.error('Error executing the avg closing time query:', err);
            return res.status(500).json('Internal server error');
          }

          // Extract the average closing time in seconds from the query result
          const avgClosingTimeInSeconds = result3[0].avgClosingTime;

          // Calculate the average closing time in days, hours, and minutes
          const avgClosingTimeInDays = Math.floor(
            avgClosingTimeInSeconds / (3600 * 24)
          );
          const avgClosingTimeInHours = Math.floor(
            (avgClosingTimeInSeconds % (3600 * 24)) / 3600
          );
          const avgClosingTimeInMinutes = Math.floor(
            (avgClosingTimeInSeconds % 3600) / 60
          );

          // Respond with the total picked up requests count, total recycled bottles count, and average closing time
          return res.json({
            totalPickedUpRequests,
            totalRecycledBottles,
            avgClosingTime: {
              days: avgClosingTimeInDays,
              hours: avgClosingTimeInHours,
              minutes: avgClosingTimeInMinutes,
            },
          });
        });
      });
    });
  });
};

module.exports = {
  WelcomeManagerData: WelcomeManagerData,
};
