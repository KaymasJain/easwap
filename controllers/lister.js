/**
 * GET /
 * LISTER SECTION.
 */
exports.lister = (req, res) => {
    let active = {
        trade: '',
        lister: 'active',
        orderbook: ''
    };
    res.render('lister', {
        title: 'Easwap | List new permissionless reserve',
        req,
        active
    });
};
