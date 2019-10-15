<template>
	<view class="Certification-status">
		<!-- 创业者 -->
		<Entrepreneurship v-if="Listdata.userType=='0'"></Entrepreneurship>
		<!-- 投资者 -->
		<Investment v-if="Listdata.userType=='1'"></Investment>
		<Investment v-if="Listdata.userType=='2'"></Investment>
	</view>
</template>

<script>
	import Entrepreneurship from './Entrepreneurship-status/examine'
	import Investment from './Investment-status/Investment-status'
	export default {
		components: {
			Entrepreneurship,
			Investment
		},
		data() {
			return {
				Listdata: []
			};
		},
		onLoad(option) {
			this.shareToHome(option); // 转发页打开规则函数
		},
		// 分享
		onShareAppMessage(res) {
			  if (res.from === 'button') {// 来自页面内分享按钮
				console.log(res.target)
			  }
			  return this.titleOrPathApp
		},
		created() {
			this.getHeader();
		},
		methods: {
			getHeader(){
				if (uni.getStorageSync('landRegist')) {
					let landRegistLG = JSON.parse(uni.getStorageSync('landRegist')); // 读取缓存的用户信息
					console.log(landRegistLG.user.id);
					// let params = {}; // 请求总数居时 参数为空
					uni.showLoading({ // 展示loading
						title: '加载中'
					});
					uni.request({
						url: this.api2 + '/auth/dateil?userId='+landRegistLG.user.id, //接口地址。
						// data: this.endParams(params),
						method: 'GET',
						header: {
							Authorization: "Bearer " + landRegistLG.token //将token放到请求头中
						},
						success: (response) => {
							uni.hideLoading();
							console.log(response.data);
							this.Listdata=response.data.content
							console.log(this.Listdata,'321')
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
			}
		},
	};
</script>

<style>
	.examine{
		width: 100%;
		height:120%;
		/* overflow: hidden; */
		/* background: #F9F9F9; */
	}
</style>
