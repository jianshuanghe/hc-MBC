<template>
	<view class="servicesItems-content-items">
		<view class="SICI-content" @tap="goToServiceDetails(msgData.serverId)">
			<view class="SICI-img">
				<image :src='msgData.img  || items1' v-if="msgData.serverId === 0"></image>
				<image :src='msgData.img  || items2' v-if="msgData.serverId === 1"></image>
				<image :src='msgData.img  || items3'  v-if="msgData.serverId === 2"></image>
			</view>
			<view class="SICI-title">{{msgData.name}}</view>
			<view class="SICI-inrc">{{msgData.serverContent}}</view>
			<view class="SICI-money">
				￥<text class="SICI-money-Y">{{msgData.monye}}</text>
				 <!-- <text class="SICI-money-X">¥1280</text> -->
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
	        return {
				items1: this.Static + 'mbcImg/home/lookServices/items1s2.png',
				items2: this.Static + 'mbcImg/home/lookServices/items1s.png',
				items3: this.Static + 'mbcImg/home/lookServices/items1.png',
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
			goToServiceDetails (e) {
				console.log(e, '去服务详情页面，bp打磨，速溶服务等');
				let url = '';
				if ( e === 0) {
					console.log('BP诊断');
					url = '/modules/pageHome/homeModules/lookServices/serviceDetails/BPD/serviceDetails?serverId=' + e;
				} else if (e === 1) {
					console.log('BP打磨');
					url = '/modules/pageHome/homeModules/lookServices/serviceDetails/Bp/serviceDetails?serverId=' + e;
				} else if (e === 2) {
					console.log('速溶服务');
					url = '/modules/pageHome/homeModules/lookServices/serviceDetails/quickMelt/serviceDetails?serverId=' + e;
				}
				uni.navigateTo({
					url: url
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
