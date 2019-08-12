<template>
	<view class="servicesItems-content-items">
		<view class="SICI-content" @tap="goToServiceDetails()">
			<view class="SICI-img">
				<image :src='msgData.img  || banner4'></image>
			</view>
			<view class="SICI-title">{{msgData.name}}</view>
			<view class="SICI-inrc">{{msgData.serverContent}}</view>
			<view class="SICI-money">
				￥<text class="SICI-money-Y">{{msgData.monye}}</text>
				 <text class="SICI-money-X">¥1280</text>
			</view>
		</view>
	</view>
</template>

<script>
	import banner4 from '@/static/mbcImg/home/banner1.png';
	export default {
		data() {
	        return {
				banner4: banner4
	        }
	    },
		props: {
			msgData: {
				type: Object
			}
		},
		created() {
			console.log(this.msgData, '子组件获取的数据');
		},
	    methods: {
	        change(e) {
	            this.current = e.detail.current;
	        },
			goToServiceDetails () {
				console.log('去服务详情页面，bp打磨，速溶服务等');
				 uni.navigateTo({
					url: '/modules/pageHome/homeModules/lookServices/serviceDetails/serviceDetails'
				});
			}
	    }
	}
</script>

<style>
	.servicesItems-content-items{
		position: relative;
		width: 100%;
		padding: 30upx 0;
	}
	.SICI-content{
		position: relative;
		width: 690upx;
	}
	.SICI-img{
		position: relative;
		width: 100%;
	}
	.SICI-img>image{
		position: relative;
		width: 690upx;
		height: 340upx;
		border-radius: 14upx;
	}
	.SICI-title{
		position: relative;
		font-family: PingFangSC-Medium;
		font-size: 40upx;
		color: #2E2E30;
		line-height: 72upx;
	}
	.SICI-inrc{
		font-family: PingFangSC-Regular;
		font-size: 26upx;
		color: #9B9B9B;
		line-height: 36upx;
		margin-bottom: 16upx;
	}
	.SICI-money{
		font-family: DINPro-Medium;
		font-size: 28upx;
		color: #FAB100;
		letter-spacing: 0;
		line-height: 24upx;
	}
	.SICI-money-Y{
		font-family: DINPro-Medium;
		font-size: 40upx;
		color: #FAB100;
		letter-spacing: 0;
		line-height: 24upx;
	}
	.SICI-money-X{
		font-family: PingFang-SC-Medium;
		font-size: 24upx;
		color: #9B9B9B;
		line-height: 24upx;
		margin-left: 12upx;
		text-decoration:line-through
	}
		
		
		
</style>
