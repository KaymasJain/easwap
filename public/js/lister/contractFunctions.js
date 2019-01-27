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
			navAlerts(6);
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
			updateListedToken(coinAddress);
			txArr.push(res);
			isListedEvent();
		}
	})
}
// TokenOrderbookListingStage
function isListedEvent() {
	reserveLister.TokenOrderbookListingStage({}, 'latest').watch(function (err, event) {
        if (!err) {
            var eventTx = event.transactionHash;
            if (txArr.includes(eventTx)) {
                if (!event.removed) {
					navAlerts(11);
                    console.log('Token successfully listed transaction completed');
                } else {
                    console.log('Transaction Removed from blockchain');
                }
            }
        }
    });
}

// https://api-ropsten.etherscan.io/api?module=account&action=tokentx&contractaddress=0x4E470dc7321E84CA96FcAEDD0C8aBCebbAEB68C6&page=1&offset=1