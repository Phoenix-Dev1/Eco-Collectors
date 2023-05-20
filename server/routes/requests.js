const express = require('express');
const {
  getRequests,
  getRequest,
  addRequest,
  deleteRequest,
  updateRequest,
} = require('../controllers/requests.js');

const router = express.Router();

router.get('/', getRequests);
router.get('/:id', getRequest);
router.post('/', addRequest);
router.delete('/:id', deleteRequest);
router.update('/:id', updateRequest);

module.exports = router;
