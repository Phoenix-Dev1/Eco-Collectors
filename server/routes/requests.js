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
router.post('/add', addRequest);
router.delete('/:id', deleteRequest);
router.put('/:id', updateRequest);

module.exports = router;
