var express = require('express');
var router = express.Router();
var ListerController = require('../controllers/lister.js');

/*
 * GET all CDP all acts
 */
router.get('*', ListerController.lister);


module.exports = router;