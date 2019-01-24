/*

@ Description

ABI_PmlOrderbookReserveLister
ABI_KyberNetworkContract

*/

var ABI_PmlOrderbookReserveLister = [
    {
        "constant":true,
        "inputs":[
            {
                "name":"",
                "type":"address"
            }
        ],
        "name":"reserveListingStage",
        "outputs":[
            {
                "name":"",
                "type":"uint8"
            }
        ],
        "payable":false,
        "stateMutability":"view",
        "type":"function"
    },
    {
        "constant":false,
        "inputs":[
            {
                "name":"token",
                "type":"address"
            }
        ],
        "name":"listOrderbookContract",
        "outputs":[
            {
                "name":"",
                "type":"bool"
            }
        ],
        "payable":false,
        "stateMutability":"nonpayable",
        "type":"function"
    },
    {
        "constant":false,
        "inputs":[
            {
                "name":"token",
                "type":"address"
            }
        ],
        "name":"addOrderbookContract",
        "outputs":[
            {
                "name":"",
                "type":"bool"
            }
        ],
        "payable":false,
        "stateMutability":"nonpayable",
        "type":"function"
    },
    {
        "constant":true,
        "inputs":[

        ],
        "name":"kyberNetworkContract",
        "outputs":[
            {
                "name":"",
                "type":"address"
            }
        ],
        "payable":false,
        "stateMutability":"view",
        "type":"function"
    },
    {
        "constant":true,
        "inputs":[

        ],
        "name":"maxOrdersPerTrade",
        "outputs":[
            {
                "name":"",
                "type":"uint256"
            }
        ],
        "payable":false,
        "stateMutability":"view",
        "type":"function"
    },
    {
        "constant":true,
        "inputs":[

        ],
        "name":"kncToken",
        "outputs":[
            {
                "name":"",
                "type":"address"
            }
        ],
        "payable":false,
        "stateMutability":"view",
        "type":"function"
    },
    {
        "constant":false,
        "inputs":[
            {
                "name":"token",
                "type":"address"
            },
            {
                "name":"hintReserveIndex",
                "type":"uint256"
            }
        ],
        "name":"unlistOrderbookContract",
        "outputs":[

        ],
        "payable":false,
        "stateMutability":"nonpayable",
        "type":"function"
    },
    {
        "constant":true,
        "inputs":[

        ],
        "name":"orderFactoryContract",
        "outputs":[
            {
                "name":"",
                "type":"address"
            }
        ],
        "payable":false,
        "stateMutability":"view",
        "type":"function"
    },
    {
        "constant":true,
        "inputs":[

        ],
        "name":"ORDERBOOK_BURN_FEE_BPS",
        "outputs":[
            {
                "name":"",
                "type":"uint256"
            }
        ],
        "payable":false,
        "stateMutability":"view",
        "type":"function"
    },
    {
        "constant":false,
        "inputs":[
            {
                "name":"token",
                "type":"address"
            }
        ],
        "name":"initOrderbookContract",
        "outputs":[
            {
                "name":"",
                "type":"bool"
            }
        ],
        "payable":false,
        "stateMutability":"nonpayable",
        "type":"function"
    },
    {
        "constant":true,
        "inputs":[
            {
                "name":"",
                "type":"address"
            }
        ],
        "name":"reserves",
        "outputs":[
            {
                "name":"",
                "type":"address"
            }
        ],
        "payable":false,
        "stateMutability":"view",
        "type":"function"
    },
    {
        "constant":true,
        "inputs":[

        ],
        "name":"minNewOrderValueUsd",
        "outputs":[
            {
                "name":"",
                "type":"uint256"
            }
        ],
        "payable":false,
        "stateMutability":"view",
        "type":"function"
    },
    {
        "constant":true,
        "inputs":[
            {
                "name":"token",
                "type":"address"
            }
        ],
        "name":"getOrderbookListingStage",
        "outputs":[
            {
                "name":"",
                "type":"address"
            },
            {
                "name":"",
                "type":"uint8"
            }
        ],
        "payable":false,
        "stateMutability":"view",
        "type":"function"
    },
    {
        "constant":true,
        "inputs":[

        ],
        "name":"medianizerContract",
        "outputs":[
            {
                "name":"",
                "type":"address"
            }
        ],
        "payable":false,
        "stateMutability":"view",
        "type":"function"
    },
    {
        "inputs":[
            {
                "name":"kyber",
                "type":"address"
            },
            {
                "name":"factory",
                "type":"address"
            },
            {
                "name":"medianizer",
                "type":"address"
            },
            {
                "name":"knc",
                "type":"address"
            },
            {
                "name":"unsupportedTokens",
                "type":"address[]"
            },
            {
                "name":"maxOrders",
                "type":"uint256"
            },
            {
                "name":"minOrderValueUsd",
                "type":"uint256"
            }
        ],
        "payable":false,
        "stateMutability":"nonpayable",
        "type":"constructor"
    },
    {
        "anonymous":false,
        "inputs":[
            {
                "indexed":false,
                "name":"token",
                "type":"address"
            },
            {
                "indexed":false,
                "name":"stage",
                "type":"uint8"
            }
        ],
        "name":"TokenOrderbookListingStage",
        "type":"event"
    }
]

