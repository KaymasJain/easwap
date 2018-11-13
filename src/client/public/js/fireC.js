var networkId;
var config = {
    databaseURL: "https://easwap-2018.firebaseio.com",
};
firebase.initializeApp(config);

var db = firebase.database();

function forMain() {
    db.ref('kyberMain').once('value', function (snapshot) {
        kyber = snapshot.val();
        showBoxes();
        hideLoader();
    }, function (error) {
        if (error) {
            var title = 'ERROR FETCHING DATA';
            var content = 'Error in fetching kyber data. Reload and try again if not solve contact us';
            showAlert(title, content);
        }
    });
}

function forRopsten() {
    db.ref('kyberRops').once('value', function (snapshot) {
        kyber = snapshot.val();
        showBoxes();
        hideLoader();
    }, function (error) {
        if (error) {
            var title = 'ERROR FETCHING DATA';
            var content = 'Error in fetching kyber data. Reload and try again if not solve contact us';
            showAlert(title, content);
        }
    });
}


db.ref('gas').on('value', function (snapshot) {
    data = snapshot.val();
    if (data.fast < 500) {
        gasLow = data.safeLow / 10;
        gasHigh = data.fast / 10;
        if ((gasLow + gasHigh) / 2 > data.average / 10) {
            gasStandard = (gasLow + gasHigh) / 2;
        } else {
            gasStandard = data.average / 10;
        }
    } else {
        if (data.safeLow < 500) {
            gasLow = data.safeLow / 10;
        } else {
            gasLow = 50;
        }
        gasHigh = 50;
        if (data.average < 500 && ((gasLow + gasHigh) / 2) < 50) {
            if ((gasLow + gasHigh) / 2 > data.average / 10) {
                gasStandard = (gasLow + gasHigh) / 2;
            } else {
                gasStandard = data.average / 10;
            }
        } else {
            gasStandard = 50;
        }
    }
    setGas(2);
}, function (error) {
    if (error) {
        console.log('err - 93284' + error);
        var title = 'ERROR FETCHING DATA';
        var content = 'Error in fetching gas price from database. Reload and try again if not solve contact us';
        showAlert(title, content);
    }
});
