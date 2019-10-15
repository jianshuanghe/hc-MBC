// import { mapMutations} from 'vuex';
let Base64 = require('js-base64').Base64;
let params = { // 配置转发参数
	toPath: 'home' // 转发用户打开显示home主页
}
let titleOrPathApp = { // 分享主页默认显示的内容
	title: '陌拜资本',
	path: '/pages/mbc/home?params=' + Base64.encode(JSON.stringify(params))
}

function shareToHome (option) {
	if (option.params) { // 根据链接上是否存在分享链接参数，有的话指定跳转， 所有分享到到首页
		console.log(option.params, '分享链接参数')
		let params =this.pathParams(option.params);
		console.log(params, '解析参数')
		if (params.toPath === 'home') {
			uni.setStorageSync('clickItems', 1);
			this.$store.commit('setHome',1);
			// uni.reLaunch({
			//     url: '/pages/mbc/home'
			// });
		}
	}
}
export{
	titleOrPathApp, shareToHome
}