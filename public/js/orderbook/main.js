function modalDescUpdate(num) {
    if (num == 1) {
        $('.ethModalDepositData').text(`You can deposit maximum of ${cleanDecimal(EthDetails.balance, 3)} ETH`);
    } else if (num == 2) {
        $('.ethModalWithdrawData').text(`You can withdraw maximum of ${cleanDecimal(EthDetails.funds, 3)} ETH`);
        $('.ethToTokenSubmitData').text(`You have ${cleanDecimal(EthDetails.funds, 3)} ETH unlocked to create an order`);
    } else if (num == 3) {
        $('.tokenModalDepositData').text(`You can deposit maximum of ${cleanDecimal(coinDetails.balance, 3)} ${coinDetails.symbol}`);
    } else if (num == 4) {
        $('.tokenModalWithdrawData').text(`You can withdraw maximum of ${cleanDecimal(coinDetails.funds, 3)} ${coinDetails.symbol}`);
        $('.tokenToEthSubmitData').text(`You have ${cleanDecimal(coinDetails.funds, 3)} ${coinDetails.symbol} unlocked to create an order`);
    } else if (num == 5) {
        $('.kncModalDepositData').text(`You can deposit maximum of ${cleanDecimal(KncDetails.balance, 3)} KNC`);
    } else if (num == 6) {
        $('.kncModalWithdrawData').text(`You can withdraw maximum of ${cleanDecimal(KncDetails.funds, 3)} KNC`);
    }
}

function depositFinally(symbol) {
    alertVar = symbol;
    if (symbol == "ETH") {
        var value = $('.depositEthInput').val();
        var valueInWei = (value)*(10**18);
        navAlerts(7);
        depositEther(valueInWei);
    } else if (symbol == "KNC") {
        var value = $('.depositKncInput').val();
        var valueInWei = (value)*(10**18);
        navAlerts(7);
        depositKnc(valueInWei);
    } else {
        var value = $('.depositTokenInput').val();
        var valueInWei = (value)*(10**(coinDetails.decimals));
        navAlerts(7);
        depositCoin(valueInWei);
    }
}

function withdrawFinally(symbol) {
    alertVar = symbol;
    if (symbol == "ETH") {
        var value = $('.withdrawEthInput').val();
        var valueInWei = (value)*(10**18);
        navAlerts(8);
        withdrawEther(valueInWei);
    } else if (symbol == "KNC") {
        var value = $('.withdrawKncInput').val();
        var valueInWei = (value)*(10**18);
        navAlerts(8);
        withdrawKnc(valueInWei);
    } else {
        var value = $('.withdrawTokenInput').val();
        var valueInWei = (value)*(10**(coinDetails.decimals));
        navAlerts(8);
        withdrawCoin(valueInWei);
    }
}

function submitFinally(symbol) {
    navAlerts(9);
    if (symbol == "ETH") {
        var srcAmt = $('#ethToTokenSubmitBody input:eq(0)').val();
        var srcAmtInWei = srcAmt*(10**18);
        var dstAmt = $('#ethToTokenSubmitBody input:eq(1)').val();
        var dstAmtInWei = dstAmt*(10**(coinDetails.decimals));
        submitEthToCoinOrder(srcAmtInWei, dstAmtInWei);
    } else {
        var srcAmt = $('#tokenToEthSubmitBody input:eq(0)').val();
        var srcAmtInWei = srcAmt*(10**(coinDetails.decimals));
        var dstAmt = $('#tokenToEthSubmitBody input:eq(1)').val();
        var dstAmtInWei = dstAmt*(10**18);
        submitCoinToEthOrder(srcAmtInWei, dstAmtInWei);
    }
}

function updateFinally(symbol) {
    navAlerts(10);
    if (symbol == "ETH") {
        var srcAmt = $('#ethToTokenUpdateBody input:eq(0)').val();
        var srcAmtInWei = srcAmt*(10**18);
        var dstAmt = $('#ethToTokenUpdateBody input:eq(1)').val();
        var dstAmtInWei = dstAmt*(10**(coinDetails.decimals));
        updateEthToCoinOrder(updateOrderId, srcAmtInWei, dstAmtInWei);
    } else {
        var srcAmt = $('#tokenToEthUpdateBody input:eq(0)').val();
        var srcAmtInWei = srcAmt*(10**(coinDetails.decimals));
        var dstAmt = $('#tokenToEthUpdateBody input:eq(1)').val();
        var dstAmtInWei = dstAmt*(10**18);
        updateCoinToEthOrder(updateOrderId, srcAmtInWei, dstAmtInWei);
    }
}

function updateOrderSetId(id, symbol) {
    updateOrderId = id;
    if (symbol == "ETH") {
        var order = usersOrdersEth[id];
        var srcAmtInWei = Number(order[1]);
        var srcAmt = srcAmtInWei/(10**18);
        var dstAmtInWei = Number(order[2]);
        var dstAmt = dstAmtInWei/(10**(coinDetails.decimals));
        var text = `Your current order is <br> ${cleanDecimal(srcAmt, 3)} ETH -> ${cleanDecimal(dstAmt, 3)} ${coinDetails.symbol}.<br> You have more ${cleanDecimal(EthDetails.funds, 3)} ETH unlocked`;
        $('.ethToTokenUpdateData').html(text);
    } else {
        var order = usersOrdersToken[id];
        var srcAmtInWei = Number(order[1]);
        var srcAmt = srcAmtInWei/(10**(coinDetails.decimals));
        var dstAmtInWei = Number(order[2]);
        var dstAmt = dstAmtInWei/(10**18);
        var text = `Your current order is <br> ${cleanDecimal(srcAmt, 3)} ${coinDetails.symbol} -> ${cleanDecimal(dstAmt, 3)} ETH.<br> You have more ${cleanDecimal(coinDetails.funds, 3)} ${coinDetails.symbol} unlocked`;
        $('.tokenToEthUpdateData').html(text);
    }
}

