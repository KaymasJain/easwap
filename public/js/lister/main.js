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
                                    <button class="btn btn-warning animation-on-hover btn-lg h2" type="button">ADD/VIEW ORDERBOOK</button>
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
    if (networkId == 1) {
        listCoinAdd = $('#listerInput').val();
        reserveListingStage(listCoinAdd);
    } else if (networkId) {
        navAlerts(5);
    } else {
        navAlerts(1);
    }
});

function startListing(num) {
    console.log(num);
    if (num == 0) {
        navAlerts(7);
        addOrderbookContract(listCoinAdd);
    } else if (num == 1) {
        navAlerts(8);
        initOrderbookContract(listCoinAdd);
    } else if (num == 2) {
        navAlerts(9);
        listOrderbookContract(listCoinAdd);
    } else {
        navAlerts(10);
        console.log("already listed");
    }
}

function updateListedToken(coinAddress) {
    var etherscanTokenAPI = `https://${etherscanAPI}/api?module=account&action=tokentx&contractaddress=${coinAddress}&page=1&offset=1`;
    $.get(etherscanTokenAPI, function(result) {
        var data = result.result[0];
        var coinData = {
            "cmcName" : data.tokenSymbol,
            "contractAddress" : data.contractAddress,
            "decimals" : data.tokenDecimal,
            "name" : data.tokenName,
            "symbol" : data.tokenSymbol
        }
        console.log(coinData);
        $.ajax({
            url: "/lister/add",
            type: 'POST',
            contentType:'application/json',
            data: JSON.stringify(coinData),
            dataType:'json',
            success: function (data) { 
                console.log(data);
            }
        });
	}).fail(function() {
		console.log("[ERROR] Token Addresses Not Loaded");
	});
}