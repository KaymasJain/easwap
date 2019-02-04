function ifWeb3NotConfigured() {
    navAlerts(1);
    reservesData();
}

function ifWeb3Configured() {
    if (networkId == 1 || networkId == 3) {
        if (networkId == 3) {
            defineRopsvar();
        }
        reserveLister = web3.eth.contract(ABI_PmlOrderbookReserveLister).at(ADD_reserveLister);
    } else {
        navAlerts(5);
    }
    reservesData();
    updateNavOrderbook();
}

function defineRopsvar() {
    ADD_reserveLister = "0x405a5fae110c86eb2e5a76809a17fc5bee2d3ccd";
    reservesAPI = "https://ropsten-api.kyber.network/currencies?only_official_reserve=false";
    etherscanAPI = `api-ropsten.etherscan.io`;
    dataUrl = "/lister/coinsData?ropsten=true";
}