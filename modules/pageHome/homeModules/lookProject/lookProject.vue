<template>
	<view class="seekCapital-content">
		<!-- 筛选 -->
		<multipleScreen></multipleScreen>
		<!-- list -->
		<lookProjectList></lookProjectList>
		<!-- 返回主页按钮 -->
		<goHome v-if='isShare === 1'></goHome>
	</view>
</template>

<script>
	import goHome from '@/components/goHome/goHome.vue';
	import lookProjectList from "./seekCapitalItems/lookProjectList.vue";
	import multipleScreen from "./seekCapitalItems/multipleScreen/multipleScreen.vue";
	export default {
		data() {
			return {
				isShare: 0, // 0代表没有分享, 1代表分享后需要展示返回主页，2代表.....
			};
		},
		
		components: {
			goHome,
			lookProjectList,
			multipleScreen
		},
		computed: {
		},
		watch: {
		},
		computed: {
		},
		onLoad(option) {
			if (option.share) { // 赋值分享参数
				this.isShare = Number(option.share);
				if (this.isShare === 1) {
					uni.setStorageSync('clickItems', 1);
					this.$store.commit('setHome',1);
				}
			}
		},
		// 分享
		onShareAppMessage(res) {
			if (res.from === 'button') {// 来自页面内分享按钮
			  console.log(res.target)
			}
			return {
			  title: '找项目',
			  path: '/modules/pageHome/homeModules/lookProject/lookProject?share=1',
			  // share参数代表分享，
					// share=1代表用户分享出去的是当前页，用户打开页面需要展示返回主页按钮；
					// share=2.....
			}
		},
		mounted() {
		},
		methods: {
		},
	}
</script>

<style>
</style>
