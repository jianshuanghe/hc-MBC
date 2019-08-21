<template>
  <view class="investItems-content">
    <view class="II-content" @tap='goToInformationDetails(msgData.id)'>
		<view class="left II-infor-text">
			<view class="infor-text-top">
				<view class="text-infor">{{msgData.activityTitel || '无'}}</view>
			</view>
			<view class="infor-text-bot">
				<view class="left text-bot-infor-left">
					<text class="text">{{msgData.activitySource === '0' ? '原创' : '链接'}}</text>
					{{msgData.releaseTime | dateTime}}
				</view>
				<view class="clear"></view>
			</view>
		</view>
		<view class="right II-infor-img">
			<view class="infor-img">
				<image :src='msgData.activityImg'></image>
			</view>
		</view>
		<view class="clear"></view>
    </view>
    <view class="line"></view>
  </view>
</template>

<script>
	import iiImg from '@/static/mbcImg/home/banner1.png';
	import date from '@/static/mbcJs/dateTime.js';
	export default {
	    data () {
			return {
				iiImg: iiImg,
			};
	    },
		props: {
			msgData: {
				type: Object
			}
		},
		filters: {
		  /* 格式化时间戳 */
		  dateTime (val) {
		    return date.dateTime('.', val);
		  }
		},
	    methods: {
			goToInformationDetails (e){
				console.log(e, 'to资讯详情');
				uni.navigateTo({
					url: '/modules/pageFind/information/informationDetails?id=' + e
				});
			}
	    }
	};
</script>

<style>
	.investItems-content{
		position: relative;
		width: 690upx;
		margin-top: 26upx;
		background: #fff;
		margin: auto;
	}
	.II-content{
		position: relative;
		width: 100%;
		padding: 22upx 0;
	}
	.II-infor-text{
		position: relative;
		width: 442upx;
	}
	.infor-text-top{
		position: relative;
		width: 100%;
		height: 80upx;
	}
	.text-infor{
		font-family: PingFang-SC-Bold;
		font-size: 30upx;
		color: #2E2E30;
		line-height: 40upx;
	}
	.infor-text-bot{
		position: relative;
		width: 100%;
		margin-top: 30upx;
	}
	.text-bot-infor-left{
		ont-family: PingFang-SC-Medium;
		font-size: 24upx;
		color: #9B9B9B;
		line-height: 24upx;
	}
	.text-bot-infor-left .text{
		position: relative;
		width: 60upx;
		border: 2upx solid #02C2A2;
		border-radius: 4upx;
		font-family: PingFang-SC-Medium;
		font-size: 18upx;
		color: #02C2A2;
		letter-spacing: 0;
		line-height: 24upx;
		padding: 0px 8upx;
		margin-right: 8upx;
	}
	.text-bot-infor-right{
		ont-family: PingFang-SC-Medium;
		font-size: 24upx;
		color: #9B9B9B;
		line-height: 24upx;
	}
	.II-infor-img{
		position: relative;
		width: 208upx;
	}
	.infor-img{
		position: relative;
		width: 208upx;
	}
	.infor-img>image{
		position: relative;
		width: 208upx;
		height: 138upx;
		border-radius: 10upx;
	}
</style>
