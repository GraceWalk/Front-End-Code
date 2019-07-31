let toSelect = document.querySelector('#to-select');
let sRegion = document.querySelector('#region-select');
let sProduct = document.querySelector('#product-select');
let di = document.querySelector('#table-wrapper');
let table = document.createElement('table');
let thShow = ['商品','地区','1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月'];

toSelect.onchange = function() {
	outTable(getData());
}

//获取符合条件的sourceData的值
function getData() {
	let data = [];
	for (let i = 0, j = 0; i < sourceData.length; i++) {
		if (sRegion.value === sourceData[i]["region"] && sProduct.value === sourceData[i]["product"]){
			data[j++] = i;
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
	var tr = document.createElement('tr');
	table.append(tr);
	for(let i = 0; i < 14; i++) {
		th = document.createElement('th');
		th.textContent = thShow[i];
		tr.append(th);
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
