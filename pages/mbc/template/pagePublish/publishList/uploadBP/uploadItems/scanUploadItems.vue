<template>
	<div class="scanUploadItems-content">
		<div class="SUI-tent" @tap='goToScanLand()'>
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
	</div>
</template>

<script>
	export default {
	    data () {
	      return {
			scanLogo: this.Static + 'mbcImg/publish/scanLogo.png',
	        rightArrow: this.Static + 'mbcImg/publish/rightArrow.png',
	      };
	    },
	    methods: {
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
	
	
</style>
