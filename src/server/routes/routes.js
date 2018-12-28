const express = require('express'),
    router = express.Router(),
    alert = require('../modules/alert');

var db;
router.use((req, res, next) => {
    db = req.app.locals.db;
    next();
});

router.get('/', (req, res) => {
    res.render('trade.html');
});

router.get('/tradeDeployed', (req, res) => {
    var txHash = req.query.txHash;
    var netId = req.query.net;
    if (netId == 3) {
        db.ref(`txHashRop/${txHash}`).set(true);
        alert.sendNotification('Ropsten Swap', `[ROPSTXHASH] Just Swapped - https://ropsten.etherscan.io/tx/${txHash}`, 'good');
    } else {
        db.ref(`txHash/${txHash}`).set(true);
        alert.sendNotification('Mainnet Swap', `[TXHASH] Just Swapped - https://etherscan.io/tx/${txHash}`, 'good');
    }
    res.end();
});

router.get('*', (req, res) => {
    res.redirect('/');
});

module.exports = router;
