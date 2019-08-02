<template>
	<view class="financeItems-content"  @tap="goToFinanceDetail">
		<view class="FI-content">
			<view class="FI-top">
				<view class="left FI-t-left">
					<image :src="fiImg"></image>
				</view>
				<view class="left FI-t-cont">
					<view class="FI-t-title">
						<text class="title">如何秀</text>
						<text class="inst">营销平台</text>
					</view>
					<view class="FI-t-ins">移动智能说明书平台</view>
				</view>
				<view class="right FI-t-right">
					<view class="FI-t-money">
						￥<text class="money">500</text>万
					</view>
					<view class="FI-t-ins2">融资轮次：A轮</view>
				</view>
				<view class="clear"></view>
			</view>
			<view class="FI-modules">
				<text class="modules-items-FI left">顺为资本完成天使轮融资2000万</text>
			</view>
			<view class="FI-insCd">
				<view class="FI-C-text">我需要寻找投资相关的服务我需要寻找投资相我需要寻找投资相关的服务我需要寻找投资相我需要寻找资…</view>
			</view>
			<view class="FI-cont">
				<image :src="fiImg"></image>
			</view>
			<view class="FI-bot">
				<view class="FI-address left">
					<view class="icon-img left">
						<image :src="address"></image>
					</view>
					<view class="icon-text left">
						<p class="">北京</p>
					</view>
					<view class="clear"></view>
				</view>
				<view class="FI-data left">
					<view class="left lists">
						<view class="list-item">
							<view class="icon-img left">
								<image :src="find"></image>
							</view>
							<view class="icon-text left">
								<p class="">268</p>
							</view>
							<view class="clear"></view>
						</view>
					</view>
					<view class="left lists">
						<view class="list-item">
							<view class="icon-img left">
								<image :src="doc"></image>
							</view>
							<view class="icon-text left">
								<p class="">268</p>
							</view>
							<view class="clear"></view>
						</view>
					</view>
					<view class="left lists">
						<view class="list-item">
							<view class="icon-img left">
								<image :src="like"></image>
							</view>
							<view class="icon-text left">
								<p class="">268</p>
							</view>
							<view class="clear"></view>
						</view>
					</view>
					<view class="left lists">
						<view class="list-item">
							<view class="icon-img left">
								<image :src="love"></image>
							</view>
							<view class="icon-text left">
								<p class="">268</p>
							</view>
							<view class="clear"></view>
						</view>
					</view>
				</view>
				<view class="clear"></view>
			</view>
		</view>
		<view class="line"></view>
	</view>
</template>

<script>
	import address from '@/static/mbcImg/home/address.png';
	import finded from '@/static/mbcImg/home/finded.png';
	import find from '@/static/mbcImg/home/find.png';
	import doc from '@/static/mbcImg/home/doc.png';
	import doced from '@/static/mbcImg/home/doced.png';
	import like from '@/static/mbcImg/home/like.png';
	import liked from '@/static/mbcImg/home/liked.png';
	import love from '@/static/mbcImg/home/love.png';
	import loved from '@/static/mbcImg/home/loved.png';
	import fiImg from '@/static/mbcImg/home/banner1.png';
	export default {
	    data () {
			return {
				fiImg: fiImg,
				address: address, // 地址
				find: find, // 查看
				doc: doc, // 留言
				like: like, // 喜欢
				love: love // 收藏
			};
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
	.financeItems-content{
		position: relative;
		width: 690upx;
		margin-top: 26upx;
		background: #fff;
	}
	.FI-content{
		position: relative;
		width: 100%;
	}
	.FI-top{
		position: relative;
		width: 100%;
	}
	.FI-t-left{
		position: relative;
		width: 80upx;
		height: 80upx;
		margin-right: 10upx;
	}
	.FI-t-left>image{
		position: relative;
		width: 80upx;
		height: 80upx;
	}
	.FI-t-cont{
		position: relative;
		width: 400upx;
	}
	.FI-t-title{
		position: relative;
		width: 100%;
	}
	.title{
		font-family: PingFangSC-Medium;
		font-size: 32upx;
		color: #2E2E30;
		letter-spacing: 0;
		line-height: 32upx;
	}
	.inst{
		background: #DDFFF9;
		border-radius: 2upx;
		font-family: PingFangSC-Regular;
		font-size: 24upx;
		color: #00AF92;
		letter-spacing: 0;
		line-height: 24upx;
		padding: 4upx 8upx;
		margin-left: 6upx;
	}
	.FI-t-ins{
		font-family: PingFangSC-Regular;
		font-size: 24upx;
		color: #9B9B9B;
		line-height: 24upx;
	}
	.FI-t-right{
		position: relative;
	}
	.FI-t-money{
		position: relative;
		font-family: PingFangSC-Semibold;
		font-size: 24upx;
		color: #FAB100;
		line-height: 24upx;
		text-align: right;
	}
	.money{
		font-family: PingFangSC-Semibold;
		font-size: 40upx;
		color: #FAB100;
		line-height: 36upx;
	}
	.FI-t-ins2{
		font-family: PingFangSC-Regular;
		font-size: 24upx;
		color: #9B9B9B;
		line-height: 48upx;
	}
	.FI-cont{
		position: relative;
		width: 100%;
	}
	.FI-cont>image{
		position: relative;
		width: 100%;
		height: 340upx;
	}
	.FI-modules{
		position: relative;
		width: 100%;
		margin: 20upx 0 20upx 0;
		height: 32upx;
	}
	.modules-items-FI{
		background: #FFF7E5;
		border-radius: 4upx;
		font-family: PingFangSC-Regular;
		font-size: 24upx;
		color: #FE9D08;
		letter-spacing: 0;
		line-height: 24upx;
		padding: 4upx 8upx;
	}
	.FI-insCd{
		position: relative;
		width: 100%;
		margin: 20upx 0 20upx 0;
		height: 72upx;
	}
	.FI-C-text{
		font-family: PingFangSC-Regular;
		font-size: 24upx;
		color: #5D5D5D;
		line-height: 16px;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
		overflow: hidden;
	}
	.FI-bot{
		position: relative;
		width: 100%;
		margin-bottom: 30upx;
		margin-top: 4upx;
	}
	.FI-address{
		position: relative;
		width: 150upx;
	}
	.FI-address .icon-img{
		position: relative;
		width: 30%;
	}
	.FI-address .icon-img>image{
		position: relative;
		width: 30upx;
		height: 36upx;
		text-align: left;
		float: left;
	}
	.FI-address .icon-text>p{
		position: relative;
		font-family: PingFangSC-Regular;
		font-size: 22upx;
		color: #2E2E30;
		text-align: left;
		line-height: 40upx;
	}
	.FI-data{
		position: relative;
		width: 540upx;
	}
	.lists{
		position: relative;
		width: 135upx;
	  }
	.list-item{
		position: relative;
		width: 100%;
	}
	.icon-img{
		position: relative;
		width: 60%;
	}
	.icon-img>image{
		position: relative;
		width: 36upx;
		height: 36upx;
		float: right;
	}
	.icon-text{
		position: relative;
		width: 40%;
	}
	.icon-text>p{
		position: relative;
		width: 100%;
		font-size: 22upx;
		color: #9B9B9B;
		line-height: 40upx;
		text-align: right;
	}
</style>
