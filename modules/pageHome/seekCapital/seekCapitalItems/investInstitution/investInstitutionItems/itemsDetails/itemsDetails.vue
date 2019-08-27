<template>
	<div class="itemsDetails-content">
		<!-- top -->
		<inverstorTop :msgData="dataList"></inverstorTop>
		<!-- 基本信息 -->
		<basicInformation :msgData="dataList"></basicInformation>
		<!-- 机构简介 -->
		<institutional :msgData="dataList"></institutional>
		<!-- 投资案例 -->
		<investPreference :msgData="dataList"></investPreference>
		<!-- 团队成员 -->
		<teamMembers :msgData="dataList"></teamMembers>
		<!-- 投资偏好 -->
		<InvestmentCase :msgData="dataList"></InvestmentCase>
		<!-- 底部提交 -->
		<botBtn :msgData="data"></botBtn>
	</div>
</template>

<script>
	import inverstorTop from "./itemsDetails-items/inverstorTop.vue";
	import basicInformation from "./itemsDetails-items/basicInformation.vue";
	import institutional from "./itemsDetails-items/institutional.vue";
	import investPreference from "./itemsDetails-items/investPreference.vue";
	import teamMembers from "./itemsDetails-items/teamMembers.vue";
	import InvestmentCase from "./itemsDetails-items/InvestmentCase.vue";
	import botBtn from "./itemsDetails-items/botBtn.vue";
	export default {
		data() {
			return {
				dataList: {},
				data: {
					userId: 0, // 投资人id
					serverId: 1000, // 服务ID
					content: 1000 // 记录用户是否申请过 1申请过，0未申请
				}
			};
		},
		
		components: {
			inverstorTop,
			basicInformation,
			institutional,
			investPreference,
			teamMembers,
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
			this.data.id = option.id;
			this.getList(option.id);
			this.getUserApply(option.id)
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
						url: this.api2 + '/inve/capital/detail?id=' + e, //接口地址。
						data: this.endParams(params),
						header: {
							Authorization:"Bearer "+landRegistLG.token//将token放到请求头中
						},
						success: (response) => {
							console.log(response.data.content);
							this.dataList = response.data.content;
							this.data.projectName = this.dataList.capitalComp.compName;
							this.data.modelId = e;
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
						url: this.api2 + '/contact/is/apply?applyeType=1' + '&modelId=' + e + '&userId=' + landRegistLG.user.id, //接口地址。
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
