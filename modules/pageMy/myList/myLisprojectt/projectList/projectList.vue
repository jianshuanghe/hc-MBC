<template>
	<view class="projectList-my">
		<view class="projectList-my-nei">
			<view class="projectList-my-one" @tap="gotoprojectdetails">
				<view><image :src="green" mode=""></image></view>
				<view>
					<span>如何秀</span>
					<span>项目未曝光</span>
					<span>资料完整度:20%</span>
				</view>
				<view>
					<view>编辑项目</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import green from '@/static/mbcImg/my/green.png'
	export default {
		data() {
			return {
				green:green
			};
		},
		
		computed: {
		},
		created() {
			
		},
		mounted() {
		},
		methods: {
			gotoprojectdetails(e){
				console.log(e+'项目详情')
				uni.navigateTo({
				    url: '/modules/pageMy/myList/myLisprojectt/projectList/project-details/project-details',
				});
			}
		}
	};
</script>

<style>
	.projectList-my{
		width: 100%;
		background: #FFFFFF;
		margin-top: 20upx;
	}
	.projectList-my-nei{
		width: 100%;
		height: 190upx;
	}
	.projectList-my-one{
		width: 90%;
		height: 100%;
		margin: 0 auto;
		border-bottom: 2upx solid #F5F5F5;
		display: flex;
	}
	.projectList-my-one view:nth-of-type(1){
		width: 84upx;
		height: 84upx;
		margin-top: 32upx;
	}
	.projectList-my-one view:nth-of-type(1) image{
		width: 100%;
		height: 100%;
	}
	.projectList-my-one view:nth-of-type(2){
		width: 60%;
		height: 70%;
		margin-top: 25upx;
		margin-left: 32upx;
	}
	.projectList-my-one view:nth-of-type(2) span:nth-of-type(1){
		font-size: 32upx;
		color: #2E2E30;
		font-weight: 700;
		display: block;
		margin-top: 0;
	}.projectList-my-one view:nth-of-type(2) span:nth-of-type(2){
		font-size: 24upx;
		color: #9B9B9B;
		display: block;
	}.projectList-my-one view:nth-of-type(2) span:nth-of-type(3){
		font-size: 24upx;
		color: #FF4D6A;
		display: block;
	}
	.projectList-my-one view:nth-of-type(3){
		width: 30%;
		height: 100%;
		position:relative;
	}
	.projectList-my-one view:nth-of-type(3) view:nth-of-type(1){
		width: 160upx;
		height: 60upx;
		border: 2upx solid #E2E2E2;
		border-radius: 30upx;
		position: absolute;
		text-align: center;
		line-height: 60upx;
		font-size: 28upx;
		color: #2E2E30;
		top: 0;
		left: 0;
		bottom: 0;
		right: 0;
		margin: auto;
	}
</style>
