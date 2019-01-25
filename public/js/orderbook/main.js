/**
 * @def Balance of KNC and COIN that user has deposited
 * @param {CoinSymbol} required Coin Short Name. eg ETH, DAI
 */
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

/**
 * @def Balance of ETH that user has deposited
 */

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

/**
 * @def Check if allowance is provided.
 * @param {Address} required Coin Contract Address
 * @param {CoinSymbol} required Coin Short Name. eg ETH, DAI
 */

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

/**
 * @def Approve Contract
 * @param {Address} required Coin Contract Address
 * @param {CoinSymbol} required Coin Short Name. eg ETH, DAI
 */

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

/**
 * @def Approval Event
 * @param {Address} required Coin Contract Address
 */

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

/**
 * @def Deposit Ether
 * @param {Amount} required Amoun of Ether to Deposit
 */

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

/**
 * @def Withdraw Ether
 * @param {Amount} required Amount of Ether to Deposit
 */

function withdrawEther(amount) {
    coinPmlContract.withdrawEther(amount, (err, res) => {
        if (err) {
            console.log(err);
        } else {
            console.log('Withdraw Ether transaction');
        }
    });
}

/**
 * @def Deposit KNC
 * @param {Amount} required Amount of KNC to Deposit
 */

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

/**
 * @def Withdraw KNC
 * @param {Amount} required Amount of KNC to Withdraw
 */

function withdrawKnc(amount) {
    coinPmlContract.withdrawKncFee(amount, (err, res) => {
        if (err) {
            console.log(err);
        } else {
            console.log('Withdraw KNC transaction');
        }
    })
}

/**
 * @def Deposit Token
 * @param {Amount} required Amount of Token to Deposit
 */

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

/**
 * @def Withdraw Token
 * @param {Amount} required Amount of Token to Withdraw
 */

function withdrawCoin(amount) {
    coinPmlContract.withdrawToken(amount, (err, res) => {
        if (err) {
            console.log(err);
        } else {
            console.log('Withdraw Coin transaction');
        }
    });
}

/**
 * @def  Function to get the Token funds allowed to be spent by the reserve of a coin
 * @param {Address} required Coin Contract Address
 * @param {CoinSymbol} required Coin Short Name. eg ETH, DAI
 */

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

/**
 * @def  Function to get the KNC funds allowed to be spent by the reserve of a coin
 */

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

/**
 * @type EthToToken
 * @def Sumbit an order
 * @param {Number} required Amount of Ethereum
 * @param {Number} required Amount of Token
 */

function submitEthToCoinOrder(srcAmt, dstAmt) {
    coinPmlContract.submitEthToTokenOrder(srcAmt, dstAmt, (err, res) => {
        if (err) {
            console.log(err);
        } else {
            console.log(res);
        }
    })
}

/**
 * @type EthToToken
 * @def Update an order
 * @param {number} required Order ID
 * @param {Number} required Amount of Ethereum
 * @param {Number} required Amount of Token
 */

function updateEthToCoinOrder(id, srcAmt, dstAmt) {
    coinPmlContract.updateEthToTokenOrder(id, srcAmt, dstAmt, (err, res) => {
        if (err) {
            console.log(err);
        } else {
            console.log(res);
        }
    })
}

/**
 * @type EthToToken
 * @def Delete an order
 * @param {number} required Order ID
 */

function cancelEthToCoinOrder(id) {
    coinPmlContract.cancelEthToTokenOrder(id, (err, res) => {
        if (err) {
            console.log(err);
        } else {
            console.log(res);
        }
    });
}

/**
 * @type EthToToken
 * @def Get the list of orders
 */

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

/**
 * @type EthToToken
 * @def Get a specific order
 * @param {Number} required Order ID
 */

function getEthToCoinOrderById(id) {
    coinPmlContract.getEthToTokenOrder(id, (err, res) => {
        if (err) {
            console.log(err);
        } else {
            console.log(res);
        }
    });
}

/**
 * @type EthToToken
 * @def Get Eth To Coin Orders
 */

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

/**
 * @type TokenToEth
 * @def Sumbit an order
 * @param {Number} required Amount of Ethereum
 * @param {Number} required Amount of Token
 */

function submitCoinToEthOrder(srcAmt, dstAmt) {
    coinPmlContract.submitTokenToEthOrder(srcAmt, dstAmt, (err, res) => {
        if (err) {
            console.log(err);
        } else {
            console.log(res);
        }
    })
}

/**
 * @type TokenToEth
 * @def Update an order
 * @param {number} required Order ID
 * @param {Number} required Amount of Ethereum
 * @param {Number} required Amount of Token
 */

function updateCoinToEthOrder(id, srcAmt, dstAmt) {
    coinPmlContract.updateTokenToEthOrder(id, srcAmt, dstAmt, (err, res) => {
        if (err) {
            console.log(err);
        } else {
            console.log(res);
        }
    })
}

/**
 * @type TokenToEth
 * @def Delete an order
 * @param {number} required Order ID
 */

function cancelCoinToEthOrder(id) {
    coinPmlContract.cancelTokenToEthOrder(id, (err, res) => {
        if (err) {
            console.log(err);
        } else {
            console.log(res);
        }
    })
}

/**
 * @type TokenToEth
 * @def Get the list of orders
 */

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

/**
 * @type TokenToEth
 * @def Get a specific order
 * @param {Number} required Order ID
 */

function getCoinToEthOrderById(id) {
    coinPmlContract.getTokenToEthOrder(id, (err, res) => {
        if (err) {
            console.log(err);
        } else {
            console.log(res);
        }
    });
}

/**
 * @type TokenToEth
 * @def Get Token To Eth Orders
 */

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

/**
 * @def Update EthToToken Orders UI
 */

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