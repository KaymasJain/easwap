// Only FOR TEAM USE

function updateDatabase(dataToStore) {
	var objectToSend = {
		'secret': secretToStore,
		'listedCoins': dataToStore // object of tokens
	}
	$.ajax({
		url: "/lister/update",
		type: 'POST',
		contentType:'application/json',
		data: JSON.stringify(objectToSend),
        dataType:'json',
        success: function (data) { 
            console.log(data);
        }
	});
	alert('saved');
}

function getJSON(secret) {
	secretToStore = secret;
	var forTimeout = 1;
	$.get(reservesAPI, function(result) {
		var data = result.data;
		apiDataLength = data.length;
		Object.keys(data).forEach(function (key, i) {
			if (data[key].symbol) {
				isPML(data[key]);
			} else {
				var etherscanTokenAPI = `https://${etherscanAPI}/api?module=account&action=tokentx&contractaddress=${data[key].address}&page=1&offset=1`;
				setTimeout(function() {
					$.get(etherscanTokenAPI, function(result) {
						var data = result.result[0];
						var coinData = {
							"address" : data.contractAddress,
							"decimals" : data.tokenDecimal,
							"name" : data.tokenName,
							"symbol" : data.tokenSymbol
						}
						isPML(coinData);
					}).fail(function() {
						console.log("[ERROR] Token Addresses Not Loaded");
					});
				}, forTimeout);
				forTimeout = forTimeout + 200;
			}
		});
	}).fail(function() {
		alert("[ERROR] Token Addresses Not Loaded");
	});
}