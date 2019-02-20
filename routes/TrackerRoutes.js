var express = require('express');
var router = express.Router();
var TrackerController = require('../controllers/tracker.js');

/*
 * GET all CDP all acts
 */

router.get('*', TrackerController.index);


module.exports = router;