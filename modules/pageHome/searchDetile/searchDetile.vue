<template>
	<view class="searchDetile-content">
		<!-- 搜索框 -->
		<serchBox></serchBox>
		<!-- 搜索结果 -->
		<rearchResule></rearchResule>
		<!-- 搜索历史 -->
		<!-- 返回主页按钮 -->
		<goHome v-if='isShare === 1'></goHome>
	</view>
</template>

<script>
	import serchBox from "./searchModules/serch-Box.vue";
	import rearchResule from "./searchModules/search-Resule.vue";
	import goHome from '@/components/goHome/goHome.vue';
	export default {
		data() {
			return {
				isShare: 0, // 0代表没有分享, 1代表分享后需要展示返回主页，2代表.....
			};
		},
		components: {
			goHome,
			serchBox,
			rearchResule
		},
		computed: {
		},
		onLoad(option) {
			if (option.share) { // 赋值分享参数
				this.isShare = Number(option.share)
			}
		},
		// 分享
		onShareAppMessage(res) {
			if (res.from === 'button') {// 来自页面内分享按钮
			  console.log(res.target)
			}
			return {
			  title: '陌拜资本',
			  path: '/modules/pageHome/searchDetile/searchDetile?share=1',
			  // share参数代表分享，
					// share=1代表用户分享出去的是当前页，用户打开页面需要展示返回主页按钮；
					// share=2.....
			}
		},
		mounted() {
		},
		methods: {
		}
	};
</script>

<style>
	.searchDetile-content{
		min-height: 100vh;
	}
</style>
