var express = require('express');
var router = express.Router();
var TradeController = require('../controllers/trade.js');

/*
 * GET /trade routes
 */

/*
 * ?secret=SECRET_PHRASE
 * ?ropsten=true for ropsten data update
 */
router.get('/update', TradeController.update);

/*
 * ?ropsten=true for ropsten data on trade section
 */
router.get('/tradeData', TradeController.tradeData);

/*
 * Current gas status
 */
router.get('/gas', TradeController.gas);

/*
 * Transaction hash when trade happens
 */
router.get('/tradeHash', TradeController.tradeHash);

/*
 * Transaction hash when trade happens
 */
router.get('*', TradeController.index);

module.exports = router;