<template>
	<view class="dataMailbox">
		<view>
			<view>邮箱</view>
			<view>请填写</view>
			<view><image :src="right"></image></view>
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
		}
	};
</script>

<style>
	.dataMailbox{
		width: 100%;
		height: 120upx;
		background: #FFFFFF;
		/* display: flex; */
		/* position: relative; */
		/* margin-top: 20upx; */
	}
	.dataMailbox view:nth-of-type(1){
		width: 90%;
		height: 100%;
		margin: 0 auto;
		border-bottom: 2upx solid #F5F5F5;
		position: relative;
		line-height: 120upx;
		display: flex;
	}
	.dataMailbox view:nth-of-type(1) view:nth-of-type(1){
		font-size: 28upx;
		color: #2E2E30;
	}
	.dataMailbox view:nth-of-type(1) view:nth-of-type(2){
		width: 200upx;
		height: 100%;
		font-size: 28upx;
		line-height: 120upx;
		text-align: right;
		margin-right: 30upx;
		color: #D2D2D2;
	}
	.dataMailbox view:nth-of-type(1) view:nth-of-type(3){
		width: 25upx;
		height: 18upx;
		padding-top: 30upx;
	}
	.dataMailbox view:nth-of-type(1) view:nth-of-type(3) image{
		width: 100%;
		height: 100%;
	}
</style>
