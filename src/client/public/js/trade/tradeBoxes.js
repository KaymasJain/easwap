// Align object box in alphabetical order
let searchArr = [];

function showBoxes() {
    Object.keys(coinsData)
        .sort()
        .forEach(function (key, i) {
        let forClass = `${key + 'Class'}`;
    
        let html = `<div class="selectCoinBox ${forClass}" onclick="funcToSelect('${key}')">
                        <div class="logoNameBox">
                            <div class="logoBox">
                                <img src="logos/${key}.svg" style="width:48px; height:48px">
                            </div>
                            <div class="nameCodeBox">
                                <div class="nameBox">${coinsData[key].symbol}</div>
                                <div class="nameToken">${coinsData[key].name}</div>
                            </div>
                        </div>
                        <div class="${key}Qty coinsQtyBox">QTY: 0.000000</div>
                    </div>`;
    
        if (key != 'eth' && key != 'dai') {
            $(".tradeDataContainer").append(html);
        } else if (key == 'dai') {
            $(".boxDai").append(html);
        } else if (key == 'eth') {
            $(".boxEth").append(html);
            $('.boxEthMob').append(html);
        }

        // Search Bar
        let charOne = key.charAt(0);
        let searchClass = `search${charOne}`;
        if (searchArr.indexOf(charOne) == -1) {
            searchArr.push(charOne);
            let html = `<div class="${searchClass} searchButBox"><button class="btn btn-sm btn-primary btn-fab btn-icon getBut" onclick="filterSearch('${charOne}', this)">${charOne.toUpperCase()}</button><span class="selectedChar"></span></div>`;
            $(".searchBar").append(html);
        }
    });
}

function filterSearch(letter, toGetElem) {
    $('.selectCoinBox').css('display', 'block');
    $('.searchButBox button').removeClass('btn-default');
    $('.searchButBox button').addClass('btn-primary');
    $(toGetElem).removeClass('btn-primary');
    $(toGetElem).addClass('btn-default');
    if (letter != 'all') {
        Object.keys(coinsData)
            .sort()
            .forEach(function (key, i) {
            let charOne = key.charAt(0);
            let forClass = `${key + 'Class'}`;
            if (charOne != letter) {
                $(`.${forClass}`).css('display', 'none');
            }
        });
    }
}


$('.showHideQty').click(function() {
    if ($(this).text() == "Show QTY") {
        $('.coinsQtyBox').slideToggle();
        $(this).text('Hide QTY');
        Object.keys(coinsData).forEach(function (key, i) {
            if (key == "eth") {
                ethBalance(key);
            } else {
                tokenBalance(key);
            }
        });
    } else if ($(this).text() == "Hide QTY") {
        $('.coinsQtyBox').slideToggle();
        $(this).text('Show QTY');
    }
})
