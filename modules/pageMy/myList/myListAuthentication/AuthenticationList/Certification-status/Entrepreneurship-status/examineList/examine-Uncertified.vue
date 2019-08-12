<template>
	<view class="examine-Uncertified">
		<view><image :src="chuang"></image></view>
	</view>
</template>

<script>
	import chuang from '@/static/mbcImg/my/chuang.png'
	export default {
		data() {
			return {
				chuang:chuang
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
	.examine-Uncertified{
		width: 688upx;
		height: 177upx;
		margin: 0 auto;
		border-radius: 16upx 16upx 16upx 16upx;
		background: rgba(255,255,255,0.90);
		margin-top: 40upx;
	}
	.examine-Uncertified view:nth-of-type(1){
		width: 100%;
		height: 174upx;
		border-radius: 16upx;
	}
	.examine-Uncertified view:nth-of-type(1) image{
		width: 100%;
		height: 100%;
		border-radius: 16upx;
		
	}
</style>