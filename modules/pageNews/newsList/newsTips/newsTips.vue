<template>
	<view class="Message">
		<view class="Message-Tips">
			<view>身份认证<span>12:08</span></view>
			<view>恭喜您创业者身份认证成功，接下来可以上传BP，更新项目信息等。</view>
		</view><view class="Message-Tips">
			<view>身份认证<span>12:08</span></view>
			<view>恭喜您创业者身份认证成功，接下来可以上传BP，更新项目信息等。</view>
		</view><view class="Message-Tips">
			<view>身份认证<span>12:08</span></view>
			<view>恭喜您创业者身份认证成功，接下来可以上传BP，更新项目信息等。</view>
		</view><view class="Message-Tips">
			<view>身份认证<span>12:08</span></view>
			<view>恭喜您创业者身份认证成功，接下来可以上传BP，更新项目信息等。</view>
		</view>
	</view>
</template>

<script>
	import { mapMutations, mapGetters } from 'vuex';
	export default {
		data () {
			return {
				
			};
		},
		methods:{
			
		}
		
	}
</script>

<style>
	.Message{
		width: 100%;
		height: 100%;
		background: #FFFFFF;
	}
	.Message-Tips{
		width: 100%;
		height: 208upx;
		border-bottom: 2upx solid  #F5F5F5;
		position: relative;
	}
	.Message-Tips view:nth-of-type(1){
		font-size: 30upx;
		color: #2E2E30;
		font-weight:700 ;
		padding-top: 40upx;
		padding-left: 30upx;
	}
	.Message-Tips view:nth-of-type(1) span{
		font-size: 24upx;
		color: #BDBDBD;
		position: absolute;
		right: 30upx;
		font-weight: 0;
	}
	.Message-Tips view:nth-of-type(2){
		width: 690upx;
		font-size: 26upx;
		color: #9B9B9B;
		padding-top: 10upx;
		padding-left: 30upx;
	}
</style>
