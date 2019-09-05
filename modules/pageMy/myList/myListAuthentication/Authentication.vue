<template>
	<view class="AuthenticationList">
		<!-- 认证 创业者 -->
		<Entrepreneurs></Entrepreneurs>
		<!-- 认证 投资者 -->
		<Investor></Investor>
	</view>
</template>

<script>
	import Entrepreneurs from './AuthenticationList/AuthenticationList-Entrepreneurs'
	import Investor from './AuthenticationList/AuthenticationList-Investor'
	export default {
		data() {
			return {
				List:[]
			};
		},
		components: {
			Entrepreneurs,
			Investor
		},
		computed: {},
		created() {
			this.getHeader();
		},
		mounted() {},
		methods: {
			getHeader() {
				if (uni.getStorageSync('landRegist')) {
					let landRegistLG = JSON.parse(uni.getStorageSync('landRegist')); // 读取缓存的用户信息
					console.log(landRegistLG.user.id);
					// let params = {}; // 请求总数居时 参数为空
					uni.showLoading({ // 展示loading
						title: '加载中'
					});
					uni.request({
						url: this.api2 + '/user/' + landRegistLG.user.id, //接口地址。
						// data: this.endParams(params),
						method: 'GET',
						header: {
							Authorization: "Bearer " + landRegistLG.token //将token放到请求头中
						},
						success: (response) => {
							uni.hideLoading();
							console.log(response.data);
							this.List = response.data.content
							console.log(this.List)
							this.$store.commit('setheader', this.List); // 更新vuex
							this.$store.commit('setMation', this.List); // 更新vuex
							
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
	.AuthenticationList{
		width: 100%;
		min-height: 100%;
		background: #FFFFFF;
	}
</style>
