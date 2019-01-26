/**
 * @def Determines whether the the coin has a permissionless reserve.
 * @param {Token} required Token data to check.
 */

function isPML(coinData) {
	reserveLister.reserves(coinData.address, (err, res) => {
		if (err) {
			console.log(err);
		} else {
			if (res != ADD_ZERO) {
				var symbolLowercase = (coinData.symbol).toLowerCase();
				dataFilter[symbolLowercase] = {
					"cmcName" : coinData.symbol,
					"contractAddress" : coinData.address,
					"decimals" : coinData.decimals,
					"name" : coinData.name,
					"symbol" : coinData.symbol,
					"reserveAddress" : res
				}
			}
			isPMLCount++;
			if (isPMLCount == apiDataLength) {
				updateDatabase(dataFilter);
			}
		}
	})
}

function reserveListingStage(coinAddress) {
	reserveLister.reserveListingStage(coinAddress, (err, res) => {
		if (err) {
			console.log(err);
		} else {
			startListing(Number(res));
		}
	});
}

/**
 * @def Add orderbook Contract
 * @param {Address} required Coin Address to run function for
 */
function addOrderbookContract(coinAddress) {
	reserveLister.addOrderbookContract(coinAddress, (err, res) => {
		if (err) {
			console.log(err);
		} else {
			console.log(res);
			initOrderbookContract(coinAddress);
		}
	})
}


/**
 * @def Init orderbook Contract
 * @param {Address} required Coin Address to run function for
 */
function initOrderbookContract(coinAddress) {
	var payObj = {
		gas: 4000000
	}
	reserveLister.initOrderbookContract(coinAddress, payObj, (err, res) => {
		if (err) {
			console.log(err);
		} else {
			console.log(res);
			listOrderbookContract(coinAddress);
		}
	})
}


/**
 * @def List orderbook Contract
 * @param {Address} required Coin Address to run function for
 */
function listOrderbookContract(coinAddress) {
	var payObj = {
		gas: 340000
	}
	reserveLister.listOrderbookContract(coinAddress, payObj, (err, res) => {
		if (err) {
			console.log(err);
		} else {
			console.log(res);
		}
	})
}