const { db } = require('../db.js');
const jwt = require('jsonwebtoken');

const WelcomeUserData = (req, res) => {
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json('Not authenticated');

  jwt.verify(token, 'jwtkey', (err, decodedToken) => {
    if (err) {
      console.error('Error verifying token:', err);
      return res.status(403).json('Token is not valid!');
    }

    const userId = decodedToken.id;

    // SQL query to count the total requests for the specific user
    const getTotalRequestsQuery = `
      SELECT COUNT(*) AS totalRequests
      FROM user_requests
      WHERE user_id = ${userId}
    `;

    // SQL query to sum the total recycled bottles for the specific user
    const getTotalRecycledBottlesQuery = `
      SELECT SUM(bottles_number) AS totalRecycledBottles
      FROM user_requests
      WHERE user_id = ${userId}
    `;

    // SQL query to calculate the average closing time for the specific user's requests
    const getAvgClosingTimeQuery = `
      SELECT AVG(TIMESTAMPDIFF(SECOND, request_date, completed_date)) AS avgClosingTime
      FROM user_requests
      WHERE user_id = ${userId}
      AND completed_date IS NOT NULL
  `;

    db.query(getTotalRequestsQuery, (err, result) => {
      if (err) {
        console.error('Error executing the query:', err);
        return res.status(500).json('Internal server error');
      }

      const totalRequests = result[0].totalRequests;

      db.query(getTotalRecycledBottlesQuery, (err, result) => {
        if (err) {
          console.error('Error executing the query:', err);
          return res.status(500).json('Internal server error');
        }

        const totalRecycledBottles = result[0].totalRecycledBottles;

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

          // Respond with the total requests count, total recycled bottles count, and average closing time
          return res.json({
            totalRequests,
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
  WelcomeUserData: WelcomeUserData,
};
