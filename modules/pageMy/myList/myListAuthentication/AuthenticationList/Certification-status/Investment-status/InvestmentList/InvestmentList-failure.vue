<template>
	<view class="InvestmentList-failure">
		<view><image :src="tou"></image></view>
		<view>
			<span>审核未通过</span>
			<span>很抱歉，您的审核未通过，具体原因请查看认证详情</span>
		</view>
		<view>
			<view @tap="gotoinspectListfail">查看认证详情</view>
			<view @tap="gotoInvestorCertification">重新发起认证</view>
		</view>
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
			gotoinspectListfail(e){
				console.log(e+'审核成功')
				uni.navigateTo({
					url: '../../AuthenticationList/Certification-status/inspect-List/inspect-List-fail',
				});
			},
			gotoInvestorCertification(e){
				console.log('去' + e + '投资人认证');
				uni.navigateTo({
					url: '/modules/pageMy/myList/myListAuthentication/AuthenticationList/InvestorCertification/InvestorCertification',
				});
			}
		}
	};
</script>

<style>
	.InvestmentList-failure{
		width: 688upx;
		height: 568upx;
		margin: 0 auto;
		border-radius: 16upx 16upx 16upx 16upx;
		background: rgba(255,255,255,0.90);
		/* margin-top: 40upx; */
	}
	.InvestmentList-failure view:nth-of-type(1){
		width: 100%;
		height: 174upx;
	}
	.InvestmentList-failure view:nth-of-type(1) image{
		width: 100%;
		height: 100%;
		border-radius: 16upx 16upx 0 0;
		
	}
	.InvestmentList-failure view:nth-of-type(2){
		width: 85%;
		height: 300upx;
		margin: 0 auto;
		border-bottom: 2upx solid #F5F5F5;
	}
	.InvestmentList-failure view:nth-of-type(2) span:nth-of-type(1){
		font-size: 38upx;
		color: #2E2E30;
		padding-top:20upx ;
		display: block;
	}.InvestmentList-failure view:nth-of-type(2) span:nth-of-type(2){
		font-size: 28upx;
		color: #5D5D5D;
		padding-top:20upx ;
		display: block;
	}
	.InvestmentList-failure view:nth-of-type(3){
		width: 85%;
		height: 40upx;
		font-size: 28upx;
		margin: 0 auto;
		display: flex;
		margin-top: 30upx;
	}
	.InvestmentList-failure view:nth-of-type(3) view:nth-of-type(1){
		width: 50%;
		height: 40upx;
		border-right: 2upx solid #E2E2E2;
		text-align: center;
		line-height: 40upx;
		color: #2E2E30;
	}
	.InvestmentList-failure view:nth-of-type(3) view:nth-of-type(2){
		width: 50%;
		height: 40upx;
		line-height: 40upx;
		text-align: center;
		color:#02C2A2;
		border: 0;
	}
</style>
