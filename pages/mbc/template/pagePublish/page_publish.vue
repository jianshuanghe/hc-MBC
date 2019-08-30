<template>
	<view :class="AUTH.show ? 'Posied' : 'publishContent'">
		<view class="des">
			<!-- title -->
			<publishTitle></publishTitle>
			<!-- content -->
			<!-- pc登录上传 -->
			<uploadBP v-if='GET_PUBLISH.titleIndex === 1'></uploadBP>
			<!-- infor -->
			<view class="inforContent"  v-if='GET_PUBLISH.titleIndex === 2'>
				<!-- 基本信息 -->
				<basicInfor ></basicInfor>
			</view>
		</view>
		<tipsBox v-if='AUTH.show'>
			<div class="" v-if='GET_PUBLISH.isUpLoadFile.isFileSuccess === false'>
				<image class="TIPS-img" :src="close"  @tap="clickClose()"></image>
				<div class="content">
					<div class="TIPS-isnt">认证成为创业者，可发布项目</div>
					<div class="line"></div>
					<div class="TIPS-btn" @tap='goToAuth'>立即认证</div>
				</div>
			</div>
			<div class="content" v-if='GET_PUBLISH.isUpLoadFile.isFileSuccess === true'>
				<div class="TIPS-isnt">发布成功</div>
				<div class="line"></div>
				<div class="TIPS-btn" @tap='goToBp'>确定</div>
			</div>
		</tipsBox>
	</view>
</template>
<script>
	import tipsBox from "@/components/tips/tips.vue";
	import publishTitle from "./publishList/publishTitle.vue";
	import uploadBP from "./publishList/uploadBP/uploadBP.vue";
	import basicInfor from "./publishList/Infor/basicInfor.vue";
	import { mapMutations, mapGetters } from 'vuex';
export default {
	data() {
		return {
			areaData: {},
			close: this.Static + 'mbcImg/home/seekCapital/close.png'
		};
	},
	components: {
		tipsBox,
		publishTitle,
		uploadBP,
		basicInfor
	},
	computed: {
		...mapGetters(['GET_PUBLISH', 'AUTH'])
	},
	created() {
		if(uni.getStorageSync('isUpLoadFile')) {
			let isUpLoadFile = JSON.parse(uni.getStorageSync('isUpLoadFile')); // 
			this.$store.commit('setIsUploadFileSuccess', isUpLoadFile.isSuccess); // 更新setIsUploadFileSuccess
			this.$store.commit('setIsUploadFileContent', isUpLoadFile.content); // 更新setIsUploadFileContent
		};
		if(uni.getStorageSync('SacnToken')) {
			this.isTokenConnect();
		};
		uni.pageScrollTo({
		    scrollTop: 0,
		    duration: 0
		});
		this.getUserData();
	},
	mounted() {
	},
	beforeDestroy () {
		console.log('页面销毁之前缓存数据');
		this.$store.commit('setIsUploadFileIsFileSuccess', false); // 更新setIsUploadFileIsFileSuccess
		this.$store.commit('setAuthShow', false); // 更新setAuthShow
	},
	methods: {
		...mapMutations({
			setIsUploadFileSuccess: 'setIsUploadFileSuccess',
			setIsUploadFileContent: 'setIsUploadFileContent',
			setAuthShow: 'setAuthShow',
			setheader: 'setheader'
		}),
		clickClose() {
			console.log('触发关闭');
			this.$store.commit('setAuthShow', false); // 更新setAuthShow
			this.$store.commit('setHome', 1);
			uni.setStorageSync('clickItems', 1);
		},
		isTokenConnect () {
			console.log('校验token是否有效')
			if (uni.getStorageSync('landRegist')) {
				let landRegistLG = JSON.parse(uni.getStorageSync('landRegist')); // 读取缓存的用户信息
				console.log(landRegistLG.user.id);
				let params = {}; // 请求总数居时 参数为空
				uni.request({
					url: this.api2 + '/pc/isTokenConnect?token=' + uni.getStorageSync('SacnToken'), //接口地址。
					data: this.endParams(params),
					header: {
						Authorization:"Bearer "+landRegistLG.token//将token放到请求头中
					},
					success: (response) => {
						console.log(response.data.content); // 领域
					},
					fail: (error) => {
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
		goToAuth () {
			console.log('点击触发去认证');
			uni.navigateTo({
				url: '/modules/pageMy/myList/myListAuthentication/Authentication'
			});
		},
		goToBp () {
			console.log('触发确定，我的bp');
			this.$store.commit('setIsUploadFileIsFileSuccess', false); // 更新setIsUploadFileIsFileSuccess
			uni.navigateTo({
				url: '/modules/pageMy/myList/myLisprojectt/myproject'
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
						if (String(UserData.userType) === '0') { // 创业者
							if (String(UserData.authState) === '1') { // 认证通过
								this.$store.commit('setAuthShow', false); // 更新setAuthShow
							} else { // 认证未通过
								this.$store.commit('setAuthShow', true); // 更新setAuthShow
							}
						} else { // 不是创业者
						  this.$store.commit('setAuthShow', true); // 更新setAuthShow
						}
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
	}
};
</script>

<style>
.item {
	font-size: 28upx;
	line-height: 60upx;
	height: 60upx;
	border-bottom: 2upx solid #f1f1f1;
	padding-left: 30upx;
	padding-right: 30upx;
	color: #888;
	text-align: left;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
}

</style>
