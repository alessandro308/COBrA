import React from 'react';

const Catalog = {
    address: "0x08676346f7098aa91c033a9ab4536a3d73ee7fbc",
    abi: [
        {
            "constant": true,
            "inputs": [],
            "name": "premiumCost",
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
                    "name": "_genre",
                    "type": "uint256"
                },
                {
                    "name": "_category",
                    "type": "uint256"
                }
            ],
            "name": "GetMostRatedByGenre",
            "outputs": [
                {
                    "name": "",
                    "type": "bytes32"
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
                    "name": "_n",
                    "type": "uint256"
                }
            ],
            "name": "getNewContentList",
            "outputs": [
                {
                    "name": "",
                    "type": "bytes32[]"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [],
            "name": "getStatistics",
            "outputs": [
                {
                    "name": "",
                    "type": "bytes32[]"
                },
                {
                    "name": "",
                    "type": "uint256[]"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": false,
            "inputs": [],
            "name": "buyPremium",
            "outputs": [],
            "payable": true,
            "stateMutability": "payable",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [],
            "name": "premiumTime",
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
                    "name": "author",
                    "type": "string"
                }
            ],
            "name": "getMostPopularByAuthor",
            "outputs": [
                {
                    "name": "",
                    "type": "bytes32"
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
                    "name": "_user",
                    "type": "address"
                }
            ],
            "name": "isPremium",
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
            "inputs": [],
            "name": "goodbye",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [],
            "name": "getContentList",
            "outputs": [
                {
                    "name": "",
                    "type": "bytes32[]"
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
                    "name": "_addr",
                    "type": "address"
                }
            ],
            "name": "publishContent",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [
                {
                    "name": "",
                    "type": "bytes32"
                }
            ],
            "name": "name2address",
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
                {
                    "name": "x",
                    "type": "bytes32"
                }
            ],
            "name": "bytes32ToString",
            "outputs": [
                {
                    "name": "",
                    "type": "string"
                }
            ],
            "payable": false,
            "stateMutability": "pure",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [
                {
                    "name": "_g",
                    "type": "uint256"
                }
            ],
            "name": "getMostPopularByGenre",
            "outputs": [
                {
                    "name": "",
                    "type": "bytes32"
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
                    "type": "bytes32"
                }
            ],
            "name": "name2cost",
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
                    "name": "_user",
                    "type": "address"
                },
                {
                    "name": "_content",
                    "type": "address"
                }
            ],
            "name": "isGranted",
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
                    "name": "_content",
                    "type": "bytes32"
                }
            ],
            "name": "grantAccess",
            "outputs": [],
            "payable": true,
            "stateMutability": "payable",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [
                {
                    "name": "_author",
                    "type": "string"
                },
                {
                    "name": "_category",
                    "type": "uint256"
                }
            ],
            "name": "GetMostRatedByAuthor",
            "outputs": [
                {
                    "name": "",
                    "type": "bytes32"
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
                    "name": "_user",
                    "type": "address"
                }
            ],
            "name": "giftPremium",
            "outputs": [],
            "payable": true,
            "stateMutability": "payable",
            "type": "function"
        },
        {
            "constant": false,
            "inputs": [
                {
                    "name": "_contentName",
                    "type": "bytes32"
                },
                {
                    "name": "viewsFromPayment",
                    "type": "uint256"
                }
            ],
            "name": "consumeContent",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [
                {
                    "name": "_g",
                    "type": "uint256"
                }
            ],
            "name": "getLatestByGenre",
            "outputs": [
                {
                    "name": "",
                    "type": "bytes32"
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
                    "name": "author",
                    "type": "string"
                }
            ],
            "name": "getLatestByAuthor",
            "outputs": [
                {
                    "name": "",
                    "type": "bytes32"
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
                    "name": "_contentName",
                    "type": "bytes32"
                },
                {
                    "name": "_userAddr",
                    "type": "address"
                }
            ],
            "name": "giftContent",
            "outputs": [],
            "payable": true,
            "stateMutability": "payable",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [
                {
                    "name": "_category",
                    "type": "uint256"
                }
            ],
            "name": "GetMostRated",
            "outputs": [
                {
                    "name": "",
                    "type": "bytes32"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "constructor"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": false,
                    "name": "_content",
                    "type": "bytes32"
                },
                {
                    "indexed": false,
                    "name": "_user",
                    "type": "address"
                }
            ],
            "name": "ContentConsumed",
            "type": "event"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": false,
                    "name": "_content",
                    "type": "bytes32"
                },
                {
                    "indexed": false,
                    "name": "_user",
                    "type": "address"
                }
            ],
            "name": "ContentBought",
            "type": "event"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": false,
                    "name": "_from",
                    "type": "address"
                },
                {
                    "indexed": false,
                    "name": "_to",
                    "type": "address"
                },
                {
                    "indexed": false,
                    "name": "_content",
                    "type": "bytes32"
                }
            ],
            "name": "GiftContentBought",
            "type": "event"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": false,
                    "name": "_from",
                    "type": "address"
                },
                {
                    "indexed": false,
                    "name": "_to",
                    "type": "address"
                }
            ],
            "name": "GiftPremiumSubscription",
            "type": "event"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": false,
                    "name": "_content",
                    "type": "address"
                },
                {
                    "indexed": false,
                    "name": "_contentName",
                    "type": "bytes32"
                }
            ],
            "name": "PublishedContent",
            "type": "event"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": false,
                    "name": "_user",
                    "type": "address"
                }
            ],
            "name": "PremiumSubscriptionBought",
            "type": "event"
        },
        {
            "anonymous": false,
            "inputs": [],
            "name": "PaymentTriggered",
            "type": "event"
        }
    ]
}

