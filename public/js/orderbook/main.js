function init() {
    
	$.getJSON("../public/assets/json/kyberRopsten1.json", function(result) {
            kyberRopstenTokensJSON = result;
            initReserves();
            setTimeout(function(){
                
                console.log("Done Loading " + kyberRopstenTokenCount + "Tokens");
                console.log("Active Coin Name:" + getActiveCoinName());
                getEthToTokenOrderList(getActiveCoinName());
                getTokenToEthOrderList(getActiveCoinName());
                setFunds();
                
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


function getBalance(cmcName){
    var coinDetails = getTokenDetails(cmcName);
    if (coinDetails) {
        if(coinDetails.pml){
            var ReserveContract = "";
            var etherscanUrl = "https://api-ropsten.etherscan.io/api?module=contract&action=getabi&address=" + coinDetails.reserveAddress;
            $.getJSON(etherscanUrl, function(result) {
                ReserveContract = web3.eth.contract(JSON.parse(result.result));
                var Reserve = ReserveContract.at(coinDetails.reserveAddress);

                Reserve.getBalance(coinDetails.contractAddress, web3.eth.defaultAccount, (err, res) => {
                    if (err) {
                        console.log(err);
                    } else {
                        alert(res);
                    }
                })

            });
        }
        else {
            console.log("Not PML");
        }
	} else {
		console.log("Invalid Coin.")
	}
}

/* Eth To Token Functions */
var EthToTokenOrderList = [];
var tokenToUsdResult = 0;

function submitEthToTokenOrder(cmcName, srcAmt, dstAmt){
    if ((web3.fromWei(srcAmt, 'ether') * tokenToUsd("ETH")) > 1000){
        var coinDetails = getTokenDetails(cmcName);
        if (coinDetails) {
            if(coinDetails.pml){
                var ReserveContract = "";
                var etherscanUrl = "https://api-ropsten.etherscan.io/api?module=contract&action=getabi&address=" + coinDetails.reserveAddress;
                $.getJSON(etherscanUrl, function(result) {
                    ReserveContract = web3.eth.contract(JSON.parse(result.result));
                    var Reserve = ReserveContract.at(coinDetails.reserveAddress);

                    Reserve.submitEthToTokenOrder(srcAmt, dstAmt, (err, res) => {
                        if (err) {
                            console.log(err);
                        } else {
                            // console.log(res);
                            EthToTokenOrderListLength = res.length;
                            var ind = 0;
                            for (ind = 0; ind <= EthToTokenOrderListLength; ind++){
                                EthToTokenOrderIndicies.push(res[ind].c[0]);
                            }
                        }
                    })

                });
            }
            else {
                console.log("Not PML");
            }
        } else {
            console.log("Invalid Coin.")
        }   
    }
    else{
        console.log("Source Amount is too Less");
    }
}

function updateEthToTokenOrder(id, cmcName, srcAmt, dstAmt){
    if ((web3.fromWei(srcAmt, 'ether') * tokenToUsd("ETH")) > 1000){
        var coinDetails = getTokenDetails(cmcName);
        if (coinDetails) {
            if(coinDetails.pml){
                var ReserveContract = "";
                var etherscanUrl = "https://api-ropsten.etherscan.io/api?module=contract&action=getabi&address=" + coinDetails.reserveAddress;
                $.getJSON(etherscanUrl, function(result) {
                    ReserveContract = web3.eth.contract(JSON.parse(result.result));
                    var Reserve = ReserveContract.at(coinDetails.reserveAddress);

                    Reserve.updateEthToTokenOrder(id, srcAmt, dstAmt, (err, res) => {
                        if (err) {
                            console.log(err);
                        } else {
                            console.log(res);
                        }
                    })

                });
            }
            else {
                console.log("Not PML");
            }
        } else {
            console.log("Invalid Coin.")
        }   
    }
    else{
        console.log("Source Amount is too Less");
    }
}

function cancelEthToTokenOrder(cmcName, id){
    var coinDetails = getTokenDetails(cmcName);
    if (coinDetails) {
        if(coinDetails.pml){
            var ReserveContract = "";
            var etherscanUrl = "https://api-ropsten.etherscan.io/api?module=contract&action=getabi&address=" + coinDetails.reserveAddress;
            $.getJSON(etherscanUrl, function(result) {
                ReserveContract = web3.eth.contract(JSON.parse(result.result));
                var Reserve = ReserveContract.at(coinDetails.reserveAddress);
                Reserve.cancelEthToTokenOrder(id, (err, res) => {
                    if (err) {
                        console.log(err);
                    } else {
                        console.log(res);
                    }
                })

            });
        }
        else {
            console.log("Not PML");
        }
    } else {
        console.log("Invalid Coin.")
    }  
}

function getEthToTokenOrderList(cmcName){
    var coinDetails = getTokenDetails(cmcName);
    if (coinDetails) {
        if(coinDetails.pml){
            var ReserveContract = "";
            var etherscanUrl = "https://api-ropsten.etherscan.io/api?module=contract&action=getabi&address=" + coinDetails.reserveAddress;

            $.getJSON(etherscanUrl, function(result) {
                ReserveContract = web3.eth.contract(JSON.parse(result.result));
                var Reserve = ReserveContract.at(coinDetails.reserveAddress);

                Reserve.getEthToTokenOrderList((err, res) => {
                    if (err) {
                        console.log(err);
                    } else {
                        // console.log(res);
                        var ind = 0;
                        for (ind = 0; ind <= res.length; ind++){
                            var tempIndex = res[ind].c[0];
                            Reserve.getEthToTokenOrder(res[ind].c[0], (err, res) => {
                                if (err) {
                                    console.log(err);
                                } else {
                                    // console.log(res);
                                    if(res[0] != ADD_ZERO){
                                        var srcAmt = (res[1].c[0] / (10 ** ((res[1].c[0].toString().length) - 1)))  * (10 ** res[1].e)
                                        var destAmt = (res[2].c[0] / (10 ** ((res[2].c[0].toString().length) - 1)))  * (10 ** res[2].e)
                                        var ord = new EthToTokenOrder(res[0], srcAmt, destAmt, tempIndex);
                                        EthToTokenOrderList.push(ord);
                                    }
                                }
                            });
                        }
                    }                 
                })
            });
        }
        else {
            console.log("Not PML");
        }
	} else {
		console.log("Invalid Coin.")
	}
}


/**
 * 
 * Token To Eth Functions
 */


var TokenToEthOrderList = [];

function submitTokenToEthOrder(cmcName, srcAmt, dstAmt){
    if ((web3.fromWei(srcAmt, 'ether') * tokenToUsd("ETH")) > 1000){
        var coinDetails = getTokenDetails(cmcName);
        if (coinDetails) {
            if(coinDetails.pml){
                var ReserveContract = "";
                var etherscanUrl = "https://api-ropsten.etherscan.io/api?module=contract&action=getabi&address=" + coinDetails.reserveAddress;
                $.getJSON(etherscanUrl, function(result) {
                    ReserveContract = web3.eth.contract(JSON.parse(result.result));
                    var Reserve = ReserveContract.at(coinDetails.reserveAddress);

                    Reserve.submitTokenToEthOrder(srcAmt, dstAmt, (err, res) => {
                        if (err) {
                            console.log(err);
                        } else {
                            // console.log(res);
                            TokenToEthOrderListLength = res.length;
                            var ind = 0;
                            for (ind = 0; ind <= TokenToEthOrderListLength; ind++){
                                TokenToEthOrderIndicies.push(res[ind].c[0]);
                            }
                        }
                    })

                });
            }
            else {
                console.log("Not PML");
            }
        } else {
            console.log("Invalid Coin.")
        }   
    }
    else{
        console.log("Source Amount is too Less");
    }
}

function updateTokenToEthOrder(id, cmcName, srcAmt, dstAmt){
    if ((web3.fromWei(srcAmt, 'ether') * tokenToUsd("ETH")) > 1000){
        var coinDetails = getTokenDetails(cmcName);
        if (coinDetails) {
            if(coinDetails.pml){
                var ReserveContract = "";
                var etherscanUrl = "https://api-ropsten.etherscan.io/api?module=contract&action=getabi&address=" + coinDetails.reserveAddress;
                $.getJSON(etherscanUrl, function(result) {
                    ReserveContract = web3.eth.contract(JSON.parse(result.result));
                    var Reserve = ReserveContract.at(coinDetails.reserveAddress);

                    Reserve.updateTokenToEthOrder(id, srcAmt, dstAmt, (err, res) => {
                        if (err) {
                            console.log(err);
                        } else {
                            console.log(res);
                        }
                    })

                });
            }
            else {
                console.log("Not PML");
            }
        } else {
            console.log("Invalid Coin.")
        }   
    }
    else{
        console.log("Source Amount is too Less");
    }
}

function cancelTokenToEthOrder(cmcName, id){
    var coinDetails = getTokenDetails(cmcName);
    if (coinDetails) {
        if(coinDetails.pml){
            var ReserveContract = "";
            var etherscanUrl = "https://api-ropsten.etherscan.io/api?module=contract&action=getabi&address=" + coinDetails.reserveAddress;
            $.getJSON(etherscanUrl, function(result) {
                ReserveContract = web3.eth.contract(JSON.parse(result.result));
                var Reserve = ReserveContract.at(coinDetails.reserveAddress);
                Reserve.cancelTokenToEthOrder(id, (err, res) => {
                    if (err) {
                        console.log(err);
                    } else {
                        console.log(res);
                    }
                })

            });
        }
        else {
            console.log("Not PML");
        }
    } else {
        console.log("Invalid Coin.")
    }  
}

function getTokenToEthOrderList(cmcName){
    var coinDetails = getTokenDetails(cmcName);
    if (coinDetails) {
        if(coinDetails.pml){
            var ReserveContract = "";
            var etherscanUrl = "https://api-ropsten.etherscan.io/api?module=contract&action=getabi&address=" + coinDetails.reserveAddress;

            $.getJSON(etherscanUrl, function(result) {
                ReserveContract = web3.eth.contract(JSON.parse(result.result));
                var Reserve = ReserveContract.at(coinDetails.reserveAddress);

                Reserve.getTokenToEthOrderList((err, res) => {
                    if (err) {
                        console.log(err);
                    } else {
                        // console.log(res);
                        var ind = 0;
                        for (ind = 0; ind <= res.length; ind++){
                            var tempIndex = res[ind].c[0];
                            Reserve.getTokenToEthOrder(res[ind].c[0], (err, res) => {
                                if (err) {
                                    console.log(err);
                                } else {
                                    // console.log(res);
                                    if(res[0] != ADD_ZERO){
                                        var srcAmt = (res[1].c[0] / (10 ** ((res[1].c[0].toString().length) - 1)))  * (10 ** res[1].e)
                                        var destAmt = (res[2].c[0] / (10 ** ((res[2].c[0].toString().length) - 1)))  * (10 ** res[2].e)
                                        var ord = new TokenToEthOrder(res[0], srcAmt, destAmt, tempIndex);
                                        TokenToEthOrderList.push(ord);
                                    }
                                }
                            });
                        }
                    }                 
                })
            });
        }
        else {
            console.log("Not PML");
        }
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

var KncFunds = 0;
var EthFunds = 0;
var TokenFunds = 0;

var tempAddr = "0x73e5c11b416de31f554b7f4db65a7fc5a85e6db4";

function setFunds(){
    getKncFunds();
    getEthFunds();
    getTokenFunds(getActiveCoinName());
}

function getKncFunds(){
    var coinDetails = getTokenDetails(getActiveCoinName());
    if (coinDetails) {
        if(coinDetails.pml){
            var ReserveContract = "";
            var etherscanUrl = "https://api-ropsten.etherscan.io/api?module=contract&action=getabi&address=" + coinDetails.reserveAddress;
            $.getJSON(etherscanUrl, function(result) {
                ReserveContract = web3.eth.contract(JSON.parse(result.result));
                var Reserve = ReserveContract.at(coinDetails.reserveAddress);
                Reserve.makerKnc(tempAddr , (err, res) => {
                    if (err) {
                        console.log(err);   
                    } else {
                        console.log(res);
                        var tempRes = (res.c[0] / (10 ** ((res.c.toString().length) - 1)))  * (10 ** res.e)
                        console.log( "KNC" + " : "+ tempRes);
                        KncFunds = tempRes;
                    }
                })

            });
        }
        else {
            console.log("Not PML");
        }
    } else {
        console.log("Invalid Coin.")
    }  
}

function getEthFunds(){
    var coinDetails = getTokenDetails(getActiveCoinName());
    if (coinDetails) {
        if(coinDetails.pml){
            var ReserveContract = "";
            var etherscanUrl = "https://api-ropsten.etherscan.io/api?module=contract&action=getabi&address=" + coinDetails.reserveAddress;
            $.getJSON(etherscanUrl, function(result) {
                ReserveContract = web3.eth.contract(JSON.parse(result.result));
                var Reserve = ReserveContract.at(coinDetails.reserveAddress);
                Reserve.makerFunds(tempAddr, getTokenDetails("ETH").contractAddress , (err, res) => {
                    if (err) {
                        console.log(err);
                    } else {
                        console.log(res);
                        var tempRes = (res.c[0] / (10 ** ((res.c.toString().length) - 1)))  * (10 ** res.e)
                        console.log( "ETH" + " : "+ tempRes);
                        EthFunds = tempRes;
                    }
                })

            });
        }
        else {
            console.log("Not PML");
        }
    } else {
        console.log("Invalid Coin.")
    }  
}

function getTokenFunds(cmcName){
    var coinDetails = getTokenDetails(getActiveCoinName());
    if (coinDetails) {
        if(coinDetails.pml){
            var ReserveContract = "";
            var etherscanUrl = "https://api-ropsten.etherscan.io/api?module=contract&action=getabi&address=" + coinDetails.reserveAddress;
            $.getJSON(etherscanUrl, function(result) {
                ReserveContract = web3.eth.contract(JSON.parse(result.result));
                var Reserve = ReserveContract.at(coinDetails.reserveAddress);
                Reserve.makerFunds(tempAddr, getTokenDetails(cmcName).contractAddress , (err, res) => {
                    if (err) {
                        console.log(err);
                    } else {
                        console.log(res);
                        var tempRes = (res.c[0] / (10 ** ((res.c.toString().length) - 1)))  * (10 ** res.e)
                        console.log( cmcName + " : "+ tempRes);
                        TokenFunds = tempRes;
                    }
                })

            });
        }
        else {
            console.log("Not PML");
        }
    } else {
        console.log("Invalid Coin.")
    }  
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

function getActiveCoinName(){
    return $('#coinName').text().toUpperCase();
}

function tokenToUsd(cmcName, cur = "USD"){
    var apiUrl = "https://min-api.cryptocompare.com/data/price?fsym=" + cmcName + "&tsyms=" + cur;
    $.getJSON(apiUrl, function(result) {
        console.log(result[cur]);
        tokenToUsdResult = result[cur];
    });
}