
var md5 = require('md5');

import {base64encode} from './base64';

function endParams (str) {
	if (uni.getStorageSync('landRegist')) {
		let landRegistLG = JSON.parse(uni.getStorageSync('landRegist')); // 读取缓存的用户信息
		let paramStr = JSON.stringify(str);
		let base64Str = base64encode(paramStr,"UTF-8");
		let signStr = md5(base64Str + landRegistLG.randomKey);
		let endData = {"object":base64Str,"sign":signStr};
		return JSON.stringify(endData);
	}
}

export {endParams};

