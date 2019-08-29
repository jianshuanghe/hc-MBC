<template>
	<view class="services-List">
		<view class="services-List-biao">
			<span>更多融资服务</span>
		</view>
		<view class="services-List-nei">
			<view class="services-List-one">
				<view><image :src="bpzhen"></image></view>
				<view>
					<span>BP诊断</span>
					<span>完善资料即可曝光、推广项目</span>
				</view>
				<view @tap="gotozhenduan">
					<view>去诊断</view>
				</view>
			</view>
		</view>
		<view class="services-List-nei">
			<view class="services-List-one">
				<view><image :src="bpdamo"></image></view>
				<view>
					<span>BP打磨</span>
					<span>完善资料即可曝光、推广项目</span>
				</view>
				<view @tap="gotodamo">
					<view>去打磨</view>
				</view>
			</view>
		</view>
		<view class="services-List-nei">
			<view class="services-List-one">
				<view><image :src="yong"></image></view>
				<view>
					<span>速融服务</span>
					<span>完善资料即可曝光、推广项目</span>
				</view>
				<view @tap="gotujiashu">
					<view>去加速</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				bpzhen:this.Static + 'mbcImg/my/bpzhen.png',
				bpdamo:this.Static + 'mbcImg/my/bpdamo.png',
				yong:this.Static + 'mbcImg/my/yong.png',
			};
		},
		
		computed: {
		},
		created() {
			
		},
		mounted() {
		},
		methods: {
			gotozhenduan(){
				console.log('去BP诊断')
				uni.navigateTo({
					url:'/modules/pageHome/homeModules/lookServices/serviceDetails/BPD/serviceDetails?id='+1
				})
			},
			gotodamo(){
				console.log('去BP打磨')
				uni.navigateTo({
					url:'/modules/pageHome/homeModules/lookServices/serviceDetails/Bp/serviceDetails?id='+2
				})
			},
			gotujiashu(){
				console.log('去速融服务')
				uni.navigateTo({
					url:'/modules/pageHome/homeModules/lookServices/serviceDetails/quickMelt/serviceDetails?id='+3
				})
			},
			
		}
	};
</script>

<style>
	.services-List{
		width: 100%;
		background: #FFFFFF;
		margin-top: 20upx;
	}
	.services-List-biao{
		width: 100%;
		height: 70upx;
		font-size: 34upx;
		color: #2E2E30;
	}
	.services-List-biao span:nth-of-type(1){
		display: block;
		margin-left: 40upx;
		padding-top: 10upx;
	}
	.services-List-nei{
		width: 100%;
		height: 140upx;
	}
	.services-List-one{
		width: 90%;
		height: 100%;
		margin: 0 auto;
		border-bottom: 2upx solid #F5F5F5;
		display: flex;
	}
	.services-List-one view:nth-of-type(1){
		width: 80upx;
		height: 80upx;
		border-radius: 8upx;
		margin-top: 30upx;
	}
	.services-List-one view:nth-of-type(1) image{
		width: 100%;
		height: 100%;
	}
	.services-List-one view:nth-of-type(2){
		width: 60%;
		height: 90upx;
		margin-top: 20upx;
		margin-left: 30upx;
	}
	.services-List-one view:nth-of-type(2) span:nth-of-type(1){
		font-size: 32upx;
		color: #2E2E30;
		display: block;
	}.services-List-one view:nth-of-type(2) span:nth-of-type(2){
		font-size: 24upx;
		color: #9B9B9B;
		display: block;
	}
	.services-List-one view:nth-of-type(3){
		width: 30%;
		height: 100%;
		position:relative;
	}
	.services-List-one view:nth-of-type(3) view:nth-of-type(1){
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
