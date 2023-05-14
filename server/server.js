const path = require('path');
const express = require('express');
const app = express();

const port = process.env.PORT || 5000;

app.get('/api', (req, res) => {
  res.json({ users: ['userOne, userTwo, userThree'] });
});

/*
app.use((req, res, next) => {
  res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));
});
*/

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
