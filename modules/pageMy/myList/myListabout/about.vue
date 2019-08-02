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
	</view>
</template>

<script>
	import aboutdata from './aboutList/aboutdata'
	import aboutField from './aboutList/aboutField'
	import aboutService from './aboutList/aboutService'
	import aboutOfficial from './aboutList/aboutOfficial'
	export default {
		data() {
			return {
				
			};
		},
		components: {
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
