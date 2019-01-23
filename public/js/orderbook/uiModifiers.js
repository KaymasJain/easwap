function updateMainUI() {
    console.log(EthToTokenOrderList);
    console.log(TokenToEthOrderList);
 
    var cnt = 0;
    for (cnt=0; cnt < EthToTokenOrderList.length; EthToTokenOrderList++){
        console.log(EthToTokenOrderList[cnt]);
        
        var ETHQtyLogo = $('<div></div>')
            .addClass("ETHQtyLogo")
            .append(turncate(EthToTokenOrderList[cnt].srcAmount) + "<img src='/logos/eth.svg' height='44px' width='44px'>");

        var ETHQtyLogo2 = $('<div></div>')
            .addClass("ETHQtyLogo")
            .append(turncate(EthToTokenOrderList[cnt].dstAmount) + "<img src='/logos/" + getActiveCoinName() + ".svg' height='44px' width='44px'>");

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
    
    for (cnt=0; cnt < TokenToEthOrderList.length; TokenToEthOrderList++){

        var ETHQtyLogo = $('<div></div>')
            .addClass("ETHQtyLogo")
            .append(turncate(TokenToEthOrderList[cnt].srcAmount) + "<img src='/logos/eth.svg' height='44px' width='44px'>");

        var ETHQtyLogo2 = $('<div></div>')
            .addClass("ETHQtyLogo")
            .append(turncate(TokenToEthOrderList[cnt].dstAmount) + "<img src='/logos/" + getActiveCoinName() + ".svg' height='44px' width='44px'>");

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

    var i = 0;
    for (i = 0; i < kyberRopstenTokenList.length; i++){
        if(kyberRopstenTokenList[i].pml){
            // Navigation
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
