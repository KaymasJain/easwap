// var ADD_KyberNetwork = "0x91a502C678605fbCe581eae053319747482276b9"
var ADD_reserveLister = "0x84afa106fbf9b45e369724024cae14e8c7529c26"; // Main network Lister
// var ADD_PmlOrderbookReserveLister = "0x405a5fae110c86eb2e5a76809a17fc5bee2d3ccd"; // Ropsten Lister
var ADD_coinPmlContract;
var ADD_ZERO = "0x0000000000000000000000000000000000000000";
var pmlOrderbookReserveLister;
var coinPmlContract;

// Kyber Proxy contract
var mainKyberAdd = '0x818E6FECD516Ecc3849DAf6845e3EC868087B755'; // Main network and Ropsten address are same
var mainKyberContract;

// KNC ERC20 contract
var KncERC20Contract;

// Coin ERC20 contract
var CoinERC20Contract;

// coinDetails
var coinDetails = {
	"cmcName" : $('#coinCmcName').text(),
	"contractAddress" : $('#coinContractAdd').text(),
	"decimals" : Number($('#coinDecimals').text()),
	"name" : $('#coinName').text(),
	"symbol" : $('#coinSymbol').text()
};

var EthDetails = {
	"cmcName" : "ETH",
	"contractAddress" : "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee",
	"decimals" : 18,
	"name" : "Ethereum",
	"symbol" : "ETH"
}

// Ropsten KNC details
var KncDetails = {
	"cmcName" : "KNC",
	"contractAddress" : "0xdd974d5c2e2928dea5f71b9825b8b646686bd200",
	"decimals" : 18,
	"name" : "Kyber Network",
	"symbol" : "KNC"
}

// Ropsten KNC contract address
// KncDetails.contractAddress = "0x4E470dc7321E84CA96FcAEDD0C8aBCebbAEB68C6";

// Hash of all the transaction user do when he/she online
var txArr = [];

// Users all orders.....  (value is total worth of assets in use for orders)
var usersOrdersEth = {};
usersOrdersEth.valueInWei = 0;
usersOrdersEth.value = 0;
var usersOrdersToken = {};
usersOrdersToken.valueInWei = 0;
usersOrdersToken.value = 0;

// store order id when clicked on update button
var updateOrderId;

// total assets locked and unlocked
var totalAssets = {
	"ethInWei": 0,
	"eth": 0,
	"kncInWei": 0,
	"knc": 0,
	"coinInWei": 0,
	"coin": 0
}

var alertVar;

// Current price on kyber network
var currentPrice = {
	ethToToken : 0,
	ethToTokenInWei : 0,
	tokenToEth : 0,
	tokenToEthInWei : 0
}