const express = require('express');
const { WelcomeManagerData } = require('../controllers/welcomeManager');
const router = express.Router();

router.get('/user/welcomeManager', WelcomeManagerData);
module.exports = router;
