<template>
	<view class="myHistory">
		<!-- 未认证 -->
		<!-- <Historyone></Historyone> -->
		<!-- 创业者 -->
		<Historytwo></Historytwo>
		<!-- 投资人 -->
		<!-- <HistoryThree></HistoryThree> -->
	</view>
</template>

<script>
	import Historyone from './Historyone/Historyone.vue'
	import Historytwo from './Historytwo/Historytwo.vue'
	import HistoryThree from './HistoryThree/HistoryThree.vue'
	export default {
		data() {
			return {
	
			};
		},
		components: {
			// Historyone
			Historytwo
			// HistoryThree
			
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
	.myHistory{
		width: 100%;
		height: 144upx;
		background: #FFFFFF;
	}
	
	
</style>
