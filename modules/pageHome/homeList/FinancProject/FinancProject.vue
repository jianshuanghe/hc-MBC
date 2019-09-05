<template>
	<view class="itemsDetails-content">
		<view class="k">
			<!-- top -->
			<projectTop :msgData="dataList"></projectTop>
			<!-- 项目简介 -->
			<projectProfile :msgData="dataList"></projectProfile>
			<!-- 融资需求 -->
			<financNeeds :msgData="dataList"></financNeeds>
			<!-- 融资历史 -->
			<financHistory :msgData="dataList"></financHistory>
			<!-- 团队成员 -->
			<teamMembers :msgData="dataList"></teamMembers>
			<!-- 公司信息 -->
			<companyInformation :msgData="dataList"></companyInformation>
			<!-- 项目数据 -->
			<projectData :msgData="dataList"></projectData>
			<!-- 底部提交 -->
			<botBtn :msgData="project"></botBtn>
		</view>
		<tipsBox v-if='AUTH.show'>
			<image class="TIPS-img" :src="close" @tap="clickClose()"></image>
			<view class="content">
				<view class="TIPS-isnt">认证投资人可见全部内容</view>
				<view class="TIPS-btn" @tap='goToAuth'>立即认证</view>
			</view>
		</tipsBox>
	</view>
</template>

<script>
	import tipsBox from "@/components/tips/tips.vue";
	import projectTop from "./FinancProject-items/projectTop.vue";
	import projectProfile from "./FinancProject-items/projectProfile.vue";
	import financNeeds from "./FinancProject-items/financNeeds.vue";
	import financHistory from "./FinancProject-items/financHistory.vue";
	import teamMembers from "./FinancProject-items/teamMembers.vue";
	import companyInformation from "./FinancProject-items/companyInformation.vue";
	import projectData from "./FinancProject-items/projectData.vue";
	import botBtn from "./FinancProject-items/botBtn.vue";
	import { mapMutations, mapGetters } from 'vuex';
	export default {
		data() {
			return {
				dataList: {},
				close: this.Static + 'mbcImg/home/seekCapital/close.png',
				project:{
					id: 0
				}
			};
		},
		
		components: {
			tipsBox,
			projectTop,
			projectProfile,
			financNeeds,
			financHistory,
			teamMembers,
			companyInformation,
			projectData,
			botBtn
		},
		computed: {
			...mapGetters(['GET_PUBLISH', 'AUTH'])
		},
		watch: {
		},
		created () {
			this.getUserData();
		},
		beforeDestroy () {
			console.log('页面销毁之前缓存数据');
			if (uni.getStorageSync('isListSource')) {
				uni.removeStorageSync('isListSource'); // 清除来源
			}
		},
		onLoad(option) {
			this.project.id = option.id;
			this.getList(option.id);
			this.getUserApply(option.id);
			if (option.type) {
				
			}
		},
		mounted() {
			
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
						url: this.api2 + '/proj/' + e + '?userId=' + landRegistLG.user.id, //接口地址。
						data: this.endParams(params),
						header: {
							Authorization:"Bearer "+landRegistLG.token//将token放到请求头中
						},
						success: (response) => {
							console.log(response.data.content);
							this.dataList = response.data.content;
							this.project.projectName = this.dataList.projName;
							this.project.modelId = this.dataList.id;
							this.project.enclosurePath = this.dataList.projFile.enclosurePath; // BP文件路径
							// this.project.enclosurePath = 'https://style.iambuyer.com/doc/2019_PDF.pdf'; // 测试使用
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
						url: this.api2 + '/contact/is/apply?applyeType=2' + '&modelId=' + e + '&userId=' + landRegistLG.user.id, //接口地址。
						data: this.endParams(params),
						header: {
							Authorization:"Bearer "+landRegistLG.token//将token放到请求头中
						},
						success: (response) => {
							console.log(response.data);
							this.project.content = response.data.content;
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
</style>
