$(function() {

    $('#loginLink').click(function() {
        let loginHtml = $('#loginHtml').show();
        show(loginHtml, '300px');

        $('#login').click(function() {
            let username = $('#loginHtml [name=username]').val();
            let password = $('#loginHtml [name=password]').val();
            if (username === 'gracewalk' && password === 'gracewalk1999') {
                hide();
                alert('登录成功');
                username.val(' ');
                password.val(' ');
                $('#loginLink').html('gracewalk');
                $('#regLink').html('个人中心');
            }
        })
    });
    $('#regLink').click(function() {
        let regHtml = $('#regHtml').show();
        show(regHtml, '350px');
    });
    //点击关闭按钮或者空白处关闭登录框
    $('#layer-close').click(hide);
    $('#layer-mask').click(hide);

    //显示登录窗口
    function show(html, width) {
        html.show();
        $('#layer-pop').css('height', width);
        $('#layer-mask').show();
        $('#layer-pop').show();
    }
    //关闭登录窗口
    function hide() {
        $('#loginHtml').hide();
        $('#regHtml').hide();
        $('#layer-mask').hide();
        $('#layer-pop').hide();
    }

})