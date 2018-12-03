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
    if (coinOne.qty >= 0) {
        $('.allQty').text(`${coinOne.qty.toFixed(8)} ${coinOne.symbol}`);
    }
    $('.toggleIcon').css('transform', 'rotate(0deg)');
    if (coinTwo.rate >= 0) {
        $('.coinConversionRate').text(`1 ${coinOne.symbol} = ${coinOne.rate.toFixed(6)} ${coinTwo.symbol}`);
    }
    $('.coinOneInput').on();
    changeMinRateText();
    changeOnInput(1);
    toChoose = 0;
};


// On sell button click on trading popup
function onSellClick() {
    toggleNum = 0;
    if (coinTwo.qty >= 0) {
        $('.allQty').text(`${coinTwo.qty.toFixed(8)} ${coinTwo.symbol}`);
    }
    $('.toggleIcon').css('transform', 'rotate(180deg)');
    if (coinOne.rate >= 0) {
        $('.coinConversionRate').text(`1 ${coinTwo.symbol} = ${coinTwo.rate.toFixed(6)} ${coinOne.symbol}`);
    }
    $('.coinOneInput').on();
    changeMinRateText();
    changeOnInput(1);
};


// Ethereum input on trade section
$('.coinOneInput').on('keyup keydown change', function () {
    coinOne.val = $(this).val();
    changeOnInput(1);
    changeMinRateText();
});


// Coins input on trade section
$('.coinTwoInput').on('keyup keydown change', function () {
    coinTwo.val = $(this).val();
    changeOnInput(2);
    changeMinRateText();
});

function changeOnInput(num) {
    if (num == 1) {
        if (coinOne.val > 0) {
            if (toggleNum == 1) {
                coinTwo.val = (coinOne.val * coinOne.rate);
            } else if (toggleNum == 0) {
                coinTwo.val = (coinOne.val / coinTwo.rate);
            }
            $('.coinTwoInput').val(coinTwo.val.toFixed(6));
        } else {
            coinOne.val = 0;
            coinTwo.val = 0;
            $(this).val('');
            $('.coinTwoInput').val('');
        }
    } else if (num == 2) {
        if (coinTwo.val > 0) {
            if (toggleNum == 1) {
                coinOne.val = (coinTwo.val / coinOne.rate);
            } else if (toggleNum == 0) {
                coinOne.val = (coinTwo.val * coinTwo.rate);
            }
            $('.coinOneInput').val(coinOne.val.toFixed(6));
        } else {
            coinOne.val = 0;
            coinTwo.val = 0;
            $(this).val('');
            $('.coinOneInput').val('');
        }
    }
}



// On coin select function
function funcToSelect(coinId) {
    if ((networkId == 1 || networkId == 3) && account) {
        toChoose++;
        if (toChoose == 1) {
            $(`.search${coinId.charAt(0)} .selectedChar`).css('display', 'block');
            coinOne.symbol = coinsData[coinId].symbol;
            coinOne.name = coinsData[coinId].name;
            coinOne.id = coinId;
            coinOne.decimals = coinsData[coinId].decimals;
            coinOne.address = coinsData[coinId].contractAddress;
            coinOne.class = `.${coinOne.id}Class`;

            $(coinOne.class).css('outline', `10px solid var(--primary)`);

            if (coinId != 'eth') {
                coinOne.contract = web3.eth.contract(tokensAbi).at(coinOne.address);
                coinOne.contract.balanceOf(account, function (err, res) {
                    if (!err) {
                        coinOne.qtyInWei = String(res);
                        coinOne.qty = coinOne.qtyInWei;
                        coinOne.qty = coinOne.qty / 10 ** coinOne.decimals;
                        $('.allQty').text(`${coinOne.qty.toFixed(8)} ${coinOne.symbol}`);
                    } else {
                        navAlerts(5);
                        console.log(err);
                    };
                });
            } else {
                web3.eth.getBalance(account, function (err, res) {
                    if (!err) {
                        coinOne.qtyInWei = res;
                        coinOne.qty = res / 1000000000000000000;
                        $('.allQty').text(`${coinOne.qty.toFixed(8)} ${coinOne.symbol}`);
                    } else {
                        navAlerts(6);
                        console.error(err);
                    };
                });
            }
        } else if (toChoose == 2) {
            if (coinId == coinOne.id) {
                toChoose = 0;
            } else {
                coinTwo.symbol = coinsData[coinId].symbol;
                coinTwo.name = coinsData[coinId].name;
                coinTwo.id = coinId;
                coinTwo.decimals = coinsData[coinId].decimals;
                coinTwo.address = coinsData[coinId].contractAddress;

                if (coinId != 'eth') {
                    coinTwo.contract = web3.eth.contract(tokensAbi).at(coinTwo.address);
                    coinTwo.contract.balanceOf(account, function (err, res) {
                        if (!err) {
                            coinTwo.qtyInWei = String(res);
                            coinTwo.qty = coinTwo.qtyInWei;
                            coinTwo.qty = coinTwo.qty / 10 ** coinTwo.decimals;
                            onBuyClick();
                            setIconName();
                        } else {
                            navAlerts(7);
                            console.log(err);
                        };
                    });
                } else {
                    web3.eth.getBalance(account, function (err, res) {
                        if (!err) {
                            coinTwo.qtyInWei = res;
                            coinTwo.qty = res / 1000000000000000000;
                            onBuyClick();
                            setIconName();
                        } else {
                            navAlerts(8);
                            console.error(err);
                        };
                    });
                }
                expectedRateCoinToCoin(coinOne.address, coinTwo.address, coinOne.decimals, 1);
                expectedRateCoinToCoin(coinTwo.address, coinOne.address, coinTwo.decimals, 2);
                $('.boxesData').css('animation', 'scale-down-top 0.4s cubic-bezier(0.250, 0.460, 0.450, 0.940) both');
                $('.searchBar').css('opacity', '0');
                $('.searchBar').css('transition', 'opacity 0.4s ease-out 0s');
                setTimeout(function() {
                    $('.boxesData').css('display', 'none');
                    $('.easSwapBox').css('display', 'block');
                }, 400);
                $('.easSwapBox').css('animation', 'scale-up-top 0.4s cubic-bezier(0.390, 0.575, 0.565, 1.000) 0.4s both');
            }
            $(coinOne.class).css('outline', '0px solid black');
            $('.selectedChar').css('display', 'none');
        }
    } else if (networkId) {
        navAlerts(4);
    } else if (account) {
        navAlerts(9);
    } else {
        navAlerts(1);
    }
};

