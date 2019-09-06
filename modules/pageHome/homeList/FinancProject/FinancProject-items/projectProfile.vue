<template>
	<view class="personalProfile-contnet" v-if="msgData.projImgs.legth > 0 || msgData.projContent !== '' || msgData.conentMarket !== '' || msgData.conentPortrait !== '' || msgData.conentModel !== '' || msgData.conentData !== '' || msgData.conentCore !== ''">
		<view class="personalProfile">
			<view class="pP-title">
				项目简介
				<text class="pP-text-right"  @tap="goToOpinion()">纠错</text>
			</view>
			<view class="pP-img" >
				<view class="img-list">
					<view class="img-box left" v-for="(items,index) in msgData.projImgs" :key="index" @tap="previewImage(msgData.projImgs, index)">
						<image class="items-img" mode='widthFix' :src="items.imgName "></image>
					</view>
					<view class="clear"></view>
				</view>
				<view class="line"></view>
			</view>
			<view class="pP-content-box" v-if="msgData.projContent !== ''">
				<view class="titel-pP">项目介绍</view>
				<view class="pP-content">
					{{msgData.projContent || ''}}
				</view>
				<view class="line"></view>
			</view>
			<view class="pP-content-box" v-if="msgData.conentMarket !== ''">
				<view class="titel-pP">市场需求</view>
				<view class="pP-content">
					{{msgData.conentMarket || ''}}
				</view>
				<view class="line"></view>
			</view>
			<view class="pP-content-box" v-if="msgData.conentPortrait !== ''">
				<view class="titel-pP">用户画像</view>
				<view class="pP-content">
					{{msgData.conentPortrait || ''}}
				</view>
				<view class="line"></view>
			</view>
			<view class="pP-content-box" v-if="msgData.conentModel !== ''">
				<view class="titel-pP">商业模式</view>
				<view class="pP-content">
					{{msgData.conentModel || ''}}
				</view>
				<view class="line"></view>
			</view>
			<view class="pP-content-box" v-if="msgData.conentData !== ''">
				<view class="titel-pP">运营数据</view>
				<view class="pP-content">
					{{msgData.conentData || ''}}
				</view>
				<view class="line"></view>
			</view>
			<view class="pP-content-box" v-if="msgData.conentCore !== ''">
				<view class="titel-pP">核心资源</view>
				<view class="pP-content">
					{{msgData.conentCore || ''}}
				</view>
			</view>
		</view>
	</view>
</template>

<script>
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
			previewImage (e, key) {
				console.log(e, '附件地址');
				let imgList = [];
				e.map((items, index) => {
					imgList.push(items.imgName)
				})
				uni.previewImage({
					current: imgList[key],
					indicator: "number",
					loop: "true",
					urls:imgList
				})
			},
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
		background: #fff;
		margin-bottom: 20upx;
	}
	.personalProfile{
		position: relative;
		padding: 30upx 30upx 20upx 30upx;
	}
	.pP-title{
		position: relative;
		width: 100%;
		font-family: PingFang-SC-Bold;
		font-size: 34upx;
		color: #2E2E30;
		letter-spacing: 0;
		line-height: 68upx;
		font-weight: bold;
	}
	.pP-text-right{
		position: relative;
		float: right;
		font-family: PingFangSC-Regular;
		font-size: 26upx;
		color: #02C2A2;
		line-height: 68upx;
	}
	.pP-img{
		position: relative;
		width: 720upx;
		right: 0;
		margin-bottom: 50upx;
	}
	.img-list{
		position: relative;
		width: 100%;
		position: relative;
		width: 100%;
		margin: 40upx 0;
	}
	.img-box{
		position: relative;
		width: 210upx;
		height: 150upx;
		margin-right: 30upx;
		margin-top: 30upx;
		min-height: 300upx;
	}
	.items-img{
		position: relative;
		max-width: 100%;
		max-height: 100%;
		display: table-cell;
		vertical-align: middle;
		position: relative;
		margin: 0;
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		-webkit-transform: translate(-50%, -50%);
	}
	.pP-content-box{
		position: relative;
		width: 100%;
	}
	.titel-pP{
		position: relative;
		width: 100%;
		font-family: PingFang-SC-Bold;
		font-size: 28upx;
		color: #2E2E30;
		letter-spacing: 0;
		line-height: 100upx;
		font-weight: bold;
	}
	.pP-content{
		font-family: PingFangSC-Regular;
		font-size: 28upx;
		color: #5D5D5D;
		line-height: 44upx;
		margin-bottom: 36upx;
	}
</style>
