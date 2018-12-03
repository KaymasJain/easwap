// Search Bar smooth scroll
const ps = new PerfectScrollbar('.searchBar');

// Advance Section Gas and Min conversion rate Slider
var gasPriceSlider = document.getElementById('sliderGasPrice');

noUiSlider.create(gasPriceSlider, {
	start: 30,
	connect: [true,false],
	range: {
		min: 0,
		max: 50
	}
});

gasPriceSlider.noUiSlider.on('update', function (values, handle) {
	finalGasPrice = values[handle];
	$('.finalGasPrice').text(`${finalGasPrice} GWEI`);
	gasToTranSet(1);
});

var minConRateSlider = document.getElementById('minConRate');

noUiSlider.create(minConRateSlider, {
	start: 97,
	connect: [true,false],
	range: {
		min: 90,
		max: 101
	}
});

minConRateSlider.noUiSlider.on('update', function (values, handle) {
	minRateSlider = values[handle];
	$('.finalMinRate').text(`${minRateSlider} %`);
	changeMinRateText();
});
