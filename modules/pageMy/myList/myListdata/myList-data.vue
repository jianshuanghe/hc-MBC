<template>
	<view class="myList-data">
		<!-- 个人资料 -->
		<DataList></DataList>
	</view>
</template>

<script>
	import DataList from './dataList/DataList'
	export default {
		data() {
			return {
				right:this.Static + 'mbcImg/my/right.png',
				green:this.Static + 'mbcImg/my/green.png',
			};
		},
		// 分享
		onShareAppMessage(res) {
			  if (res.from === 'button') {// 来自页面内分享按钮
				console.log(res.target)
			  }
			  return this.titleOrPathApp
		},
		components: {
			DataList
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
	.myList-data{
		width: 100%;
		height: 100%;
	}
</style>
