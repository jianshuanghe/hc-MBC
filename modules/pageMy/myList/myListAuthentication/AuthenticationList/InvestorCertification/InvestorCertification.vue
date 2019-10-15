<template>
	<view class="InvestorCertification">
		<information></information>
	</view>
</template>

<script>
	import information from './InvestorList/InvestorList-information'
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
			information
		},
		computed: {},
		created() {},
		mounted() {},
		methods: {
			
		}
	};
</script>

<style>
	.InvestorCertification{
		width: 100%;
		min-height: 100%;
	}
</style>
