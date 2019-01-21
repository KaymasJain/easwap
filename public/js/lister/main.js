function init() {
    
	$.getJSON("../public/assets/json/kyberRopsten.json", function(result) {
            kyberRopstenTokensJSON = result;
            initReserves();
            setTimeout(function(){
                console.log("Done Loading " + kyberRopstenTokenCount + "Tokens");
                updateMainUI(kyberRopstenTokenCount);
            },1000);
		})
		.fail(function() {
			alert("[ERROR] Token Addresses Not Loaded");
        });
    
}

function getQueryParam(param) {
    location.search.substr(1)
        .split("&")
        .some(function(item) {
            return item.split("=")[0] == param && (param = item.split("=")[1])
        })
    return param
}


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


function initReserves() {
    kyberRopstenTokenList = [];
    kyberRopstenTokenCount = 0;
	var keys = Object.keys(kyberRopstenTokensJSON);
	var tem = 0;
	for (tem = 0; tem < keys.length; tem++) {
		isPML(kyberRopstenTokensJSON[keys[tem]]);
	}
}

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

function initOrderbookContract(add) {
	PermissionlessOrderbookReserveLister.initOrderbookContract(add, (err, res) => {
		if (err) {
			console.log(err);
		} else {
			console.log(res)

		}
	})
}

function listOrderbookContract(add) {
	PermissionlessOrderbookReserveLister.listOrderbookContract(add, (err, res) => {
		if (err) {
			console.log(err);
		} else {
			console.log(res)

		}
	})
}

function createOrderBook(cmcName) {
    var coinDetails = getTokenDetails(cmcName);
	if (coinDetails) {
		PermissionlessOrderbookReserveLister.addOrderbookContract(coinDetails.contractAddress, (err, res) => {
            if (err) {
                console.log(err);
            } else {
                var payObj = {
                    gasPrice: 750000
                }
    
                PermissionlessOrderbookReserveLister.initOrderbookContract(coinDetails.contractAddress, payObj, (err, res) => {
                    if (err) {
                        console.log(err);
                    } else {
    
                        var payObj = {
                            gasPrice: 750000
                        }
    
                        PermissionlessOrderbookReserveLister.listOrderbookContract(coinDetails.contractAddress, payObj, (err, res) => {
                            if (err) {
                                console.log(err);
                            } else {
                                console.log(res)
    
                            }
                        })
                    }
                })
            }
        });
        checkAllowance(cmcName);
        updateMainUI();
	} else {
		console.log("Invalid Coin")
    }

	// addOrderbookContract(add);
	// initOrderbookContract(add);
	// listOrderbookContract(add);
}


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