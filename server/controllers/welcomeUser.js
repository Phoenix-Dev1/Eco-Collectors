const welcomeUserData = (req, res) => {
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json('Not authenticated');

  jwt.verify(token, 'jwtkey', (err, userInfo) => {
    if (err) {
      console.error('Error verifying token:', err);
      return res.status(403).json('Token is not valid!');
    }

    // Assuming that the user ID is stored in the "userInfo.userId" property
    const userId = userInfo.userId;

    // SQL query to count the total requests for the specific user
    const getTotalRequestsQuery = `
      SELECT COUNT(*) AS totalRequests
      FROM user_requests
      WHERE user_id = ${userId}
    `;

    // Execute the SQL query
    db.query(getTotalRequestsQuery, (err, result) => {
      if (err) {
        console.error('Error executing the query:', err);
        return res.status(500).json('Internal server error');
      }

      // Extract the total requests count from the query result
      const totalRequests = result[0].totalRequests;

      console.log('Total Requests:', totalRequests);

      // Respond with the total requests count
      return res.json({ totalRequests });
    });
  });
};

module.exports = {
  welcomeUserData: welcomeUserData,
};
