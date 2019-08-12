<template>
	<view class="examine-Success">
		<view><image :src="chuang"></image></view>
		<view>
			<span>认证成功</span>
			<span>恭喜您成为膜拜资本认证创业者，您将拥有以下权限：</span>
			<view>
				<span>发布项目</span>
				<span>BP诊断</span>
				<span>更新项目信息</span>
				<span>查看更多竞品</span>
			</view>
		</view>
		<view>
			<view>发布项目</view>
			<view @tap="gotoinspectListsuccess">查看认证详情</view>
		</view>
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
			gotoinspectListsuccess(e){
				console.log(e+'审核成功')
				uni.navigateTo({
					url: '../../AuthenticationList/Certification-status/inspect-List/inspect-List-success',
				});
			}
		}
	};
</script>

<style>
	.examine-Success{
		width: 688upx;
		height: 568upx;
		margin: 0 auto;
		border-radius: 16upx 16upx 16upx 16upx;
		background: rgba(255,255,255,0.90);
/* 		position: absolute;
		top: 40upx;
		left: 30upx; */
		margin-top: 40upx;
	}
	.examine-Success view:nth-of-type(1){
		width: 100%;
		height: 174upx;
	}
	.examine-Success view:nth-of-type(1) image{
		width: 100%;
		height: 100%;
		border-radius: 16upx 16upx 0 0;
		
	}
	.examine-Success view:nth-of-type(2){
		width: 85%;
		height: 300upx;
		margin: 0 auto;
		border-bottom: 2upx solid #F5F5F5;
	}
	.examine-Success view:nth-of-type(2) span:nth-of-type(1){
		font-size: 38upx;
		color: #2E2E30;
		padding-top:20upx ;
		display: block;
	}.examine-Success view:nth-of-type(2) span:nth-of-type(2){
		font-size: 28upx;
		color: #5D5D5D;
		padding-top:20upx ;
		display: block;
	}
	.examine-Success view:nth-of-type(2) view:nth-of-type(1){
		width: 105%;
		height: 40upx;
		display: flex;
		line-height: 40upx;
		margin-top: 10upx;
	}
	.examine-Success view:nth-of-type(2) view:nth-of-type(1) span{
		padding: 0 10upx 0 10upx;
		background: #F5F5F5;
		border-radius: 4upx;
		font-size: 20upx;
		color: #9B9B9B;
		margin-left: 20upx;
	}.examine-Success view:nth-of-type(2) view:nth-of-type(1) span:nth-of-type(1){
		margin-left: 0upx;
	}
	.examine-Success view:nth-of-type(3){
		width: 85%;
		height: 40upx;
		font-size: 28upx;
		margin: 0 auto;
		display: flex;
		margin-top: 30upx;
	}
	.examine-Success view:nth-of-type(3) view:nth-of-type(1){
		width: 50%;
		height: 40upx;
		border-right: 2upx solid #E2E2E2;
		text-align: center;
		line-height: 40upx;
		color: #2E2E30;
	}
	.examine-Success view:nth-of-type(3) view:nth-of-type(2){
		width: 50%;
		height: 40upx;
		line-height: 40upx;
		text-align: center;
		color:#02C2A2;
		border: 0;
	}
</style>
