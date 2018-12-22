db.ref('gas').on('value', function (snapshot) {
    data = snapshot.val();
    if (data.fast < 500) {
        gasLow = data.safeLow / 10;
        gasHigh = data.fast / 10;
        gasStandard = data.average / 10;
    } else {
        if (data.safeLow < 500) {
            gasLow = data.safeLow / 10;
        } else {
            gasLow = 50;
        }
        gasHigh = 50;
        if (data.average < 500) {
            gasStandard = data.average / 10;
        } else {
            gasStandard = 50;
        }
    }
    setGas(gasDecide);
}, function (error) {
    if (error) {
        navAlerts(28);
    }
});
