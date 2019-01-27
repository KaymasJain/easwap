function ifWeb3NotConfigured() {
    navAlerts(1);
}

function ifWeb3Configured() {
    if (networkId == 1) {
        reserveLister = web3.eth.contract(ABI_PmlOrderbookReserveLister).at(ADD_reserveLister);
    } else {
        navAlerts(5);
    }
}