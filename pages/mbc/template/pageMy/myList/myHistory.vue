<template>
	<view class="myHistory">
		<!-- 未认证 -->
		<Historyone v-if="this.Mylist.userType==0"></Historyone>
		<!-- 创业者 -->
		<Historytwo v-if="this.Mylist.userType==-1"></Historytwo>
		<!-- 投资人 -->
		<HistoryThree v-if="this.Mylist.userType==1"></HistoryThree>
	</view>
</template>

<script>
	import Historyone from './Historyone/Historyone.vue'
	import Historytwo from './Historytwo/Historytwo.vue'
	import HistoryThree from './HistoryThree/HistoryThree.vue'
	export default {
		props:['Mylist'],
		data() {
			return {
	
			};
		},
		components: {
			Historyone,
			Historytwo,
			HistoryThree
			
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
