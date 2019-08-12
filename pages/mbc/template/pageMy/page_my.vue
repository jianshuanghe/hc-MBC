<template>
	<view class="myContent">
		<!-- 名字 头像 -->
		<myInformation :Mylist="List"></myInformation>
		<!-- 收藏 足迹 -->
		<myHistory :Mylist="List"></myHistory>
		<!-- 我的认证 -->
		<myAuthentication></myAuthentication>
		<!-- 关于陌拜资本 -->
		<myabout></myabout>
		<!-- 设置 -->
		<mySetup></mySetup>
	</view>
</template>
<script>
	import myInformation from './myList/myInformation.vue'
	import myHistory from './myList/myHistory.vue'
	import myAuthentication from './myList/myAuthentication.vue'
	import myabout from './myList/myabout.vue'
	import mySetup from './myList/mySetup.vue'
	import { mapMutations, mapGetters } from 'vuex';
	export default {
		data() {
			return {
				List:[],
				
			};
		},
		components: {
			myInformation,
			myHistory,
			myAuthentication,
			myabout,
			mySetup
		},
		computed: {
			...mapGetters(['GET_MY'])
		},
		created() {
			console.log('在组件中并不能使用页面生命周期函数');
			this.getHeader();
			
		},
		mounted() {},
		methods: {
			...mapMutations({
				setheader: 'setheader'
			}),
			getHeader(){
				if (uni.getStorageSync('landRegist')) {
					let landRegistLG = JSON.parse(uni.getStorageSync('landRegist')); // 读取缓存的用户信息
					console.log(landRegistLG.user.id);
					// let params = {}; // 请求总数居时 参数为空
					uni.showLoading({ // 展示loading
						title: '加载中'
					});
					uni.request({
						url: this.api2 + '/user/760', //接口地址。
						// data: this.endParams(params),
						method: 'GET',
						header: {
							Authorization: "Bearer " + landRegistLG.token //将token放到请求头中
						},
						success: (response) => {
							console.log(response.data);
							this.List=response.data.content
							console.log(this.List)
							this.$store.commit('setheader', this.List); // 更新setFinance
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

	.des {
		text-align: center;
		padding: 30upx;
		margin-top: 100upx;
		font-size: 30upx;
		color: #888888;
	}

	button {
		width: 330upx;
		float: left;
		margin-left: 30upx;
		margin-top: 30upx;
		padding: 10upx 20upx;
		font-size: 32upx;
	}
</style>
