<template>
	<view class="itemsDetails-content" v-if="dataList.capitalComp.compLogo">
		<view class="k">
			<scroll-view :scroll-top="scrollTop" scroll-y="true" class="scroll-Y" @scrolltoupper="upper" @scrolltolower="loadMore"
			@scroll="scroll">
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
			</scroll-view>
			<!-- 底部提交 -->
			<botBtn :msgData="data"></botBtn>
		</view>
		<tipsBox v-if='AUTH.show'>
			<image class="TIPS-img" :src="close"  @tap="clickClose()"></image>
			<view class="content">
				<view class="TIPS-isnt">认证创业者可见全部内容</view>
				<view class="TIPS-btn" @tap='goToAuth'>立即认证</view>
			</view>
		</tipsBox>
		<!-- 返回主页按钮 -->
		<goHome v-if='isShare === 1'></goHome>
	</view>
</template>

<script>
	import goHome from '@/components/goHome/goHome.vue';
	import tipsBox from "@/components/tips/tips.vue";
	import inverstorTop from "./itemsDetails-items/inverstorTop.vue";
	import basicInformation from "./itemsDetails-items/basicInformation.vue";
	import institutional from "./itemsDetails-items/institutional.vue";
	import investPreference from "./itemsDetails-items/investPreference.vue";
	import teamMembers from "./itemsDetails-items/teamMembers.vue";
	import InvestmentCase from "./itemsDetails-items/InvestmentCase.vue";
	import botBtn from "./itemsDetails-items/botBtn.vue";
	import { mapMutations, mapGetters } from 'vuex';
	export default {
		data() {
			return {
				isShare: 0, // 0代表没有分享, 1代表分享后需要展示返回主页，2代表.....
				dataList: {},
				close: this.Static + 'mbcImg/home/seekCapital/close.png',
				data: {
					userId: 0, // 投资人id
					serverId: 1000, // 服务ID
					content: 0 // 记录用户是否申请过 1申请过，0未申请
				}
			};
		},
		
		components: {
			goHome,
			tipsBox,
			inverstorTop,
			basicInformation,
			institutional,
			investPreference,
			teamMembers,
			InvestmentCase,
			botBtn
		},
		computed: {
			...mapGetters(['GET_PUBLISH', 'AUTH', 'LANDREGIST'])
		},
		watch: {
			LANDREGIST: {
			  handler (a, b) {
				console.log(a, b, '登录状态');
				if (a === 1) {
					this.getUserApply(this.data.id);
					this.getUserData();
				}
			  },
			  deep: true
			}
		},
		created() {
			this.getUserData();
		},
		// 分享
		onShareAppMessage(res) {
			if (res.from === 'button') {// 来自页面内分享按钮
			  console.log(res.target)
			}
			return {
			  title: this.dataList.capitalComp.compName,
			  path: '/modules/pageHome/seekCapital/seekCapitalItems/investInstitution/investInstitutionItems/itemsDetails/itemsDetails?share=1&id=' + this.data.id,
			  // share参数代表分享，
					// share=1代表用户分享出去的是当前页，用户打开页面需要展示返回主页按钮；
					// share=2.....
			}
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
			this.$store.commit('setAuthShow', false); // 更新setAuthShow
			this.data.id = option.id;
			this.getList(option.id);
			this.getUserApply(option.id)
			if (option.share) { // 赋值分享参数
				this.isShare = Number(option.share)
			}
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
			  if (uni.getStorageSync('landRegist')) {
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
			  }
			},
			getList (e) {
				let params = {}; // 请求总数居时 参数为空
				uni.showLoading({ // 展示loading
					mask: true,
					title: '加载中'
				});
				uni.request({
					url: this.api2 + '/inve/capital/detail?id=' + e, //接口地址。
					data: params,
					header: {},
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
			},
			getUserApply(e){
				if (uni.getStorageSync('landRegist')) {
				    let landRegistLG = JSON.parse(uni.getStorageSync('landRegist')); // 读取缓存的用户信息
				    console.log(landRegistLG.user.id);
					let params = {}; // 请求总数居时 参数为空
					uni.showLoading({ // 展示loading
						mask: true,
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
	.itemsDetails-content{
		margin-bottom: 200upx;
	}
	.scroll-Y{
		height: 100vh;
	}
</style>
