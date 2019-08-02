<template>
	<!-- 搜索框 -->
	<serchBox></serchBox>
	<!-- 搜索结果 -->
	<!-- 搜索历史 -->
</template>

<script>
	import serchBox from "./searchModules/serch-Box.vue";
	export default {
		data() {
			return {};
		},
		components: {
			serchBox
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
