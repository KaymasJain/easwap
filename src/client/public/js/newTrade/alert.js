function navAlerts(num) {
    let title, content;
    if (num == 0) {
        title = 'GENERATE NEW ADDRESS';
        content = '<b>For interacting with ethereum blockchain you need to have a specific ID (private key). The easiest way to get one are<br>For desktop install - <a href="https://metamask.io/" target="_blank">metamask extension</a>.<br>For Android/IOS download ethereum browser - <a href="https://trustwallet.com/" target="_blank">Trust wallet</a></b>';
    } else if (num == 1) {
        title = 'NO ETHEREUM PROVIDER';
        content = '<b>This Dapp is made on top of Ethereum blockchain.<br>To use this Dapp<br>For desktop install - <a href="https://metamask.io/" target="_blank">metamask extension</a>.<br>For Android/IOS download ethereum browser - <a href="https://trustwallet.com/" target="_blank">Trust wallet</a></b>';
    } else if (num == 2) {
        title = 'Main network';
        content = "<b>You are on main network whatever trade you do will involve real assets.</b>";
    } else if (num == 3) {
        title = 'Ropsten test network';
        content = "<b>You are good to use ropsten test version of kyber trade. For real assets trading shift to Main network.</b>";
    } else if (num == 4) {
        title = 'Not main network';
        content = "<b>Shift to main network to use kyber trade. Kyber trade is also available on Ropsten test network for trial purposes.</b>";
    } else if (num == 5) {
        title = 'ERROR GETTING QUANTITY';
        content = `<b>Unable to get quantity of ${alertVar} in your wallet</b>`;
    } else if (num == 6) {
        title = 'ERROR GETTING QUANTITY';
        content = `Unable to get quantity of ETH in your wallet`;
    } else if (num == 7) {
        title = 'ERROR GETTING QUANTITY';
        content = `Unable to get quantity of ${alertVar} in your wallet`;
    } else if (num == 8) {
        title = 'ERROR GETTING QUANTITY';
        content = `Unable to get quantity of ETH in your wallet`;
    } else if (num == 9) {
        title = 'NOT LOGGED-IN';
        content = 'For trading you need to be Logged-in to main network or ropsten test net via metamask or dapp browsers';
    } else if (num == 10) {
        title = 'QUANTITY';
        content = `You don't have enough ${alertVar} in your wallet`;
    } else if (num == 11) {
        title = 'QUANTITY ERROR';
        content = 'Tokens quantity cannot be 0';
    } else if (num == 12) {
        title = 'CONFIRM ALLOWANCE TRANSACTION';
        content = `Confirm your transaction for allowance of token`;
    } else if (num == 13) {
        title = 'ERROR CHECKING ALLOWANCE';
        content = `Unable to check allowance of token`;
    } else if (num == 14) {
        title = 'CONFIRM TRADE TRANSACTION';
        content = 'Confirm your transaction for swapping the tokens';
    } else if (num == 15) {
        title = 'CONTRACT UNDER CONSTRUCTION';
        content = 'kyber network contract under construction. Please come back later.';
    } else if (num == 16) {
        title = 'UNEXPECTED ERROR';
        content = 'Try reloading again!';
    } else if (num == 17) {
        title = 'ERROR GETTING EXPECTED RATE';
        content = `Unable to get expected rate maybe because the network is clogged. Please try again later.`;
    } else if (num == 18) {
        title = 'ERROR GETTING QUANTITY';
        content = `Unable to get quantity of ${alertVar} in your wallet`;
    } else if (num == 19) {
        title = 'ERROR GETTING QUANTITY';
        content = `Unable to get quantity of ETH in your wallet`;
    } else if (num == 20) {
        title = 'ALLOWANCE TRANSACTION DEPLOYED';
        content = `Check your transaction <a href="https://ropsten.etherscan.io/tx/${alertVar}" class="linkColor" target="_blank">here</a>. Once completed start trade transaction.`;
    } else if (num == 21) {
        title = 'ALLOWANCE TRANSACTION DEPLOYED';
        content = `Check your transaction <a href="https://etherscan.io/tx/${alertVar}" class="linkColor" target="_blank">here</a>. Once completed start trade transaction.`;
    } else if (num == 22) {
        title = 'ERROR COMPLETING TRANSACTION';
        content = `Error occured while completing your transaction.<br><b>${alertVar}</b>`;
    } else if (num == 23) {
        title = 'SWAPPING TRANSACTION DEPLOYED';
        content = `Check your transaction <a href="https://ropsten.etherscan.io/tx/${alertVar}" class="linkColor" target="_blank">here</a>. We'll notify you when transaction gets completed.`;
    } else if (num == 24) {
        title = 'SWAPPING TRANSACTION DEPLOYED';
        content = `Check your transaction <a href="https://etherscan.io/tx/${alertVar}" class="linkColor" target="_blank">here</a>. We'll notify you when transaction gets completed.`;
    } else if (num == 25) {
        title = 'TRANSACTION FAILED';
        content = `Error occured while completing your transaction.<br><b>${alertVar}</b>`;
    } else if (num == 26) {
        title = 'TRANSACTION COMPLETED';
        content = 'Your swapping has been successfully completed!';
    } else if (num == 27) {
        title = 'TRANSACTION FAILED';
        content = `Error occured while completing your transaction.<br><b>${alertVar}</b>`;
    }
    swal({ "title": title,
            "html": content,
            buttonsStyling: false,
            confirmButtonClass: "btn btn-default"
    });
}