const express = require('express');
const managerControllers = require('../controllers/manager.js');
const router = express.Router();

router.get('/join-requests', managerControllers.fetchRecyclerJoinRequests);
router.put(
  '/join-requests/:joinID',
  managerControllers.updateRecyclerJoinRequestStatus
);

module.exports = router;
