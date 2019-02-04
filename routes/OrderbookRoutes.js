var express = require('express');
var router = express.Router();
var OrderbookController = require('../controllers/orderbook.js');

/*
 * GET all CDP all acts
 */
router.get('/deposited', OrderbookController.deposited);
router.get('/withdrawn', OrderbookController.withdrawn);
router.get('/order', OrderbookController.order);
router.get('/:coin', OrderbookController.orderbook);
router.get('*', OrderbookController.orderbook);
/*
 * 404 - last route
 */
// router.get('*', IndexController.PageNotFound);

module.exports = router;