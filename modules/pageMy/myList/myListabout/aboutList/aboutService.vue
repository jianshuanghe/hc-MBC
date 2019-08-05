<template>
	<view class="aboutService">
		<view>我们关注的领域</view>
		<view></view>
		<view class="aboutService-img">
			<view><image :src="keji"></image></view>
			<view><image :src="dasuju"></image></view>
		</view>
	</view>
</template>

<script>
	import keji from '@/static/mbcImg/my/keji.png'
	import dasuju from '@/static/mbcImg/my/dausju.png'
	export default {
		data() {
			return {
				keji:keji,
				dasuju:dasuju
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
	.aboutService{
		width: 100%;
		height: 420upx;
		padding-top: 80upx;
	}
	.aboutService view:nth-of-type(1){
		width: 300upx;
		height: 50upx;
		text-align: center;
		margin: 0 auto;
		font-size: 36upx;
		color: #2E2E30;
		font-weight: 700;
	}
	.aboutService view:nth-of-type(2){
		width: 48upx;
		height: 4upx;
		background: #2E2E30;
		margin: 0 auto;
		margin-top: 20upx;
	}
	.aboutService-img{
		width: 90%;
		height: 204upx;
		padding-top: 60upx;
		margin: 0 auto;
		display: flex;
		justify-content: space-between;
	}
	.aboutService-img view:nth-of-type(1){
		width: 310upx;
		height: 100%;
		background: #FFFFFF;
		/* box-shadow: 0 2upx 6upx 0 rgba(46,46,48,0.10); */
	}
	.aboutService-img view:nth-of-type(1) image{
		width: 100%;
		height: 100%;
	}
	.aboutService-img view:nth-of-type(2){
		width: 310upx;
		height: 100%;
		background: #FFFFFF;
		/* box-shadow: 0 2upx 6upx 0 rgba(46,46,48,0.10); */
		margin-top: 0;
	}
	.aboutService-img view:nth-of-type(2) image{
		width: 100%;
		height: 100%;
	}
</style>
