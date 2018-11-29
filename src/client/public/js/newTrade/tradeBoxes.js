// Align object box in alphabetical order

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
    
        // $(`${'.'+forClass}`).css('box-shadow', `0px 0px 2px 2px var(--blue-for-hover)`);
    
        // $(`${'.'+forClass}`).hover(function () {
        //     $(this).css('box-shadow', `0px 0px 8px 8px var(--blue-for-hover)`);
        // }, function () {
        //     $(this).css('box-shadow', `0px 0px 2px 2px var(--blue-for-hover)`);
        // });
    });
}