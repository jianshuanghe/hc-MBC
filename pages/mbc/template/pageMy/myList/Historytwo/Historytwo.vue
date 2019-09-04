<template>
	<view class="History2">
		<!-- 创业者 收藏 -->
		<historytwoCollection></historytwoCollection>
		<!-- 创业者 看过我 -->
		<!-- <historytwoLook></historytwoLook> -->
		<historytwoseenme></historytwoseenme>
		<!-- 创业者 足迹 -->
		<historytwoFootprint></historytwoFootprint>
		<!-- 创业者 我的项目 -->
		<historytwoMy></historytwoMy>
	</view>
</template>

<script>
	import historytwoCollection from './Historytwo-list/historytwoCollection.vue'
	import historytwoFootprint from './Historytwo-list/historytwoFootprint.vue'
	import historytwoLook from './Historytwo-list/historytwoLookme.vue'
	import historytwoMy from './Historytwo-list/historytwoMy.vue'
	import historytwoseenme from './Historytwo-list/historytwoseenme.vue'
	export default {
		data() {
			return {
	
			};
		},
		components: {
			historytwoCollection,
			historytwoFootprint,
			// historytwoLook,
			historytwoMy,
			historytwoseenme
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
	.History2{
		width: 100%;
		height: 100%;
		background: #FFFFFF;
		/* display: flex; */
		float: left;
	}
</style>
