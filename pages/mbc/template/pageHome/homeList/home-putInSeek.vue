<template>
	<view>
		<view class="putInSeek-box">
			<view class="putInSeek">
				<view class="gadget-cont">
					<view class="gadget-toufang left">
						<view class="conten-box" @tab="goToPutIn">
							<view class="img left">
								<img :src="putIn" alt="" class="">
							</view>
							<view class="text left">
								<p class="title">发布项目</p>
								<p class="text-box">BP诊断梳理</p>
							</view>
							<view class="clear"></view>
						</view>
					</view>
					<view class="cent-line">
						<view class="Y-line"></view>
					</view>
					<view class="gadget-toufang left">
						<view class="conten-box" @tab="goToSeek">
							<view class="img left">
								<img :src="seek" alt="" class="">
							</view>
							<view class="text left">
								<p class="title">寻找资本</p>
								<p class="text-box">快速融资</p>
							</view>
							<view class="clear"></view>
						</view>
					</view>
					<view class="clear"></view>
				</view>
			</view>
		</view>
		<view class="line"></view>
	</view>
	
</template>

<script>
	import putIn from '@/static/mbcImg/home/putIn.png';
	import seek from '@/static/mbcImg/home/seek.png';
	export default {
	    data () {
			return {
				putIn: putIn,
				seek: seek
			};
	    },
	    methods: {
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
	.putInSeek-box{
    position: relative;
    width: 750upx;
    padding: 14upx 30upx;
    background: #fff;
  }
  .cent-line{
	    position: absolute;
		margin: 22upx 340upx;
		width: 4upx;
		height: 74upx;
  }
  .gadget-box{
    position: relative;
    width: 100%;
  }
  .gadget-title{
    position: relative;
    width: 100%;
  }
  .gadget-title>p {
    font-family: PingFangSC-Medium;
	font-size: 32upx;
	color: #2E2E30;
	letter-spacing: 0.38upx;
	text-align: center;
	line-height: 32upx;
  }
  .gadget-cont{
    position: relative;
    width: 690upx;
  }
  .gadget-toufang{
    position: relative;
    width: 50%;
  }
  .conten-box{
    position: relative;
    width: 100%;
  }
  .img{
    position: relative;
    width: 88upx;
    padding-left: 30upx;
  }
  .img>img{
    position: relative;
    width: 88upx;
    height: 88upx;
    margin-top: 15upx;
  }
  .text{
    position: relative;
    width: 200upx;
	margin: 20upx 0upx 20upx 24upx;
  }
  .title{
    font-family: PingFangSC-Medium;
    font-size: 32upx;
    color: #2E2E30;
    letter-spacing: 0.38upx;
    line-height: 38upx;
  }
  .text-box{
    font-family: PingFangSC-Regular;
	font-size: 24upx;
	color: #9B9B9B;
	letter-spacing: 0.28upx;
	line-height: 40upx;
  }
</style>
