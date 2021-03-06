var ABI_ReserveLister = [
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
    }
];

var permissionLessReservesABI = [{
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
    },{
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
    },{
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
    },{
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
    },{
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
    },{
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
    },{
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
    },{
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
    },{
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
    },{
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
    },{
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
    },{
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
    },{
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
    },{
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
    },{
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
    },{
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
    },{
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
    },{
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
    },{
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
    },{
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
    },{
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
    },{
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
    },{
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
    }];
