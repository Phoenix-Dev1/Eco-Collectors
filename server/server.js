const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const app = express();
const authRoutes = require('./routes/auth.js');
const requestsRoutes = require('./routes/requests.js');
const markersRoutes = require('./routes/markers.js');
const recyclers = require('./routes/recyclerRegister.js');
const recyclersManagers = require('./routes/recyclersManagerRegister.js');
const user = require('./routes/user.js');
const port = process.env.PORT || 8800;

app.use(bodyParser.urlencoded({ extended: false }));

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Middlewares
app.use(express.json());
app.use(cookieParser());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/requests', requestsRoutes);
app.use('/api/markers', markersRoutes);
app.use('/api/recyclers', recyclers);
app.use('/api/recyclersManagers', recyclersManagers);
app.use('/api/user', user);

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
