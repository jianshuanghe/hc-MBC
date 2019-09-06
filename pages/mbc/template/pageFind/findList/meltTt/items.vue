<template>
	<view class="active-content-items">
		<view class="active-box">
			<view class="title-active">{{msgData.activityTitel || '无'}}</view>
			<view class="time-active">{{msgData.releaseTime | dateTime}}</view>
		</view>
		<view class="line"></view>
	</view>
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
		margin-top: 30upx;
	}
	.time-active{
		font-family: PingFangSC-Regular;
		font-size: 24upx;
		color: #9B9B9B;
		line-height: 24upx;
		margin-bottom: 28upx;
	}
</style>