// Align object box in alphabetical order
Object.keys(coinsData)
    .sort()
    .forEach(function (key, i) {
    var forClass = `${coinsData[key].id + 'ForColor'}`;
    var color = coinsData[key].color;

    var html = `<div class="selectCoinBox ${forClass}" onclick="funcToSelect('${coinsData[key].id}')">
                    <div class="logoNameBox">
                        <div class="logoBox">
                            <img src="logos/${coinsData[key].id}.svg" style="width:48px; height:48px">
                        </div>
                        <div class="nameCodeBox">
                            <div class="nameBox">${coinsData[key].name}</div>
                            <div class="nameToken">${coinsData[key].fullname}</div>
                        </div>
                    </div>
                    <div class="${coinsData[key].id}Qty coinsQtyBox">QTY: 0.000000</div>
                </div>`;

    if (coinsData[key].id != 'eth' && coinsData[key].id != 'dai') {
        $(".tradeDataContainer").append(html);
    } else if (coinsData[key].id == 'dai') {
        $(".boxDai").append(html);
    } else if (coinsData[key].id == 'eth') {
        $(".boxEth").append(html);
        $('.boxEthMob').append(html);
    }

    $(`${'.'+forClass}`).css('box-shadow', `0px 0px 2px 2px var(--blue-for-hover)`);

    $(`${'.'+forClass}`).hover(function () {
        $(this).css('box-shadow', `0px 0px 8px 8px var(--blue-for-hover)`);
    }, function () {
        $(this).css('box-shadow', `0px 0px 2px 2px var(--blue-for-hover)`);
    });
});


var toggleNum = 0;
$('.ArrowIcon').click(function () {
    if (toggleNum == 0) {
        onBuyClick();
    } else if (toggleNum == 1) {
        onSellClick();
    }
})
// On buy button click on trading popup
function onBuyClick() {
    toggleNum = 1;
    $('#imgForSell').attr("src", `logos/${coinOneId}.svg`);
    $('#sellSymbol').text(coinOneName);
    $('#sellFullName').text(coinOneFullName);
    $('#imgForBuy').attr("src", `logos/${coinTwoId}.svg`);
    $('#buySymbol').text(coinTwoName);
    $('#buyFullName').text(coinTwoFullName);
    if (coinOneQty) {
        $('.tokenQtyValue').text(`${coinOneQty.toFixed(8)} ${coinOneName}`);
    }
    $('.tokenQtyBox').css('animation', 'outlineAnim 1s forwards 0s linear');
    setTimeout(function() {$('.tokenQtyBox').css('animation', 'none')}, 1000);
    $('.arrowTransform').css('transform', 'rotate(0deg)');
    if (maxTwoRate) {
        $('.ethToToken').text(`1 ${coinOneName} = ${maxTwoRate.toFixed(6)} ${coinTwoName}`);
    }
    $('.coinOneInput').on();
    changeMinRateText();
    // transFee(1);
    changeOnInput(1);
    toChoose = 0;
};


// On sell button click on trading popup
function onSellClick() {
    toggleNum = 0;
    $('.tokenQtyValue').text(`${coinTwoQty.toFixed(8)} ${coinTwoName}`);
    $('.tokenQtyBox').css('animation', 'outlineAnim 1s forwards 0s linear');
    setTimeout(function() {$('.tokenQtyBox').css('animation', 'none')}, 1000);
    $('.arrowTransform').css('transform', 'rotate(180deg)');
    if (maxOneRate) {
        $('.ethToToken').text(`1 ${coinTwoName} = ${maxOneRate.toFixed(6)} ${coinOneName}`);
    }
    $('.coinOneInput').on();
    changeMinRateText();
    changeOnInput(1);
    // transFee(2);
};

// On advance button click on trading popup
$('.advanceSetting').click(function() {
    $(this).parent().find('#advanceToggle').slideToggle();
})


function hideTrade() {
    $('#doubleClickProblem').hide();
    $('.tradeCover').slideUp('slow');
    $('#tradeBox').slideUp('slow');
    $('.coinOneInput').val('');
    $('.coinTwoInput').val('');
}

var coinOneValue = 0;
var coinTwoValue = 0;
// Ethereum input on trade section
$('.coinOneInput').on('input', function () {
    coinOneValue = $(this).val();
    changeOnInput(1);
    changeMinRateText();
});


