/*
var date;
date = document.getElementById('demo');

if (new Date().getHours() < 12) {
	date.innerHTML = "Good Morning!";
} else if (new Date().getHours() < 14) {
	date.innerHTML = "Good Afternoon!";
} else {
	date.innerHTML = "Good Evening!";
}
*/
/*
var day;
switch (new Date().getDay()) {
	case 0: 
		day = "Sunday";
		break;
	case 1:
		day = "Monday";
		break;
	case 2:
		day = "Tuesday";
		break;
	case 3:
		day = "Wednesday";
		break;
	case 4:
		day = "Thursday";
		break;
	case 5:
		day = "Friday";
		break;
	case 6:
		day = "Saturday";
		break;
	default:
		day = "heihei";
		break;
}
document.getElementById('demo').innerHTML = 'Today is ' + day;
*/
/*
var cars = ["one", "two", "three", "four"];
var text = "";
for (var i = 0; i < cars.length; i++) {
	text += cars[i] + "<br />";
	document.getElementById('demo').innerHTML = text;
}
*/
/*
var x, txt = "";
var person = {fname: "Yuhang", lname: "Guo", age: 20};
for (x in person) {
	txt += person[x] + " ";
}
document.getElementById('demo').innerHTML = txt;
*/
/*
var cars = ["one", "two", "three", "four"];
var text = "";
list: {
	text += cars[0] + "<br />";
	text += cars[1] + "<br />";
	break list;
	text += cars[2] + "<br />";
	text += cars[3] + "<br />";
}
document.getElementById('demo').innerHTML = text;
*/

//document.getElementById('demo').innerHTML = Date() + "<br />" + typeof Date();
/*
var text = "Hello World";
var n = text.search(/world/i);
document.getElementById('demo').innerHTML = n;
*/
/*
function myFunction() {
	var str = document.getElementById('demo').innerHTML;
	var txt = str.replace(/liu/i, "GuoyuHang");
	document.getElementById('demo').innerHTML = txt;
}
*/
/*
try {
    adddlert("欢迎访问！");
}
catch(err) {
    document.getElementById("demo").innerHTML = err.message;
}
*/
<script src = "study.js" async></script>