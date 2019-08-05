<template>
  <view class="investItems-content">
    <view class="II-content">
      <view class="II-top">
        <view class="left II-user-img">
          <view class="II-img">
            <image :src='msgData.headImg' v-if="msgData.headImg"></image>
			<image :src='iiImg' v-if="!msgData.headImg"></image>
          </view>
        </view>
        <view class="left II-suer-insr">
          <view class="II-insr">
            <view class="user">
              投资人
            </view>
            <view class="mbc">
				<view class="II-mod" >
				  <view class="mod-items left" v-for="(items,index) in msgData.field" :key="index">{{items}}</view>
				  <view class="clear"></view>
				</view>
            </view>
          </view>
        </view>
      </view>
      <view class="II-bot">
		  <view class="left mbc-text">{{msgData.comp || '无'}}</view>
      </view>
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
		height: 128upx;
	}
	.II-top{
		position: relative;
		width: 100%;
	}
	.II-user-img{
		position: relative;
		width: 110upx;
		height: 80upx;
	}
	.II-img{
		position: relative;
		width: 80upx;
		height: 80upx;
		float: left;
	}
	.II-img>image{
		position: relative;
		width: 80upx;
		height: 80upx;
		border-radius: 50%;
	}
	.II-suer-insr{
		position: relative;
		width: 476upx;
	}
	.II-insr{
		position: relative;
		width: 100%;
	}
	.II-insr .user{
		font-family: PingFang-SC-Bold;
		font-size: 32upx;
		color: #2E2E30;
		letter-spacing: 0;
		line-height: 40upx;
		font-weight: bold;
	}
	.II-insr .mbc{
		font-family: PingFangSC-Regular;
		font-size: 24upx;
		color: #5D5D5D;
		line-height: 40upx;
	}
	.II-insr .mbc .mbc-text{
		font-family: PingFangSC-Regular;
		font-size: 24upx;
		color: #9B9B9B;
		line-height: 48upx;
	}
	.IIline-Y{
		background: #D2D2D2;
		width: 2upx;
		height: 20upx;
		margin: 16upx 8upx 4upx 8upx;
	}
	.II-user-address{
		position: relative;
	}
	.II-user-address .adderss{
		position: relative;
		line-height: 20upx;
	}
	.II-user-address .adderss>text{
		font-family: FZLTHJW--GB1-0;
		font-size: 20upx;
		color: #9B9B9B;
		letter-spacing: 0;
		text-align: right;
	}
	.II-bot{
		position: relative;
		width: 100%;
	}
	.II-mod{
		position: relative;
		margin: 12upx 0 0 0upx;
	}
	.mod-items{
		background: #F5F5F5;
		border-radius: 4upx;
		font-family: FZLTHJW--GB1-0;
		font-size: 20upx;
		color: #9B9B9B;
		letter-spacing: 0;
		line-height: 30upx;
		text-align: center;
		padding: 2upx 12upx;
		margin-right: 10upx;
	}
	.mbc-text{
		font-family: FZLTHJW--GB1-0;
		font-size: 24upx;
		color: #9B9B9B;
		letter-spacing: 0;
		line-height: 40upx;
		margin: 12upx 0 0 110upx;
	}
</style>
