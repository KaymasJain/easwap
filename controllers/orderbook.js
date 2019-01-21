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
    res.render('orderbook', {
        title: 'Easwap | Create or Manage Orderbook',
        active
    });
    const coinName = req.params.coin;
};

