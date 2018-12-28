let networkId; // network ID
let account; // user account

let mainKyberAdd = '0x818E6FECD516Ecc3849DAf6845e3EC868087B755';
let mainKyberContract;

let coinsData = {}; // coins data from firebase

let alertVar; // for alert variable

let coinOne = {}; // Token one details
coinOne.val = 0;

let coinTwo = {}; // Token two details
coinTwo.val = 0;

let toChoose = 0; // buy or sell

let allowanceLimit = 2**255; // infinite allowance to token

let txArr = []; // store user transction to give them alert

let gasLow,
    gasStandard,
    gasHigh;

let minRateSlider = 97; // min conversion rate in percent

let toggleNum = 0; // on toggle button click

let gasDecide = 2; // initial gas decide standard

let enterSwap = false; // enter key press swap