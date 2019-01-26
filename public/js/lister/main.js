function reservesData() {
    $.get("/lister/coinsData", function(result) {
        Object.keys(result).sort()
        .forEach(function (key, i) {
            var coinData = result[key];
            var html = `<div class="listedTokenBox">
                            <div class="logoNameBox">
                                <div class="logoBox">
                                    <img src="logos/${key}.svg" style="width:64px; height:64px">
                                </div>
                                <div class="nameCodeBox">
                                    <div class="listerNameBox">${coinData.symbol}</div>
                                    <div class="listerNameToken">${coinData.name}</div>
                                </div>
                            </div>
                            <div class="btnAddOrderbook">
                                <a href="/orderbook/${coinData.symbol}">
                                    <button class="btn btn-warning animation-on-hover btn-lg h2" type="button">VIEW ORDERBOOK</button>
                                </a>
                            </div>
                        </div>`;
            $('.listedTokensContainer').append(html); 
        });
    }).fail(function() {
        console.log('Error getting data from database');
    });
}

reservesData();


$('.listBut').click(function() {
    listCoinAdd = $('#listerInput').val();
    reserveListingStage(coinAddress);
});

function startListing() {
    if (res == 0) {
        addOrderbookContract(coinAddress);
    } else if (res == 1) {
        initOrderbookContract(coinAddress);
    } else if (res == 2) {
        listOrderbookContract(coinAddress);
    } else {
        console.log("already listed");
    }
}