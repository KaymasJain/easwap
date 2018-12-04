const express = require('express'),
    router = express.Router(),
    alert = require('../modules/alert');

var db;
router.use((req, res, next) => {
    db = req.app.locals.db;
    next();
});

// router.get('/', (req, res) => {
//     res.render('index.html');
// });

router.get('/dash', (req, res) => {
    res.render('trade.html');
});

router.get('/timeline', (req, res) => {
    res.render('timeline.html');
});


router.get('*', (req, res) => {
    res.redirect('/');
});

module.exports = router;
