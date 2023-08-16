const { db } = require('../db.js');
const jwt = require('jsonwebtoken');

const WelcomeRecyclerData = (req, res) => {
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json('Not authenticated');

  jwt.verify(token, 'jwtkey', (err, decodedToken) => {
    if (err) {
      console.error('Error verifying token:', err);
      return res.status(403).json('Token is not valid!');
    }

    const userId = decodedToken.id;

    // Query 1: Count the total requests picked up by the specific user
    const getTotalRequestsPickedUpQuery = `
      SELECT COUNT(*) AS totalRequestsPickedUp
      FROM user_requests
      WHERE recycler_id = ${userId}
    `;

    // Query 2: Calculate the total recycled bottles by the specific user
    const getTotalRecycledBottlesQuery = `
      SELECT SUM(bottles_number) AS totalRecycledBottles
      FROM user_requests
      WHERE recycler_id = ${userId}
    `;

    // Query 3: Calculate the average closing time for the specific user's requests
    const getAvgClosingTimeQuery = `
      SELECT AVG(TIMESTAMPDIFF(SECOND, request_date, completed_date)) AS avgClosingTime
      FROM user_requests
      WHERE recycler_id = ${userId} AND completed_date IS NOT NULL
    `;

    // Execute the queries
    db.query(getTotalRequestsPickedUpQuery, (err1, result1) => {
      if (err1) {
        console.error(
          'Error executing the total requests picked up query:',
          err1
        );
        return res.status(500).json('Internal server error');
      }
      const totalRequestsPickedUp = result1[0].totalRequestsPickedUp;

      db.query(getTotalRecycledBottlesQuery, (err2, result2) => {
        if (err2) {
          console.error(
            'Error executing the total recycled bottles query:',
            err2
          );
          return res.status(500).json('Internal server error');
        }
        const totalRecycledBottles = result2[0].totalRecycledBottles;

        db.query(getAvgClosingTimeQuery, (err3, result3) => {
          if (err3) {
            console.error('Error executing the avg closing time query:', err3);
            return res.status(500).json('Internal server error');
          }
          const avgClosingTimeInSeconds = result3[0].avgClosingTime;
          const avgClosingTimeInMinutes = Math.floor(
            avgClosingTimeInSeconds / 60
          );
          const days = Math.floor(avgClosingTimeInMinutes / 1440);
          const hours = Math.floor((avgClosingTimeInMinutes % 1440) / 60);
          const minutes = avgClosingTimeInMinutes % 60;
          const avgClosingTime = `${days} days ${hours} hours ${minutes} minutes`;

          console.log('Total Requests Picked Up:', totalRequestsPickedUp);
          console.log('Total Recycled Bottles:', totalRecycledBottles);
          console.log('Average Closing Time:', avgClosingTime);
          res.json({
            totalRequestsPickedUp,
            totalRecycledBottles,
            avgClosingTime,
          });
        });
      });
    });
  });
};

module.exports = {
  WelcomeRecyclerData: WelcomeRecyclerData,
};
