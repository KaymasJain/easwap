const List = require('../models/List.js');

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

exports.mainLister = (req, res) => {
    let cmcName = req.query.cmcName;
    let contractAddress = req.query.contractAddress;
    let decimals = req.query.decimals;
    let name = req.query.name;
    let symbol = req.query.symbol;
    List.findOne({
        "contractAddress": contractAddress,
    }, function (err, isListed) {
        if (err) {
            console.log(err);
            return res.send({
                status: false,
                message: `Error reading data in database`
            });
            // slackit(`subscribeCDP() - ${err}`, "error", false);
        }
        if (isListed) {
            return res.send({
                status: false,
                message: `ERC20 already listed`
            });
        }

        let ListNewToken = new List({
            cmcName: cmcName,
            contractAddress: contractAddress,
            decimals: decimals,
            name: name,
            symbol: symbol
        });

        ListNewToken.save(function (err, subscribed) {
            if (err) {
                console.log(err);
                return res.send({
                    status: false,
                    message: `Error saving ERC20 data to database`
                });
            } else if (subscribed) {
                return res.send({
                    status: true,
                    message: `ERC20 (${symbol}) data saved to database`
                });
            }
        });
    });
};

exports.update = (req, res) => {
    var data = req.body;
    var secret = data.secret;
    var dataToUpdate = data.listedCoins;
    console.log(data);
    if (secret == process.env.UPDATE_DATA_SECRET) {
        List.deleteMany({}, function(err, response) {
            if (err) {
                console.log(`COINS Main data delete - ${err}`);
            } else {
                List.save(function (err, updated) {
                    if (err) {
                        console.log(`Gas Price save - ${err}`);
                    }
                });
            }
        });
    }
    res.send({
        status: true,
        message: `Updated successfully`
    });
};

// CODE TO ENTER IN FRONTEND

// function send(secret) {
// 	var objectToSend = {
// 		'secret': secret,
// 		'listedCoins': true
// 	}
// 	$.ajax({
// 		url: "/lister/update",
// 		type: 'POST',
// 		contentType:'application/json',
// 		data: JSON.stringify(objectToSend),
// 		dataType:'json'
// 	});
// 	alert('saved');
// }