const Gas = require('../models/Gas.js');
const request = require('request'),
	rp = require('request-promise');

const slackit = require('../util/slack').shoot;

// const coinMarketKey = process.env.COIN_MARKET_KEY;

var gasError = 0;
var gasSaving = 0;

setInterval(function () {
	try {
		request("https://ethgasstation.info/json/ethgasAPI.json", (err, data) => {
			if (err) {
				console.log(err);
				gasError++;
				if (gasError % 10 == 0) {
					slackit(`Gas from ETHGasStation - ${err}`, "#D50201", false);
				}
			} else {
				try {
					var details = JSON.parse(data.body);
					let gasPrice = new Gas(details);
					Gas.deleteMany({}, function(err, response) {
						if (err) {
							console.log(`Gas Price delete - ${err}`);
						} else {
							gasPrice.save(function (err, updated) {
								if (err) {
									console.log(`Gas Price save - ${err}`);
								}
							});
						}
					});
				} catch (error) {
					gasSaving++;
					if (gasSaving % 10 == 0) {
						slackit(`Gas to database - ${err}`, "#D50201", false);
					} 
				}
			}
		});
	} catch (errr) {
		console.log('gas api');
	}
}, 300000);

// module.exports.init = (app) => {

	// var gasError = 0;
	// var gasSaving = 0;

	// setInterval(function () {
	// 	request("https://ethgasstation.info/json/ethgasAPI.json", (err, data) => {
	// 		if (err) {
	// 			console.log(err);
	// 			gasError++;
	// 			if (gasError % 10 == 0) {
	// 				// slackit('Gas station', `api ethgasstation - ${err}`, 'danger');
	// 			}
	// 		} else {
	// 			try {
	// 				var details = JSON.parse(data.body);
	// 				let gasPrice = new TeleBot(details);
	// 				gasPrice.updateAll(function (err, updated) {
	// 					if (err) {
	// 						console.log(`Gas Price - ${err}`);
	// 					} else {
	// 						'yay'
	// 					}
	// 				});
	// 			} catch (error) {
	// 				gasSaving++;
	// 				if (gasSaving % 10 == 0) {
	// 					// slackit('Gas to database', `Error saving gas price - ${error}`, 'danger');
	// 				} 
	// 			}
	// 		}
	// 	});
	// }, 1500);

	// setInterval(function () {
	// 	db.ref('kyberMain').once('value', function (snapshot) {
	// 		var data = snapshot.val();
	// 		var cmcQuery = "";
	// 		Object.keys(data).forEach(function (key, i) {
	// 			if (key != 'kcc' && key != 'pt') {
	// 				cmcQuery = cmcQuery + data[key].cmcName + ',';
	// 			}
	// 		});
	// 		cmcQuery = cmcQuery.slice(0, -1);
	// 		const requestOptions = {
	// 			method: 'GET',
	// 			uri: 'https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest',
	// 			qs: {
	// 			symbol: cmcQuery
	// 			},
	// 			headers: {
	// 			'X-CMC_PRO_API_KEY': coinMarketKey
	// 			},
	// 			json: true,
	// 			gzip: true
	// 		};
			
	// 		rp(requestOptions).then(response => {
	// 			db.ref('coinmarketprice').set(response.data);
	// 		}).catch((err) => {
	// 			slackit(`CoinMarketCap - ${err}`, "#D50201", false);
	// 		});
	// 	}, function (error) {
	// 		if (error) {
	// 			console.log(error);
	// 		}
	// 	});
	// }, 300000);

// }

// Kyber's API's
// Main API with all addresses - https://tracker.kyber.network/api/tokens/pairs
// Coins main net addreses and coin market cap names of coins - https://tracker.kyber.network/api/tokens/supported
// Coins ropsten net addreses and coin market cap names of coins - https://tracker.kyber.network/api/tokens/supported?chain=ropsten
// Price details of coins - https://tracker.kyber.network/api/tickers
// Kovan coins addresses - https://github.com/KyberNetwork/smart-contracts/blob/master/web3deployment/kovanV2.json