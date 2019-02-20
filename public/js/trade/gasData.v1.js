// Gas price data from server

setInterval(function() {
    $.get("/trade/gas", function(data, status){
        if (data.fast < 500) {
            gasLow = data.safeLow / 10;
            gasHigh = data.fast / 10;
            gasStandard = (data.average / 10) + 2;
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
    });
    // , function (err) {
    //     alert(err);
    //     if (error) {
    //         navAlerts(28);
    //     }
    // });
}, 5000);