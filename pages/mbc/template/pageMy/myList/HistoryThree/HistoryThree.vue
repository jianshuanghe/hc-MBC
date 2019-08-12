<template>
	<view class="History3">
		<!-- 投资人 收藏 -->
		<historyThreeCollection></historyThreeCollection>
		<!-- 投资人 足迹 -->
		<historyThreeFootprint></historyThreeFootprint>
	</view>
</template>

<script>
	import historyThreeCollection from './HistoryThree-list/historyThree-Collection.vue'
	import historyThreeFootprint from './HistoryThree-list/historyThree-Footprint.vue'
	export default {
		data() {
			return {
	
			};
		},
		components: {
			historyThreeCollection,
			historyThreeFootprint
		},
		computed: {},
		created() {
			console.log('在组件中并不能使用页面生命周期函数');
		},
		mounted() {},
		methods: {}
	};
</script>

<style>
	.History3{
		width: 100%;
		height: 100%;
		background: #FFFFFF;
		display: flex;
	}
</style>
