function cleanDecimal(num, power) {
    var MUL_DIV = 100;
    if (power) {
        MUL_DIV = 10**power;
    }
    return (Math.floor(Number(num) * MUL_DIV) / MUL_DIV);
}

function updateNavOrderbook() {
    $.get(dataUrl, function(result) {
        Object.keys(result).sort()
        .forEach(function (key, i) {
            var coinData = result[key];
            var orderbookUrl = coinData.symbol;
            if (networkId == 3) {
                orderbookUrl = `${coinData.symbol}?ropsten=true`;
            }
            var reserveToNavBar = `<li><a href="/orderbook/${orderbookUrl}">
                                    <span class="sidebar-mini-icon">${(coinData.symbol).slice(0,1)}</span>
                                    <span class="sidebar-normal">${coinData.symbol} ORDERBOOK</span>
                                </a></li>`;
            $('#orderbooks').append(reserveToNavBar);            
        });
    }).fail(function() {
        console.log('Error getting data from database');
    });
}
