<template>
	<div class="personalProfile-contnet" v-if='msgData.capitalComp.compContent'>
		<div class="personalProfile">
			<div class="pP-title">
				机构简介
				<!-- <text class="pP-text-right">纠错</text> -->
			</div>
			<div class="pP-content">
				{{msgData.capitalComp.compContent}}
			</div>
			<div class="openOrClose" @tap='isShowAll()' v-if='msgData.capitalComp.compContent.length > 45'>
				<div class="line"></div>
				{{ !isShow ? '展开' : '收起'}}
			</div>
		</div>
	</div>
</template>

<script>
	export default {
	    data () {
			return {
				authen: this.Static + 'mbcImg/home/seekCapital/authen.png',
				compContent: '', // 机构简介
				isShow: false // 默认不展开全部
			};
	    },
		props: {
			msgData: {
				type: Object
			}
		},
		created () {
			if (this.msgData.capitalComp.compContent.length > 45) {
				this.compContent = this.msgData.capitalComp.compContent.substring(0,45)+"......";
			} else {
				this.compContent = this.msgData.capitalComp.compContent;
			}
		},
		mounted() {
			if (this.msgData.capitalComp.compContent.length > 45) {
				this.compContent = this.msgData.capitalComp.compContent.substring(0,45)+"......";
			} else {
				this.compContent = this.msgData.capitalComp.compContent;
			}
		},
	    methods: {
			isShowAll() {
				if (this.isShow === false) {
					this.isShow = true;
					this.compContent = this.msgData.capitalComp.compContent;
				} else {
					this.isShow = false;
					this.compContent = this.msgData.capitalComp.compContent.substring(0,45)+"......";
				}
				console.log(this.isShow)
			}
	    }
	}
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
		padding: 30upx 30upx 12upx 30upx;
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
	.pP-content{
		font-family: PingFangSC-Regular;
		font-size: 28upx;
		color: #5D5D5D;
		line-height: 44upx;
	}
	.pP-content1{
		font-family: PingFangSC-Regular;
		font-size: 28upx;
		color: #5D5D5D;
		line-height: 44upx;
		overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp:2;
        -webkit-box-orient: vertical;
	}
	.openOrClose{
		position: relative;
		width: 100%;
		font-family: PingFangSC-Regular;
		font-size: 26upx;
		color: #02C2A2;
		line-height: 84upx;
		padding-top: 10upx;
		text-align: center;
	}
</style>
