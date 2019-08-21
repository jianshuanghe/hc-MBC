<template>
	<view class="inverstorTop-content">
		<view class="inverstorTop">
			<view class="left iT-img">
				<image :src="msgData.capitalComp.compLogo"></image>
			</view>
			<view class="left iT-text">
				<div class="company-box">{{msgData.capitalComp.compName}}</div>
			</view>
			<div class="Authentication-type">
				<image :src="authen" class="AuType"></image>
				成员认证
			</div>
			<view class="clear"></view>
		</view>
	</view>
</template>

<script>
	export default {
	    data () {
			return {
				authen: this.Static + 'mbcImg/home/seekCapital/authen.png'
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
	.inverstorTop-content{
		position: relative;
		width: 750upx;
		background: #fff;
		margin-bottom: 20upx;
	}
	.inverstorTop{
		position: relative;
		width: 100%;
		padding: 30upx;
	}
	.iT-img{
		position: relative;
		width: 20%;
	}
	.iT-img>image{
		position: relative;
		width: 120upx;
		height: 120upx;
		border-radius: 10upx;
		top: 10upx;
	}
	.iT-text{
		position: relative;
		width: 80%;
	}
	.iT-type{
		position: relative;
		width: 100%;
		font-family: PingFang-SC-Bold;
		font-size: 40upx;
		color: #2E2E30;
		letter-spacing: 0;
		line-height: 60upx;
	}
	.iT-company{
		font-family: PingFangSC-Regular;
		font-size: 24upx;
		color: #9B9B9B;
		line-height: 40upx;
	}
	.iT-city{
		font-family: PingFangSC-Regular;
		font-size: 24upx;
		color: #9B9B9B;
		line-height: 40upx;
	}
	.company-box{
		position: relative;
		width: 100%;
		font-family: PingFang-SC-Bold;
		font-size: 40upx;
		color: #2E2E30;
		letter-spacing: 0;
		line-height: 140upx;
	}
	.Authentication-type{
		position: absolute;
		top: 64upx;
		background-image: linear-gradient(-134deg, #15D49F 0%, #57D6CF 100%);
		box-shadow: 0 2px 4px 0 rgba(2,194,162,0.40);
		border-radius: 100px 0 0 100px;
		width: 160upx;
		height: 60upx;
		right: 60upx;
		text-align: right;
		padding-right: 10upx;
		font-family: PingFangSC-Regular;
		font-size: 24upx;
		color: #FFFFFF;
		line-height: 60upx;
	}
	.AuType{
		position: absolute;
		width: 28upx;
		height: 24upx;
		top: 20upx;
		left: 20upx;
	}
</style>
