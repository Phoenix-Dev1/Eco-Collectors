const express = require('express');
const markersControllers = require('../controllers/markers.js');
const bodyParser = require('body-parser');

const router = express.Router();

router.get('/', bodyParser.json(), markersControllers.getMarkers);

module.exports = router;
