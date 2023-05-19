const express = require('express');
const authControllers = require('../controllers/auth.js');
const bodyParser = require('body-parser');

const router = express.Router();

router.post('/register', bodyParser.json(), authControllers.register);
router.post('/login', bodyParser.json(), authControllers.login);
router.get('/logout', bodyParser.json(), authControllers.logout);

module.exports = router;
