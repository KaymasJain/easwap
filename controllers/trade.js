const Gas = require('../models/Gas.js');
const request = require('request'),
	rp = require('request-promise');

const slackit = require('../util/slack').shoot;

const coinMarketKey = process.env.COIN_MARKET_KEY;

exports.kyberMain = (req, res) => {
    request('https://tracker.kyber.network/api/tokens/supported', (err, respond, data) => {
		if (err) {
			console.log(err);
			slackit.sendNotification('Kyber Api', `Main network details - ${err}`, 'danger');
		} else {
            console.log(1234567876543);
            var details = JSON.parse(data);
			var objectData = {};
			for (i = 0; i < details.length; i++) {
				var toLower = details[i].symbol.toLowerCase();
				objectData[toLower] = details[i];
            }
            res.send(objectData);
		}
	});
};

exports.kyberRops = (req, res) => {
    request('https://tracker.kyber.network/api/tokens/supported', (err, respond, data) => {
		if (err) {
			console.log(err);
			slackit.sendNotification('Kyber Api', `Main network details - ${err}`, 'danger');
		} else {
			var details = JSON.parse(data);
			var objectData = {};
			for (i = 0; i < details.length; i++) {
				var toLower = details[i].symbol.toLowerCase();
				objectData[toLower] = details[i];
            }
            res.send(objectData);            
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

module.exports.init = (app) => {

	var db = app.locals.db;
	request('https://tracker.kyber.network/api/tokens/pairs', (err, respond, data) => {
		if (err) {
			console.log(err);
			slackit.sendNotification('Kyber Api', `Api with many details - ${err}`, 'danger');
		} else {
			var details = JSON.parse(data);
			// db.ref('kyberData').set(details);
		}
	});

	request('https://tracker.kyber.network/api/tokens/supported', (err, respond, data) => {
		if (err) {
			console.log(err);
			slackit.sendNotification('Kyber Api', `Main network details - ${err}`, 'danger');
		} else {
			var details = JSON.parse(data);
			var objectData = {};
			for (i = 0; i < details.length; i++) {
				var toLower = details[i].symbol.toLowerCase();
				objectData[toLower] = details[i];
			}
			// db.ref('kyberMain').set(objectData);
		}
	});

	request('https://tracker.kyber.network/api/tokens/supported?chain=ropsten', (err, respond, data) => {
		if (err) {
			console.log(err);
			slackit.sendNotification('Kyber Api', `Ropsten network details - ${err}`, 'danger');
		} else {
			var details = JSON.parse(data);
			var objectData = {};
			for (i = 0; i < details.length; i++) {
				var toLower = details[i].symbol.toLowerCase();
				objectData[toLower] = details[i];
			}
			// db.ref('kyberRops').set(objectData);
		}
	});

	var gasError = 0;
	var gasSaving = 0;

	setInterval(function () {
		request("https://ethgasstation.info/json/ethgasAPI.json", (err, data) => {
			if (err) {
				console.log(err);
				gasError++;
				if (gasError % 10 == 0) {
					// slackit.sendNotification('Gas station', `api ethgasstation - ${err}`, 'danger');
				}
			} else {
				try {
					var details = JSON.parse(data.body);
					// db.ref('gas').set(details);
				} catch (error) {
					gasSaving++;
					if (gasSaving % 10 == 0) {
						// slackit.sendNotification('Gas to database', `Error saving gas price - ${error}`, 'danger');
					} 
				}
			}
		});
	}, 15000);

	setInterval(function () {
		db.ref('kyberMain').once('value', function (snapshot) {
			var data = snapshot.val();
			var cmcQuery = "";
			Object.keys(data).forEach(function (key, i) {
				if (key != 'kcc' && key != 'pt') {
					cmcQuery = cmcQuery + data[key].cmcName + ',';
				}
			});
			cmcQuery = cmcQuery.slice(0, -1);
			const requestOptions = {
				method: 'GET',
				uri: 'https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest',
				qs: {
				symbol: cmcQuery
				},
				headers: {
				'X-CMC_PRO_API_KEY': coinMarketKey
				},
				json: true,
				gzip: true
			};
			
			rp(requestOptions).then(response => {
				// db.ref('coinmarketprice').set(response.data);
			}).catch((err) => {
				slackit.sendNotification('CoinMarketCap', `CoinMarketCap - ${err}`, 'danger');
			});
		}, function (error) {
			if (error) {
				console.log(error);
			}
		});
	}, 300000);

}