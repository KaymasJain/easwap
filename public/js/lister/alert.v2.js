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
        content = "<b>You are good to use ropsten test version of List ropsten Token. For real assets listing shift to Main network.</b>";
    } else if (num == 4) {
        title = 'Not main network';
        content = "<b>Shift to main network to list new ERC20s.</b>";
    } else if (num == 5) {
        title = 'Shift To Main Network';
        content = "<b>You're using test networks. Shift to Main Network to use List new ERC20.</b>";
    } else if (num == 6) {
        title = 'Error getting Listing Stage';
        content = "<b>Error getting the stage of ERC20 listing process. Check is ERC20 contract address in valid and try again!</b>";
    } else if (num == 7) {
        title = 'Confirm Listing Transactions';
        content = "<b>You'll get back to back 3 transactions. Confirm them all to list the ERC20.</b>";
    } else if (num == 8) {
        title = 'Confirm Listing Transactions';
        content = "<b>You'll get back to back 2 transactions. Confirm both all to list the ERC20.</b>";
    } else if (num == 9) {
        title = 'Confirm Listing Transactions';
        content = "<b>Confirm the transaction to successfully list the ERC20. We'll Inform you once the transaction gets completed.</b>";
    } else if (num == 10) {
        title = 'ERC20 Already listed';
        content = "<b>The provided ERC20 is already listed. Head to orderbook section to create orderbook.</b>";
    } else if (num == 11) {
        title = 'ERC20 Successfully Listed';
        content = "<b>ERC20 has been successfully listed. Head towards orderbook section to create orderbook.</b>";
    } else if (num == 12) {
        title = 'Listing transactions Deployed!';
        content = "<b>Listing Transactions successfully deployed. We'll let you know once it get confirmed!</b>";
    } else if (num == 13) {
        title = 'Input Not Valid';
        content = "<b>Input should be valid ERC20 address.</b>";
    }
    swal({ "title": title,
            "html": content,
            buttonsStyling: false,
            confirmButtonClass: "btn btn-default"
    });
}

// blackDashboard.showSidebarMessage("Sidebar mini deactivated...")