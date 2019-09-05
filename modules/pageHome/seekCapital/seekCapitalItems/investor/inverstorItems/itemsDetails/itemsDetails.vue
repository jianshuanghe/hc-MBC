<template>
	<view class="itemsDetails-content">
		<view class="k">
			<scroll-view :scroll-top="scrollTop" scroll-y="true" class="scroll-Y" @scrolltoupper="upper" @scrolltolower="loadMore"
			@scroll="scroll">
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
			</scroll-view>
			<!-- 底部提交 -->
			<botBtn :msgData="data"></botBtn>
		</view>
		<tipsBox v-if='AUTH.show'>
			<image class="TIPS-img" :src="close" @tap="clickClose()"></image>
			<view class="content">
				<view class="TIPS-isnt">认证创业者可见全部内容</view>
				<view class="TIPS-btn" @tap='goToAuth'>立即认证</view>
			</view>
		</tipsBox>
	</view>
</template>

<script>
	import tipsBox from "@/components/tips/tips.vue";
	import inverstorTop from "./itemsDetails-items/inverstorTop.vue";
	import personalProfile from "./itemsDetails-items/personalProfile.vue";
	import ResumeEmploy from "./itemsDetails-items/ResumeEmploy.vue";
	import investPreference from "./itemsDetails-items/investPreference.vue";
	import InvestmentCase from "./itemsDetails-items/InvestmentCase.vue";
	import botBtn from "./itemsDetails-items/botBtn.vue";
	import { mapMutations, mapGetters } from 'vuex';
	export default {
		data() {
			return {
				dataList: {},
				close: this.Static + 'mbcImg/home/seekCapital/close.png',
				data: {
					userId: 0, // 投资人id
					content: 1000 // 记录用户是否申请过 1申请过，0未申请
				}
			};
		},
		
		components: {
			tipsBox,
			inverstorTop,
			personalProfile,
			ResumeEmploy,
			investPreference,
			InvestmentCase,
			botBtn
		},
		computed: {
			...mapGetters(['GET_PUBLISH', 'AUTH'])
		},
		watch: {
		},
		created() {
			console.log('在组件中并不能使用页面生命周期函数');
			this.getUserData();
		},
		beforeDestroy () {
			console.log('页面销毁之前缓存数据');
			if (uni.getStorageSync('isListSource')) {
				uni.removeStorageSync('isListSource'); // 清除来源
			}
		},
		mounted() {
			this.getUserData();
		},
		onLoad(option) {
			this.data.userId = option.userId;
			this.getList(option.userId);
			this.getUserApply(option.userId);
		},
		onShareAppMessage(res) {
		    uni.hideShareMenu()
		},
		methods: {
			...mapMutations({
				setAuthShow: 'setAuthShow',
				setheader: 'setheader'
			}),
			clickClose() {
				console.log('触发关闭');
				this.$store.commit('setAuthShow', false); // 更新setAuthShow
			},
			goToAuth () {
				console.log('点击触发去认证');
				uni.navigateTo({
					url: '/modules/pageMy/myList/myListAuthentication/Authentication'
				});
			},
			getUserData () {
			  console.log('获取用户信息，全部');
			  let landRegistLG = JSON.parse(uni.getStorageSync('landRegist')); // 读取缓存的用户信息
			  console.log(landRegistLG.user.id);
				uni.request({
					url: this.api2 + '/user/' + landRegistLG.user.id, //接口地址。
					data: {},
					header: {
						Authorization:"Bearer "+landRegistLG.token//将token放到请求头中
					},
					success: (response) => {
						console.log(response.data);
						if (String(response.data.code) === '200') {
						  let UserData = response.data.content;
						  this.$store.commit('setheader', UserData); // 更新setheader
						  uni.setStorageSync('UserData', JSON.stringify(UserData)); // 缓存用户信息
						  console.log(UserData.userType, '------------UserData.userType----------');
						} else {
							uni.hideLoading(); // 隐藏 loading
							uni.showToast({
								title: response.data.msg,
								icon: 'none',
								duration: 500
							});
						}
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
			},
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
							let dataM = response.data.content;
							if (dataM.user.compName === '') {
								dataM.user.compName = '投资人'
							};
							this.dataList = dataM;
							console.log(dataM, '-----------------------------------dataM---------------------------')
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
	.itemsDetails-content{
		margin-bottom: 200upx;
	}
	.scroll-Y{
		height: 100vh;
	}
</style>
