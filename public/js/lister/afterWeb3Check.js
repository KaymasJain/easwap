function ifWeb3NotConfigured() {
    // run function accordingly if web3 is not connected
}

function ifWeb3Configured() {
    KyberNetworkContract = web3.eth.contract(ABI_KyberNetworkContract);
    KyberNetwork = KyberNetworkContract.at(ADD_KyberNetwork);

    PermissionlessOrderbookReserveListerContract = web3.eth.contract(ABI_PmlOrderbookReserveLister);
    PermissionlessOrderbookReserveLister = PermissionlessOrderbookReserveListerContract.at(ADD_PmlOrderbookReserveLister);

    init();
}