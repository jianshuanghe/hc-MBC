<template>
	<view class="SetupSignout">
		<view @tap="Signout">退出登录</view>
	</view>
</template>

<script>
	import { mapMutations, mapGetters } from 'vuex';
	export default {
		data() {
			return {
				
			};
		},
		components: {
			
		},
		computed: {},
		created() {},
		mounted() {},
		methods: {
			...mapMutations({
				setHome: 'setHome',
				setLandRegist: 'setLandRegist'
			}),
			Signout(){
				uni.removeStorageSync('landRegist');
				uni.removeStorageSync('clickItems');
				this.$store.commit('setHome', 1);
				this.$store.commit('setLandRegist', 0);
				uni.redirectTo({
					url: '/pages/mbc/home'
				});
			}
		}
	};
</script>

<style>
	.SetupSignout{
		width: 100%;
		height: 120upx;
		background: #FFFFFF;
		position: absolute;
		margin-top: 20upx;
		/* padding-top: 40upx; */
	}
	.SetupSignout view:nth-of-type(1){
		width: 100%;
		height: 100%;
		font-size: 32upx;
		color: #FF4D6A;
		text-align: center;
		line-height: 120upx;
	}
</style>
