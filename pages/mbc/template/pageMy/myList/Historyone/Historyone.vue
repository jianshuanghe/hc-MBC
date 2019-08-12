<template>
	<view class="History1">
		<!-- 收藏 -->
		<historyCollection></historyCollection>
		<!-- 足迹 -->
		<historyFootprint></historyFootprint>
	</view>
</template>

<script>
	import historyCollection from './Historyone-list/historyCollection.vue'
	import historyFootprint from './Historyone-list/historyFootprint.vue'
	export default {
		data() {
			return {
	
			};
		},
		components: {
			historyCollection,
			historyFootprint
		},
		computed: {},
		created() {
			console.log('在组件中并不能使用页面生命周期函数');
		},
		mounted() {},
		methods: {
		}
	};
</script>

<style>
	.History1{
		width: 100%;
		height: 100%;
		background: #FFFFFF;
		display: flex;	
	}
</style>
