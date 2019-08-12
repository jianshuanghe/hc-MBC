
var md5 = require('md5');

import {base64encode, base64decode} from './base64';

function endParams (str) {
	if (uni.getStorageSync('landRegist')) {
		let landRegistLG = JSON.parse(uni.getStorageSync('landRegist')); // 读取缓存的用户信息
		let paramStr = JSON.stringify(str);
		let base64Str = base64encode(paramStr,"UTF-8");
		console.log(base64Str, '加密之后的数据Base64');
		console.log(base64decode(base64Str), '解密之后的数据Base64');
		let signStr = md5(base64Str + landRegistLG.randomKey);
		let endData = {"object":base64Str,"sign":signStr};
		return JSON.stringify(endData);
	}
}

export {endParams};

