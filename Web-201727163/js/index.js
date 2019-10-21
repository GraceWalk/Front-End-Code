import '../css/style.css'
//展示系统时间
window.onload = function() {
var timeText = document.getElementById('time');
var now, date, hours, minutes, time, seconds;
setInterval(function() {
    now = new Date();

    //获取并格式时间
    hours = now.getHours() < 10? "0" + now.getHours() : now.getHours();
    minutes = now.getMinutes() < 10? "0" + now.getMinutes() : now.getMinutes();
    seconds = now.getSeconds() < 10? "0" + now.getSeconds() : now.getSeconds();
    date = now.getFullYear() + '-' + (now.getMonth() + 1) + '-' + now.getDate();

    //展示时间
    time = hours + ':' + minutes + ':' + seconds;
    timeText.innerHTML = date + '  ' + time;
}, 500);

//欢迎词
var nameSubmit = document.getElementById('submit');
var greet = document.getElementById('greet');
var name;
nameSubmit.onclick = function() {
    name = document.getElementById('name').value;
    if (name.length > 8) {
        name = name.substring(0, 8);
    }
    greet.innerHTML = '欢迎你, ' + name;
}

//单选框
var selectedFood;
var foodSelect = document.getElementById('foodselect');
var list = document.getElementsByClassName('myfood');
foodSelect.onchange = function() {
    selectedFood = foodSelect.value;
    for (var i = 0; i < list.length; i++) {
        list[i].style.display = 'none';
    }
    document.getElementById(selectedFood).style.display = 'block';
}

//左侧导航
var sidebar = document.getElementById('sidebar');
var sidebarChild = sidebar.children;

//实时定位内容位置
window.onscroll = function() {
    var windowTop = document.documentElement.scrollTop + 1;
    if (windowTop > 220) {
        sidebar.style.display = 'block';
    } else {
        sidebar.style.display = 'none';
    }
    for(var i = 0; i < 4; i++) {
        sidebarChild[i].style.backgroundColor = '#fff';
    }
    if (windowTop >= document.getElementById('food').offsetTop) {
        sidebarChild[3].style.backgroundColor = 'rgba(187, 187, 187, 0.5)';
    } else if (windowTop >= document.getElementById('home').offsetTop) {
        sidebarChild[2].style.backgroundColor = 'rgba(187, 187, 187, 0.5)';
    } else if (windowTop >= document.getElementById('school').offsetTop) {
        sidebarChild[1].style.backgroundColor = 'rgba(187, 187, 187, 0.5)';
    } else {
        sidebarChild[0].style.backgroundColor = 'rgba(187, 187, 187, 0.5)';
    }
}

//平滑滚动到内容位置
sidebarChild[0].onclick = function() {
    window.scrollTo({
        top: document.getElementById('my').offsetTop,
        behavior: "smooth"
    });
}
sidebarChild[1].onclick = function() {
    window.scrollTo({
        top: document.getElementById('school').offsetTop,
        behavior: "smooth"
    });
}
sidebarChild[2].onclick = function() {
    window.scrollTo({
        top: document.getElementById('home').offsetTop,
        behavior: "smooth"
    });
}
sidebarChild[3].onclick = function() {
    window.scrollTo({
        top: document.getElementById('food').offsetTop,
        behavior: "smooth"
    });
}
}
