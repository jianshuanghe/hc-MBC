<script>
	export default {
		onLaunch: function() {
			console.log('App Launch');
			// #ifdef H5
			this.isWeiXin(); // h5 判断是否为微信浏览器
			// #endif
			// #ifdef APP-PLUS
			// 锁定屏幕方向
			plus.screen.lockOrientation('portrait-primary'); //锁定
			// 检测升级
			uni.request({
				url: 'https://uniapp.dcloud.io/update', //检查更新的服务器地址
				data: {
					appid: plus.runtime.appid,
					version: plus.runtime.version,
					imei: plus.device.imei
				},
				success: (res) => {
					console.log('success', res);
					if (res.statusCode == 200 && res.data.isUpdate) {
						let openUrl = plus.os.name === 'iOS' ? res.data.iOS : res.data.Android;
						// 提醒用户更新
						uni.showModal({
							title: '更新提示',
							content: res.data.note ? res.data.note : '是否选择更新',
							success: (showResult) => {
								if (showResult.confirm) {
									plus.runtime.openURL(openUrl);
								}
							}
						})
					}
				}
			})
			// #endif
		},
		onShow: function() {
			console.log('App Show');
			// #ifdef H5
				this.isWeiXin(); // h5 判断是否为微信浏览器
				console.log('h5');
				if (!uni.getStorageSync('landRegist')) { // 用户没有登录 跳转去登陆 每次应用打开都要取判断
				  uni.reLaunch({
					url: '/pages/mbc/template/landRegistration/h5/landRegistration'
				  });
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
								uni.reLaunch({
									url: '/pages/mbc/template/landRegistration/h5/landRegistration'
								});
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
				  uni.reLaunch({
					url: '/pages/mbc/template/landRegistration/mp/landRegistration'
				  });
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
								uni.reLaunch({
									url: '/pages/mbc/template/landRegistration/mp/landRegistration'
								});
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
			
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
    /* #ifndef APP-PLUS-NVUE */
	/* uni.css - 通用组件、模板样式库，可以当作一套ui库应用 */
	@import './common/uni.css';
	@import url("./common/reset.css");

	/* 以下样式用于 hello uni-app 演示所需 */
	page {
		background-color: #F4F5F6;
		height: 100%;
		font-size: 28upx;
		line-height: 1.8;
	}

	.uni-header-logo {
		padding: 30upx;
		text-align: center;
		margin-top: 10upx;
	}

	.uni-header-logo image {
		width: 140upx;
		height: 140upx;
	}

	.uni-hello-text {
		color: #7A7E83;
	}

	.uni-hello-addfile {
		text-align: center;
		line-height: 300upx;
		background: #FFF;
		padding: 50upx;
		margin-top: 10px;
		font-size: 38upx;
		color: #808080;
	}
	.uni-swiper{
		height: 330upx !important;
	}
    /* #endif*/
	.uni-app {
		overflow: hidden !important;
	}
</style>
