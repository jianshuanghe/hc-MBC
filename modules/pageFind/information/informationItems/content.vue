<template>
	<view class="content-content">
		<view class="activeDetails">
			<view class="AD-content">
				<view class="AD-title">{{msgData.activity.activityTitel}}</view>
				<view class="AD-items">{{msgData.activity.createTime | dateTime}}</view>
				<!-- 活动详情 -->
				<view class="AD-details-text">
					{{msgData.activity.activityAbstract}}
				</view>
				<view class="AD-details-img">
					<image :src="msgData.activity.activityImg || this.dImg"></image>
				</view>
				<view class="AD-details-text" v-html='msgData.activity.activityContent'></view>
			</view>
		</view>
	</view>
</template>

<script>
	import date from '@/static/mbcJs/dateTime.js';
	export default {
	    data () {
			return {
				dataList: [] // 后台返回数据
			};
	    },
		components: {
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
		  },
		  /* 格式图片 */
		  dataImg (val) {
			  return 'https://' + val;
		  }
		},
		computed: {},
		watch: {},
		created() {
		},
	    methods: {
	    }
	};
</script>

<style>
	.content-content{
		position: relative;
		width: 750upx;
	}
	.activeDetails{
		position: relative;
		width: 100%;
	}
	.AD-content{
		position: relative;
		padding: 30upx;
		background: #fff;
	}
	.AD-title{
		position: relative;
		width: 100%;
		font-family: PingFang-SC-Bold;
		font-size: 40upx;
		color: #2E2E30;
		line-height: 50upx;
		margin: 20upx 0;
	}
	.AD-items{
		position: relative;
		width: 100%;
		font-family: PingFangSC-Regular;
		font-size: 28upx;
		color: #5D5D5D;
		line-height: 110upx;
	}
	
	.AD-details-title{
		font-family: PingFangSC-Semibold;
		font-size: 34upx;
		color: #2E2E30;
		letter-spacing: 0;
		line-height: 100upx;
	}
	.AD-details-text{
		position: relative;
		width: 100%;
		font-family: PingFang-SC-Medium;
		font-size: 28upx;
		color: #5D5D5D;
		letter-spacing: 0;
		line-height: 40upx;
		margin: 40upx 0;
	}
	.AD-details-img>image{
		position: relative;
		width: 100%;
		height: 384upx;
	}
</style>
