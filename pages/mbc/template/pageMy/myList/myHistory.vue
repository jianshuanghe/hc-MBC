<template>
	<view class="myHistory">
		<view>
			<span>24</span>
			<span>收藏</span>
		</view>
		<view>
			<span>146</span>
			<span>足迹</span>
		</view>
	</view>
</template>

<script>
</script>

<style>
	.myHistory{
		width: 100%;
		height: 144upx;
		background: #FFFFFF;
		display: flex;
	}
	.myHistory view:nth-of-type(1){
		width: 50%;
		height: 100%;
		/* background: red; */
		text-align: center;
	}
	.myHistory view:nth-of-type(1) span:nth-of-type(1){
		font-size: 36upx;
		color: #2E2E30;
		font-weight: 700;
		padding-top: 2.5%;
		display: block;
	}.myHistory view:nth-of-type(1) span:nth-of-type(2){
		font-size: 26upx;
			color: #2E2E30;
			display: block;
	}
	.myHistory view:nth-of-type(2){
		width: 50%;
		height: 100%;
		text-align: center;
	}
	.myHistory view:nth-of-type(2) span:nth-of-type(1){
		font-size: 36upx;
		color: #2E2E30;
		font-weight: 700;
		padding-top: 2.5%;
		display: block;
	}.myHistory view:nth-of-type(2) span:nth-of-type(2){
		font-size: 26upx;
			color: #2E2E30;
			display: block;
	}
</style>
