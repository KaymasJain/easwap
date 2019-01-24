// Balance of KNC and COIN that user has deposited
function getBalance(coinAddress, coinSymbol) {
    coinPmlContract.getBalance(coinAddress, account, (err, res) => {
        if (err) {
            console.log(err);
        } else {
            if (coinSymbol == "KNC") {
                KncDetails.balanceInWei = Number(res);
                KncDetails.balance = Number(res)/(10**KncDetails.decimals);
            } else {
                coinDetails.balanceInWei = Number(res);
                coinDetails.balance = Number(res)/(10**coinDetails.decimals);
            }
        }
    });
}

function ethBalance() {
    web3.eth.getBalance(account, function (err, res) {
        if (!err) {
            EthDetails.balanceInWei = Number(res);
            EthDetails.balance = Number(res)/(10**18);
        } else {
            console.error(err);
        };
    });
}

function checkAllowance(coinContract, coinSymbol) {
    coinContract.allowance(account, ADD_coinPmlContract, function (err, res) {
        if (!err) {
            if (coinSymbol == "KNC") {
                console.log(`KNC : ${Number(res)}`);
                KncDetails.allowance = Number(res);
            } else {
                console.log(`COIN : ${Number(res)}`);
                coinDetails.allowance = Number(res);
            }
        } else {
            console.log(err);
        };
    })
}

