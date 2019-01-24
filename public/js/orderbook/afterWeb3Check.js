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
                coinPmlContract = web3.eth.contract(permissionLessReservesABI).at(ADD_PmlOrderbookReserveLister);
			} else {
                alert('not a permission less reserve');
                console.log('not a permission less reserve');
			}
		}
	})
}