const express = require('express');
const { addRequest } = require('../controllers/requests');

const router = express.Router();

router.get('/test', addRequest);

module.exports = router;
