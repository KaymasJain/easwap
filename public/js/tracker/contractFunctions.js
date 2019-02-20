function getTokenReserve(tokenData) {
    reserveLister.reserves(tokenData.contractAddress, (err, res) => {
		if (err) {
			console.log(err);
		} else {
			if (res != ADD_ZERO) {
                var id = tokenData.symbol.toLowerCase();
                tokensReserves[id] = web3.eth.contract(permissionLessReservesABI).at(res);
                getEthToCoinOrder(id);
                getCoinToEthOrder(id);
			}
		}
	});
}

/**
 * @def pmlReserve function to get ETH TO TOKEN order details
 * @param {id} required id - order id
 */
function getEthToCoinOrderById(id, orderId) {
    tokensReserves[id].getEthToTokenOrder(orderId, (err, res) => {
        if (err) {
            console.log(err);
        } else {
            var coinOneQty = cleanDecimal(Number(res[1]/10**18), 3);
            var coinTwoQty = cleanDecimal(Number(res[2]/10**(tokensData[id].decimals)), 3);
            $(`.${id}OrdersBox`).css('display', 'block');
            var html = `<h3 class="text-center" style="margin: 20px auto">${coinOneQty} ETH -> ${coinTwoQty} ${tokensData[id].symbol}</h3>`;
            $(`.${id}OrdersBox`).append(html);
        }
    });
}

/**
 * @def pmlReserve function to get ETH TO TOKEN full orderbook
 */
function getEthToCoinOrder(id) {
    tokensReserves[id].getEthToTokenOrderList((err, res) => {
        if (err) {
            console.log(err);
        } else {
            for (i = 0; i < res.length; i++) {
                console.log(Number(res[i]));
                getEthToCoinOrderById(id, Number(res[i]));
            }
        }
    })
}


/**
 * @def pmlReserve function to get TOKEN TO ETH order details
 * @param {id} required id - order id
 */
function getCoinToEthOrderById(id, orderId) {
    tokensReserves[id].getTokenToEthOrder(orderId, (err, res) => {
        if (err) {
            console.log(err);
        } else {
            var coinOneQty = cleanDecimal(Number(res[1]/10**(tokensData[id].decimals)), 3);
            var coinTwoQty = cleanDecimal(Number(res[2]/10**18), 3);
            $(`.${id}OrdersBox`).css('display', 'block');
            var html = `<h3 class="text-center" style="margin: 20px auto">${coinOneQty} ${tokensData[id].symbol} -> ${coinTwoQty} ETH</h3>`;
            $(`.${id}OrdersBox`).append(html);
        }
    });
}

/**
 * @def pmlReserve function to get TOKEN TO ETH full orderbook
 */
function getCoinToEthOrder(id) {
    tokensReserves[id].getTokenToEthOrderList((err, res) => {
        if (err) {
            console.log(err);
        } else {
            for (i = 0; i < res.length; i++) {
                console.log(Number(res[i]));
                getCoinToEthOrderById(id, Number(res[i]));
            }
        }
    });
}
