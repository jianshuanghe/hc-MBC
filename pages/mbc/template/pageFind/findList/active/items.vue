<template>
	<div class="active-content-items">
		<div class="active-box" @tap='goToActiveDetails(msgData.id)'>
			<image class="img" :src="msgData.activityImg"></image>
			<div class="title-active">{{msgData.activityAbstract || '无'}}</div>
			<div class="time-active">{{msgData.activityStartTime | dateTime}} - {{msgData.activityEndTime | dateTime}}</div>
			<div class="sign-active">已报名{{msgData.signSum || '0'}}人</div>
		</div>
		<view class="line"></view>
	</div>
</template>

<script>
	import iiImg from '@/static/mbcImg/home/banner1.png';
	import date from '@/static/mbcJs/dateTime.js';
	export default {
	    data () {
			return {
				iiImg: iiImg
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
			goToActiveDetails (e) {
				console.log(e, 'to活动详情');
				uni.navigateTo({
					url: '/modules/pageFind/active/activeDetails?id=' + e
				});
			}
	    }
	};
</script>

<style>
	.active-content-items{
		position: relative;
		width: 690upx;
		margin-top: 26upx;
		margin: auto;
	}
	.active-box{
		position: relative;
		width: 100%;
	}
	.active-box>image{
		position: relative;
		width: 100%;
		height: 384upx;
		border-radius: 20upx;
	}
	.title-active{
		position: relative;
		width: 100%;
		ont-family: PingFang-SC-Bold;
		font-size: 32upx;
		color: #2E2E30;
		line-height: 40upx;
		margin: 20upx 0;
	}
	.time-active{
		font-family: PingFangSC-Regular;
		font-size: 24upx;
		color: #9B9B9B;
		line-height: 24upx;
	}
	.sign-active{
		font-family: PingFang-SC-Medium;
		font-size: 26upx;
		color: #FAB100;
		line-height: 68upx;
		margin-bottom: 20upx;
	}
</style>