<template>
	<div class="personalProfile-contnet"  v-if = 'msgData.capitalCompFields.length > 0 && msgData.capitalCompLevels.length > 0'>
		<div class="personalProfile">
			<div class="pP-title">
				投资偏好
				<text class="pP-text-right"  @tap="goToOpinion()">纠错</text>
			</div>
			<div class="IC-content">
				<div class="IC-box" v-if = 'msgData.capitalCompFields.length > 0'>
					<div class="title">关注领域</div>
					<div class="IC-items-list">
						<div class="IC-items left" v-for="(items,index) in msgData.capitalCompFields" :key="index">{{items.fieldCode}}</div>
						<div class="clear"></div>
					</div>
					<div class="line"></div>
				</div>
				<div class="IC-box"  v-if = 'msgData.capitalCompLevels.length > 0'>
					<div class="title">关注轮次</div>
					<div class="IC-items-list">
						<div class="IC-items left" v-for="(items,index) in msgData.capitalCompLevels" :key="index">{{items.levelCode}}</div>
						<div class="clear"></div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import authen from '@/static/mbcImg/home/seekCapital/authen.png';
	export default {
	    data () {
			return {
				authen: authen
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
	}
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
