<template>
	<view class="myList-data">
		<!-- 头像 -->
		<dataHeadportrait></dataHeadportrait>
		<!-- 名字 -->
		<dataname></dataname>
		<!-- 手机号 -->
		<dataNumber></dataNumber>
		<!-- 邮箱 -->
		<dataMailbox></dataMailbox>
	</view>
</template>

<script>
	import right from '@/static/mbcImg/my/right.png'
	import green from '@/static/mbcImg/my/green.png'
	import dataHeadportrait from './dataList/dataHeadportrait'
	import dataname from './dataList/dataname'
	import dataNumber from './dataList/dataNumber'
	import dataMailbox from './dataList/dataMailbox'
	export default {
		data() {
			return {
				right:right,
				green:green
			};
		},
		components: {
			dataHeadportrait,
			dataname,
			dataNumber,
			dataMailbox
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
