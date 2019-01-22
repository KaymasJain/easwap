function updateMainUI(cmcName){
    getEthToTokenOrderList(cmcName);
    getTokenToEthOrderList(cmcName);
    console.log(EthToTokenOrderList);
    console.log(TokenToEthOrderList);
}