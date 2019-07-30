var num1 = document.getElementById('first-number');
var num2 = document.getElementById('second-number');
var para = document.getElementById('result');

var add = document.getElementById('add-btn');
var minus = document.getElementById('minus-btn');
var times = document.getElementById('times-btn');
var divide = document.getElementById('divide-btn');


add.onclick = function() {
	var cout = Number(num1.value) + Number(num2.value);
	para.innerHTML = '运算结果: ' + cout;
	qL();
}
minus.onclick = function() {
	var cout = num1.value - num2.value;
	para.textContent = '运算结果: ' + cout;
	qL();
}
times.onclick = function() {
	var cout = num1.value * num2.value;
	para.textContent = '运算结果: ' + cout;
	qL();
}
divide.onclick = function() {
	var cout = num1.value / num2.value;
	para.textContent = '运算结果: ' + cout;
	qL();
}
function qL() {
	num1.value = num2.value = null;
	num1.focus();
}
