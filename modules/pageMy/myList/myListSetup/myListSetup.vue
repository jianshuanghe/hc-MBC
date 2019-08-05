<template>
	<view class="myListSetup">
		<!-- 更换手机号 -->
		<SetupReplace></SetupReplace>
		<!-- 意见反馈 -->
		<SetupOpinion></SetupOpinion>
		<!-- 退出登录 -->
		<SetupSignout></SetupSignout>
	</view>
</template>

<script>
	import SetupReplace from './Setup/SetupReplace'
	import SetupOpinion from './Setup/SetupOpinion'
	import SetupSignout from './Setup/SetupSignout'
	export default {
		data() {
			return {
				
			};
		},
		components: {
			SetupReplace,
			SetupOpinion,
			SetupSignout
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
	.myListSetup{
		width: 100%;
		background: #FFFFFF;
	}
</style>
