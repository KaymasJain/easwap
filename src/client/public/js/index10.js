// hiding boxes in ropsten
function forRopsten() {
    $('.mainBody').empty();
    Object.keys(coinsData).forEach(function (key, i) {
        if (!coinsData[key].rop) {
            var forClass = `.${coinsData[key].id}ForColor`;
            $(forClass).css('display', 'none');
        }
    });
    kyber = ropsData;
    var faucetLink = `<div id="faucetEth">Get free ETH for ropsten from <a href="https://faucet.metamask.io/" target="_blank" class="footerLink">Metamask's</a> and <a href="https://faucet.kyber.network/" target="_blank" class="footerLink">Kyber Network's</a> faucet</div>`
    $('.mainBody').append(faucetLink);
}

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
        console.log('Non-Ethereum browser detected. You should consider trying MetaMask!');
    }
});

function getAccountAndNetwork() {
    web3.version.getNetwork((err, netId) => {
        account = web3.eth.accounts[0];
        networkId = netId; // networkId defined in fire.js
        if (account) {
            setInterval(function() {
                var stringLen = account.length;
                var text = `${account.slice(0, 6)}...${account.slice(stringLen-4, stringLen)}`;
                if (networkId == 1) {
                    $('.loggedInWith').text('Main Network');
                    var link = `<a class="etherLink" target='_blank' href='https://etherscan.io/address/${account}'>${text}</a>`;
                    $('.yourAddr').empty().append(link);
                    $('.loggedInWith').css('background-color', 'var(--blue-for-hover-op5)');
                    $('.tryMainOrRop').hide();
                } else if (networkId == 3) {
                    $('.loggedInWith').text('Ropsten Test Net');
                    var link = `<a class="etherLink" target='_blank' href='https://ropsten.etherscan.io/address/${account}'>${text}</a>`;
                    $('.yourAddr').empty().append(link);
                    var toolTipText = `Ready for main net?<span class="tryNetText">For real asset trading just shift to main net</span>`
                    $('.tryMainOrRop').empty().append(toolTipText);
                    forRopsten();
                } else {
                    $('.loggedInWith').text('Not Main Net');
                    $('.yourAddr').text('shift to main');
                }
            }, 1000);
        } else {
            $('.yourAddr').text('Not logged-In');
        }
    });
}
