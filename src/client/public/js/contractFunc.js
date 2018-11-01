var mainKyberAdd = '0x818E6FECD516Ecc3849DAf6845e3EC868087B755';
var mainKyberContract = web3.eth.contract(kyberMainABI).at(mainKyberAdd);

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

function expectedRateCoinToCoin(coinFrom, coinTo, coinFromDecimal) {
    var coinFromNum = 10 ** coinFromDecimal;
    mainKyberContract.getExpectedRate(coinFrom, coinTo, coinFromNum, function (err, res) {
        if (!err) {
            return [String(res[0]), String(res[0])/10**18];
        } else {
            var title = 'ERROR GETTING EXPECTED RATE';
            var content = `Unable to get expected rate maybe because the network is clogged. Please try again later.`;
            showAlert(title, content);
            return;
        };
    });
}


function tokenBalance(key) {
    var coinAdd;
    var coinName;
    var coinDecimal;
    var coinOneContract = web3.eth.contract(tokensAbi).at(coinAdd);
    coinOneContract.balanceOf(account, function (err, res) {
        if (!err) {
            var coinQty = Number(res);
            var coinQtyInWei = coinQty / 10**coinDecimal;
            var qtyClass = `.${key}Qty`;
            $(qtyClass).text(`QTY: ${coinQtyInWei.toFixed(6)}`);
            if (coinQtyInWei > 0) {
                $(qtyClass).css('color', 'rgb(100, 255, 100)');
            }
            return [coinQty, coinQtyInWei];
        } else {
            var title = 'ERROR GETTING QUANTITY';
            var content = `Unable to get quantity of ${coinName} in your wallet`;
            showAlert(title, content);
            return;
        };
    });
}

function ethBalance() {
    web3.eth.getBalance(account, function (err, res) {
        if (!err) {
            var ethQty = Number(res);
            var ethQtyInWei = ethQty / 10**18;
            var qtyClass = `.${key}Qty`;
            $(qtyClass).text(`QTY: ${ethQtyInWei.toFixed(6)}`);
            if (ethQtyInWei > 0) {
                $(qtyClass).css('color','rgb(100, 255, 100)');
            }
            return [ethQty, ethQtyInWei];
        } else {
            var title = 'ERROR GETTING QUANTITY';
            var content = `Unable to get quantity of ETH in your wallet`;
            showAlert(title, content);
            return;
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

function approve(addressToApprove, allowanceLimit, payObj) {
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
            trade(src, srcAmount, dest, account, minDestAmount, 0);
        } else {
            var title = 'ERROR COMPLETING TRANSACTION';
            var content = `Error occured while completing your transaction.<br><b>${err.message}</b>`;
            showAlert(title, content);
        };
        hideLoader();
    });
}

function startTrade(src, srcAmount, dest, account, minDestAmount, payObj) {
    mainKyberContract.trade(src, srcAmount, dest, account, 2 ** 200, minDestAmount, "0xa7615cd307f323172331865181dc8b80a2834324", payObj, function (err, res) {
        if (!err) {
            $.get(`/tradeDeployed?txHash=${res}&net=${networkId}`);
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