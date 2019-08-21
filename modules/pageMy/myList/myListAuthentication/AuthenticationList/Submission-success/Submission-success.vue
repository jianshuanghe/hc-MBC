<template>
	<view class="Submission-success">
		<view class="Submission-success-List">
			<view>
				<image :src="shen"></image>
			</view>
			<view>审核中</view>
			<view>陌拜资本会在三个工作日内日给出审核结果</view>
			<view @tap="gotoAuthentication">知道了</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				shen: this.Static + 'mbcImg/my/shenghe.png',
			};
		},
		components: {

		},
		computed: {},
		created() {
			console.log('在组件中并不能使用页面生命周期函数');
		},
		mounted() {},
		methods: {
			gotoAuthentication(e){
				console.log('去' + e + '我的认证');
				uni.navigateBack({
					delta: 2
				});
			}
		}
	};
</script>

<style>
	.Submission-success {
		width: 100%;
		height: 100%;
		background: #FFFFFF;
	}

	.Submission-success-List {
		width: 80%;
		height: 50%;
		margin: 0 auto;
		padding-top: 86upx;
	}

	.Submission-success-List view:nth-of-type(1) {
		width: 86upx;
		height: 106upx;
		margin: 0 auto;
	}

	.Submission-success-List view:nth-of-type(1) image {
		width: 100%;
		height: 100%;
	}

	.Submission-success-List view:nth-of-type(2) {
		width: 150upx;
		height: 40upx;
		margin: 0 auto;
		text-align: center;
		font-size: 36upx;
		color: #2E2E30;
		padding-top: 60upx;
	}

	.Submission-success-List view:nth-of-type(3) {
		width: 610upx;
		height: 40upx;
		margin: 0 auto;
		text-align: center;
		font-size: 28upx;
		color: #9B9B9B;
		padding-top: 30upx;
	}

	.Submission-success-List view:nth-of-type(4) {
		width: 300upx;
		height: 90upx;
		margin: 0 auto;
		text-align: center;
		font-size: 28upx;
		color: #FFFFFF;
		line-height: 90upx;
		margin-top: 60upx;
		background: #02C2A2;
		border-radius: 4upx;
	}
</style>
