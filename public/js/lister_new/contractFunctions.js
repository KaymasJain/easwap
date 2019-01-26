/**
 * @def Determines whether the the coin has a permissionless reserve.
 * @param {Token} required Token data to check.
 */

function isPML(obj) {
	PermissionlessOrderbookReserveLister.reserves(obj.contractAddress, (err, res) => {
		if (err) {
			console.log(err);
		} else {
			if (res != ADD_ZERO) {
                console.log("it's permissionless reserve");
                console.log(res);
			}
		}
	})
}


/**
 * @def Add orderbook Contract
 * @param {Address} required Coin Address to run function for
 */
function addOrderbookContract(add) {
	PermissionlessOrderbookReserveLister.addOrderbookContract(add, (err, res) => {
		if (err) {
			console.log(err);
		} else {
			console.log(res)
			stage = 1
		}
	})
}


/**
 * @def Init orderbook Contract
 * @param {Address} required Coin Address to run function for
 */
function initOrderbookContract(add) {
	PermissionlessOrderbookReserveLister.initOrderbookContract(add, (err, res) => {
		if (err) {
			console.log(err);
		} else {
			console.log(res);
		}
	})
}


/**
 * @def List orderbook Contract
 * @param {Address} required Coin Address to run function for
 */
function listOrderbookContract(add) {
	PermissionlessOrderbookReserveLister.listOrderbookContract(add, (err, res) => {
		if (err) {
			console.log(err);
		} else {
			console.log(res)

		}
	})
}