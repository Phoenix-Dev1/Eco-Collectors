const express = require('express');
const markersControllers = require('../controllers/markers.js');

const router = express.Router();

router.get('/', markersControllers.getActiveMarkers);
router.get('/searchBins', markersControllers.searchBinsWithinRadius);
module.exports = router;
