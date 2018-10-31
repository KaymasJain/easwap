function hideAlert() {
    $('.alertLoaderBackground').hide();
    $('.alertBox').hide();
}


function showAlert(title, content) {
    $('.alertTitle').text(title);
    $('.alertCon').html(content);
    $('.alertLoaderBackground').show();
    $('.alertBox').show();
}

function hideLoader() {
    $('.loaderBox').hide();
    $('.loader').hide();
}

function showLoader() {
    $('.loaderBox').show();
    $('.loader').show();
}