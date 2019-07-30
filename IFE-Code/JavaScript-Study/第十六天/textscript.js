document.getElementById("add-btn").onclick = function() {
	document.getElementById("result").innerHTML = 
	parseInt(document.getElementById("first-number").value) + parseInt(document.getElementById("second-number").value);
}
document.getElementById("minus-btn").onclick = function() {

	document.getElementById("result").innerHTML = 
	document.getElementById("first-number").value - document.getElementById("second-number").value;
}

document.getElementById("times-btn").onclick = function() {

	document.getElementById("result").innerHTML = 
	document.getElementById("first-number").value * document.getElementById("second-number").value;
}

document.getElementById("divide-btn").onclick = function() {

	document.getElementById("result").innerHTML = 
	document.getElementById("first-number").value / document.getElementById("second-number").value;
}
/*function myfunction(){
			//document.getElementById('text').innerHTML = 5 + 7;
			var x, y, z;
			x = 22;
			y = 33;
			z = x + y;
			document.getElementById('text').innerHTML =
			 "The value of z is "+ z +""
		}
//window.alert(5 + 8);
//console.log(5 + 9);
const num = document.querySelector('button');

num.addEventListener('click', start);
function start() {
	var x, y;
	x = document.getElementById("first-number").value;
	y = document.getElementById("second-number").value;
}
*/