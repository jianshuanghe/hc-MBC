<template>
  <view class="investItems-content">
    <view class="II-content">
		<view class="left II-infor-text">
			<view class="infor-text-top">
				<view class="text-infor">{{msgData.activityTitel}}</view>
			</view>
			<view class="infor-text-bot">
				<view class="left text-bot-infor-left">{{msgData.activityAbstract}}</view>
				<view class="right text-bot-infor-right">{{msgData.activityStartTime | dateTime}}</view>
				<view class="clear"></view>
			</view>
		</view>
		<view class="right II-infor-img">
			<view class="infor-img">
				<image :src='msgData.activityImg'></image>
			</view>
		</view>
		<view class="clear"></view>
    </view>
    <view class="line"></view>
  </view>
</template>

<script>
	import iiImg from '@/static/mbcImg/home/banner1.png';
	import date from '@/static/mbcJs/dateTime.js';
	export default {
	    data () {
			return {
				iiImg: this.dImg,
				msgData:{
					"activityAbstract":"这是活动的照耀",
					"activityAddress":"北京昌平",
					"activityContent":"<p>我最喜欢的小动物那就是小白兔。<br>它浑身上下一片纯白，一双蓝宝石般的大眼睛，两只长长的耳朵，仿佛在倾听着家中的一点点动静；它有一条短短的尾巴，它的嘴巴一张开，大大是两颗门牙露出来了，就显得它更可爱了。<br>小白兔喜欢吃的东西有青菜和胡萝卜。它吃起胡萝卜来用两颗大门牙“咔嚓、咔嚓”地咬着那美味的萝卜，吃得可津津有味啦！<br>记得有一次，我到外婆的邻居家里玩，他们养了一只可爱的小白兔。起先它不但跟我很陌生，而且还看都不看我一眼呢！我灵机一动，就想了一个好办法：我拿了一些胡萝卜丢在里面，我就走到边上偷偷地看。它看见没人了，就吃起胡萝卜来，我悄悄地走过去，小白兔跟我有点熟悉了，我很高兴。慢慢的，我就跟小白兔越来越熟悉了，就成了好朋友。<br>我和它继续玩。可过了一会儿，我就回去了。小白兔恋恋不舍地看着我，好象在跟我诉说：“记得以后要常来看我哦！”我也跟小白兔说：“好的，我有空时一定会来的，请等着我吧！”然后我也就依依不舍地走了。<br>这就是我所喜爱的小动物——小白兔。</p>",
					"activityEndTime":1561298651000,
					"activityImg":"https://img04.iambuyer.com/imgup/upload/images/2019/05/29/9iD9YcPDs0Vzdhcjjc2BknReX9Y3RPbQkEphcjjc2BwR1owkoO1tzzhcjjc2BvdFqQb4VL2M716I7UnfyJ.jpeg",
					"activitySource":"0",
					"activityStartTime":1559163903000,
					"activityState":"2",
					"activityTelphone":"4006182288",
					"activityTitel":"活动",
					"createMan":"",
					"createTime":"",
					"id":5,
					"linkAddress":"",
					"region":"",
					"releaseState":"",
					"releaseTime":1559113308000,
					"remarks":"",
					"signSum":0,
					"state":"",
					"updateMan":"",
					"updateTime":""
				}
			};
	    },
		filters: {
		  /* 格式化时间戳 */
		  dateTime (val) {
		    return date.dateTime('.', val);
		  },
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
		height: 120upx;
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
