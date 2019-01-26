function ifWeb3NotConfigured() {
    navAlerts(1);
}

function ifWeb3Configured() {
    reserveLister = web3.eth.contract(ABI_PmlOrderbookReserveLister).at(ADD_reserveLister);
}