export const Content = {
    data: '0x60806040526000600360006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055506000600360146101000a81548167ffffffffffffffff021916908367ffffffffffffffff1602179055506000600460006101000a81548167ffffffffffffffff021916908367ffffffffffffffff160217905550606060405190810160405280600060ff168152602001600060ff168152602001600060ff16815250600a60008201518160000160006101000a81548160ff021916908360ff16021790555060208201518160000160016101000a81548160ff021916908360ff16021790555060408201518160000160026101000a81548160ff021916908360ff16021790555050506000600b60006101000a81548167ffffffffffffffff021916908367ffffffffffffffff1602179055503480156200016057600080fd5b50604051620016433803806200164383398101806040528101908080519060200190929190805182019291906020018051906020019092919080519060200190929190505050336000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555083600281600019169055508260019080519060200190620002099291906200024b565b508160048111156200021757fe5b600860006101000a81548160ff021916908360048111156200023557fe5b02179055508060078190555050505050620002fa565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f106200028e57805160ff1916838001178555620002bf565b82800160010185558215620002bf579182015b82811115620002be578251825591602001919060010190620002a1565b5b509050620002ce9190620002d2565b5090565b620002f791905b80821115620002f3576000816000905550600101620002d9565b5090565b90565b611339806200030a6000396000f300608060405260043610610107576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff1680630316f7cf1461010957806306fdde03146101485780630ae5e7391461017b578063178ff556146101be57806317de3a41146101d55780631d98c7551461020e5780632731ebd8146102395780633ccfd60b14610294578063429a1bb0146102ab578063439d41b8146102d65780634c0f767a1461034d5780636ef71242146103975780637f272f2b146103a15780638da5cb5b146103fc57806395a078e814610453578063a6c3e6b9146104ae578063d65e880d1461053e578063f60eeffc1461057d578063f64bc2b7146105c8575b005b34801561011557600080fd5b5061011e6105df565b604051808267ffffffffffffffff1667ffffffffffffffff16815260200191505060405180910390f35b34801561015457600080fd5b5061015d6105f9565b60405180826000191660001916815260200191505060405180910390f35b34801561018757600080fd5b506101bc600480360381019080803573ffffffffffffffffffffffffffffffffffffffff1690602001909291905050506105ff565b005b3480156101ca57600080fd5b506101d36106b6565b005b3480156101e157600080fd5b506101ea61092f565b604051808260048111156101fa57fe5b60ff16815260200191505060405180910390f35b34801561021a57600080fd5b50610223610942565b6040518082815260200191505060405180910390f35b34801561024557600080fd5b5061027a600480360381019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190505050610948565b604051808215151515815260200191505060405180910390f35b3480156102a057600080fd5b506102a9610968565b005b3480156102b757600080fd5b506102c0610a23565b6040518082815260200191505060405180910390f35b3480156102e257600080fd5b50610317600480360381019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190505050610a9d565b604051808460ff1660ff1681526020018360ff1660ff1681526020018260ff1660ff168152602001935050505060405180910390f35b34801561035957600080fd5b50610395600480360381019080803560ff169060200190929190803560ff169060200190929190803560ff169060200190929190505050610aee565b005b61039f610f3a565b005b3480156103ad57600080fd5b506103e2600480360381019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190505050610fc2565b604051808215151515815260200191505060405180910390f35b34801561040857600080fd5b5061041161106e565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b34801561045f57600080fd5b50610494600480360381019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190505050611093565b604051808215151515815260200191505060405180910390f35b3480156104ba57600080fd5b506104c36110b3565b6040518080602001828103825283818151815260200191508051906020019080838360005b838110156105035780820151818401526020810190506104e8565b50505050905090810190601f1680156105305780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b34801561054a57600080fd5b50610553611151565b604051808267ffffffffffffffff1667ffffffffffffffff16815260200191505060405180910390f35b34801561058957600080fd5b5061059261116b565b604051808460ff1660ff1681526020018360ff1660ff1681526020018260ff1660ff168152602001935050505060405180910390f35b3480156105d457600080fd5b506105dd6111aa565b005b600460009054906101000a900467ffffffffffffffff1681565b60025481565b600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614151561065b57600080fd5b6001600660008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81548160ff02191690831515021790555050565b6000600660003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff16151561071057600080fd5b600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1690506001600560003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81548160ff0219169083151502179055506000600660003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81548160ff0219169083151502179055506003601481819054906101000a900467ffffffffffffffff168092919060010191906101000a81548167ffffffffffffffff021916908367ffffffffffffffff160217905550506004600081819054906101000a900467ffffffffffffffff168092919060010191906101000a81548167ffffffffffffffff021916908367ffffffffffffffff160217905550508073ffffffffffffffffffffffffffffffffffffffff1663cba2e9b5600254600460009054906101000a900467ffffffffffffffff166040518363ffffffff167c01000000000000000000000000000000000000000000000000000000000281526004018083600019166000191681526020018267ffffffffffffffff16815260200192505050600060405180830381600087803b15801561091457600080fd5b505af1158015610928573d6000803e3d6000fd5b5050505050565b600860009054906101000a900460ff1681565b60075481565b60056020528060005260406000206000915054906101000a900460ff1681565b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff161415156109c357600080fd5b3373ffffffffffffffffffffffffffffffffffffffff166108fc3073ffffffffffffffffffffffffffffffffffffffff16319081150290604051600060405180830381858888f19350505050158015610a20573d6000803e3d6000fd5b50565b60008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16141515610a8057600080fd5b3073ffffffffffffffffffffffffffffffffffffffff1631905090565b60096020528060005260406000206000915090508060000160009054906101000a900460ff16908060000160019054906101000a900460ff16908060000160029054906101000a900460ff16905083565b600560003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff161515610bd5576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260348152602001807f596f75206861766520746f20636f6e73756d652074686520636f6e74656e742081526020017f6265666f726520746f20726174696e672069742e00000000000000000000000081525060400191505060405180910390fd5b6060604051908101604052808460ff1681526020018360ff1681526020018260ff16815250600960003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008201518160000160006101000a81548160ff021916908360ff16021790555060208201518160000160016101000a81548160ff021916908360ff16021790555060408201518160000160026101000a81548160ff021916908360ff1602179055509050506060604051908101604052806001600b60009054906101000a900467ffffffffffffffff160167ffffffffffffffff168560ff16600b60009054906101000a900467ffffffffffffffff16600a60000160009054906101000a900460ff1660ff16020167ffffffffffffffff16811515610d1557fe5b0460ff1681526020016001600b60009054906101000a900467ffffffffffffffff160167ffffffffffffffff168460ff16600b60009054906101000a900467ffffffffffffffff16600a60000160019054906101000a900460ff1660ff16020167ffffffffffffffff16811515610d8857fe5b0460ff1681526020016001600b60009054906101000a900467ffffffffffffffff160167ffffffffffffffff168360ff16600b60009054906101000a900467ffffffffffffffff16600a60000160029054906101000a900460ff1660ff16020167ffffffffffffffff16811515610dfb57fe5b0460ff16815250600a60008201518160000160006101000a81548160ff021916908360ff16021790555060208201518160000160016101000a81548160ff021916908360ff16021790555060408201518160000160026101000a81548160ff021916908360ff160217905550905050600b600081819054906101000a900467ffffffffffffffff168092919060010191906101000a81548167ffffffffffffffff021916908367ffffffffffffffff160217905550507f1aebec2965edc2f6fa18358de660ac10213c2cef1afdec5ce4edfc4c257d80de33848484604051808573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018460ff1681526020018360ff1681526020018260ff16815260200194505050505060405180910390a1505050565b600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16141515610f9657600080fd5b6000600460006101000a81548167ffffffffffffffff021916908367ffffffffffffffff160217905550565b60008073ffffffffffffffffffffffffffffffffffffffff16600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1614156110645781600360006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555060019050611069565b600090505b919050565b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b60066020528060005260406000206000915054906101000a900460ff1681565b60018054600181600116156101000203166002900480601f0160208091040260200160405190810160405280929190818152602001828054600181600116156101000203166002900480156111495780601f1061111e57610100808354040283529160200191611149565b820191906000526020600020905b81548152906001019060200180831161112c57829003601f168201915b505050505081565b600360149054906101000a900467ffffffffffffffff1681565b600a8060000160009054906101000a900460ff16908060000160019054906101000a900460ff16908060000160029054906101000a900460ff16905083565b6000600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1690508073ffffffffffffffffffffffffffffffffffffffff1663742fe0d4336040518263ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001915050602060405180830381600087803b15801561126c57600080fd5b505af1158015611280573d6000803e3d6000fd5b505050506040513d602081101561129657600080fd5b810190808051906020019092919050505015156112b257600080fd5b6001600560003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81548160ff021916908315150217905550505600a165627a7a723058207561c45c1fd462852c13f39896bfd643b37d600196f47c9231295dcfdd1800d20029', 
    abi: [
	{
		"constant": true,
		"inputs": [],
		"name": "viewsFromLastPayment",
		"outputs": [
			{
				"name": "",
				"type": "uint64"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "name",
		"outputs": [
			{
				"name": "",
				"type": "bytes32"
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
				"name": "_user",
				"type": "address"
			}
		],
		"name": "grantAccess",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [],
		"name": "consumeContent",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "genre",
		"outputs": [
			{
				"name": "",
				"type": "uint8"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "contentCost",
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
		"name": "hasConsumed",
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
		"inputs": [],
		"name": "withdraw",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "seeBalance",
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
		"name": "cust2rate",
		"outputs": [
			{
				"name": "fairness",
				"type": "uint8"
			},
			{
				"name": "coolness",
				"type": "uint8"
			},
			{
				"name": "appreciation",
				"type": "uint8"
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
				"name": "fairness",
				"type": "uint8"
			},
			{
				"name": "coolness",
				"type": "uint8"
			},
			{
				"name": "appreciation",
				"type": "uint8"
			}
		],
		"name": "leaveFeedback",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [],
		"name": "resetViewsAndGetMoney",
		"outputs": [],
		"payable": true,
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_catalog",
				"type": "address"
			}
		],
		"name": "setCatalogAddress",
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
		"inputs": [],
		"name": "owner",
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
			{
				"name": "",
				"type": "address"
			}
		],
		"name": "hasAccess",
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
		"constant": true,
		"inputs": [],
		"name": "author",
		"outputs": [
			{
				"name": "",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "views",
		"outputs": [
			{
				"name": "",
				"type": "uint64"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "ratingMean",
		"outputs": [
			{
				"name": "fairness",
				"type": "uint8"
			},
			{
				"name": "coolness",
				"type": "uint8"
			},
			{
				"name": "appreciation",
				"type": "uint8"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [],
		"name": "consumeContentPremium",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"name": "_name",
				"type": "bytes32"
			},
			{
				"name": "_author",
				"type": "string"
			},
			{
				"name": "_gen",
				"type": "uint256"
			},
			{
				"name": "_cost",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"payable": true,
		"stateMutability": "payable",
		"type": "fallback"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"name": "_from",
				"type": "address"
			},
			{
				"indexed": false,
				"name": "_fairness",
				"type": "uint256"
			},
			{
				"indexed": false,
				"name": "_coolness",
				"type": "uint256"
			},
			{
				"indexed": false,
				"name": "_appreciation",
				"type": "uint256"
			}
		],
		"name": "newFeedback",
		"type": "event"
	}
]
}

export function hex2String(stringBytes) {
    var result = "";
    for (var i = 2; i < stringBytes.length; i+=2) {
      result += String.fromCharCode(parseInt(stringBytes.substring(i, i+2), 16));
    }
    return result;
}
export const CatalogContext = React.createContext(Catalog);
export default CatalogContext;