// Coins input on trade section
$('.coinTwoInput').on('input', function () {
    coinTwoValue = $(this).val();
    changeOnInput(2);
    changeMinRateText();
});

function changeOnInput(num) {
    if (num == 1) {
        if (toggleNum == 1) {
            coinTwoValue = (coinOneValue * maxTwoRate);
        } else if (toggleNum == 0) {
            coinTwoValue = (coinOneValue / maxOneRate);
        }
        if (coinOneValue > 0) {
            $('.coinTwoInput').val(coinTwoValue.toFixed(6));
        } else if (coinOneValue < 0) {
            $(this).val('');
        } else {
            $('.coinTwoInput').val('');
        }
    } else if (num == 2) {
        if (toggleNum == 1) {
            coinOneValue = (coinTwoValue / maxTwoRate);
        } else if (toggleNum == 0) {
            coinOneValue = (coinTwoValue * maxOneRate);
        }
        if (coinTwoValue > 0) {
            $('.coinOneInput').val(coinOneValue.toFixed(6));
        } else if (coinOneValue < 0) {
            $(this).val('');
        } else {
            $('.coinOneInput').val('');
        }
    }
}

var sliderVal = 97;
$('.slider').change(function() {
    sliderVal = $(this).val();
    $('#sliderVal').text(`${sliderVal}%`);
    changeMinRateText();
})


// var to store details from object in coinOneDetails.js
var coinOneDetail,
    coinOneName,
    coinOneFullName,
    coinOneId,
    coinOnekyber_id,
    coinOneColor;

var coinTwoDetail,
    coinTwoName,
    coinTwoFullName,
    coinTwoId,
    coinTwoQty;

// details of kyber from our database
var coinOneDecimal,
    coinOneAdd,
    coinTwoDecimal,
    coinTwoAdd;

// eth token address for kyber
var ethAdd = '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee';

// details from smart contract
var coinOneQty,
    coinOneQtyInWei,
    coinTwoQty,
    coinTwoQtyInWei;


// returns from getExpectedRate
// maxOneRate : max coins one can get currenty from 1 ETH
var maxOneRate,
    maxOneRateInWei,
    maxTwoRate,
    maxTwoRateInWei;

var transactionFee;

var toChoose = 0;

var coinOneClass;

