<template>
	<div class="personalProfile-contnet">
		<div class="personalProfile">
			<div class="pP-title">
				基本信息
				<!-- <text class="pP-text-right">纠错</text> -->
			</div>
			<div class="pP-content">
				基本规模：{{msgData.capitalComp.compScale || ''}}
			</div>
			<div class="pP-content">
				机构总部：{{msgData.capitalComp.pcode || ''}}
			</div>
			<div class="pP-content">
				官网：{{msgData.capitalComp.linkUrl || ''}}
			</div>
		</div>
	</div>
</template>

<script>
	export default {
	    data () {
			return {
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
	}
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
		padding: 30upx;
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
	.pP-content{
		font-family: PingFangSC-Regular;
		font-size: 28upx;
		color: #5D5D5D;
		line-height: 44upx;
	}
</style>
