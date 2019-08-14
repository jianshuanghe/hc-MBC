<template>
	<div class="active-content-items">
		<div class="active-box">
			<div class="title-active">{{msgData.activityAbstract || '无'}}</div>
			<div class="time-active">{{msgData.activityEndTime | dateTime}}</div>
		</div>
		<view class="line"></view>
	</div>
</template>

<script>
	import date from '@/static/mbcJs/dateTime.js';
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
		created() {
		},
		filters: {
          /* 格式化时间戳 */
          dateTime (val) {
            return date.dateTime('.', val);
          }
        },
	    methods: {
			goToFinanceDetail (e){
				console.log('去' + e + '详情页面');
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
		margin-bottom: 28upx;
	}
</style>