var coinOneContract;
var coinTwoContract;
// On coin select function
function funcToSelect(coinId) {
    if ((networkId == 1 || networkId == 3) && account) {
        toChoose++;
        if (toChoose == 1) {
            $(`.search${coinId.charAt(0)} .selectedChar`).css('display', 'block');
            coinOneDetail = coinsData[coinId];
            coinOneName = coinOneDetail.name;
            coinOneFullName = coinOneDetail.fullname;
            coinOneId = coinOneDetail.id;
            coinOnekyber_id = coinOneDetail.kyber;
            coinOneColor = coinOneDetail.color;

            coinOneClass = `.${coinOneId}ForColor`;
            $(coinOneClass).css('outline', `10px solid var(--blue-for-hover)`);
            $(coinOneClass).css('background-color', 'var(--blue-for-hover)');

            if (coinId != 'eth') {
                coinOneDecimal = kyber[coinOnekyber_id].decimals;
                coinOneAdd = kyber[coinOnekyber_id].contractAddress;
                // current account selected coin quantity
                coinOneContract = web3.eth.contract(tokensAbi).at(coinOneAdd);
                coinOneContract.balanceOf(account, function (err, res) {
                    if (!err) {
                        coinOneQtyInWei = String(res);
                        coinOneQty = coinOneQtyInWei;
                        for (var i = 0; i < coinOneDecimal; i++) {
                            coinOneQty = coinOneQty / 10;
                        }
                        $('.tokenQtyValue').text(`${coinOneQty.toFixed(8)} ${coinOneName}`);
                    } else {
                        var title = 'ERROR GETTING QUANTITY';
                        var content = `Unable to get quantity of ${coinOneName} in your wallet`;
                        showAlert(title, content);
                        console.log(err);
                    };
                });
            } else {
                coinOneDecimal = 18;
                coinOneAdd = "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee";
                // Current account eth balance
                web3.eth.getBalance(account, function (err, res) {
                    if (!err) {
                        coinOneQtyInWei = res;
                        coinOneQty = res / 1000000000000000000;
                        $('.tokenQtyValue').text(`${coinOneQty.toFixed(8)} ${coinOneName}`);
                    } else {
                        web3Error();
                        var title = 'ERROR GETTING QUANTITY';
                        var content = `Unable to get quantity of ETH in your wallet`;
                        showAlert(title, content);
                        console.error(err);
                    };
                });
            }
        } else if (toChoose == 2) {
            if (coinId == coinOneId) {
                toChoose = 0;
            } else {
                coinTwoDetail = coinsData[coinId];
                coinTwoName = coinTwoDetail.name;
                coinTwoFullName = coinTwoDetail.fullname;
                coinTwoId = coinTwoDetail.id;
                coinTwokyber_id = coinTwoDetail.kyber;

                if (coinId != 'eth') {
                    coinTwoDecimal = kyber[coinTwokyber_id].decimals;
                    coinTwoAdd = kyber[coinTwokyber_id].contractAddress;
                    // current account selected coin quantity
                    coinTwoContract = web3.eth.contract(tokensAbi).at(coinTwoAdd);
                    coinTwoContract.balanceOf(account, function (err, res) {
                        if (!err) {
                            coinTwoQtyInWei = String(res);
                            coinTwoQty = coinTwoQtyInWei;
                            for (var i = 0; i < coinTwoDecimal; i++) {
                                coinTwoQty = coinTwoQty / 10;
                            }
                            onBuyClick();
                        } else {
                            var title = 'ERROR GETTING QUANTITY';
                            var content = `Unable to get quantity of ${coinTwoName} in your wallet`;
                            showAlert(title, content);
                            console.log(err);
                        };
                    });
                } else {
                    coinTwoDecimal = 18;
                    coinTwoAdd = "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee";
                    // Current account eth balance
                    web3.eth.getBalance(account, function (err, res) {
                        if (!err) {
                            coinTwoQtyInWei = res;
                            coinTwoQty = res / 1000000000000000000;
                            onBuyClick();
                        } else {
                            web3Error();
                            var title = 'ERROR GETTING QUANTITY';
                            var content = `Unable to get quantity of ETH in your wallet`;
                            showAlert(title, content);
                            console.error(err);
                        };
                    });
                }
                expectedRateCoinToCoin(coinOneAdd, coinTwoAdd);
                $('#doubleClickProblem').show();
                $('.tradeCover').slideDown('slow');
                $('#tradeBox').slideDown('slow');
            }
            $(coinOneClass).css('background-color', 'var(--main-color1)');
            $(coinOneClass).css('outline', '0px solid black');
            $('.selectedChar').css('display', 'none');
        }
    } else {
        var title = 'METAMASK/TRUST/STATUS';
        var content = 'For trading you need to be Logged-in to main network via metamask or for ios/android from trust browser or status';
        showAlert(title, content);
    }
    // expectedRateContract(ethAdd, coinOneAdd);
};

function expectedRateCoinToCoin(coinOneAdd, coinTwoAdd) {
    var oneNum = 10 ** coinOneDecimal;
    mainKyberContract.getExpectedRate(coinOneAdd, coinTwoAdd, oneNum, function (err, res) {
        if (!err) {
            maxTwoRateInWei = String(res[0]);
            maxTwoRate = maxTwoRateInWei / 1000000000000000000;
            $('.ethToToken').text(`1 ${coinOneName} = ${maxTwoRate.toFixed(6)} ${coinTwoName}`);
        } else {
            var title = 'ERROR GETTING EXPECTED RATE';
            var content = `Unable to get expected rate maybe because the network is clogged. Please try again later.`;
            showAlert(title, content);
            console.log(err);
        };
    });
    var TwoNum = 10 ** coinTwoDecimal;
    mainKyberContract.getExpectedRate(coinTwoAdd, coinOneAdd, TwoNum, function (err, res) {
        if (!err) {
            maxOneRateInWei = String(res[0]);
            maxOneRate = maxOneRateInWei / 1000000000000000000;
        } else {
            var title = 'ERROR GETTING EXPECTED RATE';
            var content = `Unable to get expected rate maybe because the network is clogged. Please try again later.`;
            showAlert(title, content);
            console.log(err);
        };
    });
}

