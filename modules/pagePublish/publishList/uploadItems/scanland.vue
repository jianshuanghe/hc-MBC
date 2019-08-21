<template>
	<view class="scanLand-content">
		<view class="scan-cont">
			<view class="scanLand-box">
				<view class="SL-title">第1步</view>
				<view class="SL-strc">在电脑浏览器中输入“iambuyer.com”</view>
				<view class="SL-imgBoxOne">
					<image class="SL-img" :src="scanTapOne"></image>
				</view>
			</view>
			<view class="scanLand-box">
				<view class="SL-title">第2步</view>
				<view class="SL-strc">点击下方按钮，扫描电脑上的二维码</view>
				<view class="SL-imgBoxTwo">
					<image class="SL-img" :src="scanTapTwo"></image>
				</view>
			</view>
		</view>
		<view class="SL-btn">
			<view class="SL-btn-text">点击扫码</view>
		</view>
	</view>
</template>

<script>
	export default {
	    data () {
	      return {
			scanTapOne: this.Static + 'mbcImg/publish/scanTapOne.png',
	        scanTapTwo: this.Static + 'mbcImg/publish/scanTapTwo.png',
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
		background: rgba(2,194,162,0.20);
		border: 0 solid rgba(2,194,162,0.40);
		border-radius: 2px;
		position: relative;
		width: 394upx;
		height: 94upx;
		margin-left: 178upx;
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
