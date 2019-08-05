<template>
	<view class="resule-modules-content">
		<!-- 总数居 -->
		<view class="resule-modules-num">项目(120)</view>
		<!-- 数据列表 -->
		<view class="resule-modules-list">
			<projectItems></projectItems>
		</view>
		<!-- 查看更多 -->
		<view class="resule-modules-more">查看更多</view>
	</view>
</template>

<script>
	import projectItems from "./project/items.vue";
	export default {
		data() {
			return {};
		},
		components: {
			projectItems
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
	.resule-modules-content{
		position: relative;
		width: 100%;
		background: #fff;
		margin-bottom: 20upx;
	}
	.resule-modules-num{
		position: relative;
		width: 690upx;
		margin-top: 26upx;
		background: #fff;
		margin: auto;
		text-align: left;
		font-family: PingFang-SC-Medium;
		font-size: 24upx;
		color: #5D5D5D;
		line-height: 24upx;
		padding-top: 28upx;
	}
	.resule-modules-more{
		font-family: PingFangSC-Regular;
		font-size: 26upx;
		text-align: center;
		color: #02C2A2;
		line-height: 70upx;
	}
</style>
