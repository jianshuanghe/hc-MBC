<template>
	<div class="personalProfile-contnet">
		<div class="personalProfile">
			<div class="pP-title">
				融资历史
				<text class="pP-text-right">纠错</text>
			</div>
			<div class="ITM-box">
				<div class="ITM-content" v-for="(items,index) in msgData.projCapis" :key="index">
					<div class="left Itm-left">
						<div class='dateBox'>
							<div class="date-M">{{items.capiStartime | dateTimeM}}月</div>
							<div class="date-Y">{{items.capiStartime | dateTimeY}}</div>
						</div>
					</div>
					<div class="left Itm-right">
						<div class="Itm-content-mm">
							<div class="employ">金额: {{items.capiMoney}}万</div>
							<div class="employ">在融伦次: {{items.levelCode}}</div>
							<div class="employ fT">{{items.capiInveCompName}}</div>
						</div>
					</div>
					<div class="clear"></div>
					<div class="line" v-if='msgData.projCapis.length > 1 && msgData.projCapis.length - 1 > index'></div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import date from '@/static/mbcJs/dateTime.js';
	export default {
	    data () {
			return {};
	    },
		props: {
			msgData: {
				type: Object
			}
		},
		filters: {
		  /* 格式化时间戳 */
		  dateTimeY (val) {
		    return date.dateTime('y', val);
		  },
		  dateTimeM (val) {
		    return date.dateTime('m', val);
		  },
		},
	    methods: {
			goToFinanceDetail (e){
				console.log('去' + e + '详情页面');
				uni.navigateTo({
					url: '/modules/pageHome/homeList/homeList'
				});
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
	.personalProfile-contnet{
		position: relative;
		width: 750upx;
		background: #fff;
		margin-bottom: 20upx;
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
	.ITM-content{
		position: relative;
		width: 100%;
	}
	.Itm-left{
		position: relative;
		width: 17%;
		margin-top: 30upx;
	}
	.Itm-left .dateBox{
		position: relative;
		width: 90upx;
		height: 90upx;
		background: #F5F5F5;
		border-radius: 8upx;
	}
	.date-M{
		position: relative;
		width: 100%;
		font-family: PingFang-SC-Bold;
		font-size: 28upx;
		color: #2E2E30;
		text-align: center;
		line-height: 45upx;
	}
	.date-Y{
		position: relative;
		width: 100%;
		font-family: PingFang-SC-Bold;
		font-size: 28upx;
		color: #9B9B9B;
		text-align: center;
		line-height: 45upx;
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
	.fT{
		color: #FAB100 !important;
	}
</style>
