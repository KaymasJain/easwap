var gasPriceSlider = document.getElementById('sliderGasPrice');

noUiSlider.create(gasPriceSlider, {
	start: 30,
	connect: [true,false],
	range: {
		min: 0,
		max: 60
	}
});

var minConRateSlider = document.getElementById('minConRate');

noUiSlider.create(minConRateSlider, {
	start: 30,
	connect: [true,false],
	range: {
		min: 0,
		max: 60
	}
});