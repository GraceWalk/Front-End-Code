init();

function init() {
    //加载本地存储颜色
    appColor();
    //读取本地todo-list数据
    render.init();
    //加载todo-list数据
    $('.todo-list').show();
    //监听添加任务按钮
    addTaskBtn();
    //加载左侧栏
    leftMenuBox();
    //加载管理任务按钮[删除、完成]
    manageTask();
    //滑动智能显示/隐藏header和btn-box
    scrollHide();
}

//监听添加任务按钮以及动画
function addTaskBtn() {
    $('.addBtn').click(function() {
        if ($('.add-task').css('display') === 'none') {
            showAnimation();
            addTask();
        } else {
            hideAnimation();
            return false;
        }
    })
}

//添加新任务
function addTask() {
    let input = $('.task-content input');
    let todo = $('.todo-list');
    let okAddBtn = $('.okAddBtn');
    input.focus();
    //监听Input输入内容的响应
    input.bind('input propertychange', function() {
        if (input.val() !== '') {
            okAddBtn.css('background-color', '#25b99a');
            input.css('border-bottom-color', '#212121');
        } else {
            okAddBtn.css('background-color', '#757575');
            input.css('border-bottom-color', '#BDBDBD');
        }
    })
    //确认添加内容
    okAddBtn.click(function() {
        let text = input.val();
        if (text !== '') {
            model.addTask(text);
            input.val('');
            okAddBtn.css('background-color', '#757575');
            chooseItem.listPage('todo');
            hideAnimation();
        }
        
    })
}

//左侧边栏的弹出和收回
function leftMenuBox() {
    //左侧栏按钮的点击监听
    $('.app-menu').click(function() {
        //判断左侧栏是否弹出
        if ($('.menu-box').css('left') === '-260px') {
            $('.cover').fadeIn();
            $('.menu-box').animate({
                left: 0
            }, 400);
        } else {
            $('.cover').fadeOut();
            $('.menu-box').animate({
                left: -260
            }, 300);
        }
    })
    $('.app-back').click(function() {
        $('.menu-subCard').fadeOut();
        $('.cover').fadeOut();
        $('.app-back').hide();
        $('.app-menu').fadeIn();
    })
    $('.cover').click(function() {
        $('.cover').fadeOut();
        $('.menu-box').animate({
            left: -260
        }, 300);
        if ($('.menu-subCard').css('display') !== 'none') {
            $('.menu-subCard').fadeOut();
            $('.app-back').hide();
            $('.app-menu').fadeIn();
        }
    })

    menuOption();
}

//管理任务的完成和删除
function manageTask() {
    $('.todo-list').on('click', '.clear', function() {
        model.clearTask('todo', $(this).parent().find('i').text());
    });
    $('.todo-list').on('click', '.finish', function() {
        model.completeTask($(this).parent().find('.task-title').text());
        model.clearTask('todo', $(this).parent().find('i').text());
    });
    $('.completed-list').on('click', '.clear', function() {
        model.clearTask('completed', $(this).parent().find('i').text());
    })
}

//左侧栏选项调用
function menuOption() {
    $('.menu-item').click(function() {
        let data = $(this).attr('data');
        switch(data) {
            case 'todo':
                chooseItem.listPage('todo');
                break;
            case 'completed':
                chooseItem.listPage('completed');
                break;
            case 'changeColor':
                subMenuPanel();
                cgColorBtn();
                appColor();
                break;
            case 'about':
                break;
            default:
                console.log('no data');
        }
    })
}

