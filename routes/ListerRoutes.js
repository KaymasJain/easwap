var express = require('express');
var router = express.Router();
var ListerController = require('../controllers/lister.js');

/*
 * GET all CDP all acts
 */

/*
 * /details
 * ?cmcName=
 * &contractAddress=
 * &decimals=
 * &name=
 * &symbol=
*/
router.get('/details', ListerController.mainLister);
router.post('/update', ListerController.update);
router.get('*', ListerController.lister);


module.exports = router;