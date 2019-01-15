/**
 * Basic Routes
 */

/**
 * GET /
 * TRADE SECTION.
 */
exports.trade = (req, res) => {
  let active = {
    trade: 'active',
    lister: '',
    orderbook: ''
  };
  res.render('trade', {
    title: 'Easwap | Easiest Way to Swap ETH/ERC20',
    active
  });
};

/**
 * GET *
 * 404
 */
exports.PageNotFound = (req, res) => {
  res.send("<h1>404 - Page Not Found</h1>");
};