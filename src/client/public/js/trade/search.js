var searchArr = [];

function searchTab() {
    Object.keys(kyber)
        .sort()
        .forEach(function (key, i) {
        var charOne = key.charAt(0);
        var forClass = `search${charOne}`;
        if (searchArr.indexOf(charOne) == -1) {
            searchArr.push(charOne);
            var html = `<div class="searchBox ${forClass}" onclick="filterSearch('${charOne}', this)">${charOne.toUpperCase()}<span class="selectedChar"></span></div>`;
            $(".searchBar").append(html);
        }
    });
}

function filterSearch(letter, toGetElem) {
    $('.searchBox').css({'background-color': 'var(--blue-for-hover)', 'color': 'var(--main-white)'});
    $(toGetElem).css({'background-color': 'var(--main-white)', 'color': 'var(--main-color1)'});
    $('.selectCoinBox').css('display', 'block');
    if (letter != 'all') {
        Object.keys(kyber)
            .sort()
            .forEach(function (key, i) {
            var charOne = key.charAt(0);
            var forClass = `.${key + 'ForColor'}`;
            if (charOne != letter) {
                $(forClass).css('display', 'none');
            }
        });
    }
}