<template>
	<view class="Investment-status">
		<!-- 投资人 认证成功 -->
		<Success v-if="num==0"></Success>
		<!-- 投资人 审核中 -->
		<progress1 v-if="num==1"></progress1>
		<!-- 投资人 审核失败 -->
		<failure v-if="num==2"></failure>
		<!-- 投资人 未审核 -->
		<Uncertified v-if="num==-1"></Uncertified>
	</view>
</template>

<script>
	import Success from './InvestmentList/InvestmentList-Success'
	import progress1 from './InvestmentList/InvestmentList-progress1'
	import failure from './InvestmentList/InvestmentList-failure'
	import Uncertified from './InvestmentList/InvestmentList-Uncertified'
	import { mapMutations,mapGetters } from 'vuex';
	export default {
		data() {
			return {
				num:''
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
				this.getHeader();
			},
			mounted() {},
			methods: {
				...mapMutations({
					setAuthentication: 'setAuthentication'
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
								this.num=response.data.content.authState
								console.log(this.List,'789')
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
	.Investment-status{
		width: 100%;
		margin-top: 40upx;
	}
</style>
