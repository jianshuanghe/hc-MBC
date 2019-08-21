<template>
	<view class="aboutField">
		<view>我们关注的领域</view>
		<view></view>
		<view class="aboutField-img">
			<view><image :src="keji"></image></view>
			<view><image :src="dasuju"></image></view>
		</view>
		<view class="aboutField-img2">
			<view><image :src="fuwu"></image></view>
			<view><image :src="iot"></image></view>
		</view>
		<view class="aboutField-img2">
			<view><image :src="yiliao"></image></view>
			<view><image :src="xiaofei"></image></view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				keji:this.Static + 'mbcImg/my/keji.png',
				dasuju:this.Static + 'mbcImg/my/dausju.png',
				fuwu:this.Static + 'mbcImg/my/fuwu.png',
				iot:this.Static + 'mbcImg/my/iot.png',
				yiliao:this.Static + 'mbcImg/my/yiliao.png',
				xiaofei:this.Static + 'mbcImg/my/xiaofei.png',
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
		}
	};
</script>

<style>
	.aboutField{
		width: 100%;
		height: 880upx;
		padding-top: 120upx;
	}
	.aboutField view:nth-of-type(1){
		width: 300upx;
		height: 50upx;
		text-align: center;
		margin: 0 auto;
		font-size: 36upx;
		color: #2E2E30;
		font-weight: 700;
	}
	.aboutField view:nth-of-type(2){
		width: 48upx;
		height: 4upx;
		background: #2E2E30;
		margin: 0 auto;
		margin-top: 20upx;
	}
	.aboutField-img{
		width: 90%;
		height: 204upx;
		padding-top: 60upx;
		margin: 0 auto;
		display: flex;
		justify-content: space-between;
	}
	.aboutField-img view:nth-of-type(1){
		width: 310upx;
		height: 100%;
		background: #FFFFFF;
		/* box-shadow: 0 2upx 6upx 0 rgba(46,46,48,0.10); */
	}
	.aboutField-img view:nth-of-type(1) image{
		width: 100%;
		height: 100%;
	}
	.aboutField-img view:nth-of-type(2){
		width: 310upx;
		height: 100%;
		background: #FFFFFF;
		/* box-shadow: 0 2upx 6upx 0 rgba(46,46,48,0.10); */
		margin-top: 0;
	}
	.aboutField-img view:nth-of-type(2) image{
		width: 100%;
		height: 100%;
	}
	.aboutField-img2{
		width: 90%;
		height: 204upx;
		padding-top: 20upx;
		margin: 0 auto;
		display: flex;
		justify-content: space-between;
	}
	.aboutField-img2 view:nth-of-type(1){
		width: 310upx;
		height: 100%;
		background: #FFFFFF;
		/* box-shadow: 0 2upx 6upx 0 rgba(46,46,48,0.10); */
	}
	.aboutField-img2 view:nth-of-type(1) image{
		width: 100%;
		height: 100%;
	}
	.aboutField-img2 view:nth-of-type(2){
		width: 310upx;
		height: 100%;
		background: #FFFFFF;
		/* box-shadow: 0 2upx 6upx 0 rgba(46,46,48,0.10); */
		margin-top: 0;
	}
	.aboutField-img2 view:nth-of-type(2) image{
		width: 100%;
		height: 100%;
	}
</style>
