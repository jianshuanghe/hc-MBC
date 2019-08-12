<template>
	<view class="SetupOpinion">
		<view @tap="gotoOpinion">
			意见反馈
			<image :src="right"></image>
		</view>
	</view>
</template>

<script>
		import right from '@/static/mbcImg/my/right.png'
	export default {
		data() {
			return {
				right:right
			};
		},
		computed: {
		},
		created() {
			console.log('在组件中并不能使用页面生命周期函数');
		},
		mounted() {
		},
		methods: {
			gotoOpinion(e){
				console.log('去' + e + '意见反馈');
				uni.navigateTo({
					url: '../myListSetup/Setup/Opinion/Opinion',
				});
			}
		}
	};
</script>

<style>
	.SetupOpinion{
		width: 100%;
		height: 120upx;
		background: #FFFFFF;
	}
	.SetupOpinion view:nth-of-type(1){
		width: 90%;
		height: 100%;
		margin: 0 auto;
		border-bottom: 2upx solid #F5F5F5;
		font-size: 28upx;
		/* font-weight: bold; */
		color: #2E2E30;
		line-height: 120upx;
		position: relative;
	}
	.SetupOpinion view:nth-of-type(1) image{
		width: 18upx;
		height: 18upx;
		/* padding-left: 542upx; */
		position: absolute;
		right: 0upx;
		top: 52upx;
	}
</style>
