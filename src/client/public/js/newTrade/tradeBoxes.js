// Align object box in alphabetical order
var searchArr = [];

function showBoxes() {
    Object.keys(coinsData)
        .sort()
        .forEach(function (key, i) {
        var forClass = `${key + 'Class'}`;
    
        var html = `<div class="selectCoinBox ${forClass}" onclick="funcToSelect('${key.id}')">
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
        var charOne = key.charAt(0);
        if (searchArr.indexOf(charOne) == -1) {
            searchArr.push(charOne);
            var html = `<div><button class="btn btn-sm btn-primary btn-fab btn-icon" onclick="filterSearch('${charOne}', this)">${charOne.toUpperCase()}</button><span class="selectedChar"></span></div>`;
            $(".searchBar").append(html);
        }
    });
}