// var ADD_KyberNetwork = "0x91a502C678605fbCe581eae053319747482276b9"
var ADD_PmlOrderbookReserveLister = "0x405a5fae110c86eb2e5a76809a17fc5bee2d3ccd"; // Ropsten Lister
var ADD_coinPmlContract;
var ADD_ZERO = "0x0000000000000000000000000000000000000000";
var pmlOrderbookReserveLister;
var coinPmlContract;

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
	"contractAddress" : "0x4E470dc7321E84CA96FcAEDD0C8aBCebbAEB68C6",
	"decimals" : 18,
	"name" : "Kyber Network",
	"symbol" : "KNC"
}

// Hash of all the transaction user do when he/she online
var txArr = [];

var usersOrdersEth = {};
var usersOrdersToken = {};

// store order id when clicked on update button
var updateOrderId;