function dataAsPerNetwork() {
    var dataUrl = "/trade/tradeData";
    if (networkId == 3) {
        dataUrl = "/trade/tradeData?ropsten=true";
    }
    $.get(dataUrl, function(data, status){
        $('.loaderBox').css('display', 'none');
        $('.loader').css('display', 'none');
        coinsData = data;
        showBoxes();
    });
}