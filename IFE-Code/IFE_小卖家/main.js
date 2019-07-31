//DOM操作定义部分
let regionCb = document.querySelector('#region-radio-wrapper');
let productCb = document.querySelector('#product-radio-wrapper');
//表格定义部分
let di = document.querySelector('#table-wrapper');
let table = document.createElement('table');
let thShow = ['商品','地区','1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月'];

//获取对应数据
function getData() {
	let rgCount = regionCb.getElementsByTagName('input');
	let pdCount = productCb.getElementsByTagName('input');
	let data = [], regionData = [], productData = [];
	let x = 0, y = 0, l = 0;
	for (let j = 0; j < 3; j++) {
		if (rgCount[j].checked === true) regionData[x++] = rgCount[j].id;
		if (pdCount[j].checked === true) productData[y++] = pdCount[j].id;
	}
	for (let i = 0; i < sourceData.length; i++) {
		for(let j = 0; j < 3; j++) {
			if (sourceData[i]["region"] === regionData[j]){
				for(let a = 0; a < 3; a++) {
					if (sourceData[i]["product"] === productData[a])
						data[l++] = i;
				}
			}
		}
	}
	return data;
}
	


//输出表头
function outThead() {
	//重置表单
	table.textContent = '';
	di.append(table);
	//创建表头
	var thead = document.createElement('thead');
	table.append(thead);
	for(let i = 0; i < 14; i++) {
		th = document.createElement('th');
		th.textContent = thShow[i];
		thead.append(th);
	}
}

//输出表格内容
function outTable(data) {
	outThead();

	//获得对应地区的所有属性的值
	for(let i = 0; i < data.length; i++) {
		tr = document.createElement('tr');
		table.append(tr);

		td = document.createElement('td');
		td.textContent = sourceData[data[i]]["product"];
		tr.append(td);
		td = document.createElement('td');
		td.textContent = sourceData[data[i]]["region"];
		tr.append(td);
		for(let j = 0; j < 12; j++) {
			td = document.createElement('td');
			td.textContent = sourceData[data[i]]["sale"][j];
			tr.append(td);
		}
	}
}

function generate(box) {
/*
	//创建子选项框
	for (let i = 0; i < checkboxn.length; i++) {
		subCb = document.createElement('input');
		subCb.setAttribute('type', 'checkbox');
		subCb.setAttribute('checkbox-type', 'sub');
		subCb.setAttribute('value', checkboxn[i]);
		subCb.textContent = checkboxn[i];
		box.append(subCb);
	}
	//创建全选选项框
	allCb = document.createElement('input');
	allCb.setAttribute('type', 'checkbox');
	allCb.setAttribute('checkbox-type', 'all');
	box.append(allCb);
*/
	box.onchange = function(e) {
		let countCb = box.getElementsByTagName('input');
		let cType = e.target.getAttribute('checkbox-type');
		if (cType === 'all') {
			for(let i = 0; i < countCb.length; i++) {
				countCb[i].checked = true;
			} 
		} else {
			if (e.target.checked === false) countCb[3].checked = false;
			let uncheck = unchecked(countCb);
			if (uncheck === 0) e.target.checked = true;
			if (uncheck === 3) countCb[3].checked = true;
		}
		outTable(getData());
	}
}

function unchecked(countCb) {
	let j = 0;
	for(let i = 0; i < countCb.length - 1; i++) {
		if (countCb[i].checked === false) continue;
		j++;
	}
	return j;
}

generate(regionCb);
generate(productCb);