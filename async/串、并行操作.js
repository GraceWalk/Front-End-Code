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