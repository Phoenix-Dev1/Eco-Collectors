const express = require('express');

const { getUserRequests } = require('../controllers/dashboardUser.js');

const router = express.Router();

router.get('/:id', getUserRequests);

module.exports = router;
