<template>
	<view class="myproject">
		<!-- 项目列表 -->
		<project></project>
		<!-- 更多融资服务 -->
		<services></services>
	</view>
</template>

<script>
	import project from './projectList/projectList'
	import services from './projectList/projectList-services'
	export default {
		data() {
			return {
				
			};
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
		}
	};
</script>

<style>
	.myproject{
		width: 100%;
		min-height: 100%;
	}
</style>
