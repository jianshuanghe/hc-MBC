<template>
	<div class="personalProfile-contnet">
		<div class="personalProfile">
			<div class="pP-title">
				团队成员
				<text class="pP-text-right">纠错</text>
			</div>
			<div class="ITM-box">
				<div class="ITM-content" v-for="(items,index) in msgData.projUsers" :key="index">
					<div class="left Itm-left">
						<image :src="items.projUserImg || this.dImg"></image>
					</div>
					<div class="left Itm-right">
						<div class="Itm-content-mm">
							<div class="title">
								{{items.projUserName}}
								<text class="text">| {{items.projUserPosition}}</text>
							</div>
							<div class="employ">{{items.projUserContent}}</div>
						</div>
					</div>
					<div class="clear"></div>
					<div class="line" v-if='msgData.projUsers.length > 1 && msgData.projUsers.length - 1 > index'></div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
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
	.Itm-left>image{
		position: relative;
		width: 80upx;
		height: 80upx;
		border-radius: 50%;
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
		color: #5D5D5D;
		line-height: 40upx;
	}
</style>
