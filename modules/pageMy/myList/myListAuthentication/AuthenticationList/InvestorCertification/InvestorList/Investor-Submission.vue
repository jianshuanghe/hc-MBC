<template>
	<view class="Investor-Submission">
		<view @tap="gotoSubmissionseccess">
			<view>
				提交
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
			};
		},
		computed: {},
		created() {
			console.log('在组件中并不能使用页面生命周期函数');
		},
		mounted() {
	
		},
		methods: {
			gotoSubmissionseccess(e) {
				console.log('去' + e + '提交成功');
				uni.navigateTo({
					url: '/modules/pageMy/myList/myListAuthentication/AuthenticationList/Submission-success/Submission-success',
				});
			}
		}
	};
</script>

<style>
	.Investor-Submission {
		width: 100%;
		height: 122upx;
		background: #FFFFFF;
		bottom: 0;
		position: absolute;
	}

	.Investor-Submission view:nth-of-type(1) view {
		width: 690upx;
		height: 90upx;
		background: #02C2A2;
		border-radius: 2px;
		margin-top: 20upx;
		text-align: center;
		line-height: 90upx;
		font-size: 28upx;
		color: #FFFFFF;
	}
	.Investor-Submission view:nth-of-type(1){
		margin: 0 auto;
	}
	
</style>
