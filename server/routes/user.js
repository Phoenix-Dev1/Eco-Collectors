const express = require('express');
const { updateUser } = require('../controllers/user');
const router = express.Router();
router.post('/user');
router.put('/update', updateUser);

module.exports = router;
