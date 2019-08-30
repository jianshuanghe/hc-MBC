<template>
	<view class="examine-progress1">
		<view><image :src="chuang"></image></view>
		<view>
			<span>审核中</span>
			<span>审核人员正在全力审核，将于三个工作日内给出审核结果</span>
		</view>
		<view @tap="gotoinspectListin">查看认证详情</view>
	</view>
</template>

<script>
	import { mapMutations,mapGetters } from 'vuex';
	export default {
		data() {
			return {
				Listdata: [],
				chuang:this.Static + 'mbcImg/my/chuang.png',
			};
		},
		computed: {
			...mapGetters(['GET_MY'])
		},
		watch: {
			GET_MY: {
				handler(a, b) {
					console.log(a, b, 'header----list');
				},
				deep: true
			}
		},
		created() {
			this.Listdata = this.GET_MY.MyList.header;
			console.log(this.Listdata, 'this.Listdata');
		},
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
	.examine-progress1{
		width: 688upx;
		height: 568upx;
		margin: 0 auto;
		border-radius: 16upx 16upx 16upx 16upx;
		background: rgba(255,255,255,0.90);
		margin-top: 40upx;
	}
	.examine-progress1 view:nth-of-type(1){
		width: 100%;
		height: 174upx;
	}
	.examine-progress1 view:nth-of-type(1) image{
		width: 100%;
		height: 100%;
		border-radius: 16upx 16upx 0 0;
		
	}
	.examine-progress1 view:nth-of-type(2){
		width: 85%;
		height: 300upx;
		margin: 0 auto;
		border-bottom: 2upx solid #F5F5F5;
	}
	.examine-progress1 view:nth-of-type(2) span:nth-of-type(1){
		font-size: 38upx;
		color: #2E2E30;
		padding-top:20upx ;
		display: block;
	}.examine-progress1 view:nth-of-type(2) span:nth-of-type(2){
		font-size: 28upx;
		color: #5D5D5D;
		padding-top:20upx ;
		display: block;
	}
	.examine-progress1 view:nth-of-type(3){
		width: 85%;
		height: 92upx;
		font-size: 28upx;
		color: #2E2E30;
		margin: 0 auto;
		text-align: center;
		line-height: 92upx;
	}
</style>
