<template>
	<div class="scanUploadItems-content">
		<!-- 未上传 -->
		<div class="SUI-tent" @tap='goToScanLand()' v-if='GET_PUBLISH.isUpLoadFile.isSuccess === false'>
			<div class="left SUI-left-img">
				<div class="SUI-File">
					<image class="file" :src="scanLogo"></image>
				</div>
			</div>
			<div class="left SUI-cont-text">
				<div class="SUI-text-top">电脑扫码上传</div>
				<div class="SUI-text-bot">附件格式支持doc、docx、pdf、jpg、png
大小不超过10M</div>
			</div>
			<div class="right SUI-right-img">
				<image class="rignt-arrow" :src='rightArrow'></image>
			</div>
			<div class="clear"></div>
		</div>
		<!-- 上传成功 -->
		<div class="SUI-tent" v-if='GET_PUBLISH.isUpLoadFile.isSuccess === true'>
			<div class="left SUI-left-img">
				<div class="SUI-File">
					<image class="file" :src="scanLogo"></image>
				</div>
			</div>
			<div class="left SUI-cont-text">
				<div class="SUI-text-top">电脑扫码上传</div>
				<div class="SUI-text-bot">附件格式支持doc、docx、pdf、jpg、png
大小不超过10M</div>
			</div>
			<div class="right SUI-right-img">
				<image class="rignt-arrow" :src='rightArrow'></image>
			</div>
			<div class="clear"></div>
		</div>
		
		<view class="SL-btn"  v-if='GET_PUBLISH.isUpLoadFile.isSuccess === true'>
			<view class="SL-btn-text" @tap="clickPublishTitle(2)">下一步</view>
		</view>
	</div>
</template>

<script>
	import { mapMutations, mapGetters } from 'vuex';
	export default {
	    data () {
	      return {
			scanLogo: this.Static + 'mbcImg/publish/scanLogo.png',
	        rightArrow: this.Static + 'mbcImg/publish/rightArrow.png',
	      };
	    },
		computed: {
			...mapGetters(['GET_PUBLISH'])
		},
	    methods: {
			...mapMutations({
				setPublishTitleIndex: 'setPublishTitleIndex'
			}),
			clickPublishTitle (e) {
				uni.setStorageSync('clickItemsIndexPublish', e);
				console.log(e, '切换上传BP和基本信息');
				this.$store.commit('setPublishTitleIndex', e); // 更新setPublishTitleIndex
			},
			goToScanLand () {
				console.log('去扫码登录上传');
				uni.navigateTo({
					url: '/modules/pagePublish/publishList/publishUpload'
				});
			}
	    }
	}
</script>

<style>
	.scanUploadItems-content{
		position: relative;
		width: 1334upx;
		background: #fff;
		padding: 8upx 0;
	}
	.SUI-tent{
		position: relative;
		width: 670upx;
		margin-left: 40upx;
		margin-top: 14upx;
		margin-bottom: 14upx;
	}
	.SUI-left-img{
		position: relative;
		width: 110upx;
	}
	.SUI-File{
		position: relative;
		width: 92upx;
		height: 90upx;
	}
	.SUI-File>image{
		position: relative;
		width: 92upx;
		height: 90upx;
		margin-top: 22upx;
	}
	.SUI-cont-text{
		position: relative;
		width: 488upx;
	}
	.SUI-text-top{
		font-family: PingFang-SC-Bold;
		font-size: 32upx;
		color: #2E2E30;
		letter-spacing: 0;
		line-height: 60upx;	
	}
	.SUI-text-bot{
		font-family: PingFangSC-Regular;
		font-size: 24upx;
		color: #9B9B9B;
		letter-spacing: 0;
		line-height: 32upx;
	}
	.SUI-right-img{
		position: relative;
		width: 20upx;
	}
	.SUI-right-img>image{
		position: relative;
		width: 26upx;
		height: 28upx;
		margin-top: 52upx;
	}
	.SL-btn{
		position: absolute;
		width: 690upx;
		margin-left: 30upx;
		background: #02C2A2;
		border-radius: 2px;
		top: 400upx;
	}
	.SL-btn-text{
		font-family: PingFangSC-Regular;
		font-size: 28upx;
		color: #FFFFFF;
		letter-spacing: 0;
		text-align: center;
		line-height: 90upx;
	}
	
</style>
