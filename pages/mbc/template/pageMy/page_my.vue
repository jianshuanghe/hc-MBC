<template>
	<view class="myContent">
		<!-- 名字 头像 -->
		<myInformation></myInformation>
		<!-- 收藏 足迹 -->
		<myHistory></myHistory>
		<!-- 我的认证 -->
		<myAuthentication></myAuthentication>
		<!-- 关于陌拜资本 -->
		<myabout></myabout>
		<!-- 设置 -->
		<mySetup></mySetup>
	</view>
</template>
<script>
	import myInformation from './myList/myInformation.vue'
	import myHistory from './myList/myHistory.vue'
	import myAuthentication from './myList/myAuthentication.vue'
	import myabout from './myList/myabout.vue'
	import mySetup from './myList/mySetup.vue'
	export default {
		data() {
			return {

			};
		},
		components: {
			myInformation,
			myHistory,
			myAuthentication,
			myabout,
			mySetup
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
	.item {
		font-size: 28upx;
		line-height: 60upx;
		height: 60upx;
		border-bottom: 2upx solid #f1f1f1;
		padding-left: 30upx;
		padding-right: 30upx;
		color: #888;
		text-align: left;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.des {
		text-align: center;
		padding: 30upx;
		margin-top: 100upx;
		font-size: 30upx;
		color: #888888;
	}

	button {
		width: 330upx;
		float: left;
		margin-left: 30upx;
		margin-top: 30upx;
		padding: 10upx 20upx;
		font-size: 32upx;
	}
</style>
