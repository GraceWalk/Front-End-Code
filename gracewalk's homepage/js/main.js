window.onLoad = function() {//谷歌搜索
let search = document.querySelector('#search');
search.onfocus = function() {
    search.style.opacity = 0.6;
}
search.onblur = function() {
    search.style.opacity = 0.3;
}
search.focus();
search.onkeypress = function(e) {
    if (e.key === 'Enter') {
        window.open('http://www.google.com/search?q='+search.value)
        search.value = ''
    }
}

let myButton = document.querySelector('#mybotton');
myButton.addEventListener('click', function() {
    let request = new XMLHttpRequest();
    request.open('GET', '/xxx');
    request.send();
});
}