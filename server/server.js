const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const app = express();
const authRoutes = require('./routes/auth.js');
const requestsRoutes = require('./routes/requests.js');
const markersRoutes = require('./routes/markers.js');
const port = process.env.PORT || 8800;

app.use(bodyParser.urlencoded({ extended: false }));

// Middlewares
app.use(express.json());
app.use(cookieParser());
app.use('/api/auth', authRoutes);
app.use('/api/requests', requestsRoutes);
app.use('/api/markers', markersRoutes);

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
