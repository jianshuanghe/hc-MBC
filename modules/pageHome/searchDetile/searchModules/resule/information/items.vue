<template>
  <view class="investItems-content" @tap='goToInformationDetails(msgData.id)'>
    <view class="II-content">
		<view class="left II-infor-text">
			<view class="infor-text-top">
				<view class="text-infor">{{msgData.activityTitel}}</view>
			</view>
			<view class="infor-text-bot">
				<view class="left text-bot-infor-left">{{msgData.activityAbstract}}</view>
				<view class="right text-bot-infor-right">{{msgData.activityStartTime | dateTime}}</view>
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
	import date from '@/static/mbcJs/dateTime.js';
	export default {
	    data () {
			return {
				iiImg: this.dImg
			};
	    },
		filters: {
		  /* 格式化时间戳 */
		  dateTime (val) {
		    return date.dateTime('.', val);
		  },
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
			goToInformationDetails (e){
				console.log(e, 'to资讯详情');
				uni.navigateTo({
					url: '/modules/pageFind/information/informationDetails?id=' + e
				});
			},
			goToSeek () {
				console.log('点击触发寻找资本');
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
	}
	.text-infor{
		font-family: PingFang-SC-Bold;
		font-size: 30upx;
		color: #2E2E30;
		line-height: 42upx;
		height: 120upx;
	}
	.infor-text-bot{
		position: relative;
		width: 100%;
	}
	.text-bot-infor-left{
		ont-family: PingFang-SC-Medium;
		font-size: 24upx;
		color: #9B9B9B;
		line-height: 24upx;
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
	}
</style>
