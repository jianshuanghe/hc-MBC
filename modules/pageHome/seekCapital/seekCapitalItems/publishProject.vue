<template>
	<div class="publishProject-content"  @tap="goToPutIn(5)">
		<div class="publishProject">
			发布项目
		</div>
	</div>
</template>

<script>
	import { mapMutations } from 'vuex';
	export default {
	    data () {
			return {
				clickItems: 1, // 用户初次进来默认用户为首页
			};
	    },
	    methods: {
			...mapMutations({
				setHome: 'setHome'
			}),
			goToPutIn (e) {
				console.log(e, '点击触发发布项目');
				this.clickItems = e;
				this.$store.commit('setHome', this.clickItems);
				uni.setStorageSync('clickItems', e);
				uni.reLaunch({
					url: '/pages/mbc/home'
				});
			}
	    }
	};
</script>

<style>
	.publishProject-content{
		position: fixed;
		z-index: 100;
		width: 750upx;
		bottom: 0;
		background: #FFFFFF;
		height: 120upx;
		padding: 16upx 30upx;
	}
	.publishProject{
		font-family: PingFangSC-Regular;
		font-size: 28upx;
		line-height: 88upx;
		color: #FFFFFF;
		letter-spacing: 0;
		text-align: center;
		background: #02C2A2;
		border-radius: 2upx;
	}
</style>
