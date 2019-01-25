$('#depositEthFinally').click(function() {
    let value = $('.#depositEthInput').val();
    
});

function modalDescUpdate(num) {
    if (num == 1) {
        $('.ethModalDepositData').text(`You can deposit maximum of ${(EthDetails.balance).toFixed(3)} ETH`);
    } else if (num == 2) {
        $('.ethModalWithdrawData').text(`You can withdraw maximum of ${(EthDetails.funds).toFixed(3)} ETH`);
        $('.ethToTokenSubmitData').text(`You have ${(EthDetails.funds).toFixed(3)} ETH unlocked to create an order`);
    } else if (num == 3) {
        $('.tokenModalDepositData').text(`You can deposit maximum of ${(coinDetails.balance).toFixed(3)} ${coinDetails.symbol}`);
    } else if (num == 4) {
        $('.tokenModalWithdrawData').text(`You can withdraw maximum of ${(coinDetails.funds).toFixed(3)} ${coinDetails.symbol}`);
        $('.tokenToEthSubmitData').text(`You have ${(coinDetails.funds).toFixed(3)} ${coinDetails.symbol} unlocked to create an order`);
    } else if (num == 5) {
        $('.kncModalDepositData').text(`You can deposit maximum of ${(KncDetails.balance).toFixed(3)} KNC`);
    } else if (num == 6) {
        $('.kncModalWithdrawData').text(`You can withdraw maximum of ${(KncDetails.funds).toFixed(3)} KNC`);
    }
}

function depositFinally(symbol) {
    if (symbol == "ETH") {
        var value = $('.depositEthInput').val();
        var valueInWei = (value)*(10**18);
        depositEther(valueInWei);
    } else if (symbol == "KNC") {
        var value = $('.depositKncInput').val();
        var valueInWei = (value)*(10**18);
        depositKnc(valueInWei);
    } else {
        var value = $('.depositTokenInput').val();
        var valueInWei = (value)*(10**(coinDetails.decimals));
        depositCoin(valueInWei);
    }
}

function withdrawFinally(symbol) {
    if (symbol == "ETH") {
        var value = $('.withdrawEthInput').val();
        var valueInWei = (value)*(10**18);
        withdrawEther(valueInWei);
    } else if (symbol == "KNC") {
        var value = $('.withdrawKncInput').val();
        var valueInWei = (value)*(10**18);
        withdrawKnc(valueInWei);
    } else {
        var value = $('.withdrawTokenInput').val();
        var valueInWei = (value)*(10**(coinDetails.decimals));
        withdrawCoin(valueInWei);
    }
}

function submitFinally(symbol) {
    if (symbol == "ETH") {
        var srcAmt = ($('#ethToTokenSubmit input')[0]).val();
        var dstAmt = ($('#ethToTokenSubmit input')[1]).val();
        alert(srcAmt, dstAmt);
        // submitEthToCoinOrder(srcAmt, dstAmt);
    } else {

    }
}