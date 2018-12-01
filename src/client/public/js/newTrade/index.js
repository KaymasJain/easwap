let web3;
let networkId;
let account;

window.addEventListener('load', async () => {
    if (window.ethereum) {
        web3 = new Web3(ethereum);
        try {
            await ethereum.enable();
            getAccountAndNetwork();
        } catch (error) {
            console.log(error);
        }
    } else if (window.web3) {
        web3 = new Web3(web3.currentProvider);
        getAccountAndNetwork();
    } else {
        $('.networkName').html(`<button class="btn btn-danger animation-on-hover" type="button" onclick="navAlerts(1)">NO ETH PROVIDER</button>`);
        dataAsPerNetwork();
        // web3 = new Web3(new Web3.providers.HttpProvider("http://mainnet.infura.io/APIKEY"));
    }
});

function getAccountAndNetwork() {
    web3.version.getNetwork((err, netId) => {
        account = web3.eth.accounts[0];
        networkId = netId;
        if (networkId == 1) {
            $('.networkName').html(`<button class="btn btn-success animation-on-hover" type="button" onclick='navAlerts(2)'>MAIN NETWORK</button>`);
        } else if (networkId == 3) {
            $('.networkName').html(`<button class="btn btn-warning animation-on-hover" type="button" onclick='navAlerts(3)'>ROPSTEN TEST NETWORK</button>`);
        } else {
            $('.networkName').html(`<button class="btn btn-warning animation-on-hover" type="button" onclick='navAlerts(4)'>NOT MAIN NETWORK</button>`);
        }
        if (account) {
            let stringLen = account.length;
            let text = `${account.slice(0, 6)}...${account.slice(stringLen-4, stringLen)}`;
            if (networkId == 1) {
                let link = `<button class="btn btn-info btn-simple animation-on-hover btn-sm" type="button">
                                <a class="navbar-brand" href="https://etherscan.io/address/${account}" target="_blank">${text}</a>
                            </button>`;
                $('.navUserAdd').html(link);
                // forMain();
            } else if (networkId == 3) {
                let link = `<button class="btn btn-info btn-simple animation-on-hover btn-sm" type="button">
                                <a class="navbar-brand" href="https://ropsten.etherscan.io/address/${account}" target="_blank">${text}</a>
                            </button>`;
                $('.navUserAdd').html(link);
                // forRopsten();
            } else {
                let link = `<button class="btn btn-info btn-simple animation-on-hover btn-sm" type="button">
                                <a class="navbar-brand">SHIFT TO MAIN NETWORK</a>
                            </button>`;
                $('.navUserAdd').html(link);
            }
        } else {
            let link = `<button class="btn btn-info btn-simple animation-on-hover btn-sm" type="button">NOT LOGGED-IN</button>`;
            $('.navUserAdd').html(link);
        }
        dataAsPerNetwork();
    });
}

function navAlerts(num) {
    let title, content;
    if (num == 1) {
        title = 'NO ETHEREUM PROVIDER';
        content = '<b>This Dapp is made on top of Ethereum blockchain.<br>To use this Dapp<br>For desktop install <a href="https://metamask.io/" target="_blank">metamask extension</a>.<br>For Android/IOS download ethereum browser - <a href="https://trustwallet.com/" target="_blank">Trust wallet</a></b>';
    } else if (num == 2) {
        title = 'Main network';
        content = "<b>You are on main network whatever trade you do will involve real assets.</b>";
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

