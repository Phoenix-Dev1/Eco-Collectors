const express = require('express');
const { getAllUsers, toggleUserActivation } = require('../controllers/admin');
const router = express.Router();

router.get('/users', getAllUsers);
router.put('/users/:userId', toggleUserActivation);

module.exports = router;
