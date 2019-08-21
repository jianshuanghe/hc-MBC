<template>
	<view class="scanLand-content">
		<view class="scan-cont">
			<view class="scanLand-box">
				<view class="SL-imgBoxTwo">
					<image class="SL-img" :src="pc"></image>
					<view class="SL-pc">已登录陌拜资本官网</view>
				</view>
				<view class="SL-title">请上传BP</view>
				<view class="SL-strc">请在电脑上传BP,完成后点击按钮会同步到手机端</view>
			</view>
		</view>
		<view class="SL-btn">
			<view class="SL-btn-text">完成</view>
		</view>
	</view>
</template>

<script>
	export default {
	    data () {
	      return {
			pc: this.Static + 'mbcImg/publish/pc.png'
	      };
	    },
	    methods: {
	      clickSearch () {
	        console.log('点击触发搜索组件');
	        // this.$router.push({
	        //   path: '/searchDetile',
	        //   query: {}
	        // });
	      }
	    }
	}
</script>

<style>
	.scanLand-content{
		position: fixed;
		width: 750upx;
		top: 0;
		background: #fff;
		height: 1334upx;
	}
	.scan-cont{
		position: relative;
		width: 100%;
		padding-top: 80px;
	}
	.scanLand-box{
		position: relative;
		width: 100%;
	}
	.SL-title{
		position: relative;
	}
	.SL-title{
		font-family: PingFang-SC-Bold;
		font-size: 48upx;
		width: 690upx;
		margin-left: 30upx;
		color: #2E2E30;
		letter-spacing: 0;
		text-align: center;
		line-height: 100upx;
	}
	.SL-strc{
		font-family: PingFangSC-Regular;
		font-size: 28upx;
		width: 690upx;
		margin-left: 30upx;
		text-align: center;
		color: #5D5D5D;
		line-height: 80upx;
	}
	.SL-imgBoxOne{
		position: relative;
		width: 100%;
		margin-top: 40upx;
	}
	.SL-imgBoxOne>image{
		border-radius: 2px;
		position: relative;
		width: 394upx;
		height: 94upx;
		margin-left: 178upx;
	}
	.SL-pc{
		font-family: PingFangSC-Regular;
		font-size: 28upx;
		color: #02C2A2;
		line-height: 40upx;
		text-align: center;
	}
	.SL-imgBoxTwo{
		position: relative;
		width: 100%;
		margin-top: 40upx;
	}
	.SL-imgBoxTwo>image{
		border-radius: 2px;
		position: relative;
		width: 208upx;
		height: 208upx;
		margin-left: 274upx;
	}
	.SL-btn{
		position: absolute;
		width: 690upx;
		margin-left: 30upx;
		background: #02C2A2;
		border-radius: 2px;
		bottom: 14upx;
	}
	.SL-btn-text{
		font-family: PingFangSC-Regular;
		font-size: 28upx;
		color: #FFFFFF;
		letter-spacing: 0;
		text-align: center;
		line-height: 90upx;
	}
</style>
