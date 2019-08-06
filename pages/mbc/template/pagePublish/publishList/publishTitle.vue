<template>
	<view class="publishTitle" id="publishTitle">
		<view class="center-publishTitle">
			<view class="news-TBox left" @tap="clickpublishTitle(1)">
			  <view :class="clickItemsIndex === 1 ? 'Tbox-items Tb-checked' : 'Tbox-items'">
				<p class="home-left-p">1、上传BP</p>
				<view class="hengLine" v-if="clickItemsIndex === 1"></view>
			  </view>
			</view>
			<view class="news-TBox left" @tap="clickpublishTitle(2)">
			  <view  :class="clickItemsIndex === 2 ? 'Tbox-items Tb-checked' : 'Tbox-items'">
				<p class="home-right-p">2、基本信息</p>
				<view class="hengLine"  v-if="clickItemsIndex === 2"></view>
			  </view>
			</view>
			<view class="clear"></view>
		</view>
		<view class="line"></view>
	</view>
</template>

<script>
	export default {
	    data () {
			return {
				clickItemsIndex: 1
			};
	    },
		computed: {
		},
		watch: {
		},
		mounted(){
		},
	    methods: {
			clickpublishTitle (e) {
				this.clickItemsIndex = e;
				console.log(e, '切换上传BP和基本信息');
			}
	    }
	};
</script>

<style>
	.publishTitle{
		position: fixed;
		width: 100%;
		z-index: 100;
		top: 0;
		background: #fff;
		height: 88upx;
	}
  .newsTitle{
    position: relative;
    width: 100%;
  }
  .center-publishTitle{
    position: relative;
    width: 70%;
	margin: auto;

  }
  .news-TBox{
    position: relative;
    width: 50%;
  }
  .Tbox-items{
    position: relative;
    width: 100%;
  }
  .home-left-p{
	ont-family: PingFangSC-Regular;
	font-size: 28upx;
	color: #5D5D5D;
	line-height: 60upx;
	margin-top: 16upx;
	text-align: center;
  }
  .home-right-p{
    ont-family: PingFangSC-Regular;
	font-size: 28upx;
	color: #5D5D5D;
	line-height: 60upx;
	margin-top: 16upx;
	text-align: center;
  }
  .hengLine{
    position: relative;
    background: #02C2A2;
	height: 4upx;
	width: 40upx;
	border-radius: 100upx;
    margin: 0 auto;
	margin-bottom: 8upx;
  }
  .Tb-checked>p{
    font-family: PingFangSC-Medium;
	color: #02C2A2 !important;
  }
</style>
