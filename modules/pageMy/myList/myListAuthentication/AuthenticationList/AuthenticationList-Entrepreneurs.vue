<template>
	<view class="Entrepreneurs-list" @tap="gotoEntrepreneursCertification">
		<image src="/static/mbcImg/my/chuangyezhe.png"></image>
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
			gotoEntrepreneursCertification(e){
				if(this.status===1){
					console.log('去' + e + '创业者认证');
					this.status++
					uni.navigateTo({
						url: '/modules/pageMy/myList/myListAuthentication/AuthenticationList/EntrepreneursCertification/EntrepreneursCertification',
					});
				}else if(this.status===2){
					console.log('去' + e + '创业者认证');
					uni.navigateTo({
						url: '/modules/pageMy/myList/myListAuthentication/AuthenticationList/Certification-status/Certification-status',
					});
				}
			}
		}
	};
</script>

<style>
	.Entrepreneurs-list{
		width: 100%;
		height: 294upx;
		border-radius: 16upx;
		padding-top: 40upx;
	}
	.Entrepreneurs-list image{
		display: block;
		width: 90%;
		height: 100%;
		margin: 0 auto;
	}
</style>
