// let config = {
//     databaseURL: "https://easwap-2018.firebaseio.com",
// };
// firebase.initializeApp(config);

// let db = firebase.database();

// Kyber Data from database
function dataAsPerNetwork() {
    if (networkId == 3) {
        $.get("/trade/kyberRops", function(data, status){
            $('.loaderBox').css('display', 'none');
            $('.loader').css('display', 'none');
            coinsData = data;
            showBoxes();
        });
    } else {
        $.get("/lister/coinsData", function(data, status){
            $('.loaderBox').css('display', 'none');
            $('.loader').css('display', 'none');
            coinsData = data;
            showBoxes();
        });
    }
}