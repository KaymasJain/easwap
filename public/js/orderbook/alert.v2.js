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
        content = "<b>You are on main network whatever trade you do will involves real assets.</b>";
    } else if (num == 3) {
        title = 'Ropsten test network';
        content = "<b>You are good to use ropsten test version of Token's ropsten orderbook. For real assets orderbook shift to Main Network.</b>";
    } else if (num == 4) {
        title = 'Not Main Network';
        content = "<b>Shift to main network to create orderbooks.</b>";
    } else if (num == 5) {
        title = 'Shift to Main Network';
        content = "<b>Shift to Main network to make OrderBooks.</b>";
    } else if (num == 6) {
        title = 'Not Permissionless Reserve';
        content = `<b>This ERC20 doesn't have a permission less reserve yet. Head to <a href="/lister">listing section</a> to list this ERC20.</b>`;
    } else if (num == 7) {
        title = `Deposit ${alertVar}`;
        content = `<b>Confirm the transaction to deposit ${alertVar} for orderbook.</b>`;
    } else if (num == 8) {
        title = `Withdraw ${alertVar}`;
        content = `<b>Confirm the transaction to withdraw ${alertVar} to your wallet.</b>`;
    } else if (num == 9) {
        title = 'Create Order';
        content = "<b>Confirm the transaction to successfully create your order.</b>";
    } else if (num == 10) {
        title = 'Update Order';
        content = "<b>Confirm the transaction to successfully update your order.</b>";
    } else if (num == 11) {
        title = 'Cancel Order';
        content = "<b>Confirm the transaction to successfully cancel your order.</b>";
    } else if (num == 12) {
        title = 'Approval transaction!';
        content = "<b>Approval transaction has been deployed. We'll let you know once it gets confirmed.</b>";
    } else if (num == 13) {
        title = 'Error Approval';
        content = `<b>Error occured during deployment of Approval transaction. Error - ${alertVar}</b>`;
    } else if (num == 14) {
        title = 'Approval Transaction Completed';
        content = "<b>Allowance of ERC20 has been successfully given to reserve contract.</b>";
    } else if (num == 15) {
        title = `Deposit ${alertVar} Transaction`;
        content = `<b>Transaction to deposit ${alertVar} has been deployed. We'll let you know once it gets confirmed.</b>`;
    } else if (num == 16) {
        title = `Withdraw ${alertVar} Transaction`;
        content = `<b>Transaction to withdraw ${alertVar} has been deployed. We'll let you know once it gets confirmed.</b>`;
    } else if (num == 17) {
        title = `Confirm Approval Transaction`;
        content = `<b>You've to first give allowance to contract before you can deposit ${alertVar}</b>`;
    } else if (num == 18) {
        title = 'Create Order Transaction!';
        content = "<b>Create Order transaction has been deployed. We'll let you know once it gets confirmed.</b>";
    } else if (num == 19) {
        title = 'Update Order Transaction!';
        content = "<b>Update Order transaction has been deployed. We'll let you know once it gets confirmed.</b>";
    } else if (num == 20) {
        title = 'Cancel Order Transaction!';
        content = "<b>Cancel Order transaction has been deployed. We'll let you know once it gets confirmed.</b>";
    }
    swal({ "title": title,
            "html": content,
            buttonsStyling: false,
            confirmButtonClass: "btn btn-default"
    });
}

// blackDashboard.showSidebarMessage("Sidebar mini deactivated...")