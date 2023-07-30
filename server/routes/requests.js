const express = require('express');
const {
  getRequests,
  getRequest,
  addRequest,
  deleteRequest,
  updateRequestType,
} = require('../controllers/requests.js');

const router = express.Router();

router.get('/', getRequests);
router.get('/:id', getRequest);
router.post('/add', addRequest);
router.delete('/:id', deleteRequest);
router.put('/:id', updateRequestType);

module.exports = router;