function cancelFinally(id, symbol) {
    navAlerts(11);
    if (symbol == "ETH") {
        cancelEthToCoinOrder(id);
    } else {
        cancelCoinToEthOrder(id);
    }
}


// if num == 1 (ETH to Token orders), if num == 2 (Token to ETH orders)
function updateAllOrdersUI(id, num) {
    if (num == 1) {
        var order = usersOrdersEth[id];
        var srcAmtInWei = Number(order[1]);
        var srcAmt = srcAmtInWei/(10**18);
        var dstAmtInWei = Number(order[2]);
        var dstAmt = dstAmtInWei/(10**(coinDetails.decimals));
        var html = `<div class="yourPriceBox">
                        <div class="ethCoinPriceBox">
                            <div class="ETHQtyLogo">
                                <div><img src="/logos/eth.svg" height="44px" width="44px"></div>
                                <div class="coinOrderNameQty">${cleanDecimal(srcAmt, 3)} ETH</div>
                            </div>
                            <div style="margin-top:auto;margin-bottom:auto"><i class="tim-icons icon-double-right"></i></div>
                            <div class="ETHQtyLogo">
                                <div class="coinOrderNameQty">${cleanDecimal(dstAmt, 3)} ${coinDetails.symbol}</div>            
                                <div><img src="/logos/${coinDetails.symbol.toLowerCase()}.svg" height="44px" width="44px"></div>
                            </div>
                        </div>
                        <div class="updateCancelBut">
                            <div>
                                <button class='btn btn-success animation-on-hover h2 btn-lg' type='button' onclick='updateOrderSetId("${id}", "ETH")' data-toggle="modal" data-target="#ethToTokenUpdate" style="margin-bottom: 0px">UPDATE</button>
                            </div>
                            <div>
                                <button class='btn btn-danger animation-on-hover h2 btn-lg' type='button' onclick='cancelFinally("${id}", "ETH")' style="margin-bottom: 0px">CANCEL</button>
                            </div>
                        </div>
                    </div>`;
        $('#ethToTokenOrders').append(html);
    } else {
        var order = usersOrdersToken[id];
        var srcAmtInWei = Number(order[1]);
        var srcAmt = srcAmtInWei/(10**(coinDetails.decimals));
        var dstAmtInWei = Number(order[2]);
        var dstAmt = dstAmtInWei/(10**18);
        var html = `<div class="yourPriceBox">
                        <div class="ethCoinPriceBox">
                            <div class="ETHQtyLogo">
                                <div><img src="/logos/${coinDetails.symbol.toLowerCase()}.svg" height="44px" width="44px"></div>
                                <div class="coinOrderNameQty">${cleanDecimal(srcAmt, 3)} ${coinDetails.symbol}</div>
                            </div>
                            <div style="margin-top:auto;margin-bottom:auto"><i class="tim-icons icon-double-right"></i></div>
                            <div class="ETHQtyLogo">
                                <div class="coinOrderNameQty">${cleanDecimal(dstAmt, 3)} ETH</div>            
                                <div><img src="/logos/eth.svg" height="44px" width="44px"></div>
                            </div>
                        </div>
                        <div class="updateCancelBut">
                            <div>
                                <button class='btn btn-success animation-on-hover h2 btn-lg' type='button' onclick='updateOrderSetId("${id}", "{{coinName}}")' data-toggle="modal" data-target="#tokenToEthUpdate" style="margin-bottom: 0px">UPDATE</button>
                            </div>
                            <div>
                                <button class='btn btn-danger animation-on-hover h2 btn-lg' type='button' onclick='cancelFinally("${id}", "{{coinName}}")' style="margin-bottom: 0px">CANCEL</button>
                            </div>
                        </div>
                    </div>`;
        $('#tokenToEthOrders').append(html);
    }
}

function tokenToUsd(symbol, cur="USD"){
    var apiUrl = `https://min-api.cryptocompare.com/data/price?fsym=${symbol}&tsyms=${cur}`;
    $.getJSON(apiUrl, function(result) {
        if (symbol == "ETH") {
            EthDetails.USD = result[cur];
            $('#ethRate').text(cleanDecimal(EthDetails.USD, 3));
        } else if (symbol == "KNC") {
            KncDetails.USD = result[cur];
            $('#kncRate').text(cleanDecimal(KncDetails.USD, 3));
        } else {
            coinDetails.USD = result[cur];
            $('#tokenRate').text(cleanDecimal(coinDetails.USD, 3));
        }
    });
}

tokenToUsd("ETH");
tokenToUsd("KNC");
tokenToUsd(coinDetails.symbol);