<template>
	<view>
		<view class="putInSeek-box">
			<view class="putInSeek">
				<view class="gadget-cont">
					<view class="gadget-toufang left">
						<view class="conten-box" @tap="goToPutIn(5)">
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
						<view class="conten-box" @tap="goToSeek">
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
	import { mapMutations } from 'vuex';
	export default {
	    data () {
			return {
				putIn: this.Static + 'mbcImg/home/putIn.png',
				seek: this.Static + 'mbcImg/home/seek.png',
				clickItems: 1, // 用户初次进来默认用户为首页
			};
	    },
	    methods: {
			...mapMutations({
				setHome: 'setHome'
			}),
			goToPutIn (e) {
				console.log(e, '点击触发发布项目');
				this.clickItems = e;
				this.$store.commit('setHome', this.clickItems);
				uni.setStorageSync('clickItems', e);
			},
			goToSeek () {
				console.log('点击触发寻找资本');
				uni.navigateTo({
					url: '/modules/pageHome/seekCapital/seekCapital'
				});
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
