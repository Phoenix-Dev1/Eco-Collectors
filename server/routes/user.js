const express = require('express');
const {
  updateUser,
  changePassword,
  getUserInfo,
  getUserRole,
  deactivateAccount,
} = require('../controllers/user');
const router = express.Router();

router.post('/user');
router.put('/update', updateUser);
router.put('/change-password', changePassword);
router.get('/info', getUserInfo);
router.get('/role', getUserRole);
router.post('/deactivate', deactivateAccount);

module.exports = router;
