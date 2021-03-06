function reservesData() {
    $.get(dataUrl, function(result) {
        Object.keys(result).sort()
        .forEach(function (key, i) {
            var coinData = result[key];
            check(`logos/${key}.svg`).on("error", function(e) {
                var icon = `<i class="tim-icons icon-alert-circle-exc" style="font-size: 64px; color:var(--primary)"></i>`;
                $(`.${key}LogoBox`).html(icon);
            }).on("load", function(e) {
                var icon = `<img src="logos/${key}.svg" style="width:64px; height:64px">`;
                $(`.${key}LogoBox`).html(icon);
            });
            listBoxes(coinData, key);
        });
    }).fail(function() {
        console.log('Error getting data from database');
    });
}

function listBoxes(coinData, key) {
    var orderbookUrl = coinData.symbol;
    if (networkId == 3) {
        orderbookUrl = `${coinData.symbol}?ropsten=true`;
    }
    var html = `<div class="listedTokenBox">
                    <div class="logoNameBox">
                        <div class="logoBox ${key}LogoBox"></div>
                        <div class="nameCodeBox">
                            <div class="listerNameBox">${coinData.symbol}</div>
                            <div class="listerNameToken">${coinData.name}</div>
                        </div>
                    </div>
                    <div class="btnAddOrderbook">
                        <a href="/orderbook/${orderbookUrl}">
                            <button class="btn btn-warning animation-on-hover btn-lg h2" type="button">ADD/VIEW ORDERBOOK</button>
                        </a>
                    </div>
                </div>`;
    $('.listedTokensContainer').append(html); 
}

function check(src) {
  return $("<img>").attr('src', src);
}

$('.listBut').click(function() {
    if (networkId == 1 || networkId == 3) {
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
            "symbol" : data.tokenSymbol,
            "ropsten" : false
        }
        if (networkId == 3) {
            coinData.ropsten = true;
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