<template>
	<view class="inverstorTop-content">
		<view class="inverstorTop">
			<view class="left iT-img">
				<image :src="msgData.user.headImg || dImg"></image>
			</view>
			<view class="left iT-text">
				<view class="iT-type">{{msgData.user.userName}}</view>
				<view class="iT-company"  v-if="msgData.user.userType === '2'">{{msgData.user.mechName}}·{{msgData.user.position}}</view>
				<view class="iT-company" v-else>投资人</view>
				<view class="iT-city">{{msgData.user.city}}</view>
			</view>
			<view class="clear"></view>
		</view>
	</view>
</template>

<script>
	export default {
	    data () {
			return {
				dImg: this.dImg
			};
	    },
		props: {
			msgData: {
				type: Object
			}
		},
		mounted () {
			console.log(this.msgData, '------------------------top-----------------')
		},
	    methods: {
	    }
	}
</script>

<style>
	.inverstorTop-content{
		position: relative;
		width: 750upx;
		background: #fff;
		margin-bottom: 20upx;
	}
	.inverstorTop{
		position: relative;
		width: 100%;
		padding: 30upx;
	}
	.iT-img{
		position: relative;
		width: 20%;
	}
	.iT-img>image{
		position: relative;
		width: 120upx;
		height: 120upx;
		border-radius: 50%;
		top: 10upx;
	}
	.iT-text{
		position: relative;
		width: 80%;
	}
	.iT-type{
		position: relative;
		width: 100%;
		font-family: PingFang-SC-Bold;
		font-size: 40upx;
		color: #2E2E30;
		letter-spacing: 0;
		line-height: 60upx;
	}
	.iT-company{
		font-family: PingFangSC-Regular;
		font-size: 24upx;
		color: #9B9B9B;
		line-height: 40upx;
	}
	.iT-city{
		font-family: PingFangSC-Regular;
		font-size: 24upx;
		color: #9B9B9B;
		line-height: 40upx;
	}
</style>
