<template>
	<div class="personalProfile-contnet">
		<div class="personalProfile">
			<div class="pP-title">
				公司信息
				<text class="pP-text-right">纠错</text>
			</div>
			<div class="pP-content-box">
				<div class="titel-pP">公司全称</div>
				<div class="pP-content">
					{{msgData.compName}}
				</div>
				<div class="line"></div>
			</div>
			<div class="pP-content-box">
				<div class="titel-pP">公司地址</div>
				<div class="pP-content">
					{{msgData.pcode}}{{msgData.ccode}}{{msgData.compAddr}}
				</div>
				<div class="line"></div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
	    data () {
			return {
				iiImg: iiImg,
				yuan: yuan
			};
	    },
		props: {
			msgData: {
				type: Object
			}
		},
	    methods: {
			goToFinanceDetail (e){
				console.log('去' + e + '详情页面');
				uni.navigateTo({
					url: '/modules/pageHome/homeList/homeList'
				});
			},
			goToPutIn () {
				console.log('点击触发发布项目');
			},
			goToSeek () {
				console.log('点击触发寻找资本');
			}
	    }
	};
</script>

<style>
	.personalProfile-contnet{
		position: relative;
		width: 750upx;
		background: #fff;
		margin-bottom: 20upx;
	}
	.personalProfile{
		position: relative;
		width: 100%;
		padding: 30upx 30upx 0 30upx;
	}
	.pP-title{
		position: relative;
		width: 100%;
		font-family: PingFang-SC-Bold;
		font-size: 34upx;
		color: #2E2E30;
		letter-spacing: 0;
		line-height: 68upx;
	}
	.pP-text-right{
		position: relative;
		float: right;
		font-family: PingFangSC-Regular;
		font-size: 26upx;
		color: #02C2A2;
		line-height: 68upx;
	}
	.pP-content-box{
		position: relative;
		width: 100%;
	}
	.titel-pP{
		position: relative;
		width: 100%;
		font-family: PingFang-SC-Bold;
		font-size: 28upx;
		color: #2E2E30;
		letter-spacing: 0;
		line-height: 50upx;
		margin-top: 20upx;
	}
	.pP-content{
		font-family: PingFangSC-Regular;
		font-size: 28upx;
		color: #5D5D5D;
		line-height: 44upx;
		margin-bottom: 20upx;
	}
</style>
