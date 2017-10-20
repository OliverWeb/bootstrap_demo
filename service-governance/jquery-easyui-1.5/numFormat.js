

/**
 * 格式化数字为1,000,000.00
 */
function numFormat(num) {
	// alert("num");
	num = parseFloat(num).toFixed(2);
	var flag = num < 0;
	if (flag)
		num = num.substring(1);
	var index = num.indexOf(".");
	var afterPoint = num.substring(index);
	var beforePoint = num.substring(0, index);
	var length = beforePoint.length;
	var array = new Array();
	for (var i = 1; i <= length; i++) {
		if (i == 1)
			array.push(beforePoint.substring(length - 1));
		else
			array.push(beforePoint.substring(length - i, length - i + 1));

		if (i % 3 == 0 && i != length)
			array.push(",");
	}
	var s = "";
	for (var i = array.length - 1; i >= 0; i--) {
		s += array[i];
	}

	return flag ? "-" + (s + afterPoint) : (s + afterPoint);

}

