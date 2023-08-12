const express = require('express');
const { getWelcomeAdminData } = require('../controllers/welcomeAdmin');
const router = express.Router();

router.get('/user/welcomeAdmin', getWelcomeAdminData);

module.exports = router;