var gasDecide = 3;
function setGas(setVar) {
    if (setVar == 1) {
        $('.gasPriceInput').val(gasLow);
        $('.gasOpBut').css({'background-color': 'var(--blue-for-hover)', 'color': 'var(--main-white)'});
        $('.gasOpBut').eq(0).css({'background-color': 'var(--main-white)', 'color': 'var(--main-color1)'});
        gasDecide = 1;
    } else if (setVar == 2) {
        $('.gasPriceInput').val(gasStandard);
        $('.gasOpBut').css({'background-color': 'var(--blue-for-hover)', 'color': 'var(--main-white)'});
        $('.gasOpBut').eq(1).css({'background-color': 'var(--main-white)', 'color': 'var(--main-color1)'});
        gasDecide = 2;
    } else if (setVar == 3) {
        $('.gasPriceInput').val(gasHigh);
        $('.gasOpBut').css({'background-color': 'var(--blue-for-hover)', 'color': 'var(--main-white)'});
        $('.gasOpBut').eq(2).css({'background-color': 'var(--main-white)', 'color': 'var(--main-color1)'});
        gasDecide = 3;
    }
    gasToTranSet(2);
}

var finalGasPrice;
var finalGasInWei;
function gasToTranSet(numCheck) {
    finalGasPrice = $('.gasPriceInput').val();
    finalGasInWei = finalGasPrice*1000000000;
    if (numCheck == 1) {
        gasDecide = 0;
        $('.gasOpBut').css({
            'background-color': 'var(--blue-for-hover)',
            'color': 'var(--main-white)'
        });
    }
};


function tradeAllCoin() {
    if (toggleNum == 1) {
        if (coinOneId != 'eth') {
            $('.coinOneInput').val(coinOneQty.toFixed(6) - 0.000001);
        } else {
            $('.coinOneInput').val((coinOneQty - (900000*finalGasPrice)/1000000000).toFixed(6));
        }
        $(".coinOneInput").trigger("input");
    } else if (toggleNum == 0) {
        if (coinTwoId != 'eth') {
            $('.coinTwoInput').val(coinTwoQty.toFixed(6) - 0.000001);
        } else {
            $('.coinTwoInput').val((coinTwoQty - (900000 * finalGasPrice) / 1000000000).toFixed(6));
        }
        $(".coinTwoInput").trigger("input");
    }
}

function changeMinRateText() {
    if (toggleNum == 1) {
        $('.minSlipTitle').text(`MIN ACCEPTABLE RATE: ${((coinTwoValue*sliderVal)/100).toFixed(6)} ${coinTwoName}`);
        $('.sliderDetails span').text(`${((coinTwoValue*97)/100).toFixed(6)} ${coinTwoName}`);
    } else if (toggleNum == 0) {
        $('.minSlipTitle').text(`MIN ACCEPTABLE RATE: ${((coinOneValue*sliderVal)/100).toFixed(6)} ${coinOneName}`);
        $('.sliderDetails span').text(`${((coinOneValue*97)/100).toFixed(6)} ${coinOneName}`);
    }
}


var allowanceLimit = 2**255;

function swapTokens() {
    if (coinOneValue > 0 && coinTwoValue > 0) {
        if (toggleNum == 1) {
            if (coinOneValue <= coinOneQty) {
                var forDecimal = 10 ** coinOneDecimal;
                var coinSellQty = coinOneValue*forDecimal;
                var coinBuyQty = coinTwoValue * (10 ** 18);
                var coinMinQty = ((maxTwoRateInWei * sliderVal) / 100).toFixed(0);
                if (coinOneId != 'eth') {
                    console.log(1);
                    allowance(coinOneContract, coinOneAdd, coinSellQty, coinTwoAdd, coinBuyQty, coinMinQty);
                } else {
                    console.log(2);
                    trade(coinOneAdd, coinSellQty, coinTwoAdd, account, coinMinQty, 0);
                }
            } else {
                var title = 'QUANTITY';
                var content = `You don't have enough ${coinOneName} in your wallet`;
                showAlert(title, content);
            }
        } else if (toggleNum == 0) {
            if (coinTwoValue <= coinTwoQty) {
                var forDecimal = 10 ** coinTwoDecimal;
                var coinSellQty = coinTwoValue*forDecimal;
                var coinBuyQty = coinOneValue * (10 **18);
                var coinMinQty = (maxOneRateInWei * sliderVal) / 100;
                console.log(coinMinQty);
                if (coinTwoId != 'eth') {
                    console.log(3);
                    allowance(coinTwoContract, coinTwoAdd, coinSellQty, coinOneAdd, coinBuyQty, coinMinQty);
                } else {
                    console.log(4);
                    trade(coinTwoAdd, coinSellQty, coinOneAdd, account, coinMinQty, 0);
                }
            } else {
                var title = 'QUANTITY ERROR';
                var content = `You don't have enough ${coinTwoName} in your wallet`;
                showAlert(title, content);
            }
        }
    } else {
        var title = 'QUANTITY ERROR';
        var content = 'Tokens quantity cannot be 0';
        showAlert(title, content);
    }
}

