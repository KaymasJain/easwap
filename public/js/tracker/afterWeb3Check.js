function ifWeb3NotConfigured() {
    navAlerts(1);
}

function ifWeb3Configured() {
    if (networkId == 1 || networkId == 3) {
        if (networkId == 3) {
            defineRopsvar();
        }
        reserveLister = web3.eth.contract(ABI_ReserveLister).at(ADD_reserveLister);
        reservesData();
    } else {
        navAlerts(5);
    }
}

function reservesData() {
    $.get(dataUrl, function(result) {
        tokensData = result;
        tokensDataLength = Object.keys(tokensData).length;;
        Object.keys(tokensData).sort()
        .forEach(function (key, i) {
            var html = `<div class="tokenOrderbooks ${key}OrdersBox">
                            <h2 class="text-center tokenOrderTitle">${tokensData[key].symbol} Orderbook</h2>
                        </div>`;
            $('.tokensTrackerContainer').append(html);
            getTokenReserve(tokensData[key]);
        });
    }).fail(function() {
        console.log('Error getting data from database');
    });
}

function defineRopsvar() {
    ADD_reserveLister = "0x405a5fae110c86eb2e5a76809a17fc5bee2d3ccd";
    KncDetails.contractAddress = "0x4E470dc7321E84CA96FcAEDD0C8aBCebbAEB68C6";
}