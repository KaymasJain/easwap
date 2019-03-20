const List = require('../models/List.js');
const ListRops = require('../models/ListRops.js');

const slackit = require('../util/slack').shoot;

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
    var modelList = List;
    if (req.query.ropsten) {
        modelList = ListRops;
    }
    modelList.findOne({
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

        let ListNewToken = new modelList({
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
    var modelList = List;
    if (req.query.ropsten) {
        modelList = ListRops;
    }
    modelList.find({}, function(err, response) {
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
                try {
                    objectToSend[response[key].symbol.toLowerCase()] = response[key];
                } catch(err) {
					slackit(`Lister coinsData - ${response[key]} - ${err}`, "#D50201", false);
                    console.log(err);
                }
            });
            res.send(objectToSend);
        }
    });
};

exports.update = (req, res) => {
    var data = req.body;
    var secret = data.secret;
    var dataToUpdate = data.listedCoins;
    var modelList = List;
    if (data.ropsten) {
        modelList = ListRops;
    }
    if (secret == process.env.UPDATE_DATA_SECRET) {
        modelList.deleteMany({}, function(err, response) {
            if (err) {
                console.log(`Coins data delete - ${err}`);
            } else {
                var num = 0;
                Object.keys(dataToUpdate).forEach(function (key, i) {
                    if ((dataToUpdate[key].symbol).includes('.')) {
                        return;
                    }
                    let ListNewToken = new modelList({
                        cmcName: dataToUpdate[key].cmcName,
                        contractAddress: dataToUpdate[key].contractAddress,
                        decimals: dataToUpdate[key].decimals,
                        name: dataToUpdate[key].name,
                        symbol: dataToUpdate[key].symbol,
                        reserveAddress: dataToUpdate[key].reserveAddress
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
                });
                res.send({
                    status: true,
                    message: `Updated successfully`
                });
            }
        });
    }
};

exports.add = (req, res) => {
    var data = req.body;
    var modelList = List;
    if (data.ropsten) {
        modelList = ListRops;
    }
    let AddNewToken = new modelList({
        cmcName: data.cmcName,
        contractAddress: data.contractAddress,
        decimals: data.decimals,
        name: data.name,
        symbol: data.symbol
    });
    AddNewToken.save(function (err, added) {
        if (err) {
            console.log(`error adding Coin data - ${err}`);
            res.send({
                status: false,
                message: `Unable to save data`
            });
            return;
        } else {
            res.send({
                status: true,
                message: `Added successfully`
            });
        }
    });
};
