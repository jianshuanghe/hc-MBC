<template>
	<view class="InvestmentList-Uncertified">
		<view><image :src="tou"></image></view>
	</view>
</template>

<script>
	import tou from '@/static/mbcImg/my/tou.png'
	export default {
		data() {
			return {
				tou:tou
			};
		},
		components: {
			
		},
		computed: {},
		created() {},
		mounted() {},
		methods: {
			
		}
	};
</script>

<style>
	.InvestmentList-Uncertified{
		width: 688upx;
		height: 147upx;
		margin: 0 auto;
		border-radius: 16upx 16upx 16upx 16upx;
		background: rgba(255,255,255,0.90);
		/* position: absolute;
		top: 40upx;
		left: 30upx; */
	}
	.InvestmentList-Uncertified view:nth-of-type(1){
		width: 100%;
		height: 174upx;
	}
	.InvestmentList-Uncertified view:nth-of-type(1) image{
		width: 100%;
		height: 100%;
		border-radius: 16upx;
		
	}
</style>