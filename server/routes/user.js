const express = require('express');
const {
  updateUser,
  changePassword,
  getUserInfo,
} = require('../controllers/user');
const router = express.Router();

router.post('/user');
router.put('/update', updateUser);
router.put('/change-password', changePassword);
router.get('/info', getUserInfo);

module.exports = router;
