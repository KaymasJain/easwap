const TeleBot = require('../models/TeleBot');
const getBot = require('../routes/TeleRoutes');
const helper = require('../util/helper');

// from alerts route and schedular
module.exports.init = (onlyChatID) => {

    // Get ChatID from database

    var dataToSend = "Sending msg via user ID"
    
    getBot.telegram.sendMessage(chatID, dataToSend).catch((err) => {
        console.log(err);
    });

}

function reqCDP(allCupNodes, Alerts) {

    // subscribed CDP
    const cdpArr = [];
    for (i = 0; i < Alerts.length; i++) {
        if (!cdpArr.includes(Alerts[i].cdp)) {
            cdpArr.push(Alerts[i].cdp);
        }
    }

    // filtering required CDP
    let filteredCup = {};
    Object.keys(allCupNodes).forEach(function (key, i) {
        let cdpTarget = allCupNodes[key];
        if (cdpArr.includes(cdpTarget.id)) {
            filteredCup[cdpTarget.id] = cdpTarget;
        }
    });

    initCalc(filteredCup, Alerts);
}

// calculating and sending telegram messages per 100 millisecond
function initCalc(filteredCup, Alerts) {
    for (let i = 0; i < Alerts.length; i++) {
        setTimeout(function (i) {
            shootTeleMsgs(Alerts[i], filteredCup[Alerts[i].cdp]);
        }, 100 * i, i); // 1 message per hundred millisecond
    }
}

function shootTeleMsgs(alertObj, cdpObj) {
    const chatID = alertObj.chatID;
    const CDPID = alertObj.cdp;
    const debt = helper.cleanDecimal(cdpObj.art, 2);
    const collateral = helper.cleanDecimal(cdpObj.ink * cdpObj.per, 2);
    const ratio = cdpObj.ratio ? helper.cleanDecimal(10000 / cdpObj.ratio, 2) : 0;
    const ethPrice = helper.cleanDecimal(cdpObj.pip, 2);
    let liquiPrice = debt / (2/3 * collateral);
    liquiPrice = helper.cleanDecimal(liquiPrice, 2);
    let avaiDAI = (collateral * ethPrice * 2/3) - debt;
    avaiDAI = helper.cleanDecimal(avaiDAI, 2);
    let avaiETH = collateral - (debt / ethPrice * 3/2);
    avaiETH = helper.cleanDecimal(avaiETH, 2);
    let status = "NA";
    if (ratio != 0) {
        status = ratio < 50 ? "<b>SAFE</b> 😌" : "<b>RISKY</b> 😨";
    }

    let dataToSend = `CDP (${CDPID}) is ${status}\n`;
        dataToSend += `<b>Debt</b>: ${debt.toLocaleString()} DAI\n`;
        dataToSend += `<b>Available (Max)</b>: ${avaiDAI.toLocaleString()} DAI\n`;
        dataToSend += `<b>Collateral</b>: ${collateral.toLocaleString()} ETH\n`;
        dataToSend += `<b>Free (Max)</b>: ${avaiETH.toLocaleString()} ETH\n`;
        dataToSend += `<b>ETH Price</b>: $${ethPrice}\n`;
        dataToSend += `<b>Liquidation</b>: $${liquiPrice}\n`;
        dataToSend += `<b>Ratio</b>: ${ratio}%\n\n`;
        dataToSend += `Check more detailed CDP stats at: https://makerscan.io/cups/${CDPID}`;
        
    // {ravind} - telegram max limit to send msgs are 30msgs/sec. Need your help in making schedule it.
    getBot.telegram.sendMessage(chatID, dataToSend, {parse_mode:'HTML'}).then(() => {
        console.log(`Telebit message: ${chatID} - CDP ${CDPID}`);
    }).catch((err) => {
        // code 403 is when user has stopped the bot. Code 400 for more than 30msgs
        if (err.code == 403) {
            TeleBot.deleteMany({chatID: chatID}, function (err, _) {
                if (err) {
                    console.log({
                        message: 'Error deleting user',
                        error: err
                    });
                }
            });
        } else if (err.code == 400) {
            setTimeout(() => {
                getBot.telegram.sendMessage(523893932, 'Error more than 30msgs');
            }, 10000);
        }
    });
}