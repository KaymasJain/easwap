var express = require('express');
var router = express.Router();
var IndexController = require('../controllers/index.js');

/*
 * GET all CDP all acts
 */
router.get('/', IndexController.trade);

/*
 * 404 - last route
 */
router.get('*', IndexController.PageNotFound);

module.exports = router;