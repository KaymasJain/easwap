/**
 * @def First function that is run to load token data onto client side.
 */

function init() {
    
	$.get("/lister/coinsData", function(result) {
            kyberRopstenTokensJSON = result;
            initReserves();
            setTimeout(function(){
                console.log("Done Loading " + kyberRopstenTokenCount + "Tokens");
                updateMainUI(kyberRopstenTokenCount);
            },1000);
		}).fail(function() {
			alert("[ERROR] Token Addresses Not Loaded");
        });
    
}

/**
 * @def Used to grab the current parameters from the url.
 */

function getQueryParam(param) {
    location.search.substr(1)
        .split("&")
        .some(function(item) {
            return item.split("=")[0] == param && (param = item.split("=")[1])
        })
    return param
}

/**
 * @def Determines whether the the coin has a permissionless reserve.
 * @param {Token} required Token data to check.
 */

function isPML(obj) {
	PermissionlessOrderbookReserveLister.reserves(obj.contractAddress, (err, res) => {
		if (err) {
			console.log(err);
		} else {
			if (res != ADD_ZERO) {
				var t1 = new Tok(obj.cmcName, obj.contractAddress, obj.decimals, obj.name, obj.symbol, true, res);
                kyberRopstenTokenList.push(t1);
                kyberRopstenTokenCount+=1;
			} else {
				var t1 = new Tok(obj.cmcName, obj.contractAddress, obj.decimals, obj.name, obj.symbol, false, ADD_ZERO);
                kyberRopstenTokenList.push(t1);
                kyberRopstenTokenCount+=1;
			}
		}
	})
}

/**
 * @def Loads the token data into a client side array.
 */

function initReserves() {
    kyberRopstenTokenList = [];
    kyberRopstenTokenCount = 0;
	var keys = Object.keys(kyberRopstenTokensJSON);
	var tem = 0;
	for (tem = 0; tem < keys.length; tem++) {
		isPML(kyberRopstenTokensJSON[keys[tem]]);
	}
}

/**
 * @def Add orderbook Contract
 * @param {Address} required Coin Address to run function for
 */

function addOrderbookContract(add) {
	PermissionlessOrderbookReserveLister.addOrderbookContract(add, (err, res) => {
		if (err) {
			console.log(err);
		} else {
			console.log(res)
			stage = 1
		}
	})
}

/**
 * @def Init orderbook Contract
 * @param {Address} required Coin Address to run function for
 */

function initOrderbookContract(add) {
	PermissionlessOrderbookReserveLister.initOrderbookContract(add, (err, res) => {
		if (err) {
			console.log(err);
		} else {
			console.log(res)

		}
	})
}

/**
 * @def List orderbook Contract
 * @param {Address} required Coin Address to run function for
 */


function listOrderbookContract(add) {
	PermissionlessOrderbookReserveLister.listOrderbookContract(add, (err, res) => {
		if (err) {
			console.log(err);
		} else {
			console.log(res)

		}
	})
}

/**
 * @def Main function that creates the orderbook from the Token Name
 * @param {CoinSymbol} required Coin Short Name. eg ETH, DAI
 */

function createOrderBook(cmcName) {
    var coinDetails = getTokenDetails(cmcName);
	if (coinDetails) {
		PermissionlessOrderbookReserveLister.addOrderbookContract(coinDetails.contractAddress, (err, res) => {
            if (err) {
                console.log(err);
            } else {
                var payObj = {
                    gas: 4000000
                }
    
                PermissionlessOrderbookReserveLister.initOrderbookContract(coinDetails.contractAddress, payObj, (err, res) => {
                    if (err) {
                        console.log(err);
                    } else {
    
                        var payObj = {
                            gas: 340000
                        }
    
                        PermissionlessOrderbookReserveLister.listOrderbookContract(coinDetails.contractAddress, payObj, (err, res) => {
                            if (err) {
                                console.log(err);
                            } else {
                                console.log(res)
								console.log('all right');
                            }
                        })
                    }
                })
            }
        });
        // checkAllowance(cmcName);
        // updateMainUI();
	} else {
		console.log("Invalid Coin")
    }

	// addOrderbookContract(add);
	// initOrderbookContract(add);
	// listOrderbookContract(add);
}

/**
 * @def Provide Allowance to the Reserve to spend a Coin
 * @param {CoinSymbol} required Coin Short Name. eg ETH, DAI
 */

function provideAllowance(cmcName) {
	var coinDetails = getTokenDetails(cmcName);
	if (coinDetails) {
		var CoinContract = "";
		var etherscanUrl = "https://api-ropsten.etherscan.io/api?module=contract&action=getabi&address=" + coinDetails.contractAddress
		$.getJSON(etherscanUrl, function(result) {
			CoinContract = web3.eth.contract(JSON.parse(result.result));
			var Coin = CoinContract.at(coinDetails.contractAddress);
			Coin.approve(coinDetails.reserveAddress, web3.toWei(10000, 'ether'), (err, res) => {
				if (err) {
					console.log(err);
				} else {
					console.log(res)
					console.log("Done!")
				}
			})
		});
	} else {
		console.log("Invalid Coin")
	}
}

/**
 * @def Main function that checks and provides allowance to the Reserve to spend a Coin
 * @param {CoinSymbol} required Coin Short Name. eg ETH, DAI
 */

