<template>
	<view class="content-content">
		<view class="activeDetails">
			<view class="AD-img">
				<image :src="banner1"></image>
			</view>
			<view class="AD-content">
				<view class="AD-title">{{msgData.activity.activityAbstract}}</view>
				<view class="AD-items-list">
					<view class="AD-items">
						活动时间
						<text class="AD-text">{{msgData.activity.activityStartTime | dateTime}} - {{msgData.activity.activityEndTime | dateTime}}</text>
					</view>
					<view class="line"></view>
				</view>
				<view class="AD-items-list">
					<view class="AD-items">
						活动地点
						<text class="AD-text">{{msgData.activity.activityAddress}}</text>
					</view>
					<view class="line"></view>
				</view>
				<view class="AD-items-list">
					<view class="AD-items">
						咨询热线
						<text class="AD-text">{{msgData.activity.activityTelphone}}</text>
					</view>
					<view class="line"></view>
				</view>
				<view class="AD-items-img">
					<view class="AD-items-img-list left">
						<image class="img-Ad left" :class="'marg'+ index" :src="items"  v-for="(items,index) in msgData.sginImg" :key="index"></image>
						<image class="img-Ad left" :class="'marg1'" :src="items"  v-for="(items,index) in msgData.sginImg" :key="index"></image>
						<image class="img-Ad left" :class="'marg2'" :src="items"  v-for="(items,index) in msgData.sginImg" :key="index"></image>
						<image class="img-Ad left" :class="'marg3'" :src="items"  v-for="(items,index) in msgData.sginImg" :key="index"></image>
						<image class="img-Ad left" :class="'marg4'" :src="items"  v-for="(items,index) in msgData.sginImg" :key="index"></image>
					</view>
					<view class="AD-items-text right">
						{{msgData.sginSum}} <text class="AD-text">人已报名</text>
					</view>
					<view class="clear"></view>
					<view class="line"></view>
				</view>
				<!-- 活动详情 -->
				<view class="AD-details-title">活动详情</view>
				<view class="AD-details-text">
					{{msgData.activityContent}}
				</view>
				<view class="AD-details-img">
					<image :src="banner1"></image>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import banner1 from '@/static/mbcImg/home/banner1.png';
	import date from '@/static/mbcJs/dateTime.js';
	export default {
	    data () {
			return {
				banner1: banner1,
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
		    return date.dateTime('m/d h minute', val);
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
	.AD-img{
		position: relative;
		width: 100%;
	}
	.AD-img>image{
		position: relative;
		width: 100%;
		height: 432upx;
	}
	.AD-content{
		position: relative;
		/* width: 750upx; */
		padding: 30upx;
		background: #fff;
		margin-bottom: 200upx;
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
	.AD-items-list{
		position: relative;
		width: 100%;
	}
	.AD-items{
		position: relative;
		width: 100%;
		font-family: PingFangSC-Regular;
		font-size: 28upx;
		color: #5D5D5D;
		line-height: 110upx;
	}
	.AD-text{
		float: right;
	}
	.AD-items-img{
		position: relative;
		width: 100%;
	}
	.AD-items-img-list{
		position: relative;
		width: 70%;
	}
	.img-Ad{
		position: absolute;
		width: 52upx;
		height: 52upx;
		top: 30upx;
		border-radius: 50%;
	}
	.marg1{
		margin-left: 30upx;
	}
	.marg2{
		margin-left: 60upx;
	}
	.marg4{
		margin-left: 90upx;
	}
	.marg5{
		margin-left: 120upx;
	}
	.marg6{
		margin-left: 150upx;
	}
	.marg7{
		margin-left: 180upx;
	}
	.marg8{
		margin-left: 210upx;
	}
	.marg9{
		margin-left: 240upx;
	}
	.marg10{
		margin-left: 270upx;
	}
	.AD-items-text{
		position: relative;
		width: 30%;
		text-align: right;
		font-family: PingFangSC-Semibold;
		font-size: 28upx;
		color: #02C2A2;
		text-align: right;
		line-height: 110upx;
	}
	.AD-text{
		position: relative;
		color: #5D5D5D;
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
