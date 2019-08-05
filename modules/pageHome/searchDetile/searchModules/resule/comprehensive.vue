<template>
	<view class="comprehensive-content">
		<!-- 项目 -->
		<project></project>
		<!-- 投资人 -->
		<investor></investor>
		<!-- 投资机构 -->
		<investment></investment>
		<!-- 资讯 -->
		<information></information>
	</view>
</template>

<script>
	import project from "./project.vue";
	import investor from "./investor.vue";
	import investment from "./investment.vue";
	import information from "./information.vue";
	export default {
		data() {
			return {};
		},
		components: {
			project,
			investor,
			investment,
			information
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
</style>