var txArr = [];

function allowance(coinContract, src, srcAmount, dest, maxDestAmount, minDestAmount) {
    coinContract.allowance(account, mainKyberAdd, function (err, res) {
        if (!err) {
            if (String(res) < srcAmount) {
                var payObj = {
                    gasPrice: finalGasInWei
                }
                showLoader();
                var title = 'CONFIRM ALLOWANCE TRANSACTION';
                var content = `Confirm your transaction for allowance of token`;
                showAlert(title, content);
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
                coinContract.approve(mainKyberAdd, allowanceLimit, payObj, function (err, res) {
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
            } else {
                trade(src, srcAmount, dest, account, minDestAmount, 0);
            }
        } else {
            var title = 'ERROR CHECKING ALLOWANCE';
            var content = `Unable to check allowance of token`;
            showAlert(title, content);
            console.log(err);
        };
    })
}


function trade(src, srcAmount, dest, account, minDestAmount, walletId) {
    var payObj = {
        value: 0,
        gasPrice: finalGasInWei,
    }
    if (src == "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee") {
        payObj.value = srcAmount
        if (dest == "0x4f3afec4e5a3f2a6a1a411def7d7dfe50ee057bf") {
            payObj.gas = 750000
        } else {
            payObj.gas = 330000
        }
    } else if (dest == "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee") {
        if (src == "0x4f3afec4e5a3f2a6a1a411def7d7dfe50ee057bf") {
            payObj.gas = 870000
        } else {
            payObj.gas = 430000
        }
    } else {
        if (src == "0x4f3afec4e5a3f2a6a1a411def7d7dfe50ee057bf" || dest == "0x4f3afec4e5a3f2a6a1a411def7d7dfe50ee057bf") {
            payObj.gas = 1200000
        } else {
            payObj.gas = 760000
        }
    }
    showLoader();
    var title = 'CONFIRM TRADE TRANSACTION';
    var content = 'Confirm your transaction for swapping the tokens.';
    showAlert(title, content);
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

$('#showHideQty').click(function() {
    if ($('#showHideQty').text() == "SHOW QUANTITY") {
        $('.coinsQtyBox').slideToggle();
        $('#showHideQty').text('HIDE QUANTITY');
        Object.keys(coinsData).forEach(function (key, i) {
            if (key == "eth") {
                ethQtyCal(coinsData[key].id);
            } else {
                coinsQtyCal(coinsData[key].id);
            }
        });
    } else if ($('#showHideQty').text() == "HIDE QUANTITY") {
        $('.coinsQtyBox').slideToggle();
        $('#showHideQty').text('SHOW QUANTITY');
    }
})

function ethQtyCal(key) {
    web3.eth.getBalance(account, function (err, res) {
        if (!err) {
            var coinQty = String(res);
            coinQty = (coinQty / 1000000000000000000).toFixed(6);
            var qtyClass = `.${key}Qty`;
            $(qtyClass).text(`QTY: ${coinQty}`);
            if (coinQty > 0) {
                $(qtyClass).css('color','rgb(100, 255, 100)');
            }
        } else {
            console.log(err);
        };
    });
}

function coinsQtyCal(key) {
    var coinAddress = kyber[coinsData[key].kyber].contractAddress;
    var coinDecimal = kyber[coinsData[key].kyber].decimals;    
    var coinContractQty = web3.eth.contract(tokensAbi).at(coinAddress);
    coinContractQty.balanceOf(account, function (err, res) {
        if (!err) {
            var coinQty = String(res);
            coinQty = (coinQty / (10**coinDecimal)).toFixed(6);
            var qtyClass = `.${key}Qty`;
            $(qtyClass).text(`QTY: ${coinQty}`);
            if (coinQty > 0) {
                $(qtyClass).css('color', 'rgb(100, 255, 100)');
            }
        } else {
            console.log(err);
        };
    });
}