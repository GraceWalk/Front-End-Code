const displayedImage = document.querySelector('.displayed-img');
const thumbBar = document.querySelector('.thumb-bar');

const btn = document.querySelector('button');
const overlay = document.querySelector('.overlay');

/* 遍历图片并添加至缩略图区 */

for (var i = 1; i < 6; i++) {
	const newImage = document.createElement('img');
	var pctr = 'images/pic' + i + '.jpg';
	newImage.setAttribute('src', pctr);
	thumbBar.appendChild(newImage);

	newImage.onclick = function(e) {
		const imgSrc = e.target.getAttribute('src')
		displayedImage.setAttribute('src', imgSrc);
	}
}
/* 编写 变亮/变暗 按钮 */
	btn.onclick = function() {
		if (btn.getAttribute('class') === 'dark') {
			btn.setAttribute('class', 'light');
			btn.textContent = '变亮';
			overplay.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
		} else {
			btn.setAttribute('class', 'dark');
			btn.textContent = '变暗';
			overplay.style.backgroundColor = 'rgba(0, 0, 0, 0)';
		}
}
