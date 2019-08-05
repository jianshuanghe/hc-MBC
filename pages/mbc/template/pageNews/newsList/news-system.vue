<template>
	<view class="news-system" @tap="goToMessageList">
		<view class="system-img">
			<image :src='xiaoxo'></image>
		</view>
		<view class="system-notice">
			<view>系统通知<span>12:08</span></view>
			<view>这里是聊天内容，请悉知～最多展示20个字…<view>8</view></view>
		</view>
	</view>
</template>

<script>
	import xiaoxo from '@/static/mbcImg/news/xiaoxo.png';
	export default {
		data () {
			return {
				xiaoxo: xiaoxo,
			};
		},
		methods:{
			goToMessageList(e) {   
                uni.navigateTo({
                    url: '/modules/pageNews/newsList/newsList',
                });
            }
		}
		
	}
</script>

<style>
		.news-system{
		width: 100%;
		height: 150upx;
		background: #FFFFFF;
		display: flex;
	}
	.newsContent{
		width: 100%;
		height: 100%;
	}
	.system-img{
		width: 90upx;
		height: 90upx;
		padding-top: 30upx;
		padding-left: 30upx;
	}
	.system-img image{
		width: 100%;
		height: 100%;
	}
	.system-notice{
		width: 80%;
		height: 90upx;
		padding-top: 30upx;
		padding-left: 30upx;
		position: relative;
	}
	.system-notice view:nth-of-type(1){
		font-size: 32upx;
		color: #2E2E30;
		font-weight: 700;
	}
	.system-notice view:nth-of-type(1) span{
		font-size: 24upx;
		color: #BDBDBD;
		position: absolute;
		right: 24upx;
	}
	.system-notice view:nth-of-type(2){
		font-size: 24upx;
		color: #BDBDBD;
	}.system-notice view:nth-of-type(2) view{
		width: 36upx;
		height: 36upx;
		background: #FF3A2E;
		font-size: 26upx;
		color: #FFFFFF;
		position: absolute;
		right: 24upx;
		top: 82upx;
		border-radius: 50%;
		text-align: center;
		line-height: 36upx;
	}
</style>
