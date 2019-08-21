<template>
	<view class="seekCapital-content">
		<!-- 筛选 -->
		<multipleScreen></multipleScreen>
		<!-- list -->
		<lookProjectList></lookProjectList>
	</view>
</template>

<script>
	import lookProjectList from "./seekCapitalItems/lookProjectList.vue";
	import multipleScreen from "./seekCapitalItems/multipleScreen/multipleScreen.vue";
	export default {
		data() {
			return {};
		},
		
		components: {
			lookProjectList,
			multipleScreen
		},
		computed: {
		},
		watch: {
		},
		computed: {
		},
		created() {
			console.log('在组件中并不能使用页面生命周期函数');
		},
		mounted() {
		},
		methods: {
		},
	}
</script>

<style>
</style>
