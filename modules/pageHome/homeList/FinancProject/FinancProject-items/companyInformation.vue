<template>
	<view class="personalProfile-contnet">
		<view class="personalProfile">
			<view class="pP-title">
				公司信息
				<text class="pP-text-right"  @tap="goToOpinion()">纠错</text>
			</view>
			<view class="pP-content-box">
				<view class="titel-pP">公司全称</view>
				<view class="pP-content">
					{{msgData.compName}}
				</view>
				<view class="line"></view>
			</view>
			<view class="pP-content-box" v-if="msgData.compAddr">
				<view class="titel-pP">公司地址</view>
				<view class="pP-content">
					{{msgData.compAddr}}
				</view>
				<view class="line"></view>
			</view>
		</view>
	</view>
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
			goToOpinion (e){
				console.log('to意见反馈');
				uni.navigateTo({
					url: '/modules/pageMy/myList/myListSetup/Setup/Opinion/Opinion'
				});
			}
	    }
	};
</script>

<style>
	.personalProfile-contnet{
		position: relative;
		background: #fff;
		margin-bottom: 20upx;
	}
	.personalProfile{
		position: relative;
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
		font-weight: bold;
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
