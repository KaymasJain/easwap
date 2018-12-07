// let web3;
let networkId;
let account;

window.addEventListener('load', async () => {
    if (window.ethereum) {
        window.web3 = new Web3(ethereum);
        try {
            await ethereum.enable();
            getAccountAndNetwork();
        } catch (error) {
            console.log(error);
        }
    } else if (window.web3) {
        window.web3 = new Web3(web3.currentProvider);
        getAccountAndNetwork();
    } else {
        $('.networkName').html(`<button class="btn btn-danger animation-on-hover" type="button" onclick="navAlerts(1)">NO ETH PROVIDER</button>`);
        let link = `<button class="btn btn-info btn-simple animation-on-hover" type="button" onclick="navAlerts(0)">Create ID</button>`;
        $('.navUserAdd').html(link);
        dataAsPerNetwork();
        // web3 = new Web3(new Web3.providers.HttpProvider("http://mainnet.infura.io/APIKEY"));
    }
});


function getAccountAndNetwork() {
    alert('trust');
    web3.version.getNetwork((err, netId) => {
        alert('network');
        $('.swapButClass').css('display', 'none');
        $('.descLineMargin').css('margin', 'auto');
        account = window.web3.eth.accounts[0];
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
            $('.addressCon').text(text);
            if (networkId == 1) {
                let link = `<button class="btn btn-info btn-simple animation-on-hover btn-sm" type="button">
                                <a class="navbar-brand" href="https://etherscan.io/address/${account}" target="_blank">${text}</a>
                            </button>`;
                $('.navUserAdd').html(link);
            } else if (networkId == 3) {
                let link = `<button class="btn btn-info btn-simple animation-on-hover btn-sm" type="button">
                                <a class="navbar-brand" href="https://ropsten.etherscan.io/address/${account}" target="_blank">${text}</a>
                            </button>`;
                $('.navUserAdd').html(link);
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
        loadContractFunc();
    });
}


function loadContractFunc() {
    mainKyberContract = web3.eth.contract(kyberMainABI).at(mainKyberAdd);
    kyberEnable();
    kyberTradeEvent();
}