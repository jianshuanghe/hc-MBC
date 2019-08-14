var md5 = require('md5');

let Base64 = require('js-base64').Base64;

function endParams(str) {
	console.log(typeof(str), '参数类型');
	console.log(JSON.stringify(str), '参数string');
	if (uni.getStorageSync('landRegist')) {
		let landRegistLG = JSON.parse(uni.getStorageSync('landRegist')); // 读取缓存的用户信息
		let paramStr = JSON.stringify(str);
		let base64Str = Base64.encode(paramStr, "UTF-8");
		console.log(base64Str, '加密之后的数据Base64');
		console.log(Base64.decode(base64Str), '解密之后的数据Base64');
		let signStr = md5(base64Str + landRegistLG.randomKey);
		let endData = {
			"object": base64Str,
			"sign": signStr
		};
		return JSON.stringify(endData);
	}
}

export {
	endParams
};
