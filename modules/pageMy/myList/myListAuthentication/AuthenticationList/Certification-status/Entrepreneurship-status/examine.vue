<template>
	<view class="examine">
		<!-- 创业者 认证成功 -->
		<Success v-if="this.num==2"></Success>
		<!-- 创业者 审核中 -->
		<!-- <progress1 v-if="this.num===5"></progress1> -->
		<!-- 创业者 审核失败 -->
		<failure v-if="this.num==1"></failure>
		<!-- 创业者 未认证 -->
		<Uncertified v-if="this.num==0"></Uncertified>
	</view>
</template>

<script>
	import Success from './examineList/examine-Success'
	import progress1 from './examineList/examine-progress1'
	import failure from './examineList/examine-failure'
	import Uncertified from './examineList/examine-Uncertified'
	import { mapMutations,mapGetters } from 'vuex';
	export default {
		data() {
			return {
				num:'',
				state:[],
				List:[]
			};
		},
		components: {
			Success,
			progress1,
			failure,
			Uncertified
		},
		computed: {
			...mapGetters(['GET_MY'])
		},
		created() {
			this.extname()
			this.getHeader();
		},
		mounted() {},
		methods: {
			...mapMutations({
				setAuthentication: 'setAuthentication'
			}),
			extname() {
				if (uni.getStorageSync('landRegist')) {
					let landRegistLG = JSON.parse(uni.getStorageSync('landRegist')); // 读取缓存的用户信息
					console.log(landRegistLG.user.id);
					uni.showLoading({ // 展示loading
						title: '加载中'
					});
					uni.request({
						url: this.api2 + '/auth/dateil?userId=' + landRegistLG.user.id, //接口地址。
						// data: this.endParams(params),
						method: 'GET',
						header: {
							Authorization: "Bearer " + landRegistLG.token //将token放到请求头中
						},
						success: (response) => {
							uni.hideLoading();
							// console.log(response.data);
							this.state=response.data
							// console.log(this.state.content.authState)
							this.num=response.data.content.authState
							console.log(this.num)
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
							// console.log(response.data);
							this.List=response.data.content
							console.log(this.List)
							this.$store.commit('setAuthentication', this.List);
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
	.examine {
		width: 100%;
	}
</style>
