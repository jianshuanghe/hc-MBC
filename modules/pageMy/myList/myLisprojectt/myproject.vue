<template>
	<view class="myproject">
		<!-- 项目列表 -->
		<project></project>
		<!-- 更多融资服务 -->
		<services></services>
		<!-- 发布项目 -->
		<view class="fabuxiangmu"  @tap="goToPutIn(5)">
			<image :src="black"></image>
		</view>
	</view>
</template>

<script>
	import project from './projectList/projectList'
	import services from './projectList/projectList-services'
	export default {
		data() {
			return {
				black: this.Static + 'mbcImg/my/black.png',
			};
		},
		// 分享
		onShareAppMessage(res) {
			  if (res.from === 'button') {// 来自页面内分享按钮
				console.log(res.target)
			  }
			  return this.titleOrPathApp
		},
		components: {
			project,
			services
		},
		computed: {
		},
		created() {
			
		},
		mounted() {
		},
		methods: {
			goToPutIn(e) {
				console.log(e, '点击触发发布项目');
				this.clickItems = e;
				this.$store.commit('setHome', this.clickItems);
				uni.setStorageSync('clickItems', e);
				uni.navigateBack({
					delta: 2,
					animationType: 'pop-out',
					animationDuration: 200
				});
			}
		}
	};
</script>

<style>
	.myproject{
		width: 100%;
		min-height: 100%;
	}
	.fabuxiangmu{
		width: 90upx;
		height: 90upx;
		border-radius: 50%;
		position: fixed;
		bottom: 40upx;
		right: 40upx;
	}
	.fabuxiangmu>image{
		width: 100%;
		height: 100%;
	}
</style>
