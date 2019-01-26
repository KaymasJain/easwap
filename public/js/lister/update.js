// Only FOR TEAM USE

function updateDatabase(dataToStore) {
	var objectToSend = {
		'secret': secretToStore,
		'listedCoins': dataToStore // object of tokens
	}
	$.ajax({
		url: "/lister/update",
		type: 'POST',
		contentType:'application/json',
		data: JSON.stringify(objectToSend),
        dataType:'json',
        success: function (data) { 
            console.log(data);
        }
	});
	alert('saved');
}

function getJSON(secret) {
	secretToStore = secret;
	$.get(ropstenReservesAPI, function(result) {
		var data = result.data;
		apiDataLength = data.length;
		Object.keys(data).forEach(function (key, i) {
			isPML(data[key]);
		});
	}).fail(function() {
		alert("[ERROR] Token Addresses Not Loaded");
	});

}