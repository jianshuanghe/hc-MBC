<template>
	<view class="servicesItems-content-items">
		<view class="SICI-content">
			<view class="SICI-img">
				<image :src='banner1'></image>
			</view>
			<view class="SICI-title">BP诊断</view>
			<view class="SICI-inrc">行业资深分析师帮你诊断BP，线上线下推送诊断报告</view>
			<view class="SICI-money">
				￥<text class="SICI-money-Y">980</text>
				 <text class="SICI-money-X">¥1280</text>
			</view>
		</view>
	</view>
</template>

<script>
	import banner1 from '@/static/mbcImg/home/banner1.png';
	export default {
		data() {
	        return {
				banner1: banner1
	        }
	    },
	    methods: {
	        change(e) {
	            this.current = e.detail.current;
	        }
	    }
	}
</script>

<style>
	.servicesItems-content-items{
		position: relative;
		width: 100%;
		padding: 30upx 0;
	}
	.SICI-content{
		position: relative;
		width: 690upx;
	}
	.SICI-img{
		position: relative;
		width: 100%;
	}
	.SICI-img>image{
		position: relative;
		width: 690upx;
		height: 340upx;
		border-radius: 14upx;
	}
	.SICI-title{
		position: relative;
		font-family: PingFangSC-Medium;
		font-size: 40upx;
		color: #2E2E30;
		line-height: 60upx;
	}
	.SICI-inrc{
		font-family: PingFangSC-Regular;
		font-size: 26upx;
		color: #9B9B9B;
		line-height: 50upx;
		margin-bottom: 16upx;
	}
	.SICI-money{
		font-family: DINPro-Medium;
		font-size: 28upx;
		color: #FAB100;
		letter-spacing: 0;
		line-height: 24upx;
	}
	.SICI-money-Y{
		font-family: DINPro-Medium;
		font-size: 40upx;
		color: #FAB100;
		letter-spacing: 0;
		line-height: 24upx;
	}
	.SICI-money-X{
		font-family: PingFang-SC-Medium;
		font-size: 24upx;
		color: #9B9B9B;
		line-height: 24upx;
		margin-left: 12upx;
		text-decoration:line-through
	}
		
		
		
</style>
