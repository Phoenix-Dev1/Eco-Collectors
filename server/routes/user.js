const express = require('express');
const { updateUser, changePassword } = require('../controllers/user');
const router = express.Router();

router.post('/user');
router.put('/update', updateUser);
router.put('/change-password', changePassword);

module.exports = router;
