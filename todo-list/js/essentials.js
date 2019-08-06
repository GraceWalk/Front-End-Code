//打开添加任务界面以及对应动画
function showAnimation() {
    $('.add-task').show(400);
    $('.task-content').show(400);
    $('.addBtn svg').css({
        'transform': 'rotate(-45deg)',
        '-webkit-transform': 'rotate(-45deg)'
    });
    $('.okAddBtn').animate({
        bottom: 80
    }, 200);
}

//关闭添加任务界面以及对应动画
function hideAnimation() {
    $('.task-content').hide(300);
    $('.add-task').hide(300);
    $('.addBtn svg').css({
        'transform': 'rotate(0deg)',
        '-webkit-transform': 'rotate(0deg)'
    })
    $('.okAddBtn').animate({
        bottom: 5
    }, 60);
}

//左侧栏选项响应
function MenuItemFunc() {
    let listPage = function(type) {
        $('.cover').fadeOut();
        $('.menu-box').animate({
            left: -260
        }, 300);
        if (type === 'todo') {
            $('.completed-list').fadeOut();
            $('.todo-list').fadeIn();
        } else if (type === 'completed') {
            if ($('completed-list').html === '') {
                render.init('.completed-list');
            }
            $('.todo-list').fadeOut();
            $('.completed-list').fadeIn();
        }
    };
    let changeColor = function() {

    }
    let about = function() {

    }
    return {
        listPage: listPage,
        changeColor: changeColor,
        about: about
    };
}

//滑动智能隐藏 header和btn
function scrollHide() {
    let sctA = $(document).scrollTop(),
        headerHeight = $('header').height();

    $(window).scroll(function() {
        let sctB = $(document).scrollTop();

        if (sctB > headerHeight) {
            $('header').addClass('headerUp');
            $('.btn-box').addClass('btnDown');
        } else {
            $('header').removeClass('headerUp');
            $('.btn-box').removeClass('btnDown');
        }

        if (sctB > sctA) {
            $('header').removeClass('headerDown');
			$('.btn-box').removeClass('btnUp');
		}else{
			$('header').addClass('headerDown');
			$('.btn-box').addClass('btnUp');
        }
        sctA = $(document).scrollTop();
    })
}