function reservesData() {
    $.get("/lister/coinsData", function(result) {
        Object.keys(result).sort()
        .forEach(function (key, i) {
            var coinData = result[key];
            check(`logos/${key}.svg`).on("error", function(e) {
                coinData.icon = `<i class="tim-icons icon-alert-circle-exc" style="font-size: 64px; color:var(--primary)"></i>`;
                listBoxes(coinData);
            }).on("load", function(e) {
                coinData.icon = `<img src="logos/${key}.svg" style="width:64px; height:64px">`;
                listBoxes(coinData);
            });
        });
    }).fail(function() {
        console.log('Error getting data from database');
    });
}

function listBoxes(coinData) {
    var html = `<div class="listedTokenBox">
                    <div class="logoNameBox">
                        <div class="logoBox">
                            ${coinData.icon}
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
}

reservesData();

function check(src) {
  return $("<img>").attr('src', src);
}

$('.listBut').click(function() {
    if (networkId == 1) {
        listCoinAdd = $('#listerInput').val();
        if (listCoinAdd) {
            reserveListingStage(listCoinAdd);
        } else {
            navAlerts(13);
        }
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