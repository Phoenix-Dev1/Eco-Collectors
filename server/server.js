const path = require('path');
const express = require('express');
const app = express();
const requestsRoutes = require('./routes/requests.js');
const port = process.env.PORT || 8800;

/* Testing
app.get('/api', (req, res) => {
  res.json({ users: ['userOne', 'userTwo', 'userThree'] });
});
*/

app.use('/api/requests', requestsRoutes);

app.use(express.json());

/*
app.use((req, res, next) => {
  res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));
});
*/

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
