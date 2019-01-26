function ifWeb3NotConfigured() {
    // run function accordingly if web3 is not connected
}

function ifWeb3Configured() {
    KyberNetworkContract = web3.eth.contract(ABI_KyberNetworkContract);
    KyberNetwork = KyberNetworkContract.at(ADD_KyberNetwork);

    reserveListerContract = web3.eth.contract(ABI_PmlOrderbookReserveLister);
    reserveLister = reserveListerContract.at(ADD_PmlOrderbookReserveLister);

    init();
}