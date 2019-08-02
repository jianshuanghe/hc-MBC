<template>
	<view class="Contacts">
		<view class="Contacts-peo">
			联系人（3人未读）
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {};
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
	.Contacts {
		width: 100%;
		height: 88upx;
		background: #FFFFFF;
		border-bottom: 1upx solid #F5F5F5;
	}
	.Contacts-peo {
		width: 720upx;
		height: 100%;
		margin-left: 30upx;
		font-size: 26upx;
		color: #2E2E30;
		line-height: 88upx;
	}
</style>
