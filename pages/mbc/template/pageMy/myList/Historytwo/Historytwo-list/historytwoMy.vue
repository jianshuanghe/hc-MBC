<template>
	<view class="history2My" @tap="gotomyproject">
		<span>146</span>
		<span>鎴戠殑椤圭洰</span>
	</view>
</template>

<script>
	export default {
		data() {
			return {
			};
		},
		computed: {
		},
		created() {
			
		},
		methods: {
			gotomyproject(e) {   
				console.log(e+'去往我的项目')
			    uni.navigateTo({
			        url: '/modules/pageMy/myList/myLisprojectt/myproject',
			    });
			}
		}
	};
</script>

<style>
	.history2My{
		width: 187upx;
		height: 100%;
		text-align: center;
		float: left;
	}
	.history2My span:nth-of-type(1){
		font-size: 36upx;
		color: #2E2E30;
		font-weight: 700;
		padding-top: 2.5%;
		display: block;
	}.history2My span:nth-of-type(2){
		font-size: 26upx;
			color: #2E2E30;
			display: block;
	}
</style>
