//串行执行
var items = [1, 2, 3, 4, 5, 6];
var results = [];

function async(arg, callback) {
    console.log('参数为 ' + arg + ', 1秒后返回结果');
    setTimeout(function () { callback(arg * 2); }, 1000);
}

function final(value) {
    console.log('完成: ' + value);
}
function series(item) {
    if(item) {
        async(item, function(result) {
            results.push(result);
            return series(items.shift());
        })
    } else {
        final(results[results.length - 1]);
    }
}

series(items.shift());

//并行执行
var items = [1, 2, 3, 4, 5, 6];
var results = [];

function async(arg, callback) {
    console.log('参数为 ' + arg + ', 1秒后返回结果');
    setTimeout(function () { callback(arg * 2); }, 1000);
}

function final(value) {
    console.log('完成', value);
}

items.forEach(function(item) {
    async(item, function(result) {
        results.push(result);
        if(results.length === items.length) {
            final(results[results.length - 1]);
        }
    })
});

//串行与并行结合
var items = [1, 2, 3, 4, 5, 6];
var results = [];
var running = 0;
var limit = 2;

function async(arg, callback) {
    console.log('参数为 ' + arg + ', 1秒后返回结果');
    setTimeout(function() { callback(arg * 2); }, 1000);
}

function final(value) {
    console.log('完成：' + value);
}

function launcher() {
    while(running < limit && items.length > 0) {
        var item = items.shift();
        async(item, function(result) {
            results.push(result);
            running--;
            if(items.length > 0) {
                launcher();
            } else if(running == 0) {
                final(results);
            }
        });
        running++;
    }
}

launcher();

//this指针指向全局变量和局部变量
var  x = 1;
var obj = {
    x: 2,
    y: function () {
        console.log(this.x);
    }
};
//指向全局变量
setTimeout(obj.y, 1000);
//指向局部变量
setTimeout(function() {
    obj.y();
}, 1000);
setTimeout(obj.y.bind(obj), 1000);

//setInterval实现网页动画
var div = document.querySelector('div');
var opacity = 1;
var fader = setInterval(function() {
    opacity -= 0.01;
    if (opacity >= 0) {
        div.style.opacity = opacity;
    } else {
        clearInterval(fader);
    }
}, 10);

//debounce(防抖动)函数
$('textarea').on('keydown', debounce(ajaxAction, 2500));

function debounce(fn, delay) {
    var timer = null;
    return function() {
        var context = this;
        var args = arguments;
        clearTimeout(timer);
        timer = setTimeout(function() {
            fn.apply(context, args);
        }, delay);
    }
}

//setTimeout与setInterval运行机制
//setTimeout与seetInterval将指定代码移出本轮事件循环，等到下一轮事件循环，再检查是否到了指定时间。
//如果到了，就执行相应的代码，如果不到，就继续等待。
//如果到达指定事件，前一轮事件还未执行完毕，则会等待之前的事件执行完毕后再指定时间的事件。
setInterval(function () {
    console.log(2);
}, 1000);

sleep(3000);

function sleep(ms) {
    var start = Date.now();
    while ((Date.now() - start) < ms) {

    }
};

setTimeout(function() {
    console.log(1);
}, 0);
console.log(2);
//👆输出结果：先输出2 再输出1
//setTimeout(f, 0)的重要用途：调整事件发生的顺序
var input = document.querySelector('input');

input.onclick = function A() {
    setTimeout(function B() {
        input.value += ' input';
    }, 0)
};

document.body.onclick = function C() {
    input.value += ' body'
};
//👆运行结果：[点击一次]click + body input

//用途示例2：将输入字母转换为大写字母
document.getElementById('input-box').onkeypress = function(event) {
    var self = this;
    setTimeout(function() {
        self.value = self.value.toUpperCase();
    }, 0);
}

//Promise
//👇100ms后将Promise状态变为resolve
function timeout(ms) {
    return new Promise((resolve, reject) => {
        setTimeout(resolve, ms, 'done');
    });
}

timeout(100);

//then方法，添加回调函数
var p1 = new Promise(function (resolve, reject) {
    resolve('成功');
});
p1.then(console.log, console.error);

var p2 = new Promise(function (resolve, reject) {
    reject(new Error('失败'));
});
p2.then(console.log, console.error);

//then方法可以链式调用
p1.then(step1)
    .then(step2)
    .then(step3)
    .then(
        console.log, //成功时的回调函数，只有step3为fulfilled时调用
        console.error //失败时的回调函数，p1~step3任意一个发生错误就调用
    )

//Promise实现图片加载
var preloadImage = function (path) {
    return new Promise(function (resolve, reject) {
        var image = new Image();
        image.src = path;
        image.onload = resolve;
        image.onerror = reject;
    });
};

preloadImage('https://google.com/favicon.ico')
    .then(function (e) { document.body.append(e.target) })
    .then(function () { console.log('加载成功') })

//Promise的then为异步任务，会在同步任务之后执行
new Promise(function (resolve, reject) {
    resolve(1)
}).then(console.log);

console.log(2);
console.log(3);
//👆执行结果：2 3 1

//Promise的回调函数不是正常的异步任务，而是微任务(microtask)，会在本轮循环尾部追加，而不是在下一轮事件循环
setTimeout(function() {
    console.log(3)
}, 0);

new Promise(function (resolve, reject) {
    resolve(2)
}).then(console.log);

console.log(1);
//👆执行结果：1 2 3