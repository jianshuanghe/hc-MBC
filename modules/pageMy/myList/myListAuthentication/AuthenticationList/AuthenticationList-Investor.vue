<template>
	<view class="Investor-list" @tap="gotoInvestorCertification">
		<image src="/static/mbcImg/my/touzizhe.png"></image>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				status:1
			};
		},
		computed: {},
		created() {},
		mounted() {},
		methods: {
			gotoInvestorCertification(e){
				if(this.status===1){
					console.log('去' + e + '投资人认证');
					uni.navigateTo({
						url: '/modules/pageMy/myList/myListAuthentication/AuthenticationList/InvestorCertification/InvestorCertification',
					});
				}else if(this.status===2){
					console.log('去' + e + '投资人认证');
					uni.navigateTo({
						url: '/modules/pageMy/myList/myListAuthentication/AuthenticationList/Certification-status/Certification-status',
					});
				}
			}
		}
	};
</script>

<style>
	.Investor-list{
		width: 100%;
		height: 294upx;
		border-radius: 16upx;
		padding-top: 40upx;
	}
	.Investor-list image{
		display: block;
		width: 90%;
		height: 100%;
		margin: 0 auto;
	}
</style>
