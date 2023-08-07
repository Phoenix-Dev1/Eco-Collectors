const express = require('express');
const {
  getAllUsers,
  toggleUserActivation,
  getAllJoinRequests,
  updateJoinRequestStatus,
  fetchAllRequests,
  updateRequestStatus,
} = require('../controllers/admin');
const router = express.Router();

router.get('/users', getAllUsers);
router.put('/users/:userId', toggleUserActivation);
router.get('/join-requests', getAllJoinRequests);
router.put('/join-requests/:joinID', updateJoinRequestStatus);
router.get('/all-requests', fetchAllRequests);
router.put('/requests/:requestId', updateRequestStatus);

module.exports = router;
