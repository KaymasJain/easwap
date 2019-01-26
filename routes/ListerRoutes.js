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
router.get('/coinsData', ListerController.coinsData);
router.post('/update', ListerController.update);
router.post('/add', ListerController.add);
router.get('*', ListerController.lister);


module.exports = router;