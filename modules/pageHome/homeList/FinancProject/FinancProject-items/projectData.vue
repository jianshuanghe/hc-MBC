<template>
	<div class="personalProfile-contnet" v-if='msgData.projLinks.length > 0'>
		<div class="personalProfile">
			<div class="pP-title">
				项目数据
				<text class="pP-text-right"  @tap="goToOpinion()">纠错</text>
			</div>
			<div class="IC-content">
				<div class="IC-box">
					<div class="title">相关链接</div>
					<div class="IC-items-list">
						<div class="IC-items left" v-for="(items,index) in msgData.projLinks" :key="index">{{items.linkName}}</div>
						<div class="clear"></div>
					</div>
				</div>
			</div>
			<!-- <div class="IC-content">
				<div class="IC-box">
					<div class="title">相关竞品</div>
					<div class="IC-items-list">
						<div class="ITM-box">
							<div class="ITM-content">
								<div class="left Itm-left">
									<image :src="iiImg"></image>
								</div>
								<div class="left Itm-right">
									<div class="Itm-content-mm">
										<div class="title">
											红杉资本
										</div>
										<div class="employ">在线教育付费平台</div>
										<div class="C-type">
											<div class="items-C-T left">
												教育
												<text class="y-c-t"> |</text>
											</div>
											<div class="clear"></div>
										</div>
									</div>
								</div>
								<div class="clear"></div>
							</div>
							<div class="line"></div>
						</div>
						<div class="openOrClose">
							<div class="line"></div>
							查看更多竞品
							<text class="num">(10)</text>
						</div>
					</div>
				</div>
			</div> -->
		</div>
	</div>
</template>

<script>
	import yuan from '@/static/mbcImg/home/seekCapital/yuan.png';
	export default {
	    data () {
			return {
				yuan: this.Static + 'mbcImg/home/seekCapital/yuan.png'
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
		width: 100%;
		padding: 30upx 30upx 0 30upx;
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
		padding-bottom: 20upx;
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
	.ITM-content{
		position: relative;
		width: 100%;
	}
	.Itm-left{
		position: relative;
		width: 17%;
		margin-top: 76upx;
	}
	.Itm-left>image{
		position: relative;
		width: 80upx;
		height: 80upx;
		border-radius: 6upx;
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
	.C-type{
		position: relative;
		width: 100%;
	}
	.items-C-T{
		font-family: PingFangSC-Regular;
		font-size: 24upx;
		color: #5D5D5D;
		line-height: 50upx;
	}
	.y-c-t{
		color: #D2D2D2;
		margin: 0 6upx;
	}
	.openOrClose{
		position: relative;
		width: 100%;
		font-family: PingFangSC-Regular;
		font-size: 26upx;
		line-height: 84upx;
		padding-top: 10upx;
		text-align: center;
		color: #5D5D5D;
	}
	.num{
		color: #02C2A2;
	}
</style>
