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
        content = "<b>You are good to use ropsten test version of kyber trade. For real assets trading shift to Main network.</b>";
    } else if (num == 4) {
        title = 'Not main network';
        content = "<b>Shift to main network to use kyber trade. Kyber trade is also available on Ropsten test network for trial purposes.</b>";
    }
    swal({ "title": title,
            "html": content,
            buttonsStyling: false,
            confirmButtonClass: "btn btn-default"
    });
}

// blackDashboard.showSidebarMessage("Sidebar mini deactivated...")