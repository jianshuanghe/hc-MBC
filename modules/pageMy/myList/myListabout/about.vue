<template>
	<view class="about">
		<!-- 关于陌拜资本 -->
		<aboutdata></aboutdata>
		<!-- 我们关注的领域 -->
		<aboutField></aboutField>
		<!-- 我们的服务 -->
		<aboutService></aboutService>
		<!-- 网址 时间 热线 -->
		<aboutOfficial></aboutOfficial>
		<!-- 返回主页按钮 -->
		<goHome v-if='isShare === 1'></goHome>
	</view>
</template>

<script>
	import goHome from '@/components/goHome/goHome.vue';
	import aboutdata from './aboutList/aboutdata'
	import aboutField from './aboutList/aboutField'
	import aboutService from './aboutList/aboutService'
	import aboutOfficial from './aboutList/aboutOfficial'
	export default {
		data() {
			return {
				isShare: 0, // 0代表没有分享, 1代表分享后需要展示返回主页，2代表.....
			};
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
				  title: '关于陌拜资本',
				  path: '/modules/pageMy/myList/myListabout/about?share=1'
			  }
		},
		components: {
			goHome,
			aboutdata,
			aboutField,
			aboutService,
			aboutOfficial
		},
		computed: {
		},
		created() {
			console.log('在组件中并不能使用页面生命周期函数');
		},
		mounted() {
		},
		methods: {
		}
	};
</script>

<style>
	.about{
		width: 100%;
		/* height: 100%; */
		background: #FFFFFF;
	}
</style>