var ABI_KyberNetworkContract = [
    {
        "constant":false,
        "inputs":[
            {
                "name":"alerter",
                "type":"address"
            }
        ],
        "name":"removeAlerter",
        "outputs":[

        ],
        "payable":false,
        "stateMutability":"nonpayable",
        "type":"function"
    },
    {
        "constant":false,
        "inputs":[
            {
                "name":"trader",
                "type":"address"
            },
            {
                "name":"src",
                "type":"address"
            },
            {
                "name":"srcAmount",
                "type":"uint256"
            },
            {
                "name":"dest",
                "type":"address"
            },
            {
                "name":"destAddress",
                "type":"address"
            },
            {
                "name":"maxDestAmount",
                "type":"uint256"
            },
            {
                "name":"minConversionRate",
                "type":"uint256"
            },
            {
                "name":"walletId",
                "type":"address"
            },
            {
                "name":"hint",
                "type":"bytes"
            }
        ],
        "name":"tradeWithHint",
        "outputs":[
            {
                "name":"",
                "type":"uint256"
            }
        ],
        "payable":true,
        "stateMutability":"payable",
        "type":"function"
    },
    {
        "constant":true,
        "inputs":[

        ],
        "name":"getReserves",
        "outputs":[
            {
                "name":"",
                "type":"address[]"
            }
        ],
        "payable":false,
        "stateMutability":"view",
        "type":"function"
    },
    {
        "constant":true,
        "inputs":[
            {
                "name":"",
                "type":"bytes32"
            }
        ],
        "name":"infoFields",
        "outputs":[
            {
                "name":"",
                "type":"uint256"
            }
        ],
        "payable":false,
        "stateMutability":"view",
        "type":"function"
    },
    {
        "constant":false,
        "inputs":[
            {
                "name":"feeBurner",
                "type":"address"
            }
        ],
        "name":"setFeeBurner",
        "outputs":[

        ],
        "payable":false,
        "stateMutability":"nonpayable",
        "type":"function"
    },
    {
        "constant":true,
        "inputs":[

        ],
        "name":"enabled",
        "outputs":[
            {
                "name":"",
                "type":"bool"
            }
        ],
        "payable":false,
        "stateMutability":"view",
        "type":"function"
    },
    {
        "constant":true,
        "inputs":[

        ],
        "name":"pendingAdmin",
        "outputs":[
            {
                "name":"",
                "type":"address"
            }
        ],
        "payable":false,
        "stateMutability":"view",
        "type":"function"
    },
    {
        "constant":true,
        "inputs":[

        ],
        "name":"getOperators",
        "outputs":[
            {
                "name":"",
                "type":"address[]"
            }
        ],
        "payable":false,
        "stateMutability":"view",
        "type":"function"
    },
    {
        "constant":true,
        "inputs":[
            {
                "name":"",
                "type":"address"
            },
            {
                "name":"",
                "type":"uint256"
            }
        ],
        "name":"reservesPerTokenSrc",
        "outputs":[
            {
                "name":"",
                "type":"address"
            }
        ],
        "payable":false,
        "stateMutability":"view",
        "type":"function"
    },
    {
        "constant":false,
        "inputs":[
            {
                "name":"whiteList",
                "type":"address"
            }
        ],
        "name":"setWhiteList",
        "outputs":[

        ],
        "payable":false,
        "stateMutability":"nonpayable",
        "type":"function"
    },
    {
        "constant":false,
        "inputs":[
            {
                "name":"token",
                "type":"address"
            },
            {
                "name":"amount",
                "type":"uint256"
            },
            {
                "name":"sendTo",
                "type":"address"
            }
        ],
        "name":"withdrawToken",
        "outputs":[

        ],
        "payable":false,
        "stateMutability":"nonpayable",
        "type":"function"
    },
    {
        "constant":true,
        "inputs":[

        ],
        "name":"maxGasPrice",
        "outputs":[
            {
                "name":"",
                "type":"uint256"
            }
        ],
        "payable":false,
        "stateMutability":"view",
        "type":"function"
    },
    {
        "constant":false,
        "inputs":[
            {
                "name":"newAlerter",
                "type":"address"
            }
        ],
        "name":"addAlerter",
        "outputs":[

        ],
        "payable":false,
        "stateMutability":"nonpayable",
        "type":"function"
    },
    {
        "constant":true,
        "inputs":[

        ],
        "name":"negligibleRateDiff",
        "outputs":[
            {
                "name":"",
                "type":"uint256"
            }
        ],
        "payable":false,
        "stateMutability":"view",
        "type":"function"
    },
    {
        "constant":true,
        "inputs":[

        ],
        "name":"feeBurnerContract",
        "outputs":[
            {
                "name":"",
                "type":"address"
            }
        ],
        "payable":false,
        "stateMutability":"view",
        "type":"function"
    },
    {
        "constant":false,
        "inputs":[
            {
                "name":"expectedRate",
                "type":"address"
            }
        ],
        "name":"setExpectedRate",
        "outputs":[

        ],
        "payable":false,
        "stateMutability":"nonpayable",
        "type":"function"
    },
    {
        "constant":true,
        "inputs":[

        ],
        "name":"expectedRateContract",
        "outputs":[
            {
                "name":"",
                "type":"address"
            }
        ],
        "payable":false,
        "stateMutability":"view",
        "type":"function"
    },
    {
        "constant":true,
        "inputs":[

        ],
        "name":"whiteListContract",
        "outputs":[
            {
                "name":"",
                "type":"address"
            }
        ],
        "payable":false,
        "stateMutability":"view",
        "type":"function"
    },
    {
        "constant":false,
        "inputs":[
            {
                "name":"field",
                "type":"bytes32"
            },
            {
                "name":"value",
                "type":"uint256"
            }
        ],
        "name":"setInfo",
        "outputs":[

        ],
        "payable":false,
        "stateMutability":"nonpayable",
        "type":"function"
    },
    {
        "constant":true,
        "inputs":[
            {
                "name":"user",
                "type":"address"
            }
        ],
        "name":"getUserCapInWei",
        "outputs":[
            {
                "name":"",
                "type":"uint256"
            }
        ],
        "payable":false,
        "stateMutability":"view",
        "type":"function"
    },
    {
        "constant":true,
        "inputs":[

        ],
        "name":"isEnabled",
        "outputs":[
            {
                "name":"",
                "type":"bool"
            }
        ],
        "payable":false,
        "stateMutability":"view",
        "type":"function"
    },
    {
        "constant":false,
        "inputs":[
            {
                "name":"newAdmin",
                "type":"address"
            }
        ],
        "name":"transferAdmin",
        "outputs":[

        ],
        "payable":false,
        "stateMutability":"nonpayable",
        "type":"function"
    },
    {
        "constant":false,
        "inputs":[
            {
                "name":"_enable",
                "type":"bool"
            }
        ],
        "name":"setEnable",
        "outputs":[

        ],
        "payable":false,
        "stateMutability":"nonpayable",
        "type":"function"
    },
    {
        "constant":false,
        "inputs":[

        ],
        "name":"claimAdmin",
        "outputs":[

        ],
        "payable":false,
        "stateMutability":"nonpayable",
        "type":"function"
    },
    {
        "constant":true,
        "inputs":[

        ],
        "name":"kyberNetworkProxyContract",
        "outputs":[
            {
                "name":"",
                "type":"address"
            }
        ],
        "payable":false,
        "stateMutability":"view",
        "type":"function"
    },
    {
        "constant":true,
        "inputs":[
            {
                "name":"",
                "type":"address"
            }
        ],
        "name":"isReserve",
        "outputs":[
            {
                "name":"",
                "type":"bool"
            }
        ],
        "payable":false,
        "stateMutability":"view",
        "type":"function"
    },
    {
        "constant":false,
        "inputs":[
            {
                "name":"newAdmin",
                "type":"address"
            }
        ],
        "name":"transferAdminQuickly",
        "outputs":[

        ],
        "payable":false,
        "stateMutability":"nonpayable",
        "type":"function"
    },
    {
        "constant":true,
        "inputs":[

        ],
        "name":"getAlerters",
        "outputs":[
            {
                "name":"",
                "type":"address[]"
            }
        ],
        "payable":false,
        "stateMutability":"view",
        "type":"function"
    },
    {
        "constant":true,
        "inputs":[
            {
                "name":"src",
                "type":"address"
            },
            {
                "name":"dest",
                "type":"address"
            },
            {
                "name":"srcQty",
                "type":"uint256"
            }
        ],
        "name":"getExpectedRate",
        "outputs":[
            {
                "name":"expectedRate",
                "type":"uint256"
            },
            {
                "name":"slippageRate",
                "type":"uint256"
            }
        ],
        "payable":false,
        "stateMutability":"view",
        "type":"function"
    },
    {
        "constant":true,
        "inputs":[
            {
                "name":"",
                "type":"uint256"
            }
        ],
        "name":"reserves",
        "outputs":[
            {
                "name":"",
                "type":"address"
            }
        ],
        "payable":false,
        "stateMutability":"view",
        "type":"function"
    },
    {
        "constant":true,
        "inputs":[
            {
                "name":"user",
                "type":"address"
            },
            {
                "name":"token",
                "type":"address"
            }
        ],
        "name":"getUserCapInTokenWei",
        "outputs":[
            {
                "name":"",
                "type":"uint256"
            }
        ],
        "payable":false,
        "stateMutability":"view",
        "type":"function"
    },
    {
        "constant":true,
        "inputs":[
            {
                "name":"",
                "type":"address"
            },
            {
                "name":"",
                "type":"uint256"
            }
        ],
        "name":"reservesPerTokenDest",
        "outputs":[
            {
                "name":"",
                "type":"address"
            }
        ],
        "payable":false,
        "stateMutability":"view",
        "type":"function"
    },
    {
        "constant":false,
        "inputs":[
            {
                "name":"newOperator",
                "type":"address"
            }
        ],
        "name":"addOperator",
        "outputs":[

        ],
        "payable":false,
        "stateMutability":"nonpayable",
        "type":"function"
    },
    {
        "constant":false,
        "inputs":[
            {
                "name":"reserve",
                "type":"address"
            },
            {
                "name":"add",
                "type":"bool"
            }
        ],
        "name":"addReserve",
        "outputs":[

        ],
        "payable":false,
        "stateMutability":"nonpayable",
        "type":"function"
    },
    {
        "constant":true,
        "inputs":[
            {
                "name":"src",
                "type":"address"
            },
            {
                "name":"dest",
                "type":"address"
            },
            {
                "name":"srcAmount",
                "type":"uint256"
            }
        ],
        "name":"searchBestRate",
        "outputs":[
            {
                "name":"",
                "type":"address"
            },
            {
                "name":"",
                "type":"uint256"
            }
        ],
        "payable":false,
        "stateMutability":"view",
        "type":"function"
    },
    {
        "constant":false,
        "inputs":[
            {
                "name":"operator",
                "type":"address"
            }
        ],
        "name":"removeOperator",
        "outputs":[

        ],
        "payable":false,
        "stateMutability":"nonpayable",
        "type":"function"
    },
    {
        "constant":true,
        "inputs":[

        ],
        "name":"maxGasPriceValue",
        "outputs":[
            {
                "name":"",
                "type":"uint256"
            }
        ],
        "payable":false,
        "stateMutability":"view",
        "type":"function"
    },
    {
        "constant":true,
        "inputs":[
            {
                "name":"field",
                "type":"bytes32"
            }
        ],
        "name":"info",
        "outputs":[
            {
                "name":"",
                "type":"uint256"
            }
        ],
        "payable":false,
        "stateMutability":"view",
        "type":"function"
    },
    {
        "constant":true,
        "inputs":[
            {
                "name":"src",
                "type":"address"
            },
            {
                "name":"dest",
                "type":"address"
            },
            {
                "name":"srcAmount",
                "type":"uint256"
            }
        ],
        "name":"findBestRate",
        "outputs":[
            {
                "name":"obsolete",
                "type":"uint256"
            },
            {
                "name":"rate",
                "type":"uint256"
            }
        ],
        "payable":false,
        "stateMutability":"view",
        "type":"function"
    },
    {
        "constant":false,
        "inputs":[
            {
                "name":"_maxGasPrice",
                "type":"uint256"
            },
            {
                "name":"_negligibleRateDiff",
                "type":"uint256"
            }
        ],
        "name":"setParams",
        "outputs":[

        ],
        "payable":false,
        "stateMutability":"nonpayable",
        "type":"function"
    },
    {
        "constant":false,
        "inputs":[
            {
                "name":"networkProxy",
                "type":"address"
            }
        ],
        "name":"setKyberProxy",
        "outputs":[

        ],
        "payable":false,
        "stateMutability":"nonpayable",
        "type":"function"
    },
    {
        "constant":false,
        "inputs":[
            {
                "name":"amount",
                "type":"uint256"
            },
            {
                "name":"sendTo",
                "type":"address"
            }
        ],
        "name":"withdrawEther",
        "outputs":[

        ],
        "payable":false,
        "stateMutability":"nonpayable",
        "type":"function"
    },
    {
        "constant":true,
        "inputs":[

        ],
        "name":"getNumReserves",
        "outputs":[
            {
                "name":"",
                "type":"uint256"
            }
        ],
        "payable":false,
        "stateMutability":"view",
        "type":"function"
    },
    {
        "constant":true,
        "inputs":[
            {
                "name":"token",
                "type":"address"
            },
            {
                "name":"user",
                "type":"address"
            }
        ],
        "name":"getBalance",
        "outputs":[
            {
                "name":"",
                "type":"uint256"
            }
        ],
        "payable":false,
        "stateMutability":"view",
        "type":"function"
    },
    {
        "constant":false,
        "inputs":[
            {
                "name":"reserve",
                "type":"address"
            },
            {
                "name":"token",
                "type":"address"
            },
            {
                "name":"ethToToken",
                "type":"bool"
            },
            {
                "name":"tokenToEth",
                "type":"bool"
            },
            {
                "name":"add",
                "type":"bool"
            }
        ],
        "name":"listPairForReserve",
        "outputs":[

        ],
        "payable":false,
        "stateMutability":"nonpayable",
        "type":"function"
    },
    {
        "constant":true,
        "inputs":[

        ],
        "name":"admin",
        "outputs":[
            {
                "name":"",
                "type":"address"
            }
        ],
        "payable":false,
        "stateMutability":"view",
        "type":"function"
    },
    {
        "inputs":[
            {
                "name":"_admin",
                "type":"address"
            }
        ],
        "payable":false,
        "stateMutability":"nonpayable",
        "type":"constructor"
    },
    {
        "payable":true,
        "stateMutability":"payable",
        "type":"fallback"
    },
    {
        "anonymous":false,
        "inputs":[
            {
                "indexed":true,
                "name":"sender",
                "type":"address"
            },
            {
                "indexed":false,
                "name":"amount",
                "type":"uint256"
            }
        ],
        "name":"EtherReceival",
        "type":"event"
    },
    {
        "anonymous":false,
        "inputs":[
            {
                "indexed":false,
                "name":"reserve",
                "type":"address"
            },
            {
                "indexed":false,
                "name":"add",
                "type":"bool"
            }
        ],
        "name":"AddReserveToNetwork",
        "type":"event"
    },
    {
        "anonymous":false,
        "inputs":[
            {
                "indexed":false,
                "name":"reserve",
                "type":"address"
            },
            {
                "indexed":false,
                "name":"src",
                "type":"address"
            },
            {
                "indexed":false,
                "name":"dest",
                "type":"address"
            },
            {
                "indexed":false,
                "name":"add",
                "type":"bool"
            }
        ],
        "name":"ListReservePairs",
        "type":"event"
    },
    {
        "anonymous":false,
        "inputs":[
            {
                "indexed":false,
                "name":"proxy",
                "type":"address"
            },
            {
                "indexed":false,
                "name":"sender",
                "type":"address"
            }
        ],
        "name":"KyberProxySet",
        "type":"event"
    },
    {
        "anonymous":false,
        "inputs":[
            {
                "indexed":false,
                "name":"srcAddress",
                "type":"address"
            },
            {
                "indexed":false,
                "name":"srcToken",
                "type":"address"
            },
            {
                "indexed":false,
                "name":"srcAmount",
                "type":"uint256"
            },
            {
                "indexed":false,
                "name":"destAddress",
                "type":"address"
            },
            {
                "indexed":false,
                "name":"destToken",
                "type":"address"
            },
            {
                "indexed":false,
                "name":"destAmount",
                "type":"uint256"
            }
        ],
        "name":"KyberTrade",
        "type":"event"
    },
    {
        "anonymous":false,
        "inputs":[
            {
                "indexed":false,
                "name":"token",
                "type":"address"
            },
            {
                "indexed":false,
                "name":"amount",
                "type":"uint256"
            },
            {
                "indexed":false,
                "name":"sendTo",
                "type":"address"
            }
        ],
        "name":"TokenWithdraw",
        "type":"event"
    },
    {
        "anonymous":false,
        "inputs":[
            {
                "indexed":false,
                "name":"amount",
                "type":"uint256"
            },
            {
                "indexed":false,
                "name":"sendTo",
                "type":"address"
            }
        ],
        "name":"EtherWithdraw",
        "type":"event"
    },
    {
        "anonymous":false,
        "inputs":[
            {
                "indexed":false,
                "name":"pendingAdmin",
                "type":"address"
            }
        ],
        "name":"TransferAdminPending",
        "type":"event"
    },
    {
        "anonymous":false,
        "inputs":[
            {
                "indexed":false,
                "name":"newAdmin",
                "type":"address"
            },
            {
                "indexed":false,
                "name":"previousAdmin",
                "type":"address"
            }
        ],
        "name":"AdminClaimed",
        "type":"event"
    },
    {
        "anonymous":false,
        "inputs":[
            {
                "indexed":false,
                "name":"newAlerter",
                "type":"address"
            },
            {
                "indexed":false,
                "name":"isAdd",
                "type":"bool"
            }
        ],
        "name":"AlerterAdded",
        "type":"event"
    },
    {
        "anonymous":false,
        "inputs":[
            {
                "indexed":false,
                "name":"newOperator",
                "type":"address"
            },
            {
                "indexed":false,
                "name":"isAdd",
                "type":"bool"
            }
        ],
        "name":"OperatorAdded",
        "type":"event"
    }
]

