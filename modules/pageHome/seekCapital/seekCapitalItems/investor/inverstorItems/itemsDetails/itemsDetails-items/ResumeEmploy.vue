<template>
	<view class="personalProfile-contnet">
		<view class="personalProfile">
			<view class="pP-title">
				任职履历
				<text class="pP-text-right">纠错</text>
			</view>
			<view class="ITM-box">
				<view class="ITM-content" v-for="(items,index) in msgData.expes" :key="index">
					<view class="left Itm-left">
						<image :src="items.compLogo"></image>
					</view>
					<view class="left Itm-right">
						<view class="Itm-content-mm">
							<view class="title">
								{{items.compName}}
								<text class="text">| {{items.position}}</text>
							</view>
							<view class="employ">{{items.isIncu}}</view>
						</view>
					</view>
					<view class="clear"></view>
					<view class="line" v-if='msgData.expes.length > 1 && msgData.expes.length - 1 > index'></view>
				</view>
			</view>
		</view>
	</view>
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
		color: #5D5D5D;
		line-height: 40upx;
	}
</style>
