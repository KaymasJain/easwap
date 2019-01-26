function ifWeb3NotConfigured() {
    // run function accordingly if web3 is not connected
}

function ifWeb3Configured() {
    reserveLister = web3.eth.contract(ABI_PmlOrderbookReserveLister).at(ADD_reserveLister);
    // init();
}