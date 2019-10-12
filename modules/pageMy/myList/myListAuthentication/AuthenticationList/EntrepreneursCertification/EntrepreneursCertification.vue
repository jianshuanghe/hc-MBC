<template>
	<view class="EntrepreneursCertification">
		<!-- 提交信息 -->
		<information></information>
	</view>
</template>

<script>
	import information from './EntrepreneursList/EntrepreneursList-information'
	export default {
		data() {
			return {
				
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
	.EntrepreneursCertification{
		width: 100%;
		min-height:100% ;
		/* background: #FFFFFF; */
	}
</style>