function setIconName() {
    $('#imgForSell').attr("src", `logos/${coinOne.id}.svg`);
    $('#sellSymbol').text(coinOne.symbol);
    $('#sellFullName').text(coinOne.name);
    $('#imgForBuy').attr("src", `logos/${coinTwo.id}.svg`);
    $('#buySymbol').text(coinTwo.symbol);
    $('#buyFullName').text(coinTwo.name);
}

function hideTrade() {
    $('.easSwapBox').css('animation', 'scale-down-top 0.4s cubic-bezier(0.250, 0.460, 0.450, 0.940) both');
    setTimeout(function() {
        $('.easSwapBox').css('display', 'none');
        $('.boxesData').css('display', 'block');
        $('.searchBar').css('transition', 'opacity 0.4s ease-in 1s');
        $('.searchBar').css('opacity', '1');
    }, 400);
    $('.boxesData').css('animation', 'scale-up-top 0.4s cubic-bezier(0.390, 0.575, 0.565, 1.000) 0.4s both');
    coinOne.val = 0;
    coinTwo.val = 0;
    $('.coinOneInput').val('');
    $('.coinTwoInput').val('');
}

function setGas(setVar) {
    if (setVar == 1) {
        $('.finalGasPrice').text(`${gasLow} GWEI`);
        finalGasPrice = gasLow;
        gasDecide = 1;
    } else if (setVar == 2) {
        $('.finalGasPrice').text(`${gasStandard} GWEI`);
        finalGasPrice = gasStandard;
        gasDecide = 2;
    } else if (setVar == 3) {
        $('.finalGasPrice').text(`${gasHigh} GWEI`);
        finalGasPrice = gasHigh;
        gasDecide = 3;
    }
    gasToTranSet(2);
    gasPriceSlider.noUiSlider.set(finalGasPrice);
}

function gasToTranSet(numCheck) {
    finalGasInWei = finalGasPrice*1000000000;
    if (numCheck == 1) {
        gasDecide = 0;
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
        $('.finalMinRate').text(`${((coinTwo.val*minRateSlider)/100).toFixed(4)} ${coinTwo.symbol} (${minRateSlider} %)`);
        $('.minConRateText span').text(`${((coinTwo.val*97)/100).toFixed(4)} ${coinTwo.symbol}`);
    } else if (toggleNum == 0) {
        $('.finalMinRate').text(`${((coinOne.val*minRateSlider)/100).toFixed(4)} ${coinOne.symbol} (${minRateSlider} %)`);
        $('.minConRateText span').text(`${((coinOne.val*97)/100).toFixed(4)} ${coinOne.symbol}`);
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
            var coinMinQty = ((coinFrom.rateInWei * minRateSlider) / 100).toFixed(0);
            if (coinFrom.id != 'eth') {
                console.log(1);
                allowance(coinFrom.contract, coinFrom.address, coinSellQty, coinTo.address, coinMinQty);
            } else {
                console.log(2);
                trade(coinFrom.address, coinSellQty, coinTo.address, account, coinMinQty, true);
            }
        } else {
            alertVar = coinFrom.symbol;
            navAlerts(10);
        }
    } else {
        navAlerts(11);
    }
}



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
    navAlerts(14);
    console.log(minDestAmount);
    startTrade(src, srcAmount, dest, account, minDestAmount, payObj);
}

