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

router.get('/iframe', (req, res) => {
    res.render('iframe.html');
});

router.get('/developer', (req, res) => {
    res.render('developer.html');
});

router.get('/developer', (req, res) => {
    res.render('developer.html');
});

router.get('/portfolio', (req, res) => {
    res.render('portfolio.html');
});

router.get('/commerce', (req, res) => {
    res.render('commerce.html');
});

router.get('/pay', (req, res) => {
    res.render('pay.html');
});

router.get('/tradeDeployed', (req, res) => {
    var txHash = req.query.txHash;
    var netId = req.query.net;
    console.log(netId);
    if (netId == 3) {
        db.ref(`txHashRop/${txHash}`).set(true);
        alert.sendPush('sjain0410@gmail.com', "link", "Rops [TXHASH] Just Swapped", `https://ropsten.etherscan.io/tx/${txHash}`);
        alert.sendPush('champ.sowmay@gmail.com', "link", "Rops [TXHASH] Just Swapped", `https://ropsten.etherscan.io/tx/${txHash}`);
    } else {
        db.ref(`txHash/${txHash}`).set(true);
        alert.sendPush('sjain0410@gmail.com', "link", "[TXHASH] Just Swapped", `https://etherscan.io/tx/${txHash}`);
        alert.sendPush('champ.sowmay@gmail.com', "link", "[TXHASH] Just Swapped", `https://etherscan.io/tx/${txHash}`);
    }
    res.end();
});

router.get('/tradeIframe', (req, res) => {
    var txHash = req.query.txHash;
    console.log(txHash);
    db.ref(`iframe/txHashIframe/${txHash}`).set(true);
    alert.sendPush('sjain0410@gmail.com', "link", "[TXHASH] Iframe Swapped", `https://etherscan.io/tx/${txHash}`);
    alert.sendPush('champ.sowmay@gmail.com', "link", "[TXHASH] Iframe Swapped", `https://etherscan.io/tx/${txHash}`);
    res.end();
});

router.get('/newPay', (req, res) => {
    var forQuery = req.query;
    var account = forQuery.account;
    var title = forQuery.title;
    var desc = forQuery.desc;
    var amount = forQuery.amount;
    var theme = forQuery.theme;
    var acceptIn = forQuery.acceptIn;
    console.log(account, title, desc, amount, theme, acceptIn);
    var d = new Date();
    var time = d.getTime();
    db.ref(`commerce/${account}/${time}`).set({
        'title': title,
        'desc': desc,
        'amount': amount,
        'theme': theme,
        'acceptIn': acceptIn 
    });
    res.end();
});


router.get('*', (req, res) => {
    res.redirect('/');
});

module.exports = router;
