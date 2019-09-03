<template>
	<view class="content-content">
		<view class="activeDetails">
			<view class="AD-img">
				<image :src="msgData.activity.activityImg"></image>
			</view>
			<view class="AD-content">
				<view class="AD-title">{{msgData.activity.activityTitel}}</view>
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
						<view :class=" isAll ? 'AD-text1 AD2' : 'AD-text AD2'">{{msgData.activity.activityAddress}}</view>
						<text class="zhankai right" @tap="clickAllShow">{{isAll ? '收起' : '展开'}}</text>
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
						<image class="img-Ad left" :class="'marg'+ index" :src="items || this.dImg"  v-for="(items,index) in msgData.sginImg" :key="index"></image>
					</view>
					<view class="AD-items-text right">
						{{msgData.sginSum}} <text class="AD-text">人已报名</text>
					</view>
					<view class="clear"></view>
					<view class="line"></view>
				</view>
				<!-- 活动详情 -->
				<view class="AD-details-title">活动详情</view>
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
				dataList: [] ,// 后台返回数据
				isAll: false
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
		  },
		  // htmlImg (val) {
			 //  //正则匹配所有img标签
				// //var regex0 = new RegExp("(i?)(\<img)([^\>]+\>)","gmi");
				// //正则匹配不含style="" 或 style='' 的img标签
				// var regex1 = new RegExp("(i?)(\<img)(?!(.*?style=['\"](.*)['\"])[^\>]+\>)","gmi");
				// //给不含style="" 或 style='' 的img标签加上style=""
				// htmlstr = htmlstr.replace(regex1, "$2 style=\"\"$3");
				// console.log("增加style=\"\"后的html字符串："+htmlstr);
				// //正则匹配含有style的img标签
				// var regex2 = new RegExp("(i?)(\<img.*?style=['\"])([^\>]+\>)","gmi");
				// //在img标签的style里面增加css样式(这里增加的样式：display:block;max-width:100%;height:auto;border:5px solid red;)
				// htmlstr = htmlstr.replace(regex2, "$2display:block;max-width:100%;height:auto;border:5px solid red;$3");
				// console.log("在img标签的style里面增加样式后的html字符串："+htmlstr);
				// return htmlstr;
		  // }
		},
		computed: {},
		watch: {},
		created() {
		},
	    methods: {
			clickAllShow () {
				console.log('展示全部')
				this.isAll = !this.isAll;
			}
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
	.marg3{
		margin-left: 90upx;
	}
	.marg4{
		margin-left: 120upx;
	}
	.marg5{
		margin-left: 150upx;
	}
	.marg6{
		margin-left: 180upx;
	}
	.marg7{
		margin-left: 210upx;
	}
	.marg8{
		margin-left: 240upx;
	}
	.marg9{
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
	.zhankai{
		position: absolute;
		font-size: 28upx;
		color: red;
		text-align: right;
		line-height: 110upx;
		right: 0;
	}
	.AD-text{
		position: relative;
		color: #5D5D5D;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		max-width: 75%;
		line-height: 110upx;
	}
	.AD2{
		max-width: 66% !important;
		margin-right: 8% !important;
		display: inline-block;
	}
	.AD-text1{
		position: absolute;
		color: #5D5D5D;
		line-height: 34upx !important;
		max-width: 66% !important;
		margin-left: 60upx;
		top: 34upx;
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
