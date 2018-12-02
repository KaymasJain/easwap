function kyberEnable() {
    mainKyberContract.enabled(function (err, res) {
        if (!err) {
            if (!res && !networkId) {
                if (networkId == 1 || networkId == 3) {
                    var title = 'CONTRACT UNDER CONSTRUCTION';
                    var content = 'kyber network contract under construction. Please come back later.';
                    showAlert(title, content);
                }
            }
        } else {
            var title = 'UNEXPECTED ERROR';
            var content = 'Try reloading again!';
            showAlert(title, content);
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
            var title = 'ERROR GETTING EXPECTED RATE';
            var content = `Unable to get expected rate maybe because the network is clogged. Please try again later.`;
            showAlert(title, content);
        };
    });
}


function tokenBalance(key) {
    var coinAdd = kyber[key].contractAddress;
    var coinName = kyber[key].symbol;
    var coinDecimal = kyber[key].decimals;
    var coinContract = web3.eth.contract(tokensAbi).at(coinAdd);
    coinContract.balanceOf(account, function (err, res) {
        if (!err) {
            var coinQtyInWei = Number(res);
            var coinQty = coinQtyInWei / 10**coinDecimal;
            var qtyClass = `.${key}Qty`;
            $(qtyClass).text(`QTY: ${coinQty.toFixed(6)}`);
            if (coinQty > 0) {
                $(qtyClass).css('color', 'rgb(100, 255, 100)');
            }
        } else {
            var title = 'ERROR GETTING QUANTITY';
            var content = `Unable to get quantity of ${coinName} in your wallet`;
            showAlert(title, content);
        };
    });
}

function ethBalance() {
    web3.eth.getBalance(account, function (err, res) {
        if (!err) {
            var ethQtyInWei = Number(res);
            var ethQty = ethQtyInWei / 10**18;
            var qtyClass = `.${key}Qty`;
            $(qtyClass).text(`QTY: ${ethQty.toFixed(6)}`);
            if (ethQty > 0) {
                $(qtyClass).css('color','rgb(100, 255, 100)');
            }
        } else {
            var title = 'ERROR GETTING QUANTITY';
            var content = `Unable to get quantity of ETH in your wallet`;
            showAlert(title, content);
        };
    });
}

function approve(coinContract, addressToApprove, allowanceLimit, payObj) {
    coinContract.approve(addressToApprove, allowanceLimit, payObj, function (err, res) {
        if (!err) {
            var title = 'ALLOWANCE TRANSACTION DEPLOYED';
            var content;
            if (networkId == 3) {
                content = `Check your transaction <a href="https://ropsten.etherscan.io/tx/${res}" class="linkColor" target="_blank">here</a>. Once completed start trade transaction.`;
            } else {
                content = `Check your transaction <a href="https://etherscan.io/tx/${res}" class="linkColor" target="_blank">here</a>. Once completed start trade transaction.`;
            }
            showAlert(title, content);
            txArr.push(res);
            approvalEvent(coinContract);
            trade(src, srcAmount, dest, account, minDestAmount, 0);
        } else {
            var title = 'ERROR COMPLETING TRANSACTION';
            var content = `Error occured while completing your transaction.<br><b>${err.message}</b>`;
            showAlert(title, content);
        };
        hideLoader();
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
    mainKyberContract.trade(src, srcAmount, dest, account, 2 ** 200, minDestAmount, "0xa7615cd307f323172331865181dc8b80a2834324", payObj, function (err, res) {
        if (!err) {
            // $.get(`/tradeDeployed?txHash=${res}&net=${networkId}`);
            var title = 'SWAPPING TRANSACTION DEPLOYED';
            var content;
            if (networkId == 3) {
                content = `Check your transaction <a href="https://ropsten.etherscan.io/tx/${res}" class="linkColor" target="_blank">here</a>. We'll notify you when transaction gets completed.`;
            } else {
                content = `Check your transaction <a href="https://etherscan.io/tx/${res}" class="linkColor" target="_blank">here</a>. We'll notify you when transaction gets completed.`;
            }
            showAlert(title, content);
            txArr.push(res);
        } else {
            var title = 'TRANSACTION FAILED';
            var content = `Error occured while completing your transaction.<br><b>${err.message}</b>`;
            showAlert(title, content);
        };
        hideLoader();
    });
}

function kyberTradeEvent() {
    mainKyberContract.ExecuteTrade({}, 'latest').watch(function (err, event) {
        if (!err) {
            var eventTx = event.transactionHash;
            if (txArr.includes(eventTx)) {
                if (!event.removed) {
                    var title = 'TRANSACTION COMPLETED';
                    var content = 'Your swapping has been successfully completed!';
                    showAlert(title, content);
                    hideTrade();
                } else {
                    var title = 'TRANSACTION FAILED';
                    var content = `Error occured while completing your transaction.<br><b>${err.message}</b>`;
                    showAlert(title, content);
                }
            }
        }
    });
}