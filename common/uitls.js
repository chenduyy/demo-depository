/**
 * 判断传入的值是否为空
 * @param {*} val 
 * @returns 
 */
export function isNull(val) {
	if (typeof val == "boolean") {
		return false;
	}
	if (typeof val == "number") {
		return false;
	}
	if (val instanceof Array) {
		if (val.length == 0) return true;
	} else if (val instanceof Object) {
		if (JSON.stringify(val) === "{}") return true;
	} else {
		if (
			val == "null" ||
			val == null ||
			val == "undefined" ||
			val == undefined ||
			val == ""
		)
			return true;
		return false;
	}
	return false;
}

// 不为空
export function isDef(val) {
	return val !== undefined && val !== null;
}

// 是否是一个数字
export function isNumeric(val) {
	return /^\d+(\.\d+)?$/.test(val);
}

// 是一个对象
export function isObject(val) {
	return Object.prototype.toString.call(val) === "[object Object]"
}

// 是一个字符串
export function isString(val) {
	return Object.prototype.toString.call(val) === "[object String]"
}




// 添加单位
export function addUnit(value) {
	if (!isDef(value)) {
		return undefined;
	}

	value = String(value);
	return isNumeric(value) ? `${value}px` : value;
}

// 获得角度
export function getAngle(angx, angy) {
	return Math.atan2(angy, angx) * 180 / Math.PI;
};

// 根据起点终点返回方向 1向上 2向下 3向左 4向右 0未滑动
export function getDirection(startx, starty, endx, endy) {
	var angx = endx - startx;
	var angy = endy - starty;
	var result = 0;

	// 如果滑动距离太短
	if (Math.abs(angx) < 5 && Math.abs(angy) < 5) {
		return result;
	}

	var angle = getAngle(angx, angy);
	if (angle >= -160 && angle <= -20) {
		result = 1;
	} else if (angle > 20 && angle < 160) {
		result = 2;
	} else if ((angle >= 160 && angle <= 180) || (angle >= -180 && angle < -160)) {
		result = 3;
	} else if (angle >= -20 && angle <= 20) {
		result = 4;
	}

	return result;
}

export function friendlyDate(timestamp) {
	var formats = {
		'year': '%n% 年前',
		'month': '%n% 月前',
		'day': '%n% 天前',
		'hour': '%n% 小时前',
		'minute': '%n% 分钟前',
		'second': '%n% 秒前',
	};

	var now = Date.now();
	var seconds = Math.floor((now - timestamp) / 1000);
	var minutes = Math.floor(seconds / 60);
	var hours = Math.floor(minutes / 60);
	var days = Math.floor(hours / 24);
	var months = Math.floor(days / 30);
	var years = Math.floor(months / 12);

	var diffType = '';
	var diffValue = 0;
	if (years > 0) {
		diffType = 'year';
		diffValue = years;
	} else {
		if (months > 0) {
			diffType = 'month';
			diffValue = months;
		} else {
			if (days > 0) {
				diffType = 'day';
				diffValue = days;
			} else {
				if (hours > 0) {
					diffType = 'hour';
					diffValue = hours;
				} else {
					if (minutes > 0) {
						diffType = 'minute';
						diffValue = minutes;
					} else {
						diffType = 'second';
						diffValue = seconds === 0 ? (seconds = 1) : seconds;
					}
				}
			}
		}
	}
	return formats[diffType].replace('%n%', diffValue);
}