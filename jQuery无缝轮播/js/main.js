$('.images>img:nth-child(1)').addClass('current').siblings().addClass('enter');

let imageNum = $('.images>img');
let i = 0;
setInterval(function() {
    imageNum.eq(i).removeClass('current').addClass('leave')
    .one('transitionend', (e) => {
        $(e.currentTarget).removeClass('leave').addClass('enter')
    })
    if(i === imageNum.length - 1) i = -1;
    imageNum.eq(++i).removeClass('enter').addClass('current');
}, 2000);