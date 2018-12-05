var titleAnim = $('.homeTitle').find('span');

function runAnim() {
    setTimeout(function() {
        titleAnim.eq(0).css('opacity', '1');
        titleAnim.eq(1).css('opacity', '0.4');
        titleAnim.eq(2).css('opacity', '0.4');
        titleAnim.eq(3).css('opacity', '0.4');
    }, 500);
    setTimeout(function() {
        titleAnim.eq(0).css('opacity', '0.4');
        titleAnim.eq(1).css('opacity', '1');
        titleAnim.eq(2).css('opacity', '0.4');
        titleAnim.eq(3).css('opacity', '0.4');
    }, 1000);
    setTimeout(function() {
        titleAnim.eq(0).css('opacity', '0.4');
        titleAnim.eq(1).css('opacity', '0.4');
        titleAnim.eq(2).css('opacity', '1');
        titleAnim.eq(3).css('opacity', '0.4');
    }, 1500);
    setTimeout(function() {
        titleAnim.eq(0).css('opacity', '0.4');
        titleAnim.eq(1).css('opacity', '0.4');
        titleAnim.eq(2).css('opacity', '0.4');
        titleAnim.eq(3).css('opacity', '1');
        runAnim();
    }, 2000)
}

runAnim();