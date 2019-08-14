<template>
	<view class="constSubmit-content">
		<view class="constSubmit">
			<view class="left const-box">
				<view class="img-box">
					<image class="img" :src="tel"></image>
				</view>
				<view class="text">咨询客服</view>
			</view>
			<view class="left submit-box">立即报名</view>
			<view class="clear"></view>
		</view>
	</view>
</template>

<script>
	import tel from '@/static/mbcImg/home/lookServices/tel.png';
	
	export default {
	    data () {
			return {
				tel: tel
			};
	    },
		components: {
		},
		computed: {},
		watch: {},
		created() {
		},
	    methods: {
	    }
	};
</script>

<style>
	.constSubmit-content{
		position: fixed;
		bottom: 0;
		width: 750upx;
		height: 100upx;
		background: #FFFFFF;
		box-shadow: 0 -2upx 0 0 #F5F5F5;
	}
	.constSubmit{
		position: relative;
		width: 100%;
	}
	.const-box{
		position: relative;
		width: 40%;
	}
	.img-box{
		position: relative;
		width: 32upx;
		margin: auto;
		top: 12upx;
	}
	.img-box>image{
		position: relative;
		width: 32upx;
		height: 32upx;
		margin: auto;
	}
	.const-box .text{
		font-family: PingFangSC-Regular;
		font-size: 20upx;
		color: #9B9B9B;
		text-align: center;
		line-height: 20upx;
	}
	.submit-box{
		position: relative;
		width: 60%;
		background-image: linear-gradient(-134deg,  #57D6CF 0%, #15D49F 100%);
		font-family: PingFangSC-Regular;
		font-size: 32upx;
		color: #FFFFFF;
		letter-spacing: 0;
		text-align: center;
		line-height: 100upx;
	}
</style>
