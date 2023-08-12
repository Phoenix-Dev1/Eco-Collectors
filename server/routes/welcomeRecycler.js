const express = require('express');
const { WelcomeRecyclerData } = require('../controllers/welcomeRecycler');
const router = express.Router();

router.get('/user/welcomeRecycler', WelcomeRecyclerData);
module.exports = router;
