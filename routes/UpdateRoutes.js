var express = require('express');
var router = express.Router();
var UpdateController = require('../controllers/update.js');

/*
 * GET all CDP all acts
 */
router.post('*', UpdateController.update);
/*
 * 404 - last route
 */
// router.get('*', IndexController.PageNotFound);

module.exports = router;