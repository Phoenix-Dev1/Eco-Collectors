const express = require('express');
const managerControllers = require('../controllers/manager.js');
const router = express.Router();

// Recyclers Join requests
router.get('/join-requests', managerControllers.fetchRecyclerJoinRequests);
router.put(
  '/join-requests/:joinID',
  managerControllers.updateRecyclerJoinRequestStatus
);
// Recyclers Management
router.get('/recyclers', managerControllers.getAllRecyclers);
router.put('/recyclers/:userId', managerControllers.RecyclerDeactivation);

module.exports = router;
