var express = require('express');
var router = express.Router();
var TradeController = require('../controllers/trade.js');

/*
 * GET all CDP all acts
 */
router.get('/kyberMain', TradeController.kyberMain);
router.get('/kyberRops', TradeController.kyberRops);
router.get('/gas', TradeController.gas);
router.get('/tradeHash', TradeController.tradeHash);

module.exports = router;