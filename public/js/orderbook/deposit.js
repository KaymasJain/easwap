function allowance(coinContract, src, srcAmount, dest, minDestAmount) {
    coinContract.allowance(account, mainKyberAdd, function (err, res) {
        if (!err) {
            if (Number(res) < srcAmount) {
                var payObj = {
                    gasPrice: finalGasInWei
                }
                navAlerts(12);
                approvalEvent(coinContract);
                approve(coinContract, mainKyberAdd, allowanceLimit, payObj, src, srcAmount, dest, minDestAmount);
            } else {
                trade(src, srcAmount, dest, account, minDestAmount, true);
            }
        } else {
            navAlerts(13);
            console.log(err);
        };
    })
}

function depositKncForFee(cmcName){
    coinDetails = getTokenDetails(cmcName);
    if (coinDetails) {
		var CoinReserveContract = "";
		// var etherscanUrl = "https://api-ropsten.etherscan.io/api?module=contract&action=getabi&address=" + coinDetails.reserveAddress;
		// $.getJSON(etherscanUrl, function(result) {
        CoinReserveContract = web3.eth.contract(permissionLessReservesABI);
        var CoinReserve = CoinReserveContract.at(coinDetails.contractAddress);
        CoinReserve.depositKncForFee(account, 10000000000000000000000 , (err, res) => {
            if (err) {
                console.log(err);
                console.log('naah');
            } else {
                console.log('yay');
                console.log(res);
            }
        })
		// });
	} else {
		console.log("Invalid Coin.")
    }
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