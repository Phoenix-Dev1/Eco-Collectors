const express = require('express');
const { welcomeUserData } = require('../controllers/welcomeUser');
const router = express.Router();

router.get('/user/welcome', welcomeUserData);

module.exports = router;
