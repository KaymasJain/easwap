function pmlJSONFromDatabase() {
    $.get("/lister/coinsData", function(result) {
        kyberRopstenTokensJSON = result;
        initReserves();
        setTimeout(function(){
            console.log("Done Loading " + kyberRopstenTokenCount + "Tokens");
            updateMainUI(kyberRopstenTokenCount);
        },1000);
    }).fail(function() {
        alert("[ERROR] Token Addresses Not Loaded");
    });
}