permissionLessReservesABI = [
    {
      "constant": true,
      "inputs": [
        
      ],
      "name": "NUM_ORDERS",
      "outputs": [
        {
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "srcAmount",
          "type": "uint128"
        },
        {
          "name": "dstAmount",
          "type": "uint128"
        },
        {
          "name": "hintPrevOrder",
          "type": "uint32"
        }
      ],
      "name": "submitEthToTokenOrderWHint",
      "outputs": [
        {
          "name": "",
          "type": "bool"
        }
      ],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "weiAmount",
          "type": "uint256"
        }
      ],
      "name": "calcBurnAmountFromFeeBurner",
      "outputs": [
        {
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "orderId",
          "type": "uint32"
        },
        {
          "name": "srcAmount",
          "type": "uint128"
        },
        {
          "name": "dstAmount",
          "type": "uint128"
        }
      ],
      "name": "getEthToTokenUpdateOrderHint",
      "outputs": [
        {
          "name": "",
          "type": "uint32"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "",
          "type": "address"
        }
      ],
      "name": "makerKnc",
      "outputs": [
        {
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "",
          "type": "address"
        }
      ],
      "name": "makerOrdersTokenToEth",
      "outputs": [
        {
          "name": "firstOrderId",
          "type": "uint32"
        },
        {
          "name": "takenBitmap",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "maker",
          "type": "address"
        },
        {
          "name": "amount",
          "type": "uint256"
        }
      ],
      "name": "depositToken",
      "outputs": [
        
      ],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        
      ],
      "name": "kncPerEthBaseRatePrecision",
      "outputs": [
        {
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "amount",
          "type": "uint256"
        }
      ],
      "name": "withdrawEther",
      "outputs": [
        
      ],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "srcAmount",
          "type": "uint128"
        },
        {
          "name": "dstAmount",
          "type": "uint128"
        }
      ],
      "name": "getTokenToEthAddOrderHint",
      "outputs": [
        {
          "name": "",
          "type": "uint32"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        
      ],
      "name": "BURN_TO_STAKE_FACTOR",
      "outputs": [
        {
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "amount",
          "type": "uint256"
        }
      ],
      "name": "withdrawToken",
      "outputs": [
        
      ],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "isEthToToken",
          "type": "bool[]"
        },
        {
          "name": "srcAmount",
          "type": "uint128[]"
        },
        {
          "name": "dstAmount",
          "type": "uint128[]"
        },
        {
          "name": "hintPrevOrder",
          "type": "uint32[]"
        },
        {
          "name": "isAfterPrevOrder",
          "type": "bool[]"
        }
      ],
      "name": "addOrderBatch",
      "outputs": [
        {
          "name": "",
          "type": "bool"
        }
      ],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "maker",
          "type": "address"
        }
      ],
      "name": "depositEther",
      "outputs": [
        
      ],
      "payable": true,
      "stateMutability": "payable",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        
      ],
      "name": "MIN_REMAINING_ORDER_RATIO",
      "outputs": [
        {
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "",
          "type": "address"
        }
      ],
      "name": "makerOrdersEthToToken",
      "outputs": [
        {
          "name": "firstOrderId",
          "type": "uint32"
        },
        {
          "name": "takenBitmap",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "orderId",
          "type": "uint32"
        },
        {
          "name": "newSrcAmount",
          "type": "uint128"
        },
        {
          "name": "newDstAmount",
          "type": "uint128"
        },
        {
          "name": "hintPrevOrder",
          "type": "uint32"
        }
      ],
      "name": "updateEthToTokenOrderWHint",
      "outputs": [
        {
          "name": "",
          "type": "bool"
        }
      ],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "orderId",
          "type": "uint32"
        }
      ],
      "name": "cancelTokenToEthOrder",
      "outputs": [
        {
          "name": "",
          "type": "bool"
        }
      ],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "maker",
          "type": "address"
        }
      ],
      "name": "getEthToTokenMakerOrderIds",
      "outputs": [
        {
          "name": "orderList",
          "type": "uint32[]"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        
      ],
      "name": "getTokenToEthOrderList",
      "outputs": [
        {
          "name": "orderList",
          "type": "uint32[]"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "srcAmount",
          "type": "uint128"
        },
        {
          "name": "dstAmount",
          "type": "uint128"
        }
      ],
      "name": "getEthToTokenAddOrderHint",
      "outputs": [
        {
          "name": "",
          "type": "uint32"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        
      ],
      "name": "MAX_USD_PER_ETH",
      "outputs": [
        {
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        
      ],
      "name": "tokenToEthList",
      "outputs": [
        {
          "name": "",
          "type": "address"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        
      ],
      "name": "contracts",
      "outputs": [
        {
          "name": "kncToken",
          "type": "address"
        },
        {
          "name": "token",
          "type": "address"
        },
        {
          "name": "feeBurner",
          "type": "address"
        },
        {
          "name": "kyberNetwork",
          "type": "address"
        },
        {
          "name": "medianizer",
          "type": "address"
        },
        {
          "name": "orderListFactory",
          "type": "address"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "orderId",
          "type": "uint32"
        }
      ],
      "name": "getTokenToEthOrder",
      "outputs": [
        {
          "name": "_maker",
          "type": "address"
        },
        {
          "name": "_srcAmount",
          "type": "uint128"
        },
        {
          "name": "_dstAmount",
          "type": "uint128"
        },
        {
          "name": "_prevId",
          "type": "uint32"
        },
        {
          "name": "_nextId",
          "type": "uint32"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "srcToken",
          "type": "address"
        },
        {
          "name": "srcAmount",
          "type": "uint256"
        },
        {
          "name": "dstToken",
          "type": "address"
        },
        {
          "name": "dstAddress",
          "type": "address"
        },
        {
          "name": "conversionRate",
          "type": "uint256"
        },
        {
          "name": "validate",
          "type": "bool"
        }
      ],
      "name": "trade",
      "outputs": [
        {
          "name": "",
          "type": "bool"
        }
      ],
      "payable": true,
      "stateMutability": "payable",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "srcAmount",
          "type": "uint128"
        },
        {
          "name": "dstAmount",
          "type": "uint128"
        }
      ],
      "name": "submitTokenToEthOrder",
      "outputs": [
        {
          "name": "",
          "type": "bool"
        }
      ],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "srcAmount",
          "type": "uint128"
        },
        {
          "name": "dstAmount",
          "type": "uint128"
        }
      ],
      "name": "submitEthToTokenOrder",
      "outputs": [
        {
          "name": "",
          "type": "bool"
        }
      ],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        
      ],
      "name": "MAX_BURN_FEE_BPS",
      "outputs": [
        {
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "src",
          "type": "address"
        },
        {
          "name": "dst",
          "type": "address"
        },
        {
          "name": "srcQty",
          "type": "uint256"
        },
        {
          "name": "blockNumber",
          "type": "uint256"
        }
      ],
      "name": "getConversionRate",
      "outputs": [
        {
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        
      ],
      "name": "setKncPerEthBaseRate",
      "outputs": [
        
      ],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "weiAmount",
          "type": "uint256"
        }
      ],
      "name": "calcKncStake",
      "outputs": [
        {
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "orderId",
          "type": "uint32"
        },
        {
          "name": "newSrcAmount",
          "type": "uint128"
        },
        {
          "name": "newDstAmount",
          "type": "uint128"
        }
      ],
      "name": "updateEthToTokenOrder",
      "outputs": [
        {
          "name": "",
          "type": "bool"
        }
      ],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "weiAmount",
          "type": "uint256"
        }
      ],
      "name": "calcBurnAmount",
      "outputs": [
        {
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        
      ],
      "name": "limits",
      "outputs": [
        {
          "name": "minNewOrderSizeUsd",
          "type": "uint256"
        },
        {
          "name": "maxOrdersPerTrade",
          "type": "uint256"
        },
        {
          "name": "minNewOrderSizeWei",
          "type": "uint256"
        },
        {
          "name": "minOrderSizeWei",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "maker",
          "type": "address"
        }
      ],
      "name": "makerUnlockedKnc",
      "outputs": [
        {
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "orderId",
          "type": "uint32"
        },
        {
          "name": "srcAmount",
          "type": "uint128"
        },
        {
          "name": "dstAmount",
          "type": "uint128"
        }
      ],
      "name": "getTokenToEthUpdateOrderHint",
      "outputs": [
        {
          "name": "",
          "type": "uint32"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "orderId",
          "type": "uint32"
        },
        {
          "name": "newSrcAmount",
          "type": "uint128"
        },
        {
          "name": "newDstAmount",
          "type": "uint128"
        },
        {
          "name": "hintPrevOrder",
          "type": "uint32"
        }
      ],
      "name": "updateTokenToEthOrderWHint",
      "outputs": [
        {
          "name": "",
          "type": "bool"
        }
      ],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "amount",
          "type": "uint256"
        }
      ],
      "name": "withdrawKncFee",
      "outputs": [
        
      ],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "orderId",
          "type": "uint32"
        },
        {
          "name": "newSrcAmount",
          "type": "uint128"
        },
        {
          "name": "newDstAmount",
          "type": "uint128"
        }
      ],
      "name": "updateTokenToEthOrder",
      "outputs": [
        {
          "name": "",
          "type": "bool"
        }
      ],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "srcAmount",
          "type": "uint128"
        },
        {
          "name": "dstAmount",
          "type": "uint128"
        },
        {
          "name": "hintPrevOrder",
          "type": "uint32"
        }
      ],
      "name": "submitTokenToEthOrderWHint",
      "outputs": [
        {
          "name": "",
          "type": "bool"
        }
      ],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        
      ],
      "name": "setMinOrderSizeEth",
      "outputs": [
        {
          "name": "",
          "type": "bool"
        }
      ],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "maker",
          "type": "address"
        }
      ],
      "name": "getTokenToEthMakerOrderIds",
      "outputs": [
        {
          "name": "orderList",
          "type": "uint32[]"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "maker",
          "type": "address"
        }
      ],
      "name": "makerRequiredKncStake",
      "outputs": [
        {
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "orderId",
          "type": "uint32"
        }
      ],
      "name": "getEthToTokenOrder",
      "outputs": [
        {
          "name": "_maker",
          "type": "address"
        },
        {
          "name": "_srcAmount",
          "type": "uint128"
        },
        {
          "name": "_dstAmount",
          "type": "uint128"
        },
        {
          "name": "_prevId",
          "type": "uint32"
        },
        {
          "name": "_nextId",
          "type": "uint32"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        
      ],
      "name": "HEAD_ID",
      "outputs": [
        {
          "name": "",
          "type": "uint32"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "",
          "type": "address"
        }
      ],
      "name": "makerTotalOrdersWei",
      "outputs": [
        {
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "maker",
          "type": "address"
        },
        {
          "name": "amount",
          "type": "uint256"
        }
      ],
      "name": "depositKncForFee",
      "outputs": [
        
      ],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "",
          "type": "address"
        },
        {
          "name": "",
          "type": "address"
        }
      ],
      "name": "makerFunds",
      "outputs": [
        {
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        
      ],
      "name": "makerBurnFeeBps",
      "outputs": [
        {
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        
      ],
      "name": "TAIL_ID",
      "outputs": [
        {
          "name": "",
          "type": "uint32"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "token",
          "type": "address"
        },
        {
          "name": "user",
          "type": "address"
        }
      ],
      "name": "getBalance",
      "outputs": [
        {
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        
      ],
      "name": "init",
      "outputs": [
        {
          "name": "",
          "type": "bool"
        }
      ],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        
      ],
      "name": "kncRateBlocksTrade",
      "outputs": [
        {
          "name": "",
          "type": "bool"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "isEthToToken",
          "type": "bool[]"
        },
        {
          "name": "orderId",
          "type": "uint32[]"
        },
        {
          "name": "newSrcAmount",
          "type": "uint128[]"
        },
        {
          "name": "newDstAmount",
          "type": "uint128[]"
        },
        {
          "name": "hintPrevOrder",
          "type": "uint32[]"
        }
      ],
      "name": "updateOrderBatch",
      "outputs": [
        {
          "name": "",
          "type": "bool"
        }
      ],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        
      ],
      "name": "getEthToTokenOrderList",
      "outputs": [
        {
          "name": "orderList",
          "type": "uint32[]"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "orderId",
          "type": "uint32"
        }
      ],
      "name": "cancelEthToTokenOrder",
      "outputs": [
        {
          "name": "",
          "type": "bool"
        }
      ],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        
      ],
      "name": "ethToTokenList",
      "outputs": [
        {
          "name": "",
          "type": "address"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "name": "knc",
          "type": "address"
        },
        {
          "name": "reserveToken",
          "type": "address"
        },
        {
          "name": "burner",
          "type": "address"
        },
        {
          "name": "network",
          "type": "address"
        },
        {
          "name": "medianizer",
          "type": "address"
        },
        {
          "name": "factory",
          "type": "address"
        },
        {
          "name": "minNewOrderUsd",
          "type": "uint256"
        },
        {
          "name": "maxOrdersPerTrade",
          "type": "uint256"
        },
        {
          "name": "burnFeeBps",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "name": "srcToken",
          "type": "address"
        },
        {
          "indexed": false,
          "name": "dstToken",
          "type": "address"
        },
        {
          "indexed": false,
          "name": "srcAmount",
          "type": "uint256"
        },
        {
          "indexed": false,
          "name": "dstAmount",
          "type": "uint256"
        }
      ],
      "name": "OrderbookReserveTrade",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "name": "maker",
          "type": "address"
        },
        {
          "indexed": false,
          "name": "amount",
          "type": "uint256"
        }
      ],
      "name": "TokenDeposited",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "name": "maker",
          "type": "address"
        },
        {
          "indexed": false,
          "name": "amount",
          "type": "uint256"
        }
      ],
      "name": "EtherDeposited",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "name": "maker",
          "type": "address"
        },
        {
          "indexed": false,
          "name": "amount",
          "type": "uint256"
        }
      ],
      "name": "KncFeeDeposited",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "name": "maker",
          "type": "address"
        },
        {
          "indexed": false,
          "name": "orderId",
          "type": "uint32"
        },
        {
          "indexed": false,
          "name": "isEthToToken",
          "type": "bool"
        },
        {
          "indexed": false,
          "name": "srcAmount",
          "type": "uint128"
        },
        {
          "indexed": false,
          "name": "dstAmount",
          "type": "uint128"
        },
        {
          "indexed": false,
          "name": "addedWithHint",
          "type": "bool"
        }
      ],
      "name": "NewLimitOrder",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "name": "maker",
          "type": "address"
        },
        {
          "indexed": false,
          "name": "isEthToToken",
          "type": "bool"
        },
        {
          "indexed": false,
          "name": "orderId",
          "type": "uint256"
        },
        {
          "indexed": false,
          "name": "srcAmount",
          "type": "uint128"
        },
        {
          "indexed": false,
          "name": "dstAmount",
          "type": "uint128"
        },
        {
          "indexed": false,
          "name": "updatedWithHint",
          "type": "bool"
        }
      ],
      "name": "OrderUpdated",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "name": "maker",
          "type": "address"
        },
        {
          "indexed": false,
          "name": "isEthToToken",
          "type": "bool"
        },
        {
          "indexed": false,
          "name": "orderId",
          "type": "uint32"
        },
        {
          "indexed": false,
          "name": "srcAmount",
          "type": "uint128"
        },
        {
          "indexed": false,
          "name": "dstAmount",
          "type": "uint256"
        }
      ],
      "name": "OrderCanceled",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "name": "maker",
          "type": "address"
        },
        {
          "indexed": false,
          "name": "orderId",
          "type": "uint32"
        },
        {
          "indexed": false,
          "name": "isEthToToken",
          "type": "bool"
        }
      ],
      "name": "FullOrderTaken",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "name": "maker",
          "type": "address"
        },
        {
          "indexed": false,
          "name": "orderId",
          "type": "uint32"
        },
        {
          "indexed": false,
          "name": "isEthToToken",
          "type": "bool"
        },
        {
          "indexed": false,
          "name": "isRemoved",
          "type": "bool"
        }
      ],
      "name": "PartialOrderTaken",
      "type": "event"
    }
  ];

