<template>
	<view class="Investor-mailbox">
		<view class="Investor-mailbox-box">
			<view><image :src="xin"></image></view>
			<view>邮箱</view>
			<view><input type="text" placeholder="请输入" placeholder-style="color:#D2D2D2"/></view>
		</view>
	</view>
</template>

<script>
	import xin from '@/static/mbcImg/my/Image 1.png'
	export default {
		data() {
			return {
				xin:xin
			};
		},
		components: {
			
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
	input {
		color: #D2D2D2;
	}
	.Investor-mailbox{
		width:100%;
		height: 122upx;
		background: #FFFFFF;
	}
	.Investor-mailbox-box{
		width: 90%;
		height: 100%;
		border-bottom: 2upx solid #F5F5F5;
		margin: 0 auto;
		display: flex;
		position: relative;
	}
	.Investor-mailbox-box view:nth-of-type(1){
		width: 20upx;
		height: 20upx;
		padding-top: 26upx;
	}
	.Investor-mailbox-box view:nth-of-type(1) image{
		width: 100%;
		height: 100%;
	}
	.Investor-mailbox-box view:nth-of-type(2){
		width: 142upx;
		height: 32upx;
		font-size: 30upx;
		color: #2E2E30;
		padding-top: 30upx;
		padding-left: 10upx;
	}
	.Investor-mailbox-box view:nth-of-type(3){
		width: 200upx;
		height: 35upx;
		position: absolute;
		right: 0;
		top: 40upx;
		font-size: 30upx;
		color: #D2D2D2;
		text-align: right;
	}
</style>
