const express = require('express');
const { addRequest } = require('../controllers/requests.js');

const router = express.Router();

router.get('/test', addRequest);

module.exports = router;

/*
const express = require('express');
const router = express.Router();

const {
  getRequests,
  getRequest,
  addRequest,
  deleteRequest,
  updateRequest,
} = require('../controllers/requests.js');


router.get('/', getRequests);
router.get('/:id', getRequest);
router.post('/', addRequest);
router.delete('/:id', deleteRequest);
router.update('/:id', updateRequest);

module.exports = {
  router: router,
};
*/
