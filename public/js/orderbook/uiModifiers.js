function updateMainUI() {
    console.log(EthToTokenOrderList);
    console.log(TokenToEthOrderList);

    updateStatsUI();
    updateNavigation();
    updateEthToTokenOrdersUI();
    updateTokenToEthOrdersUI();
    
}

function updateStatsUI(){
    var cur = "USD";
    var apiUrl = "https://min-api.cryptocompare.com/data/price?fsym=" + "ETH" + "&tsyms=" + "USD";
    $.getJSON(apiUrl, function(result) {
        EthFunds = roundUp(EthFunds, 1);
        // console.log(EthFunds * result[cur]);
        $('#ethStat').text(EthFunds);
        $('#ethRate').text(result[cur]);
        $('#ethValue').text(roundUp(EthFunds * result[cur], 1));
    });

    apiUrl = "https://min-api.cryptocompare.com/data/price?fsym=" + "KNC" + "&tsyms=" + "USD";
    $.getJSON(apiUrl, function(result) {
        KncFunds = roundUp(KncFunds, 1);
        // console.log(KncFunds * result[cur]);
        $('#kncStat').text(KncFunds);
        $('#kncRate').text(result[cur]);
        $('#kncValue').text(roundUp(KncFunds * result[cur], 1));
    });

    apiUrl = "https://min-api.cryptocompare.com/data/price?fsym=" + getActiveCoinName() + "&tsyms=" + "USD";
    $.getJSON(apiUrl, function(result) {
        TokenFunds = roundUp(TokenFunds, 1);
        // console.log(TokenFunds * result[cur]);
        $('#tokenStat').text(TokenFunds);
        $('#tokenRate').text(result[cur]);
        $('#tokenValue').text(roundUp(TokenFunds * result[cur], 1));
    });

    console.log("Updated Stats.");
}

function updateEthToTokenOrdersUI(){
    $('.content').append("<h2 class='text-center' style='margin:50px auto'>Eth to Token Orders</h2><p class='EthToTokenOrders'></p>");
    var cnt = 0;
    for (cnt=0; cnt < EthToTokenOrderList.length; EthToTokenOrderList++){
        console.log(EthToTokenOrderList[cnt]);
        
        var ETHQtyLogo = $('<div></div>')
            .addClass("ETHQtyLogo")
            .append((EthToTokenOrderList[cnt].srcAmount / (10**getTokenDetails("ETH").decimals)) + "<img src='/logos/eth.svg' height='44px' width='44px'>");

        var ETHQtyLogo2 = $('<div></div>')
            .addClass("ETHQtyLogo")
            .append((EthToTokenOrderList[cnt].dstAmount / (10**getTokenDetails(getActiveCoinName()).decimals)) + "<img src='/logos/" + getActiveCoinName() + ".svg' height='44px' width='44px'>");

        var yourPriceBox = $('<div></div>')
            .addClass("yourPriceBox")
            .append(ETHQtyLogo)
            .append("<div style='margin-top:auto;margin-bottom:auto'><i class='tim-icons icon-double-right'></i></div>")
            .append(ETHQtyLogo2)
            .append("<button class='btn btn-success animation-on-hover h2 btn-lg' style='margin-bottom:0px' type='button' onclick='updateOrder(this, " + EthToTokenOrderList[cnt].id + ")'>UPDATE</button>")
            .append("<button class='btn btn-warning animation-on-hover h2 btn-lg' style='margin-bottom:0px' type='button' onclick='cancelOrder(this, " + EthToTokenOrderList[cnt].id + ")'>CANCEL</button>");
        
        $('.EthToTokenOrders').append(yourPriceBox);
            
    }

    console.log("Done Loading " + EthToTokenOrderList.length + " EthToToken Orders");
}

function updateTokenToEthOrdersUI(){
    $('.content').append("<h2 class='text-center' style='margin:50px auto'>Token To Eth Orders</h2><p class='TokenToEthOrders'></p>");
    var cnt = 0;
    for (cnt=0; cnt < TokenToEthOrderList.length; TokenToEthOrderList++){

        var ETHQtyLogo = $('<div></div>')
            .addClass("ETHQtyLogo")
            .append((TokenToEthOrderList[cnt].srcAmount / (10**getTokenDetails("ETH").decimals)) + "<img src='/logos/eth.svg' height='44px' width='44px'>");

        var ETHQtyLogo2 = $('<div></div>')
            .addClass("ETHQtyLogo")
            .append((TokenToEthOrderList[cnt].dstAmount / (10**getTokenDetails(getActiveCoinName()).decimals)) + "<img src='/logos/" + getActiveCoinName() + ".svg' height='44px' width='44px'>");

        var yourPriceBox = $('<div></div>')
            .addClass("yourPriceBox")
            .append(ETHQtyLogo)
            .append("<div style='margin-top:auto;margin-bottom:auto'><i class='tim-icons icon-double-left'></i></div>")
            .append(ETHQtyLogo2)
            .append("<button class='btn btn-success animation-on-hover h2 btn-lg' style='margin-bottom:0px' type='button' onclick='updateOrder(this, " + TokenToEthOrderList[cnt].id + ")'>UPDATE</button>")
            .append("<button class='btn btn-warning animation-on-hover h2 btn-lg' style='margin-bottom:0px' type='button' onclick='cancelOrder(this, " + TokenToEthOrderList[cnt].id + ")'>CANCEL</button>");
        
        $('.TokenToEthOrders').append(yourPriceBox);
            
    }

    console.log("Done Loading " + TokenToEthOrderList.length + " TokenToEth Orders");
}

function updateNavigation(){
    // Navigation
    var i = 0;
    for (i = 0; i < kyberRopstenTokenList.length; i++){
        if(kyberRopstenTokenList[i].pml){        
            var li = $('<li></li>')
            .append("<a href='/orderbook/" + kyberRopstenTokenList[i].cmcName + "'><span class='sidebar-mini-icon'>D</span><span class='sidebar-normal'>" + kyberRopstenTokenList[i].cmcName + " ORDERBOOK</span></a>");

            $('#orderbooks').append(li)
        }
    }
}

function turncate(num){
    var st = (""+num).split("");
    var combine  = st[0] + st[1] + ".." + st[st.length-1];
    return combine;
}
/**
<div class="yourPriceBox">
    <div class="ETHQtyLogo">    
        1
        <img src="/logos/eth.svg" height="44px" width="44px">
    </div>
    <div style="margin-top:auto;margin-bottom:auto">
        <i class="tim-icons icon-double-right"></i>
    </div>
    <div class="ETHQtyLogo">
        99
        <img src="/logos/dai.svg" height="44px" width="44px">
    </div>
    <button class="btn btn-success animation-on-hover h2 btn-lg" style="margin-bottom:0px" type="button" onclick="updateOrder(this, id)" >UPDATE</button>
    <button class="btn btn-success animation-on-hover h2 btn-lg" style="margin-bottom:0px" type="button" onclick="cancelOrder(this, id)">CANCEL</button>
</div>
 */
