<template>
	<view class="personalProfile-contnet" v-if="msgData.inveList.length > 0">
		<view class="personalProfile">
			<view class="pP-title">
				投资案例
				<text class="pP-text-right"  @tap="goToOpinion()">纠错</text>
			</view>
			<view class="ITM-box">
				<view class="ITM-content"  v-for="(items,index) in msgData.inveList" :key="index">
					<view class="left Itm-left">
						<image :src="items.projLogo"></image>
					</view>
					<view class="left Itm-right">
						<view class="Itm-content-mm">
							<view class="title">
								{{items.projName}}
							</view>
							<view class="employ">{{items.projContent}}</view>
							<view class="lun" v-for="(item,index) in items.userInveLevelList" :key="index">
								<image :src="yuan"></image>
								{{item.startTime | dateTime}}
								<text class="lun-text">{{item.levelCodeStr}}</text>
								<view class="itm-line-y" v-if='items.userInveLevelList.length > 1 && items.userInveLevelList.length - 1 > index'></view>
							</view>
						</view>
					</view>
					<view class="clear"></view>
					<view class="line" v-if='msgData.inveList.length > 1 && msgData.inveList.length - 1 > index'></view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import date from '@/static/mbcJs/dateTime.js';
	export default {
	    data () {
			return {
				yuan: this.Static + 'mbcImg/home/seekCapital/yuan.png'
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
		width: 750upx;
		background: #fff;
		margin-bottom: 20upx;
	}
	.personalProfile{
		position: relative;
		width: 690upx;
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
	.ITM-content{
		position: relative;
		width: 100%;
	}
	.Itm-left{
		position: relative;
		width: 17%;
		margin-top: 30upx;
	}
	.Itm-left>image{
		position: relative;
		width: 80upx;
		height: 80upx;
		border-radius: 6upx;
	}
	.Itm-right{
		position: relative;
		width: 83%;
		margin-top: 30upx;
		margin-bottom: 30upx;
	}
	.Itm-content-mm{
		position: relative;
		width: 100%;
	}
	.title{
		font-family: PingFang-SC-Bold;
		font-size: 32upx;
		color: #2E2E30;
		letter-spacing: 0;
		line-height: 40upx;
	}
	.title>text{
		font-family: PingFangSC-Regular;
		font-size: 24upx;
		color: #9B9B9B;
		line-height: 40upx;
		margin-left: 4upx;
	}
	.employ{
		font-family: PingFangSC-Regular;
		font-size: 24upx;
		color: #9B9B9B;
		line-height: 40upx;
	}
	.lun{
		position: relative;
		width: 100%;
		padding-left: 48upx;
		font-family: FZLTHJW--GB1-0;
		font-size: 20upx;
		color: #9B9B9B;
		letter-spacing: 0;
		line-height: 52upx;
	}
	.lun>image{
		position: absolute;
		top: 16upx;
		left: 0;
		width: 20upx;
		height: 20upx;
	}
	.lun-text{
		position: relative;
		color: #2E2E30;
		margin-left: 28upx;
	}
	.itm-line-y{
		position: absolute;
		position: absolute;
		top: 40upx;
		left: 8upx;
		height: 20upx;
		width: 2upx;
		background: #E2E2E2;
	}
</style>
