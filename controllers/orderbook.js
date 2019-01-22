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
    res.render('orderbook', {
        title: 'Easwap | Create or Manage Orderbook',
        active,
        coinName
    });
    
};

