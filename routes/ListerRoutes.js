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
 * &ropsten=true For ropsten data
*/
router.get('/details', ListerController.mainLister);

/*
 * Lister Coins data
 * ?ropsten=true For ropsten data
 */
router.get('/coinsData', ListerController.coinsData);

/*
 * Update Coins data
 */
router.post('/update', ListerController.update);

/*
 * Add new coin data
 */
router.post('/add', ListerController.add);
router.get('*', ListerController.lister);


module.exports = router;