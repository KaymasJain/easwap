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
        Object.keys(tokensData)
        .forEach(function (key, i) {
            console.log(tokensData[key]);
        });
    }).fail(function() {
        console.log('Error getting data from database');
    });
}

function defineRopsvar() {
    ADD_reserveLister = "0x405a5fae110c86eb2e5a76809a17fc5bee2d3ccd";
    KncDetails.contractAddress = "0x4E470dc7321E84CA96FcAEDD0C8aBCebbAEB68C6";
}