var tokensAbi = [{
  "constant": true,
  "inputs": [{
      "name": "_owner",
      "type": "address"
  }],
  "name": "balanceOf",
  "outputs": [{
      "name": "balance",
      "type": "uint256"
  }],
  "payable": false,
  "stateMutability": "view",
  "type": "function"
},
{
  "constant": true,
  "inputs": [{
          "name": "_owner",
          "type": "address"
      },
      {
          "name": "_spender",
          "type": "address"
      }
  ],
  "name": "allowance",
  "outputs": [{
      "name": "",
      "type": "uint256"
  }],
  "payable": false,
  "stateMutability": "view",
  "type": "function"
},
{
  "constant": false,
  "inputs": [{
          "name": "_spender",
          "type": "address"
      },
      {
          "name": "_value",
          "type": "uint256"
      }
  ],
  "name": "approve",
  "outputs": [{
      "name": "",
      "type": "bool"
  }],
  "payable": false,
  "stateMutability": "nonpayable",
  "type": "function"
},
{
  "anonymous": false,
  "inputs": [{
          "indexed": true,
          "name": "_owner",
          "type": "address"
      },
      {
          "indexed": true,
          "name": "_spender",
          "type": "address"
      },
      {
          "indexed": false,
          "name": "_value",
          "type": "uint256"
      }
  ],
  "name": "Approval",
  "type": "event"
}];

