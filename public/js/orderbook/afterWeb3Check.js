function ifWeb3NotConfigured() {
    
}

function ifWeb3Configured() {
    if (networkId == 3) {
        KncERC20Contract = web3.eth.contract(tokensAbi).at(KncDetails.contractAddress);
        CoinERC20Contract = web3.eth.contract(tokensAbi).at(coinDetails.contractAddress);
        pmlOrderbookReserveLister = web3.eth.contract(ABI_PmlOrderbookReserveLister).at(ADD_PmlOrderbookReserveLister);
        init();
    } else {
        alert('shift to ropsten');
        console.log('shift to ropsten');
    }
}

function init() {
    pmlOrderbookReserveLister.reserves(coinDetails.contractAddress, (err, res) => {
		if (err) {
			console.log(err);
		} else {
			if (res != ADD_ZERO) {
                ADD_coinPmlContract = res;
                console.log(res);
                coinPmlContract = web3.eth.contract(permissionLessReservesABI).at(ADD_coinPmlContract);
                loadFunctions();
			} else {
                alert('not a permission less reserve');
                console.log('not a permission less reserve');
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
    // approve(CoinERC20Contract, coinDetails.symbol);
    // approve(KncERC20Contract, KncDetails.symbol);
    // depositCoin(10**20);
    // depositEther(10**18);
    // depositKnc(10**20);
    makerFunds(EthDetails.contractAddress, EthDetails.symbol);
    makerFunds(coinDetails.contractAddress, coinDetails.symbol);
    makerKnc();
    // submitEthToCoinOrder(10**18, 10**20);
    // submitCoinToEthOrder(10**20, 10**18);
    getEthToCoinMakerOrders();
    getCoinToEthMakerOrders();
}
