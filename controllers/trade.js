const Gas = require('../models/Gas.js');
const request = require('request'),
	rp = require('request-promise');

const List = require('../models/List.js');
const ListRops = require('../models/ListRops.js');
const Trade = require('../models/Trade.js');
const TradeRops = require('../models/TradeRops.js');

const slackit = require('../util/slack').shoot;

// const coinMarketKey = process.env.COIN_MARKET_KEY;

exports.update = (req, res) => {
	if (req.query.secret != process.env.UPDATE_DATA_SECRET) {
		return res.send({
			status: false,
			data: "wrong secret phrase"
		})
	}
	var reservesAPI = "api";
	var modelTrade = Trade;
	var modelLister = List;
	if (req.query.ropsten) {
		reservesAPI = "ropsten-api";
		modelTrade = TradeRops;
		modelLister = ListRops;
	}
	var apiData = `https://${reservesAPI}.kyber.network/currencies?only_official_reserve=false`;
    request(apiData, (err, respond, data) => {
		if (err) {
			console.log(err);
			slackit(`Kyber Ropsten API - ${err}`, "#D50201", false);
		} else {
			modelTrade.deleteMany({}, function(err, response) {
				if (err) {
					console.log(`Coins data delete - ${err}`);
				} else {
					var coinsData = JSON.parse(data);
					coinsData = coinsData.data;
					var num = 0;
					Object.keys(coinsData).forEach(function (key, i) {
						if (coinsData[key].symbol) {
							let TradeToken = new modelTrade({
								cmcName: coinsData[key].symbol,
								contractAddress: coinsData[key].address,
								decimals: coinsData[key].decimals,
								name: coinsData[key].name,
								symbol: coinsData[key].symbol
							});
							TradeToken.save(function (err, updated) {
								if (err) {
									console.log(`error updating trade Coins data - ${err}`);
									res.send({
										status: false,
										message: `Unable to save data`
									});
									return;
								}
								num++;
								console.log(num);
							});
						} else {
							modelLister.findOne({
								contractAddress : coinsData[key].address
							}, function(err, response) {
								if (err) {
									console.log(`Unable to find data - ${err}`);
									res.send({
										status: false,
										message: `Unable to find data`
									});
									return;
								} else {
									if (response) {
										var symbol = response.symbol;
										if (symbol.includes('.')) {
											return;
										}
										let TradeToken = new modelTrade({
											cmcName: response.symbol,
											contractAddress: response.contractAddress,
											decimals: response.decimals,
											name: response.name,
											symbol: response.symbol
										});
										TradeToken.save(function (err, updated) {
											if (err) {
												console.log(`error updating trade Coins data - ${err}`);
												res.send({
													status: false,
													message: `Unable to save data`
												});
												return;
											}
											num++;
											console.log(num);
										});
									}
								}
							});
						}
					});
					res.send({
						success: true
					})
				}
			});
		}
	});
};


exports.tradeData = (req, res) => {
	var modelTrade = Trade;
    if (req.query.ropsten) {
        modelTrade = TradeRops;
    }
    modelTrade.find({}, function(err, response) {
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
				var symbolLowercase = response[key].symbol.toLowerCase();
                objectToSend[symbolLowercase] = response[key];
            });
			res.send(objectToSend);
			res.end();
        }
    });
};

exports.gas = (req, res) => {
    Gas.find({}, function(err, response) {
        if (err) {
            console.log(err);
        } else {
            res.send(response[0]);
        }
    });
};

exports.tradeHash = (req, res) => {
    let hash = req.query.txHash;
	let networkID = req.query.net;
	if (networkID == 1) {
		let text = `Mainnet Swap - https://etherscan.io/tx/${hash}`;
		slackit(text, "#2EA44E", false);
	} else {
		let text = `Ropsten Swap - https://ropsten.etherscan.io/tx/${hash}`;
		slackit(text, "#2EA44E", false);
	}
	res.end();
};

// module.exports.init = (app) => {

// 	var db = app.locals.db;
// 	request('https://tracker.kyber.network/api/tokens/pairs', (err, respond, data) => {
// 		if (err) {
// 			console.log(err);
// 			slackit(`Kyber API - ${err}`, "#D50201", false);
// 		} else {
// 			var details = JSON.parse(data);
// 			// db.ref('kyberData').set(details);
// 		}
// 	});

// 	request('https://tracker.kyber.network/api/tokens/supported', (err, respond, data) => {
// 		if (err) {
// 			console.log(err);
// 			slackit(`Kyber Mainnet API - ${err}`, "#D50201", false);
// 		} else {
// 			var details = JSON.parse(data);
// 			var objectData = {};
// 			for (i = 0; i < details.length; i++) {
// 				var toLower = details[i].symbol.toLowerCase();
// 				objectData[toLower] = details[i];
// 			}
// 			// db.ref('kyberMain').set(objectData);
// 		}
// 	});

// 	request('https://tracker.kyber.network/api/tokens/supported?chain=ropsten', (err, respond, data) => {
// 		if (err) {
// 			console.log(err);
// 			slackit(`Kyber Ropsten API - ${err}`, "#D50201", false);
// 		} else {
// 			var details = JSON.parse(data);
// 			var objectData = {};
// 			for (i = 0; i < details.length; i++) {
// 				var toLower = details[i].symbol.toLowerCase();
// 				objectData[toLower] = details[i];
// 			}
// 			// db.ref('kyberRops').set(objectData);
// 		}
// 	});

// 	var gasError = 0;
// 	var gasSaving = 0;

// 	setInterval(function () {
// 		request("https://ethgasstation.info/json/ethgasAPI.json", (err, data) => {
// 			if (err) {
// 				console.log(err);
// 				gasError++;
// 				if (gasError % 10 == 0) {
// 					// slackit('Gas station', `api ethgasstation - ${err}`, 'danger');
// 				}
// 			} else {
// 				try {
// 					var details = JSON.parse(data.body);
// 					// db.ref('gas').set(details);
// 				} catch (error) {
// 					gasSaving++;
// 					if (gasSaving % 10 == 0) {
// 						// slackit('Gas to database', `Error saving gas price - ${error}`, 'danger');
// 					} 
// 				}
// 			}
// 		});
// 	}, 15000);

// 	setInterval(function () {
// 		db.ref('kyberMain').once('value', function (snapshot) {
// 			var data = snapshot.val();
// 			var cmcQuery = "";
// 			Object.keys(data).forEach(function (key, i) {
// 				if (key != 'kcc' && key != 'pt') {
// 					cmcQuery = cmcQuery + data[key].cmcName + ',';
// 				}
// 			});
// 			cmcQuery = cmcQuery.slice(0, -1);
// 			const requestOptions = {
// 				method: 'GET',
// 				uri: 'https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest',
// 				qs: {
// 				symbol: cmcQuery
// 				},
// 				headers: {
// 				'X-CMC_PRO_API_KEY': coinMarketKey
// 				},
// 				json: true,
// 				gzip: true
// 			};
			
// 			rp(requestOptions).then(response => {
// 				// db.ref('coinmarketprice').set(response.data);
// 			}).catch((err) => {
// 				slackit('CoinMarketCap', `CoinMarketCap - ${err}`, 'danger');
// 			});
// 		}, function (error) {
// 			if (error) {
// 				console.log(error);
// 			}
// 		});
// 	}, 300000);

// }