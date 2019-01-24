function allowance(coinDetails, coinContract, amount, num) {
    coinContract.allowance(account, coinDetails.contractAddress, function (err, res) {
        if (!err) {
            if (Number(res) < amount) {

            } else {
            }
        } else {
            console.log(err);
        };
    });
}

function depositKncForFee(cmcName, amount) {
    coinDetails = getTokenDetails(cmcName);
    if (coinDetails) {
        var CoinReserve = web3.eth.contract(permissionLessReservesABI).at(coinDetails.contractAddress);
        coinContract.allowance(account, coinDetails.contractAddress, function (err, res) {
            if (!err) {
                if (Number(res) < amount) {
                    coinContract.approve(addressToApprove, allowanceLimit, function (err, res) {
                        if (!err) {
                            console.log(err);
                        } else {
                            console.log('approve event started');
                        };
                    });
                } else {
                    CoinReserve.depositKncForFee(account, amount, (err, res) => {
                        if (err) {
                            console.log(err);
                            console.log('naah');
                        } else {
                            runKncForFee(coinDetails);
                            console.log('yay');
                            console.log(res);
                        }
                    })
                }
            } else {
                console.log(err);
            };
        });
	} else {
		console.log("Invalid Coin.")
    }
}

function approvalEvent(coinContract) {
    coinContract.Approval({}, 'latest').watch(function (err, event) {
        if (!err) {
            var eventTx = event.transactionHash;
            if (txArr.includes(eventTx)) {
                if (!event.removed) {
                    console.log('approved transaction completed');
                } else {
                    console.log('Transaction Removed from blockchain');
                }
            }
        }
    });
}

// function depositKncForFee(cmcName){
//     coinDetails = getTokenDetails(cmcName);
//     if (coinDetails) {
// 		var CoinReserveContract = "";
// 		// var etherscanUrl = "https://api-ropsten.etherscan.io/api?module=contract&action=getabi&address=" + coinDetails.reserveAddress;
// 		// $.getJSON(etherscanUrl, function(result) {
//         CoinReserveContract = web3.eth.contract(permissionLessReservesABI);
//         var CoinReserve = CoinReserveContract.at(coinDetails.contractAddress);
//         CoinReserve.depositKncForFee(web3.eth.defaultAccount, 10000000000000000000000 , (err, res) => {
//             if (err) {
//                 console.log(err);
//             } else {
//                 console.log(res);
//             }
//         })
// 		// });
// 	} else {
// 		console.log("Invalid Coin.")
//     }
// }

// function depositKncForFee(cmcName){
//     coinDetails = getTokenDetails(cmcName);
//     if (coinDetails) {
// 		var CoinReserveContract = "";
// 		// var etherscanUrl = "https://api-ropsten.etherscan.io/api?module=contract&action=getabi&address=" + coinDetails.reserveAddress;
// 		// $.getJSON(etherscanUrl, function(result) {
//         CoinReserveContract = web3.eth.contract(permissionLessReservesABI);
//         var CoinReserve = CoinReserveContract.at(coinDetails.contractAddress);
//         CoinReserve.depositKncForFee(web3.eth.defaultAccount, 10000000000000000000000 , (err, res) => {
//             if (err) {
//                 console.log(err);
//             } else {
//                 console.log(res);
//             }
//         })
// 		// });
// 	} else {
// 		console.log("Invalid Coin.")
//     }
// }