let postfixList = ['163.com', 'gmail.com', '126.com', 'qq.com', '263.net'];
let input = document.querySelector('#email-input');
let ul = document.querySelector('.email-sug');
let li, text, text1, text2;

input.oninput = function() {
	drawTip();
	display();
}

function drawTip() {
	text = input.value;
	ul.textContent = '';
	num = text.indexOf('@');
	if (num != -1) {
		text1 = text.slice(0, num);
		text2 = text.slice(num + 1);
	} else {
		text1 = text;
	}
	for(let i = 0; i < postfixList.length; i++) {
		if (postfixList[i].match(text2) !== null) {
			li = document.createElement('li');
			li.textContent = text1 + '@' + postfixList[i];
			ul.append(li);
		} else if (text2 === '') {
			li = document.createElement('li');
			li.textContent = text1 + '@' + postfixList[i];
			ul.append(li);
		}
	}
}


function display() {
	if (input.value === '' || input.value === ' ') {
		hide();
	} else {
		show();
	}
}

function hide() {
	ul.style.display = 'none';
}

function show() {
	ul.style.display = 'block';
}

ul.onclick = function(e) {
	input.value = e.target.textContent;
	hide();
}


