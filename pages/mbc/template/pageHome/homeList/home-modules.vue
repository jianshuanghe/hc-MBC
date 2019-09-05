<template>
	<div class="homeModules">
		<div class="Hm-conetnt">
			<div class="left hm-items">
				<div class="hm-item" @tap='goToLookServices'>
					<div class="hm-img-itms">
						<image :src='modules3'></image>
					</div>
					<view class="hm-item-text">找服务</view>
				</div>
			</div>
			<div class="left hm-items">
				<div class="hm-item" @tap='goToLookProject'>
					<div class="hm-img-itms">
						<image :src='modules4'></image>
					</div>
					<view class="hm-item-text">找项目</view>
				</div>
			</div>
			<div class="left hm-items">
				<div class="hm-item" @tap='goToMeltTt(2)'>
					<div class="hm-img-itms">
						<image :src='modules2'></image>
					</div>
					<view class="hm-item-text">融头条</view>
				</div>
			</div>
			<div class="left hm-items">
				<div class="hm-item" @tap='goToActivity(2)'>
					<div class="hm-img-itms">
						<image :src='modules1'></image>
					</div>
					<view class="hm-item-text">活动</view>
				</div>
			</div>
			<div class="clear"></div>
		</div>
	</div>
</template>

<script>
	export default {
	    data () {
			return {
				modules1: this.Static + 'mbcImg/home/modules1.png',
				modules2: this.Static + 'mbcImg/home/modules2.png',
				modules3: this.Static + 'mbcImg/home/modules3.png',
				modules4: this.Static + 'mbcImg/home/modules4.png'
			};
	    },
	    methods: {
			goToLookServices () {
				console.log('to找服务');
				uni.navigateTo({
					url: '/modules/pageHome/homeModules/lookServices/lookServices'
				});
			},
			goToLookProject () {
				console.log('to找项目');
				uni.navigateTo({
					url: '/modules/pageHome/homeModules/lookProject/lookProject'
				});
			},
			goToMeltTt (e) {
				console.log('to融头条');
				console.log(e, '点击触发发现');
				this.clickItems = e;
				this.$store.commit('setHome', this.clickItems);
				this.$store.commit('setFindTabItems', 1); // 更新setFindTabItems
				uni.setStorageSync('clickItems', e);
			},
			goToActivity (e) {
				console.log('to活动');
				console.log(e, '点击触发发现');
				this.clickItems = e;
				this.$store.commit('setHome', this.clickItems);
				this.$store.commit('setFindTabItems', 2); // 更新setFindTabItems
				uni.setStorageSync('clickItems', e);
			}
	    }
	};
</script>

<style>
	.homeModules{
		position: relative;
		width: 750upx;
		padding: 14upx 30upx;
		background: #fff;
	}
	.Hm-conetnt{
		position: relative;
		width: 700upx;
	}
	.hm-items{
		position: relative;
		width: 175upx;
	}
	.hm-img-itms{
		position: relative;
		width: 100%;
		text-align: center;
	}
	.hm-img-itms>image{
		position: relative;
		width: 38upx;
		height: 36.2upx;
		margin: auto;
		top: 12upx;
	}
	.hm-item-text{
		font-family: PingFangSC-Regular;
		font-size: 24upx;
		color: #2E2E30;
		letter-spacing: 0.28upx;
		text-align: center;
		line-height: 34upx;
		margin-bottom: 8upx;
	}
</style>
