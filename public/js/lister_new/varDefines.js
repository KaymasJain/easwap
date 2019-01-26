var kyberRopstenTokensJSON = "";
var kyberRopstenTokenList = [];
var kyberRopstenTokenCount = 0;
var ADD_KyberNetwork = "0x91a502C678605fbCe581eae053319747482276b9"
var ADD_PmlOrderbookReserveLister = "0x405a5fae110c86eb2e5a76809a17fc5bee2d3ccd"
var ADD_ZERO = "0x0000000000000000000000000000000000000000"

function structFactory(names) {
	var names = names.split(' ');
	var count = names.length;

	function constructor() {
		for (var i = 0; i < count; i++) {
			this[names[i]] = arguments[i];
		}
	}
	return constructor;
}

var Tok = structFactory("cmcName contractAddress decimals name symbol pml reserveAddress");
var EthToTokenOrder = structFactory("maker srcAmount dstAmount");
var TokenToEthOrder = structFactory("maker srcAmount dstAmount");

var KyberNetworkContract = "";
var KyberNetwork = "";

var PermissionlessOrderbookReserveListerContract = "";
var PermissionlessOrderbookReserveLister = "";