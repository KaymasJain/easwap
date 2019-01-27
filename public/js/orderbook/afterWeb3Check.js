function ifWeb3NotConfigured() {
    navAlerts(1);
}

function ifWeb3Configured() {
    if (networkId == 3) {
        KncERC20Contract = web3.eth.contract(tokensAbi).at(KncDetails.contractAddress);
        CoinERC20Contract = web3.eth.contract(tokensAbi).at(coinDetails.contractAddress);
        pmlOrderbookReserveLister = web3.eth.contract(ABI_PmlOrderbookReserveLister).at(ADD_PmlOrderbookReserveLister);
        mainKyberContract = web3.eth.contract(kyberProxyABI).at(mainKyberAdd);
        init();
    } else {
        navAlerts(5);
    }
}

function init() {
    pmlOrderbookReserveLister.reserves(coinDetails.contractAddress, (err, res) => {
		if (err) {
			console.log(err);
		} else {
			if (res != ADD_ZERO) {
                ADD_coinPmlContract = res;
                coinPmlContract = web3.eth.contract(permissionLessReservesABI).at(ADD_coinPmlContract);
                loadFunctions();
			} else {
                navAlerts(6);
			}
		}
	})
}

function loadFunctions() {
    ethBalance();
    getBalance(coinDetails.contractAddress, coinDetails.symbol);
    getBalance(KncDetails.contractAddress, KncDetails.symbol);
    checkAllowance(CoinERC20Contract, coinDetails.symbol);
    checkAllowance(KncERC20Contract, KncDetails.symbol);
    makerFunds(EthDetails.contractAddress, EthDetails.symbol);
    makerFunds(coinDetails.contractAddress, coinDetails.symbol);
    makerKnc();
    getEthToCoinMakerOrders();
    getCoinToEthMakerOrders();
}
