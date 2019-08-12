<template>
	<view class="Investment-data">
		<view class="data-header">
			<view>个人介绍</view>
			<view @tap="gotodatasListme">
				填写个人介绍
			</view>
		</view>
		<view class="data-conter">
			<view>任职履历</view>
			<view @tap="gotodatasListvitae">
				填写任职履历
			</view>
		</view>
		<view class="data-footer">
			<view>投资案例</view>
			<view @tap="gotodatasListcase">
				填写投资案例
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
			};
		},
		components: {
			
		},
		computed: {},
		created() {},
		mounted() {},
		methods: {
			gotodatasListme(e){
				console.log(e+'个人介绍')
				uni.navigateTo({
					url: '../../../Investment-status/InvestmentList/InvestmentList-data/datas-List/datas-List-me',
				});
			},
			gotodatasListvitae(e){
				console.log(e+'任职履历')
				uni.navigateTo({
					url: '../../../Investment-status/InvestmentList/InvestmentList-data/datas-List/datas-List-vitae',
				});
			},
			gotodatasListcase(e){
				console.log(e+'投资案例')
				uni.navigateTo({
					url: '../../../Investment-status/InvestmentList/InvestmentList-data/datas-List/datas-List-case',
				});
			}
		}
	};
</script>

<style>
	.Investment-data{
		width: 100%;
	}
	.data-header{
		width: 100%;
		height: 300upx;
		background:#FFFFFF;
	}
	.data-header view:nth-of-type(1){
		font-size: 34upx;
		color: #2E2E30;
		padding-top: 40upx;
		padding-left: 30upx;
	}
	.data-header view:nth-of-type(2){
		margin:40upx auto 0 auto;
		width: 300upx;
		height: 80upx;
		border: 2upx solid #02C2A2;
		/* margin: 0 auto; */
		line-height: 80upx;
		text-align: center;
		font-size: 28upx;
		color: #02C2A2;
	}
	.data-conter{
		width: 100%;
		height: 300upx;
		background:#FFFFFF;
		margin-top: 20upx;
	}
	.data-conter view:nth-of-type(1){
		font-size: 34upx;
		color: #2E2E30;
		padding-top: 40upx;
		padding-left: 30upx;
	}
	.data-conter view:nth-of-type(2){
		margin:40upx auto 0 auto;
		width: 300upx;
		height: 80upx;
		border: 2upx solid #02C2A2;
		/* margin: 0 auto; */
		line-height: 80upx;
		text-align: center;
		font-size: 28upx;
		color: #02C2A2;
	}
	.data-footer{
		width: 100%;
		height: 300upx;
		background:#FFFFFF;
		margin-top: 20upx;
	}
	.data-footer view:nth-of-type(1){
		font-size: 34upx;
		color: #2E2E30;
		padding-top: 40upx;
		padding-left: 30upx;
	}
	.data-footer view:nth-of-type(2){
		margin:40upx auto 0 auto;
		width: 300upx;
		height: 80upx;
		border: 2upx solid #02C2A2;
		/* margin: 0 auto; */
		line-height: 80upx;
		text-align: center;
		font-size: 28upx;
		color: #02C2A2;
	}
</style>
