<template>
	<view class="footprint">
		<!-- 本月查看几个项目 -->
		<!-- <footprintNumber></footprintNumber> -->
		<!-- 看过的项目 -->
		<footprintworks></footprintworks>
	</view>
</template>

<script>
	import footprintNumber from './footprintList/footprint-Number'
	import footprintworks from './footprintList/footprint-works'
	export default {
		data() {
			return {

			};
		},
        onLoad(option) {
        	this.shareToHome(option); // 转发页打开规则函数
        },
		// 分享
		onShareAppMessage(res) {
			  if (res.from === 'button') {// 来自页面内分享按钮
				console.log(res.target)
			  }
			  return this.titleOrPathApp
		},
		components: {
			footprintNumber,
			footprintworks
		},

		created() {

		},
		mounted() {},
		methods: {

		}
	};
</script>

<style>
	.footprint{
		width: 100%;
		min-height: 100%;
		background: #FFFFFF;
	}
</style>
