let mainKyberAdd = '0x818E6FECD516Ecc3849DAf6845e3EC868087B755';
let mainKyberContract;

let coinsData = {};

let alertVar;

let coinOne = {};
coinOne.val = 0;

let coinTwo = {};
coinTwo.val = 0;

let toChoose = 0;

// Gas price - 1st element in gwei, 2nd element in wei
let gasArr = [0, 0];

let allowanceLimit = 2**255;

let txArr = [];

let kyber;

let gas;

let gasLow,
    gasStandard,
    gasHigh;

let minRateSlider = 97;

let toggleNum = 0;

