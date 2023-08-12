const express = require('express');
const { WelcomeUserData } = require('../controllers/welcomeUser');
const router = express.Router();

router.get('/user/welcomeUser', WelcomeUserData);
module.exports = router;
