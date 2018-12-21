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

var sliderGasChangeErr = 0;

gasPriceSlider.noUiSlider.on('update', function (values, handle) {
	finalGasPrice = values[handle];
	$('.finalGasPrice').text(`${finalGasPrice} GWEI`);
	sliderGasChangeErr++;
	if (sliderGasChangeErr > 3) {
		gasToTranSet(1);
	}
	setTimeout(function(){sliderGasChangeErr = 0}, 50);
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

$('.sidebarAdjust').click(function() {
	if (!sidebar_mini_active) {
		$('.sidebarBottom').css('display', 'none');
		$('.sidebarEdit').hover(function(){
			$('.sidebarBottom').css('display', 'flex');
		}, function() {
			$('.sidebarBottom').css('display', 'none');
		});
	} else {
		$('.sidebarBottom').css('display', 'flex');
		$('.sidebarEdit').hover(function(){
			$('.sidebarBottom').css('display', 'flex');
		}, function() {
			$('.sidebarBottom').css('display', 'flex');
		});
	}
});