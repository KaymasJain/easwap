// data from database of all the PML reserves
var pmlReservesData = "";
var ADD_reserveLister = "0x84afa106fbf9b45e369724024cae14e8c7529c26"; // Main network Lister
// var ADD_reserveLister = "0x405a5fae110c86eb2e5a76809a17fc5bee2d3ccd" // Ropsten lister contract address
var ADD_ZERO = "0x0000000000000000000000000000000000000000"

var reservesAPI = "https://api.kyber.network/currencies"; // Main network
// var reservesAPI = "https://ropsten-api.kyber.network/currencies"; // Ropsten network
var apiDataLength = 0;
var apiDataToObj = {};

// data filter as per PML
var dataFilter = {};

// PML count++ to update the database
var isPMLCount = 0;

// define reserve contract to call all the functions
var reserveLister;

// Secret to update data on server. So no one else can update it
var secretToStore;

// Coin Address that is to be listed
var listCoinAdd;

// Transaction hash array
var txArr = [];

// etherscan API for TOKEN details
var etherscanAPI = `api.etherscan.io`; //Main Network API
// var etherscanAPI = `api-ropsten.etherscan.io`; //Ropsten API