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
    $('#imgForSell').attr("src", `logos/${coinOne.id}.svg`);
    $('#sellSymbol').text(coinOne.symbol);
    $('#sellFullName').text(coinOne.name);
    $('#imgForBuy').attr("src", `logos/${coinTwo.id}.svg`);
    $('#buySymbol').text(coinTwo.symbol);
    $('#buyFullName').text(coinTwo.name);
    if (coinOne.qty) {
        $('.tokenQtyValue').text(`${coinOne.qty.toFixed(8)} ${coinOne.symbol}`);
    }
    $('.tokenQtyBox').css('animation', 'outlineAnim 1s forwards 0s linear');
    setTimeout(function() {$('.tokenQtyBox').css('animation', 'none')}, 1000);
    $('.arrowTransform').css('transform', 'rotate(0deg)');
    if (coinTwo.rate) {
        $('.ethToToken').text(`1 ${coinOne.symbol} = ${coinTwo.rate.toFixed(6)} ${coinTwo.symbol}`);
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
    $('.tokenQtyValue').text(`${coinTwo.qty.toFixed(8)} ${coinTwo.symbol}`);
    $('.tokenQtyBox').css('animation', 'outlineAnim 1s forwards 0s linear');
    setTimeout(function() {$('.tokenQtyBox').css('animation', 'none')}, 1000);
    $('.arrowTransform').css('transform', 'rotate(180deg)');
    if (coinOne.rate) {
        $('.ethToToken').text(`1 ${coinTwo.symbol} = ${coinOne.rate.toFixed(6)} ${coinOne.symbol}`);
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

// Ethereum input on trade section
$('.coinOneInput').on('input', function () {
    coinOne.val = $(this).val();
    changeOnInput(1);
    changeMinRateText();
});


// Coins input on trade section
$('.coinTwoInput').on('input', function () {
    coinTwo.val = $(this).val();
    changeOnInput(2);
    changeMinRateText();
});

function changeOnInput(num) {
    if (num == 1) {
        if (toggleNum == 1) {
            coinTwo.val = (coinOne.val * coinTwo.rate);
        } else if (toggleNum == 0) {
            coinTwo.val = (coinOne.val / coinOne.rate);
        }
        if (coinOne.val > 0) {
            $('.coinTwoInput').val(coinTwo.val.toFixed(6));
        } else if (coinOne.val < 0) {
            $(this).val('');
        } else {
            $('.coinTwoInput').val('');
        }
    } else if (num == 2) {
        if (toggleNum == 1) {
            coinOne.val = (coinTwo.val / coinTwo.rate);
        } else if (toggleNum == 0) {
            coinOne.val = (coinTwo.val * coinOne.rate);
        }
        if (coinTwo.val > 0) {
            $('.coinOneInput').val(coinOne.val.toFixed(6));
        } else if (coinOne.val < 0) {
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





// On coin select function
function funcToSelect(coinId) {
    if ((networkId == 1 || networkId == 3) && account) {
        toChoose++;
        if (toChoose == 1) {
            $(`.search${coinId.charAt(0)} .selectedChar`).css('display', 'block');
            coinOne.symbol = kyber[coinId].symbol;
            coinOne.name = kyber[coinId].name;
            coinOne.id = coinId;
            coinOne.decimals = kyber[coinId].decimals;
            coinOne.address = kyber[coinId].contractAddress;
            coinOne.class = `.${coinOne.id}ForColor`;

            $(coinOne.class).css('outline', `10px solid var(--blue-for-hover)`);
            $(coinOne.class).css('background-color', 'var(--blue-for-hover)');

            if (coinId != 'eth') {
                coinOne.contract = web3.eth.contract(tokensAbi).at(coinOne.address);
                coinOne.contract.balanceOf(account, function (err, res) {
                    if (!err) {
                        coinOne.qtyInWei = String(res);
                        coinOne.qty = coinOne.qtyInWei;
                        coinOne.qty = coinOne.qty / 10 ** coinOne.decimals;
                        $('.tokenQtyValue').text(`${coinOne.qty.toFixed(8)} ${coinOne.symbol}`);
                    } else {
                        var title = 'ERROR GETTING QUANTITY';
                        var content = `Unable to get quantity of ${coinOne.symbol} in your wallet`;
                        showAlert(title, content);
                        console.log(err);
                    };
                });
            } else {
                web3.eth.getBalance(account, function (err, res) {
                    if (!err) {
                        coinOne.qtyInWei = res;
                        coinOne.qty = res / 1000000000000000000;
                        $('.tokenQtyValue').text(`${coinOne.qty.toFixed(8)} ${coinOne.symbol}`);
                    } else {
                        var title = 'ERROR GETTING QUANTITY';
                        var content = `Unable to get quantity of ETH in your wallet`;
                        showAlert(title, content);
                        console.error(err);
                    };
                });
            }
        } else if (toChoose == 2) {
            if (coinId == coinOne.id) {
                toChoose = 0;
            } else {
                coinTwo.symbol = kyber[coinId].name;
                coinTwo.name = kyber[coinId].fullname;
                coinTwo.id = coinId;
                coinTwo.decimals = kyber[coinId].decimals;
                coinTwo.address = kyber[coinId].contractAddress;

                if (coinId != 'eth') {
                    coinTwo.contract = web3.eth.contract(tokensAbi).at(coinTwo.address);
                    coinTwo.contract.balanceOf(account, function (err, res) {
                        if (!err) {
                            coinTwo.qtyInWei = String(res);
                            coinTwo.qty = coinTwo.qtyInWei;
                            coinTwo.qty = coinTwo.qty / 10 ** coinTwo.decimals;
                            onBuyClick();
                        } else {
                            var title = 'ERROR GETTING QUANTITY';
                            var content = `Unable to get quantity of ${coinTwo.symbol} in your wallet`;
                            showAlert(title, content);
                            console.log(err);
                        };
                    });
                } else {
                    web3.eth.getBalance(account, function (err, res) {
                        if (!err) {
                            coinTwo.qtyInWei = res;
                            coinTwo.qty = res / 1000000000000000000;
                            onBuyClick();
                        } else {
                            var title = 'ERROR GETTING QUANTITY';
                            var content = `Unable to get quantity of ETH in your wallet`;
                            showAlert(title, content);
                            console.error(err);
                        };
                    });
                }
                var one_two_expected = expectedRateCoinToCoin(coinOne.address, coinTwo.address, coinOne.decimals);
                var two_one_expected = expectedRateCoinToCoin(coinTwo.address, coinOne.address, coinTwo.decimals);
                do {
                    $('.ethToToken').text(`1 ${coinOne.symbol} = ${coinTwo.rate.toFixed(6)} ${coinTwo.symbol}`);
                } while (!one_two_expected);
                $('#doubleClickProblem').show();
                $('.tradeCover').slideDown('slow');
                $('#tradeBox').slideDown('slow');
            }
            $(coinOne.class).css('background-color', 'var(--main-color1)');
            $(coinOne.class).css('outline', '0px solid black');
            $('.selectedChar').css('display', 'none');
        }
    } else {
        var title = 'NOT LOGGED-IN';
        var content = 'For trading you need to be Logged-in to main network or ropsten test net via metamask or dapp browsers';
        showAlert(title, content);
    }
};

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
        if (coinOne.id != 'eth') {
            $('.coinOneInput').val(coinOne.qty.toFixed(6) - 0.000001);
        } else {
            $('.coinOneInput').val((coinOne.qty - (900000*finalGasPrice)/1000000000).toFixed(6));
        }
        $(".coinOneInput").trigger("input");
    } else if (toggleNum == 0) {
        if (coinTwo.id != 'eth') {
            $('.coinTwoInput').val(coinTwo.qty.toFixed(6) - 0.000001);
        } else {
            $('.coinTwoInput').val((coinTwo.qty - (900000 * finalGasPrice) / 1000000000).toFixed(6));
        }
        $(".coinTwoInput").trigger("input");
    }
}

function changeMinRateText() {
    if (toggleNum == 1) {
        $('.minSlipTitle').text(`MIN ACCEPTABLE RATE: ${((coinTwo.val*sliderVal)/100).toFixed(6)} ${coinTwo.symbol}`);
        $('.sliderDetails span').text(`${((coinTwo.val*97)/100).toFixed(6)} ${coinTwo.symbol}`);
    } else if (toggleNum == 0) {
        $('.minSlipTitle').text(`MIN ACCEPTABLE RATE: ${((coinOne.val*sliderVal)/100).toFixed(6)} ${coinOne.symbol}`);
        $('.sliderDetails span').text(`${((coinOne.val*97)/100).toFixed(6)} ${coinOne.symbol}`);
    }
}

function swapTokens() {
    if (coinOne.val > 0 && coinTwo.val > 0) {
        var coinFrom, coinTo;
        if (toggleNum == 1) {
            coinFrom = coinOne;
            coinTo = coinTwo;
        } else if (toggleNum == 0) {
            coinFrom = coinTwo;
            coinTo = coinOne;
        }
        if (coinFrom.val <= coinFrom.qty) {
            var forDecimal = 10 ** coinFrom.decimals;
            var coinSellQty = coinFrom.val*forDecimal;
            var coinMinQty = ((coinTo.rateInWei * sliderVal) / 100).toFixed(0);
            if (coinFrom.id != 'eth') {
                console.log(1);
                allowance(coinFrom.contract, coinFrom.address, coinSellQty, coinTo.address, coinMinQty);
            } else {
                console.log(2);
                trade(coinFrom.address, coinSellQty, coinTo.address, account, coinMinQty, true);
            }
        } else {
            var title = 'QUANTITY';
            var content = `You don't have enough ${coinFrom.symbol} in your wallet`;
            showAlert(title, content);
        }
    } else {
        var title = 'QUANTITY ERROR';
        var content = 'Tokens quantity cannot be 0';
        showAlert(title, content);
    }
}



function allowance(coinContract, src, srcAmount, dest, minDestAmount) {
    coinContract.allowance(account, mainKyberAdd, function (err, res) {
        if (!err) {
            if (Number(res) < srcAmount) {
                var payObj = {
                    gasPrice: finalGasInWei
                }
                showLoader();
                var title = 'CONFIRM ALLOWANCE TRANSACTION';
                var content = `Confirm your transaction for allowance of token`;
                showAlert(title, content);
                approvalEvent(coinContract);
                approve(coinContract, addressToApprove, allowanceLimit, payObj);
            } else {
                trade(src, srcAmount, dest, account, minDestAmount, TextTrackCueList);
            }
        } else {
            var title = 'ERROR CHECKING ALLOWANCE';
            var content = `Unable to check allowance of token`;
            showAlert(title, content);
            console.log(err);
        };
    })
}


function trade(src, srcAmount, dest, account, minDestAmount, approve) {
    var payObj = {
        value: 0,
        gasPrice: finalGasInWei,
    }
    if (src == "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee") {
        payObj.value = srcAmount
    }
    if (!approve) {
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
    }
    showLoader();
    var title = 'CONFIRM TRADE TRANSACTION';
    var content = 'Confirm your transaction for swapping the tokens.';
    showAlert(title, content);
    startTrade(src, srcAmount, dest, account, minDestAmount, payObj);
}

$('#showHideQty').click(function() {
    if ($('#showHideQty').text() == "SHOW QUANTITY") {
        $('.coinsQtyBox').slideToggle();
        $('#showHideQty').text('HIDE QUANTITY');
        Object.keys(coinsData).forEach(function (key, i) {
            if (key == "eth") {
                ethBalance(coinsData[key].id);
            } else {
                tokenBalance(coinsData[key].id);
            }
        });
    } else if ($('#showHideQty').text() == "HIDE QUANTITY") {
        $('.coinsQtyBox').slideToggle();
        $('#showHideQty').text('SHOW QUANTITY');
    }
})
