// 参数说明：
// type：参数类型 '-' 返会时间类型2018-08-13
			//   '.' 返回时间类型2018.08.13
			//   '/' 返回时间类型2018/08/13
			//   'm/d h minute'返回 08/13 10:30
			//   'my' 返回{m:'08月',y: '2018'}
			//    'y.m' 返回年月2018.08
			//    'y-m' 返回年月2018-08
			//    不传参数，默认返回 2018-08-13 10：38: 10
			//     'y' 返回年 2019
			//     'm' 返回月 4

export default {
	dateTime (type, str) {
		var date = new Date(str);
		var y = date.getFullYear();
		var m = date.getMonth() + 1;
		m = m < 10 ? ('0' + m) : m;
		var d = date.getDate();
		d = d < 10 ? ('0' + d) : d;
		var h = date.getHours();
		h = h < 10 ? ('0' + h) : h;
		var minute = date.getMinutes();
		var second = date.getSeconds();
		minute = minute < 10 ? ('0' + minute) : minute;
		second = second < 10 ? ('0' + second) : second;
		if (type === '-') {
			return y + '-' + m + '-' + d;
		} else if (type === '.') {
			return y + '.' + m + '.' + d;
		} else if (type === '/') {
			return y + '/' + m + '/' + d;
		} else if (type === 'm/d h minute') {
			return m + '/' + d+' '+h+':'+minute;
		} else if (type === 'my') {
			return {'m':m,'y': y}
		} else if (type === 'y.m') {
			return y + '.' + m
		} else if (type === 'y-m') {
			return y + '-' + m
		} else if (type === 'y') {
			return y
		} else if (type === 'm') {
			return m
		} else {
			return y + '-' + m + '-' + d+' '+h+':'+minute+':'+second;
		};
	}
}
