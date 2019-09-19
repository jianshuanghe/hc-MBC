
function landRegistra() {
    // #ifdef H5
    	this.isWeiXin(); // h5 判断是否为微信浏览器
    	console.log('h5');
    	if (!uni.getStorageSync('landRegist')) { // 用户没有登录 跳转去登陆 每次应用打开都要取判断
    	  uni.navigateTo({
    		url: '/pages/mbc/template/landRegistration/h5/landRegistration'
    	  });
		  return false;
    	} else if (uni.getStorageSync('landRegist')) { // 登录过 ，需要校验token是否过期
    		let landRegistLG = JSON.parse(uni.getStorageSync('landRegist')); // 读取缓存的用户信息
    		let params = {}; // 请求总数居时 参数为空
    		uni.showLoading({ // 展示loading
    			title: '加载中'
    		});
    		uni.request({
    			url: this.api2 + '/server/list', //接口地址。
    			header: {
    				Authorization:"Bearer "+landRegistLG.token//将token放到请求头中
    			},
    			success: (response) => {
    				console.log(response.data.code);
    				if (String(response.data.code) === '700') {
    					uni.navigateTo({
    						url: '/pages/mbc/template/landRegistration/h5/landRegistration'
    					});
						return false;
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
    			}
    		});
    	}
    // #endif
    // #ifdef MP-WEIXIN || MP-TOUTIAO || MP-BAIDU || MP-ALIPAY
    	console.log('小程序');
    	// #ifdef MP-WEIXIN
    		console.log('微信小程序');
    	// #endif
    	// #ifdef MP-TOUTIAO
    		console.log('头条小程序');
    	// #endif
    	// #ifdef  MP-BAIDU
    		console.log('百度小程序');
    	// #endif
    	// #ifdef MP-ALIPAY
    		console.log('支付宝小程序');
    	// #endif
    	if (!uni.getStorageSync('landRegist')) { // 用户没有登录 跳转去登陆 每次应用打开都要取判断
    	  uni.navigateTo({
    		url: '/pages/mbc/template/landRegistration/mp/landRegistration'
    	  });
		  return false;
    	} else if (uni.getStorageSync('landRegist')) { // 登录过 ，需要校验token是否过期
    		let landRegistLG = JSON.parse(uni.getStorageSync('landRegist')); // 读取缓存的用户信息
    		let params = {}; // 请求总数居时 参数为空
    		uni.showLoading({ // 展示loading
    			title: '加载中'
    		});
    		uni.request({
    			url: this.api2 + '/server/list', //接口地址。
    			header: {
    				Authorization:"Bearer "+landRegistLG.token//将token放到请求头中
    			},
    			success: (response) => {
    				console.log(response.data.code);
    				if (String(response.data.code) === '700') {
    					uni.navigateTo({
    						url: '/pages/mbc/template/landRegistration/mp/landRegistration'
    					});
						return false;
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
    			}
    		});
    	}
    // #endif
};
export {
    landRegistra
};