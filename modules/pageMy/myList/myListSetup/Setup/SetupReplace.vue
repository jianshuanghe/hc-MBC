<template>
	<view class="SetupReplace" @tap="gotoReplace">
		<view>
			更换手机号
			<image :src="right"></image>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				right:this.Static + 'mbcImg/my/right.png',
			};
		},
		computed: {
		},
		created() {
			console.log('在组件中并不能使用页面生命周期函数');
		},
		mounted() {
		},
		methods: {
			gotoReplace(){
				console.log('去往更换手机号')
				uni.navigateTo({
					url:'/modules/pageMy/myList/myListSetup/Setup/SetupReplace/SetupReplace'
				})
			}
		}
	};
</script>

<style>
	.SetupReplace{
		width: 100%;
		height: 120upx;
		background: #FFFFFF;
	}
	.SetupReplace view:nth-of-type(1){
		width: 90%;
		height: 100%;
		margin: 0 auto;
		border-bottom: 2upx solid #F5F5F5;
		font-size: 28upx;
		/* font-weight: bold; */
		color: #2E2E30;
		line-height: 120upx;
		position: relative;
	}
	.SetupReplace view:nth-of-type(1) image{
		width: 18upx;
		height: 18upx;
		/* padding-left: 542upx; */
		position: absolute;
		right: 0upx;
		top: 52upx;
	}
</style>