function approve(coinContract, coinSymbol) {
    coinContract.approve(ADD_coinPmlContract, 2**250, function (err, res) {
        if (!err) {
            if (coinSymbol == "KNC") {
                console.log(`${coinSymbol} - Approve`);
            } else {
                console.log(`${coinSymbol} - Approve`);
            }
            txArr.push(res);
            approvalEvent(coinContract);
        } else {
            alertVar = err.message;
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

function depositEther(amount) {
    var payObj = {
        value: amount
    }
    coinPmlContract.depositEther(account, payObj, (err, res) => {
        if (err) {
            console.log(err);
        } else {
            console.log('Deposit Ether transaction');
        }
    });
}

function withdrawEther(amount) {
    coinPmlContract.withdrawEther(amount, (err, res) => {
        if (err) {
            console.log(err);
        } else {
            console.log('Withdraw Ether transaction');
        }
    });
}

function depositKnc(amount) {
    if (KncDetails.allowance < amount) {
        approve(KncERC20Contract, KncDetails.symbol);
        console.log('confirm approve firstt');
    } else {
        coinPmlContract.depositKncForFee(account, amount, (err, res) => {
            if (err) {
                console.log(err);
            } else {
                console.log('Deposit KNC transaction');
            }
        });
    }
}

function withdrawKnc(amount) {
    coinPmlContract.withdrawKncFee(amount, (err, res) => {
        if (err) {
            console.log(err);
        } else {
            console.log('Withdraw KNC transaction');
        }
    })
}

function depositCoin(amount) {
    if (KncDetails.allowance < amount) {
        approve(CoinERC20Contract, coinDetails.symbol);
        console.log('confirm approve first');
    } else {
        coinPmlContract.depositToken(account, amount, (err, res) => {
            if (err) {
                console.log(err);
            } else {
                console.log('Deposit Coin transaction');
            }
        });
    }
}

function withdrawKnc(amount) {
    coinPmlContract.withdrawToken(amount, (err, res) => {
        if (err) {
            console.log(err);
        } else {
            console.log('Withdraw Coin transaction');
        }
    });
}

function makerFunds(coinAddress, coinSymbol) {
    coinPmlContract.makerFunds(account, coinAddress, (err, res) => {
        if (err) {
            console.log(err);
        } else {
            if (coinSymbol == "ETH") {
                EthDetails.fundsInWei = Number(res);
                EthDetails.funds = Number(res)/(10**18);
                console.log(`User ETH Funds - ${EthDetails.funds}`);
                $('#ethUnlocked').text(EthDetails.funds);
            } else {
                coinDetails.fundsInWei = Number(res);
                coinDetails.funds = Number(res)/(10**coinDetails.decimals);
                console.log(`User Coin Funds - ${coinDetails.funds}`);
                $('#tokenUnlocked').text(coinDetails.funds);
            }
        }
    });
}

function makerKnc() {
    coinPmlContract.makerKnc(account, (err, res) => {
        if (err) {
            console.log(err);
        } else {
            KncDetails.fundsInWei = Number(res);
            KncDetails.funds = Number(res)/(10**18);
            console.log(`User KNC Funds - ${KncDetails.funds}`);
            $('#kncUnlocked').text(KncDetails.funds);
        }
    });
}


// ETH to Token orders

function submitEthToCoinOrder(srcAmt, dstAmt) {
    coinPmlContract.submitEthToTokenOrder(srcAmt, dstAmt, (err, res) => {
        if (err) {
            console.log(err);
        } else {
            console.log(res);
        }
    })
}

function updateEthToCoinOrder(id, srcAmt, dstAmt) {
    coinPmlContract.updateEthToTokenOrder(id, srcAmt, dstAmt, (err, res) => {
        if (err) {
            console.log(err);
        } else {
            console.log(res);
        }
    })
}

function cancelEthToCoinOrder(id) {
    coinPmlContract.cancelEthToTokenOrder(id, (err, res) => {
        if (err) {
            console.log(err);
        } else {
            console.log(res);
        }
    });
}

function getEthToCoinMakerOrders() {
    coinPmlContract.getEthToTokenMakerOrderIds(account, (err, res) => {
        if (err) {
            console.log(err);
        } else {
            // console.log(res);
            if (res.length > 0) {
                $('#ethToTokenOrdersTitle').css('display', 'block');
            }
            for (i = 0; i < res.length; i++) {
                console.log(res[i].c[0]);
                getEthToCoinOrderById(res[i].c[0]);
            }
        }
    });
}

function getEthToCoinOrderById(id) {
    coinPmlContract.getEthToTokenOrder(id, (err, res) => {
        if (err) {
            console.log(err);
        } else {
            console.log(res);
        }
    });
}

function getEthToCoinOrder() {
    coinPmlContract.getEthToTokenOrderList((err, res) => {
        if (err) {
            console.log(err);
        } else {
            for (i = 0; i < res.length; i++) {
                console.log(res[i].c[0]);
            }
        }
    })
}


// Token to ETH orders

function submitCoinToEthOrder(srcAmt, dstAmt) {
    coinPmlContract.submitTokenToEthOrder(srcAmt, dstAmt, (err, res) => {
        if (err) {
            console.log(err);
        } else {
            console.log(res);
        }
    })
}

function updateCoinToEthOrder(id, srcAmt, dstAmt) {
    coinPmlContract.updateTokenToEthOrder(id, srcAmt, dstAmt, (err, res) => {
        if (err) {
            console.log(err);
        } else {
            console.log(res);
        }
    })
}

function cancelCoinToEthOrder(id) {
    coinPmlContract.cancelTokenToEthOrder(id, (err, res) => {
        if (err) {
            console.log(err);
        } else {
            console.log(res);
        }
    })
}

function getCoinToEthMakerOrders() {
    coinPmlContract.getTokenToEthMakerOrderIds(account, (err, res) => {
        if (err) {
            console.log(err);
        } else {
            if (res.length > 0) {
                $('#tokenToEthOrdersTitle').css('display', 'block');
                for (i = 0; i < res.length; i++) {
                    console.log(res[i].c[0]);
                    getCoinToEthOrderById(res[i].c[0]);
                }
            }
        }
    });
}

function getCoinToEthOrderById(id) {
    coinPmlContract.getTokenToEthOrder(id, (err, res) => {
        if (err) {
            console.log(err);
        } else {
            console.log(res);
        }
    });
}

function getCoinToEthOrder() {
    coinPmlContract.getTokenToEthOrderList((err, res) => {
        if (err) {
            console.log(err);
        } else {
            for (i = 0; i < res.length; i++) {
                console.log(res[i].c[0]);
            }
        }
    });
}


function updateEthToTokenOrdersUI(){
    $('.content').append("<h2 class='text-center' style='margin:50px auto'>Eth to Token Orders</h2><p class='EthToTokenOrders'></p>");
    var cnt = 0;
        
        var ETHQtyLogo = $('<div></div>')
            .addClass("ETHQtyLogo")
            .append(111 + "<img src='/logos/eth.svg' height='44px' width='44px'>");

        var ETHQtyLogo2 = $('<div></div>')
            .addClass("ETHQtyLogo")
            .append(111 + "<img src='/logos/" + ".svg' height='44px' width='44px'>");

        var yourPriceBox = $('<div></div>')
            .addClass("yourPriceBox")
            .append(ETHQtyLogo)
            .append("<div style='margin-top:auto;margin-bottom:auto'><i class='tim-icons icon-double-right'></i></div>")
            .append(ETHQtyLogo2)
            .append("<button class='btn btn-success animation-on-hover h2 btn-lg' style='margin-bottom:0px' type='button' onclick='updateOrder(id)'>UPDATE</button>")
            .append("<button class='btn btn-warning animation-on-hover h2 btn-lg' style='margin-bottom:0px' type='button' onclick='cancelOrder(id)'>CANCEL</button>");
        
        $('.EthToTokenOrders').append(yourPriceBox);

}

// updateEthToTokenOrdersUI();