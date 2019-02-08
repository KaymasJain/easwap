// var ADD_KyberNetwork = "0x91a502C678605fbCe581eae053319747482276b9"
var ADD_reserveLister = "0x84afa106fbf9b45e369724024cae14e8c7529c26"; // Main network Lister
// var ADD_reserveLister = "0x405a5fae110c86eb2e5a76809a17fc5bee2d3ccd"; // Ropsten Lister
var ADD_coinPmlContract;
var ADD_ZERO = "0x0000000000000000000000000000000000000000";
var reserveLister;
var tokensData = {};
var tokensDataLength = 0;
var tokensReserves = {};


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

var alertVar;

var limits = {
	inUSD : 0,
	maxOrders : 0,
	minEthInWei : 0,
	minEth : 0,
	minEthToBeValidInWei : 0,
	minEthToBeValid : 0,
}