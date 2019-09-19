<template>
	<view class="personalProfile-contnet" v-if="msgData.fieldList.length > 0 ||  msgData.userLevelList.length > 0">
		<view class="personalProfile">
			<view class="pP-title">
				投资偏好
				<text class="pP-text-right"  @tap="goToOpinion()">纠错</text>
			</view>
			<view class="IC-content">
				<view class="IC-box"  v-if="msgData.fieldList.length > 0">
					<view class="title">关注领域</view>
					<view class="IC-items-list">
						<view class="IC-items left"  v-for="(items,index) in msgData.fieldList" :key="index">{{items.name || ''}}</view>
						<view class="clear"></view>
					</view>
					<view class="line"></view>
				</view>
				<view class="IC-box"  v-if="msgData.userLevelList.length > 0">
					<view class="title">关注领域</view>
					<view class="IC-items-list">
						<view class="IC-items left" v-for="(items,index) in msgData.userLevelList" :key="index">{{items.name || ''}}</view>
						<view class="clear"></view>
					</view>
					<view class="line"></view>
				</view>
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
				this.landRegistra(); // 判断登录状态
				if (uni.getStorageSync('landRegist')) {
					console.log('to意见反馈');
					uni.navigateTo({
						url: '/modules/pageMy/myList/myListSetup/Setup/Opinion/Opinion'
					});
				}
			}
	    }
	};
</script>

<style>
	.personalProfile-contnet{
		position: relative;
		width: 750upx;
		background: #fff;
		margin-bottom: 200upx;
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
	.IC-content{
		position: relative;
		width: 100%;
	}
	.IC-box{
		position: relative;
		width: 100%;
	}
	.title{
		font-family: PingFang-SC-Bold;
		font-size: 28upx;
		color: #2E2E30;
		letter-spacing: 0;
		line-height: 48upx;
		margin-top: 28upx;
	}
	.IC-items-list{
		position: relative;
		width: 100%;
		margin-bottom: 50upx;
	}
	.IC-items{
		position: relative;
		width: 20%;
		margin-right: 20upx;
		background: #FFFFFF;
		border: 2upx solid #E2E2E2;
		border-radius: 4upx;
		font-family: PingFang-SC-Medium;
		font-size: 26upx;
		color: #5D5D5D;
		letter-spacing: 0;
		text-align: center;
		line-height: 60upx;
		margin-top: 20upx;
	}
</style>
