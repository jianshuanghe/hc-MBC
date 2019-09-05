<template>
  <view class="investItems-content">
    <view class="II-content" @tap="goToItemsDetails(msgData.id)">
      <view class="II-top">
        <view class="left II-user-img">
          <view class="II-img">
            <image :src='msgData.compLogo || dImg'></image>
          </view>
        </view>
        <view class="left II-suer-insr">
          <view class="II-insr">
            <view class="user">
              {{msgData.compName}}
            </view>
            <view class="mbc">
				<view class="II-mod" >
				  <view class="mod-items left" v-for="(items,index) in msgData.fields" :key="index" v-if="index < 3">{{items}}</view>
				  <view class="clear"></view>
				</view>
            </view>
          </view>
        </view>
      </view>
      <view class="II-bot" v-if="msgData.inves.length > 0">
		  <div class="title left">
			 最近投资:
		  </div>
		  <view class="left mbc-text">
			<text class="items"  v-for="(items,index) in msgData.inves" :key="index"  v-if="index < 3">
				{{items}}
				<text class="dian" v-if="msgData.inves.length - 1 > index">、</text>
			</text>
		  </view>
		  <view class="clear"></view>
      </view>
    </view>
    <view class="line"></view>
  </view>
</template>

<script>
	export default {
	    data () {
			return {
				dImg: this.dImg
			};
	    },
		props: {
			msgData: {
				type: Object
			}
		},
	    methods: {
			goToItemsDetails (e){
				console.log('to投资机构详情页面');
				uni.setStorageSync('isListSource', 1); // 根据类型判断用户在提交委托之后返回的地址的来源
				uni.navigateTo({
					url: '/modules/pageHome/seekCapital/seekCapitalItems/investInstitution/investInstitutionItems/itemsDetails/itemsDetails?id=' + e
				});
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
		height: 140upx;
	}
	.II-top{
		position: relative;
		width: 100%;
		height: 86upx;
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
		margin: 0upx 0 0 0upx;
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
	.title{
		position: relative;
		width: 30%;
		text-align: right;
		font-family: PingFangSC-Regular;
		font-size: 24upx;
		color: #5D5D5D;
		line-height: 28upx;
		margin-top: 8upx;
	}
	.mbc-text{
		position: relative;
		width: 70%;
		font-family: FZLTHJW--GB1-0;
		font-size: 24upx;
		color: #5D5D5D;
		letter-spacing: 0;
		line-height: 28upx;
		margin-top: 8upx;
		overflow:hidden;
		text-overflow:ellipsis;
		display:-webkit-box;
		-webkit-box-orient:vertical;
		-webkit-line-clamp:2;
	}
</style>
