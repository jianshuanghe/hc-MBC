<template>
	<view class="InvestmentList-Success">
		<view><image :src="tou"></image></view>
		<view>
			<span class='fontWight'>认证成功</span>
			<span>恭喜您成为陌拜资本认证投资人，您将拥有以下权限：</span>
			<view>
				<span>查看项目</span>
				<span>关注项目</span>
				<span>查看融资资讯</span>
			</view>
		</view>
		<view>
			<view @tap="gotoInvestmentListdata">完善个人资料</view>
			<view @tap="gotoinspectListsuccess">查看认证详情</view>
		</view>
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
			gotoinspectListsuccess(e){
				console.log(e+'审核成功')
				uni.navigateTo({
					url: '../../AuthenticationList/Certification-status/inspect-List/inspect-List-success',
				});
			},
			gotoInvestmentListdata(e){
				console.log(e+'完善个人简历')
				uni.navigateTo({
					url: '../../AuthenticationList/Certification-status/Investment-status/InvestmentList/InvestmentList-data/InvestmentList-data',
				});
			}
		}
	};
</script>

<style>
	.InvestmentList-Success{
		width: 688upx;
		height: 568upx;
		margin: 0 auto;
		border-radius: 16upx 16upx 16upx 16upx;
		background: rgba(255,255,255,0.90);
	}
	.InvestmentList-Success view:nth-of-type(1){
		width: 100%;
		height: 174upx;
	}
	.InvestmentList-Success view:nth-of-type(1) image{
		width: 100%;
		height: 100%;
		border-radius: 16upx 16upx 0 0;
		
	}
	.InvestmentList-Success view:nth-of-type(2){
		width: 85%;
		height: 300upx;
		margin: 0 auto;
		border-bottom: 2upx solid #F5F5F5;
	}
	.InvestmentList-Success view:nth-of-type(2) span:nth-of-type(1){
		font-size: 38upx;
		color: #2E2E30;
		padding-top:20upx ;
		display: block;
	}
	.fontWight{
		font-weight: bold;
	}
	.InvestmentList-Success view:nth-of-type(2) span:nth-of-type(2){
		font-size: 28upx;
		color: #5D5D5D;
		padding-top:20upx ;
		display: block;
	}
	.InvestmentList-Success view:nth-of-type(2) view:nth-of-type(1){
		width: 100%;
		height: 40upx;
		display: flex;
		line-height: 40upx;
		margin-top: 10upx;
	}
	.InvestmentList-Success view:nth-of-type(2) view:nth-of-type(1) span{
		padding: 0 10upx 0 10upx;
		background: #F5F5F5;
		border-radius: 4upx;
		font-size: 20upx;
		color: #9B9B9B;
		margin-left: 20upx;
	}.InvestmentList-Success view:nth-of-type(2) view:nth-of-type(1) span:nth-of-type(1){
		margin-left: 0upx;
	}
	.InvestmentList-Success view:nth-of-type(3){
		width: 85%;
		height: 40upx;
		font-size: 28upx;
		margin: 0 auto;
		display: flex;
		margin-top: 30upx;
	}
	.InvestmentList-Success view:nth-of-type(3) view:nth-of-type(1){
		width: 50%;
		height: 40upx;
		border-right: 2upx solid #E2E2E2;
		text-align: center;
		line-height: 40upx;
		color: #2E2E30;
	}
	.InvestmentList-Success view:nth-of-type(3) view:nth-of-type(2){
		width: 50%;
		height: 40upx;
		line-height: 40upx;
		text-align: center;
		color:#02C2A2;
		border: 0;
	}
</style>
