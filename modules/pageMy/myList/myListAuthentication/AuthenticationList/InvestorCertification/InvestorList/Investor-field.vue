<template>
	<view class="Investor-field">
		<view class="Investor-field-box">
			<view><image :src="xin"></image></view>
			<view>关注领域</view>
			<view>请选择</view>
			<view><image :src="right"></image></view>
		</view>
	</view>
</template>

<script>
	import right from '@/static/mbcImg/my/right1.png'
	import xin from '@/static/mbcImg/my/Image 1.png'
	export default {
		data() {
			return {
				xin:xin,
				right:right
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
	.Investor-field{
		width:100%;
		height: 122upx;
		background: #FFFFFF;
		margin-top: 20upx;
	}
	.Investor-field-box{
		width: 90%;
		height: 100%;
		border-bottom: 2upx solid #F5F5F5;
		margin: 0 auto;
		display: flex;
		position: relative;
	}
	.Investor-field-box view:nth-of-type(1){
		width: 20upx;
		height: 20upx;
		padding-top: 26upx;
	}
	.Investor-field-box view:nth-of-type(1) image{
		width: 100%;
		height: 100%;
	}
	.Investor-field-box view:nth-of-type(2){
		width: 152upx;
		height: 32upx;
		font-size: 30upx;
		color: #2E2E30;
		padding-top: 30upx;
		padding-left: 10upx;
	}
	.Investor-field-box view:nth-of-type(3){
		width: 200upx;
		height: 35upx;
		position: absolute;
		right: 40upx;
		top: 40upx;
		font-size: 30upx;
		color: #D2D2D2;
		text-align: right;
	}
	.Investor-field-box view:nth-of-type(4){
		position: absolute;
		right: 0;
		top: 40upx;
		width: 25upx;
		height: 18upx;
	}.Investor-field-box view:nth-of-type(4) image{
		width: 100%;
		height: 100%;
	}
</style>
