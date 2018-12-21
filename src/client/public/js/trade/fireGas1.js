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
    console.log(gasDecide);
    setGas(gasDecide);
}, function (error) {
    if (error) {
        console.log('err - 93284' + error);
        let title = 'ERROR FETCHING DATA';
        let content = 'Error in fetching gas price from database. Reload and try again if not solve contact us';
        showAlert(title, content);
    }
});
