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

exports.coinsData = (req, res) => {
    List.find({}, function(err, response) {
        console.log(response);
        if (err) {
            console.log(`Unable to find data - ${err}`);
            res.send({
                status: false,
                message: `Unable to find data`
            });
            return;
        } else {
            let objectToSend = {};
            Object.keys(response).forEach(function (key, i) {
                objectToSend[response[key].cmcName.toLowerCase()] = response[key];
            });
            console.log(objectToSend);
            res.send(objectToSend);
        }
    });
    // res.send({
    //     status: true,
    //     message: `Updated successfully`
    // });
};

exports.update = (req, res) => {
    var data = req.body;
    var secret = data.secret;
    var dataToUpdate = data.listedCoins;
    if (secret == process.env.UPDATE_DATA_SECRET) {
        List.deleteMany({}, function(err, response) {
            if (err) {
                console.log(`COINS Main data delete - ${err}`);
            } else {
                var num = 0;
                Object.keys(dataToUpdate).forEach(function (key, i) {
                    let ListNewToken = new List({
                        cmcName: dataToUpdate[key].cmcName,
                        contractAddress: dataToUpdate[key].contractAddress,
                        decimals: dataToUpdate[key].decimals,
                        name: dataToUpdate[key].name,
                        symbol: dataToUpdate[key].symbol
                    });
                    ListNewToken.save(function (err, updated) {
                        if (err) {
                            console.log(`error updating Coins data - ${err}`);
                            res.send({
                                status: false,
                                message: `Unable to save data`
                            });
                            return;
                        }
                        num++;
                        console.log(num);
                    });
                    // res.send({
                    //     status: true,
                    //     message: `Updated successfully`
                    // });
                });
            }
        });
    }
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