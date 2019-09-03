<template>
	<view class="historyThree-BP" @tap="gotomyListreceive">
		<span>{{ListNum}}</span>
		<span>以收到</span>
	</view>
</template>

<script>
	import { mapMutations,mapGetters } from 'vuex';
	export default {
		data() {
			return {
				ListNum: 0
			};
		},
		computed: {
			...mapGetters(['GET_MY'])
		},

		mounted() {
			this.getHeader();
		},
		methods: {
			gotomyListreceive(e) {
				console.log(e)
			    uni.navigateTo({
			        url: '/modules/pageMy/myList/myListreceive/receive',
			    });
			},
			getHeader() {
				if (uni.getStorageSync('landRegist')) {
					let landRegistLG = JSON.parse(uni.getStorageSync('landRegist')); // 读取缓存的用户信息
					console.log(landRegistLG.user.id);
					// let params = {}; // 请求总数居时 参数为空
					uni.showLoading({ // 展示loading
						title: '加载中'
					});
					uni.request({
						url: this.api2 + '/bp/list?userId='+landRegistLG.user.id, //接口地址。
						// data: this.endParams(params),
						method: 'GET',
						header: {
							Authorization: "Bearer " + landRegistLG.token //将token放到请求头中
						},
						success: (response) => {
							uni.hideLoading();
							console.log(response.data);
							this.ListNum = response.data.total
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
	.historyThree-BP{
		width:250upx;
		min-height: 100%;
		background: #FFFFFF;
		text-align: center;
	}
	.historyThree-BP span:nth-of-type(1){
		font-size: 36upx;
		color: #2E2E30;
		font-weight: 700;
		padding-top: 2.5%;
		display: block;
	}.historyThree-BP span:nth-of-type(2){
		font-size: 26upx;
			color: #2E2E30;
			display: block;
	}
</style>
