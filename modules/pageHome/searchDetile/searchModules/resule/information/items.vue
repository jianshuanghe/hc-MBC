<template>
  <view class="investItems-content">
    <view class="II-content">
		<view class="left II-infor-text">
			<view class="infor-text-top">
				<view class="text-infor">月赚5300元存5000一个月生活费仅花300元</view>
			</view>
			<view class="infor-text-bot">
				<view class="left text-bot-infor-left">陌拜资本</view>
				<view class="right text-bot-infor-right">2019.3.23</view>
				<view class="clear"></view>
			</view>
		</view>
		<view class="right II-infor-img">
			<view class="infor-img">
				<image :src='msgData.headImg'></image>
			</view>
		</view>
		<view class="clear"></view>
    </view>
    <view class="line"></view>
  </view>
</template>

<script>
	import iiImg from '@/static/mbcImg/home/banner1.png';
	export default {
	    data () {
			return {
				iiImg: iiImg,
				msgData:{
					"ccode":"",
					"city":"北京",
					"comp":"公司名称",
					"compName":"",
					"field":[
						"环保",
						"金融",
						"生活服务"
					],
					"fields":"",
					"headImg":"https://img01.iambuyer.com/imgup/upload/images/2019/05/31/NbleKsQMxfHMRukd0zYiYUZs2d6uwC0F6TJgjrazgGb7n0HpekYAa3dTUY6H9GWy.png",
					"leves":"",
					"mechId":"",
					"pCode":"110000",
					"position":"职位",
					"userCard":"",
					"userContent":"",
					"userId":760,
					"userName":"用户名",
					"userProj":"",
					"userType":"1",
					"wxCode":""
				}
			};
	    },
		props: {
		},
	    methods: {
			goToFinanceDetail (e){
				console.log('去' + e + '详情页面');
				uni.navigateTo({
					url: '/modules/pageHome/homeList/homeList'
				});
			},
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
	.investItems-content{
		position: relative;
		width: 690upx;
		margin-top: 26upx;
		background: #fff;
		margin: auto;
	}
	.II-content{
		position: relative;
		width: 100%;
		padding: 22upx 0;
	}
	.II-infor-text{
		position: relative;
		width: 442upx;
	}
	.infor-text-top{
		position: relative;
		width: 100%;
	}
	.text-infor{
		font-family: PingFang-SC-Bold;
		font-size: 30upx;
		color: #2E2E30;
		line-height: 42upx;
	}
	.infor-text-bot{
		position: relative;
		width: 100%;
	}
	.text-bot-infor-left{
		ont-family: PingFang-SC-Medium;
		font-size: 24upx;
		color: #9B9B9B;
		line-height: 24upx;
	}
	.text-bot-infor-right{
		ont-family: PingFang-SC-Medium;
		font-size: 24upx;
		color: #9B9B9B;
		line-height: 24upx;
	}
	.II-infor-img{
		position: relative;
		width: 208upx;
	}
	.infor-img{
		position: relative;
		width: 208upx;
	}
	.infor-img>image{
		position: relative;
		width: 208upx;
		height: 138upx;
	}
</style>
