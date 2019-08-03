//谷歌搜索
let search = document.querySelector('#search');
search.onkeypress = function(e) {
    if (e.key === 'Enter') {
        window.open('http://www.google.com/search?q='+search.value)
        searchBox.value = ''
    }
}