function checkAllowance(cmcName) {
    
    // Check if the reserve has the allowance to spend the coin
    
    var coinDetails = getTokenDetails(cmcName);
	if (coinDetails) {
		var CoinContract = "";
		var etherscanUrl = "https://api-ropsten.etherscan.io/api?module=contract&action=getabi&address=" + coinDetails.contractAddress
		$.getJSON(etherscanUrl, function(result) {
			CoinContract = web3.eth.contract(JSON.parse(result.result));
			var Coin = CoinContract.at(coinDetails.contractAddress);
			Coin.allowance(web3.eth.defaultAccount, coinDetails.reserveAddress, (err, res) => {
				if (err) {
					console.log(err);
				} else {
					if (res.c[0] == 0) {
						provideAllowance(cmcName);
					} else {
						console.log("Allowance Already Provided.")
					}
				}
			})
		});
	} else {
		console.log("Invalid Coin.")
    }
    
    // Check if the reserve has the allowance to spend KNC

    coinDetails = getTokenDetails("KNC");
    if (coinDetails) {
		var CoinContract = "";
		var etherscanUrl = "https://api-ropsten.etherscan.io/api?module=contract&action=getabi&address=" + coinDetails.contractAddress
		$.getJSON(etherscanUrl, function(result) {
			CoinContract = web3.eth.contract(JSON.parse(result.result));
			var Coin = CoinContract.at(coinDetails.contractAddress);
			Coin.allowance(web3.eth.defaultAccount, coinDetails.reserveAddress, (err, res) => {
				if (err) {
					console.log(err);
				} else {
					if (res.c[0] == 0) {
						provideAllowance("KNC");
					} else {
						console.log("Allowance Already Provided.")
					}
				}
			})
		});
	} else {
		console.log("Invalid Coin.")
    }

    // and Finally Deposit the fees

    depositKncForFee(cmcName);

}

/**
 * @def Function to deposit KNC for Fee
 * @param {CoinSymbol} required Coin Short Name. eg ETH, DAI
 */

function depositKncForFee(cmcName){
    coinDetails = getTokenDetails(cmcName);
    if (coinDetails) {
		var CoinReserveContract = "";
		var etherscanUrl = "https://api-ropsten.etherscan.io/api?module=contract&action=getabi&address=" + coinDetails.reserveAddress;
		$.getJSON(etherscanUrl, function(result) {
			CoinReserveContract = web3.eth.contract(JSON.parse(result.result));
			var CoinReserve = CoinReserveContract.at(coinDetails.contractAddress);
			CoinReserve.depositKncForFee(web3.eth.defaultAccount, 10000000000000000000000 , (err, res) => {
				if (err) {
					console.log(err);
				} else {
					console.log(res);
				}
			})
		});
	} else {
		console.log("Invalid Coin.")
    }
}

/**
 * @def Add a new token to database.
 * @param {Address} required Coin address to add, eg DAI : 0x89d24a6b4ccb1b6faa2625fe562bdd9a23260359
 */

function addToken(contractAddress){
    var etherscanUrl = "https://api-ropsten.etherscan.io/api?module=account&action=tokentx&contractaddress=" + contractAddress + "&page=1&offset=1" ;

    $.getJSON(etherscanUrl, function(result) {
        var temp = result.result[0];
        var tokenSymbol = temp.tokenSymbol;
        if (!getTokenDetails(temp.tokenSymbol)){
            PermissionlessOrderbookReserveLister.reserves(contractAddress, (err, res) => {
                if (err) {
                    console.log(err);
                } else {
                    if (res != ADD_ZERO) {
                        var t = new Tok(tokenSymbol, contractAddress, temp.tokenDecimal, temp.tokenName, tokenSymbol, true, res);
                        kyberRopstenTokenList.push(t);
						kyberRopstenTokenCount++;
						
                    } else {
                        var t = new Tok(tokenSymbol, contractAddress, temp.tokenDecimal, temp.tokenName, tokenSymbol, false, ADD_ZERO);
                        kyberRopstenTokenList.push(t);
                        kyberRopstenTokenCount++;
                    }
                }
            })
        }
    })
    .fail(function() {
        alert("[ERROR] Invalid Contract");
    });
}

/**
 * @def Function to filter the processed token list to return token data
 * @param {CoinSymbol} required Coin Short Name. eg ETH, DAI
 */

var toFilterName = ""

function filterCmcName(obj) {
	return obj.cmcName == toFilterName;
}

function getTokenDetails(cmcName) {
    toFilterName = cmcName
    if (kyberRopstenTokenList.find(filterCmcName)){
        return kyberRopstenTokenList.find(filterCmcName);
    }
    else{
        return false;
    }
}

/**
 * @def Function to filter the processed token list to return token data
 * @param {Address} required Coin address to add, eg DAI : 0x89d24a6b4ccb1b6faa2625fe562bdd9a23260359
 */

var toFilterContract = ""

function filterContract(obj) {
	return obj.contractAddress == toFilterContract;
}

function getTokenDetailsContract(cont) {
    toFilterContract = cont
    if (kyberRopstenTokenList.find(filterContract)){
        return kyberRopstenTokenList.find(filterContract);
    }
    else{
        return false;
    }
}