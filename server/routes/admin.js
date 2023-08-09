const express = require('express');
const {
  getAllUsers,
  toggleUserActivation,
  getAllJoinRequests,
  updateJoinRequestStatus,
  fetchAllRequests,
  updateRequestStatus,
  fetchAllRecycleBins,
  deactivateBin,
  activateBin,
  getBinById,
} = require('../controllers/admin');
const router = express.Router();

// Users
router.get('/users', getAllUsers);
router.put('/users/:userId', toggleUserActivation);
// Recyclers Managers Join Requests
router.get('/join-requests', getAllJoinRequests);
router.put('/join-requests/:joinID', updateJoinRequestStatus);
router.get('/all-requests', fetchAllRequests);
router.put('/requests/:requestId', updateRequestStatus);
// Recycle Bins
router.get('/bins/:binId', getBinById);
router.get('/activateBin/:binId', activateBin);
router.get('/recycleBins', fetchAllRecycleBins);
router.put('/deactivateBin/:binId', deactivateBin);
router.put('/activateBin/:binId', activateBin);

module.exports = router;
