function ifWeb3NotConfigured() {
    dataAsPerNetwork();
}

function ifWeb3Configured() {
    dataAsPerNetwork();
    loadContractFunc();
}

function loadContractFunc() {
    mainKyberContract = web3.eth.contract(kyberMainABI).at(mainKyberAdd);
    kyberEnable();
    kyberTradeEvent();
}