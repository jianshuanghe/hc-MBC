<template>
	<div class="personalProfile-contnet">
		<div class="personalProfile">
			<div class="pP-title">
				项目简介
				<text class="pP-text-right">纠错</text>
			</div>
			<div class="pP-img">
				<div class="img-list">
					<image class="items-img left" :src="items.imgName" v-for="(items,index) in msgData.projImgs" :key="index"></image>
					<div class="clear"></div>
				</div>
				<div class="line"></div>
			</div>
			<div class="pP-content-box">
				<div class="titel-pP">项目介绍</div>
				<div class="pP-content">
					{{msgData.projContent}}
				</div>
				<div class="line"></div>
			</div>
			<div class="pP-content-box">
				<div class="titel-pP">市场需求</div>
				<div class="pP-content">
					{{msgData.conentMarket}}
				</div>
				<div class="line"></div>
			</div>
			<div class="pP-content-box">
				<div class="titel-pP">用户画像</div>
				<div class="pP-content">
					{{msgData.conentPortrait}}
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
				yuan: this.Static + 'mbcImg/home/seekCapital/yuan.png'
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
	.pP-img{
		position: relative;
		width: 720upx;
		right: 0;
		margin-bottom: 50upx;
	}
	.img-list{
		position: relative;
		width: 100%;
		position: relative;
		width: 100%;
		margin: 15px 0;
	}
	.items-img{
		position: relative;
		width: 210upx;
		height: 150upx;
		margin-right: 30upx;
		margin-bottom: 30upx;
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
		line-height: 100upx;
	}
	.pP-content{
		font-family: PingFangSC-Regular;
		font-size: 28upx;
		color: #5D5D5D;
		line-height: 44upx;
		margin-bottom: 36upx;
	}
</style>
