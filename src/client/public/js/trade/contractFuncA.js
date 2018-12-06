function kyberEnable() {
    mainKyberContract.enabled(function (err, res) {
        if (!err) {
            if (!res && !networkId) {
                if (networkId == 1 || networkId == 3) {
                    navAlerts(15);
                }
            }
        } else {
            navAlerts(16);
            console.log(err);
        };
    });
}

function expectedRateCoinToCoin(coinFrom, coinTo, coinFromDecimal, num) {
    var coinFromNum = 10 ** coinFromDecimal;
    mainKyberContract.getExpectedRate(coinFrom, coinTo, coinFromNum, function (err, res) {
        if (!err) {
            if (num == 1) {
                coinOne.rateInWei = Number(res[0]);
                coinOne.rate = Number(res[0])/10**18;
                $('.coinConversionRate').text(`1 ${coinOne.symbol} = ${coinOne.rate.toFixed(6)} ${coinTwo.symbol}`);
            } else if (num == 2) {
                coinTwo.rateInWei = Number(res[0]);
                coinTwo.rate = Number(res[0])/10**18;
            }
        } else {
            navAlerts(17);
        };
    });
}


function tokenBalance(key) {
    var coinAdd = coinsData[key].contractAddress;
    var coinName = coinsData[key].symbol;
    var coinDecimal = coinsData[key].decimals;
    var coinContract = web3.eth.contract(tokensAbi).at(coinAdd);
    coinContract.balanceOf(account, function (err, res) {
        if (!err) {
            var coinQtyInWei = Number(res);
            var coinQty = coinQtyInWei / 10**coinDecimal;
            var qtyClass = `.${key}Qty`;
            $(qtyClass).text(`QTY: ${coinQty.toFixed(6)}`);
            if (coinQty > 0) {
                $(qtyClass).css('color', 'var(--green)');
            }
        } else {
            alertVar = coinName;
            navAlerts(18);
        };
    });
}

function ethBalance(key) {
    web3.eth.getBalance(account, function (err, res) {
        if (!err) {
            var ethQtyInWei = Number(res);
            var ethQty = ethQtyInWei / 10**18;
            var qtyClass = `.${key}Qty`;
            $(qtyClass).text(`QTY: ${ethQty.toFixed(6)}`);
            if (ethQty > 0) {
                $(qtyClass).css('color','var(--green)');
            }
        } else {
            navAlerts(19);
        };
    });
}

function approve(coinContract, addressToApprove, allowanceLimit, payObj, src, srcAmount, dest, minDestAmount) {
    coinContract.approve(addressToApprove, allowanceLimit, payObj, function (err, res) {
        if (!err) {
            alertVar = res;
            if (networkId == 3) {
                navAlerts(20);
            } else {
                navAlerts(21);
            }
            txArr.push(res);
            approvalEvent(coinContract);
            trade(src, srcAmount, dest, account, minDestAmount, false);
        } else {
            alertVar = err.message;
            navAlerts(22);
        };
    });
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

function startTrade(src, srcAmount, dest, account, minDestAmount, payObj) {
    mainKyberContract.trade(src, srcAmount, dest, account, 2 ** 200, minDestAmount, 0, payObj, function (err, res) {
        if (!err) {
            $.get(`/tradeDeployed?txHash=${res}&net=${networkId}`);
            alertVar = res;
            if (networkId == 3) {
                navAlerts(23);
            } else {
                navAlerts(24);
            }
            txArr.push(res);
        } else {
            alertVar = err.message;
            navAlerts(25);
        };
    });
}

function kyberTradeEvent() {
    mainKyberContract.ExecuteTrade({}, 'latest').watch(function (err, event) {
        if (!err) {
            var eventTx = event.transactionHash;
            if (txArr.includes(eventTx)) {
                if (!event.removed) {
                    navAlerts(26);
                    hideTrade();
                } else {
                    alertVar = err.message;
                    navAlerts(27);
                }
            }
        }
    });
}