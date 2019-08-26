<template>
	<view class="itemsDetails-content">
		<!-- top -->
		<inverstorTop :msgData="dataList"></inverstorTop>
		<!-- 个人简介 -->
		<personalProfile :msgData="dataList"></personalProfile>
		<!-- 任职履历 -->
		<ResumeEmploy :msgData="dataList"></ResumeEmploy>
		<!-- 投资案例 -->
		<investPreference :msgData="dataList"></investPreference>
		<!-- 投资偏好 -->
		<InvestmentCase :msgData="dataList"></InvestmentCase>
		<!-- 底部提交 -->
		<botBtn :msgData="data"></botBtn>
	</view>
</template>

<script>
	import inverstorTop from "./itemsDetails-items/inverstorTop.vue";
	import personalProfile from "./itemsDetails-items/personalProfile.vue";
	import ResumeEmploy from "./itemsDetails-items/ResumeEmploy.vue";
	import investPreference from "./itemsDetails-items/investPreference.vue";
	import InvestmentCase from "./itemsDetails-items/InvestmentCase.vue";
	import botBtn from "./itemsDetails-items/botBtn.vue";
	export default {
		data() {
			return {
				dataList: {},
				data: {
					userId: 0, // 投资人id
					content: 1000 // 记录用户是否申请过 1申请过，0未申请
				}
			};
		},
		
		components: {
			inverstorTop,
			personalProfile,
			ResumeEmploy,
			investPreference,
			InvestmentCase,
			botBtn
		},
		computed: {
		},
		watch: {
		},
		computed: {
		},
		created() {
			console.log('在组件中并不能使用页面生命周期函数');
		},
		mounted() {
		},
		onLoad(option) {
			this.data.userId = option.userId;
			this.getList(option.userId);
			this.getUserApply(option.userId);
		},
		methods: {
			getList (e) {
				if (uni.getStorageSync('landRegist')) {
				    let landRegistLG = JSON.parse(uni.getStorageSync('landRegist')); // 读取缓存的用户信息
				    console.log(landRegistLG.user.id);
					let params = {}; // 请求总数居时 参数为空
					uni.showLoading({ // 展示loading
						title: '加载中'
					});
					uni.request({
						url: this.api2 + '/inve/user/detail?userId=' + e, //接口地址。
						data: this.endParams(params),
						header: {
							Authorization:"Bearer "+landRegistLG.token//将token放到请求头中
						},
						success: (response) => {
							console.log(response.data.content);
							this.dataList = response.data.content;
							this.data.projectName = this.dataList.user.userName;
							this.data.modelId = this.dataList.user.userId;
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
			},
			getUserApply(e){
				if (uni.getStorageSync('landRegist')) {
				    let landRegistLG = JSON.parse(uni.getStorageSync('landRegist')); // 读取缓存的用户信息
				    console.log(landRegistLG.user.id);
					let params = {}; // 请求总数居时 参数为空
					uni.showLoading({ // 展示loading
						title: '加载中'
					});
					uni.request({
						url: this.api2 + '/contact/is/apply?applyeType=0' + '&modelId=' + e+ '&userId=' + landRegistLG.user.id, //接口地址。
						data: this.endParams(params),
						header: {
							Authorization:"Bearer "+landRegistLG.token//将token放到请求头中
						},
						success: (response) => {
							console.log(response.data);
							this.data.content = response.data.content;
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
			},
		}
	};
</script>

<style>
</style>
