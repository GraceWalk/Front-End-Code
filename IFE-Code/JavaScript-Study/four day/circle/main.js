function byId(id) {
	return typeof(id) === "string"? document.getElementById(id): id;
}

function changeImg() {
	for (var i = 0; i < len; i++) {
	pics[i].style.display = 'none';
	dots[i].className = null;
	}
	pics[index].style.display = 'block';
	dots[index].className = 'active';
}

var index = 0, 
	timer = null,
	pics = byId('banner').getElementsByTagName('div'),
	dots = byId('dots').getElementsByTagName('span'),
	main = byId('main'),
	prev = byId('prev'),
	next = byId('next'),
	subMenu = byId('sub-menu'),
	innerBox = subMenu.getElementsByClassName('inner-box'),
	menu = byId('menu-content'),
	menuItem = menu.getElementsByClassName('menu-item'),
	len = pics.length;

function slideImg() {
	main.onmouseover = function() {
		clearInterval(timer);
		
	}
	main.onmouseout = function() {
		timer = setInterval(function() {
			index++;
			if (index >= len) {
				index = 0;
			}
			changeImg();
		}
			, 3000);
	}
	main.onmouseout();

	for(var d = 0; d < len; d++) {
		dots[d].id = d;
		dots[d].onclick = function() {
			index = Number(this.id);
			changeImg();
		}
	}
	prev.onclick = function() {
		index--;
		if (index < 0) {
			index = len - 1;
		}
		changeImg();
	}
	next.onclick = function() {
			index++;
		if (index >= len) {
			index = 0;
		}
		changeImg();
	}


	for (var m = 0; m < menuItem.length; m++) {
		menuItem[m].setAttribute('data-index', m);
		menuItem[m].onmouseover = function() {
			var idx = this.getAttribute('data-index');
			subMenu.style.display = 'block';
			for (var s = 0; s < menuItem.length; s++) {
				innerBox[s].style.display = 'none';
				menuItem[s].style.backgroundColor = '';
			}
			menuItem[idx].style.backgroundColor = 'rgba(0, 0, 0, 0.1)';
			innerBox[idx].style.display = 'block';
		}
	}
	menu.onmouseout = function() {
		subMenu.style.display = 'none';
		}
	subMenu.onmouseover = function() {
		subMenu.style.display = 'block';
	}
	subMenu.onmouseout = function() {
		subMenu.style.display = 'none';
		}

}

slideImg();