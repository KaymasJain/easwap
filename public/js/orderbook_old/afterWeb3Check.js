function ifWeb3NotConfigured() {
    
}

function ifWeb3Configured() {
    KyberNetworkContract = web3.eth.contract(ABI_KyberNetworkContract);
    KyberNetwork = KyberNetworkContract.at(ADD_KyberNetwork);
    KNCTokenContract = web3.eth.contract(tokensAbi).at(contractAddressKNC);
    mainContract = web3.eth.contract(tokensAbi).at(contractAddressKNC);

    reserveListerContract = web3.eth.contract(ABI_PmlOrderbookReserveLister);
    reserveLister = reserveListerContract.at(ADD_PmlOrderbookReserveLister);

    init();
}