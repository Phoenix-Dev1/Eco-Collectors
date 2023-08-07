const express = require('express');
const {
  getAllUsers,
  toggleUserActivation,
  getAllJoinRequests,
  updateJoinRequestStatus,
} = require('../controllers/admin');
const router = express.Router();

router.get('/users', getAllUsers);
router.put('/users/:userId', toggleUserActivation);
router.get('/join-requests', getAllJoinRequests);
router.put('/join-requests/:joinID', updateJoinRequestStatus);

module.exports = router;
