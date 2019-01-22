function ifWeb3NotConfigured() {
    
}

function ifWeb3Configured() {
    KyberNetworkContract = web3.eth.contract(ABI_KyberNetworkContract);
    KyberNetwork = KyberNetworkContract.at(ADD_KyberNetwork);

    PermissionlessOrderbookReserveListerContract = web3.eth.contract(ABI_PmlOrderbookReserveLister);
    PermissionlessOrderbookReserveLister = PermissionlessOrderbookReserveListerContract.at(ADD_PmlOrderbookReserveLister);

    init();
}