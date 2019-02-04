const List = require('../models/List.js');
const ListRops = require('../models/ListRops.js');
const slackit = require('../util/slack').shoot;

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
    var modelList = List;
    if (req.query.ropsten) {
        modelList = ListRops;
    }
    const coinName = req.params.coin;
    if (coinName != "KNC") {
        modelList.findOne({cmcName:coinName}, function(err, response) {
            if (err) {
                console.log(err);
            } else {
                if (response) {
                    let coinData = response;
                    res.render('orderbook', {
                        title: 'Easwap | Create or Manage Orderbook',
                        active,
                        coinName,
                        coinData
                    });
                } else {
                    res.redirect('/lister');                    
                }
            }
        });
    } else {
        res.redirect('/lister');
    }
};

exports.deposited = (req, res) => {
    var coin = req.query.coin;
    var txHash = req.query.txHash;
    var text;
    if (req.query.ropsten) {
        text = `${coin} Deposited - https://ropsten.etherscan.io/tx/${txHash}`;
    } else {
        text = `${coin} Deposited - https://etherscan.io/tx/${txHash}`;
    }
    slackit(text, "#2EA44E", false);
    res.end();
};

exports.withdrawn = (req, res) => {
    var coin = req.query.coin;
    var txHash = req.query.txHash;
    var text;
    if (req.query.ropsten) {
        text = `${coin} Withdrawn - https://ropsten.etherscan.io/tx/${txHash}`;
    } else {
        text = `${coin} Withdrawn - https://etherscan.io/tx/${txHash}`;
    }
    slackit(text, "#2EA44E", false);
    res.end();
};