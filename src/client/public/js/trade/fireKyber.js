let config = {
    databaseURL: "***REMOVED***",
};
firebase.initializeApp(config);

let db = firebase.database();

function dataAsPerNetwork() {
    if (networkId == 3) {
        db.ref('kyberRops').once('value', function (snapshot) {
            coinsData = snapshot.val();
            showBoxes();
        }, function (err) {
            alert(err);
        });
    } else {
        db.ref('kyberMain').once('value', function (snapshot) {
            coinsData = snapshot.val();
            showBoxes();
        }, function (err) {
            alert(err);
        });
    }
}