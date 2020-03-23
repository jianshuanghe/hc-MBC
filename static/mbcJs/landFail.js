import {api1,api2,api3} from '@/static/mbcJs/api';
function userLandFail() {
	// uni.showToast({
	// 	title: '开始判断登录过期',
	// 	icon: 'none',
	// 	duration: 1000
	// });
	return new Promise(function(resolve, reject) {
		if (uni.getStorageSync('landRegist')) { // 登录过 ，需要校验token是否过期
			let landRegistLG = JSON.parse(uni.getStorageSync('landRegist')); // 读取缓存的用户信息
			let params = {}; // 请求总数居时 参数为空
			uni.showLoading({ // 展示loading
				title: '加载中'
			});
			uni.request({
				url: api2 + '/server/list', //接口地址。
				header: {
					Authorization: "Bearer " + landRegistLG.token //将token放到请求头中
				},
				success: (response) => {
					console.log(response.data.code);
					if (String(response.data.code) === '700') {
						uni.navigateTo({
							url: '/pages/mbc/template/landRegistration/h5/landRegistration'
						});
						uni.removeStorageSync('landRegist');
						uni.removeStorageSync('clickItems');
						let landStatus = false;
						resolve(landStatus)
						return false;
					} if (String(response.data.code) === '200') {
						let landStatus = true;
						resolve(landStatus)
					} else {
						uni.navigateTo({
							url: '/pages/mbc/template/landRegistration/h5/landRegistration'
						});
						uni.removeStorageSync('landRegist');
						uni.removeStorageSync('clickItems');
						let landStatus = false;
						resolve(landStatus)
					}
					uni.hideLoading(); // 隐藏 loading
				},
				fail: (error) => {
					uni.hideLoading(); // 隐藏 loading
					uni.showToast({
						title: '网络繁忙，请稍后',
						icon: 'none',
						duration: 1000
					});
					console.log(error, '网络繁忙，请稍后');
					let landStatus = false;
					resolve(landStatus)
				}
			});
		}
	})
}

async function landFail() {
	var data = await userLandFail()
	return data;
}

export {
	landFail
}
