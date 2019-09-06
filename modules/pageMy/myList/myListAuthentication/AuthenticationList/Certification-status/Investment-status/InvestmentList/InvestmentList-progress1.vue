<template>
	<view class="InvestmentList-progress1">
		<view><image :src="tou"></image></view>
		<view>
			<span>审核中</span>
			<span>审核人员正在全力审核，将于三个工作日内给出审核结果</span>
		</view>
		<view @tap="gotoinspectListin">查看认证详情</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				tou:this.Static + 'mbcImg/my/tou.png',
			};
		},
		components: {
			
		},
		computed: {},
		created() {},
		mounted() {},
		methods: {
			gotoinspectListin(e){
				console.log(e+'审核中')
				uni.navigateTo({
					url: '../../AuthenticationList/Certification-status/inspect-List/inspect-List-in',
				});
			}
		}
	};
</script>

<style>
	.InvestmentList-progress1{
		width: 688upx;
		height: 568upx;
		margin: 0 auto;
		border-radius: 16upx 16upx 16upx 16upx;
		background: rgba(255,255,255,0.90);
	}
	.InvestmentList-progress1 view:nth-of-type(1){
		width: 100%;
		height: 174upx;
	}
	.InvestmentList-progress1 view:nth-of-type(1) image{
		width: 100%;
		height: 100%;
		border-radius: 16upx 16upx 0 0;
		
	}
	.InvestmentList-progress1 view:nth-of-type(2){
		width: 85%;
		height: 300upx;
		margin: 0 auto;
		border-bottom: 2upx solid #F5F5F5;
	}
	.InvestmentList-progress1 view:nth-of-type(2) span:nth-of-type(1){
		font-size: 38upx;
		color: #2E2E30;
		padding-top:20upx ;
		display: block;
		font-weight: bold;
	}.InvestmentList-progress1 view:nth-of-type(2) span:nth-of-type(2){
		font-size: 28upx;
		color: #5D5D5D;
		padding-top:20upx ;
		display: block;
	}
	.InvestmentList-progress1 view:nth-of-type(3){
		width: 85%;
		height: 92upx;
		font-size: 28upx;
		color: #2E2E30;
		margin: 0 auto;
		text-align: center;
		line-height: 92upx;
	}
</style>
