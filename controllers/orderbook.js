const List = require('../models/List.js');

/**
 * GET /
 * ORDERBOOK SECTION.
 */
exports.orderbook = (req, res) => {
    let active = {
        trade: '',
        lister: '',
        orderbook: 'active'
    };
    const coinName = req.params.coin;
    if (coinName != "KNC") {
        List.findOne({cmcName:coinName}, function(err, response) {
            if (err) {
                console.log(err);
            } else {
                let coinData = response;
                res.render('orderbook', {
                    title: 'Easwap | Create or Manage Orderbook',
                    active,
                    coinName,
                    coinData
                });
            }
        });
    } else {
        res.redirect('/lister');
    }
};