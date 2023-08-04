const express = require('express');
const { getAllUsers } = require('../controllers/admin');
const router = express.Router();

router.get('/users', getAllUsers);

module.exports = router;
