<template>
	<view class="items1-content">
		<div class="items1">
			<image class="img" :src="items1s2"></image>
			<div class="items1-cont">
				<div class="SD-title">BP诊断</div>
				<div class="SD-money">¥800.00</div>
				<div class="SD-ins">行业资深分析师帮你诊断BP，线上线下推送诊断报告</div>
			</div>
			<div class="items1-bot">
				<div class="SD-bot">
					<div class="SD-bot-items text-SD1 left">
						<image class="image1" :src='icons1'></image>
						350+政府资源
					</div>
					<div class="SD-bot-items text-SD2 left">
						<image class="image2" :src='icons2'></image>
						50+投融资机构
					</div>
					<div class="SD-bot-items text-SD3 left">
						<image class="image3" :src='icons3'></image>
						20年产业服务积累
					</div>
					<div class="clear"></div>
				</div>
			</div>
		</div>
	</view>
</template>

<script>
	export default {
	    data () {
			return {
				items1s2: this.Static + 'mbcImg/home/lookServices/items1s2.png',
				icons1: this.Static + 'mbcImg/home/lookServices/icons1.png',
				icons2: this.Static + 'mbcImg/home/lookServices/icons2.png',
				icons3: this.Static + 'mbcImg/home/lookServices/icons3.png',
				dataList: [] // 后台返回数据
			};
	    },
		components: {
		},
		computed: {},
		watch: {},
		created() {
		},
	    methods: {
	    }
	};
</script>

<style>
	.items1-content{
		position: relative;
		width: 750upx;
		background: #fff;
	}
	.items1{
		position: relative;
		width: 750upx;
	}
	.items1>image{
		position: relative;
		width: 100%;
		height: 340upx;
	}
	.items1-cont{
		position: relative;
		width: 690upx;
		margin: auto;
	}
	.SD-title{
		font-family: PingFang-SC-Bold;
		font-size: 40upx;
		color: #2E2E30;
		line-height: 80upx;
	}
	.SD-money{
		font-family: PingFangSC-Semibold;
		font-size: 48upx;
		color: #FAB100;
		line-height: 60upx;
	}
	.SD-ins{
		font-family: PingFangSC-Regular;
		font-size: 26upx;
		color: #5D5D5D;
		line-height: 60upx;
		margin-bottom: 20upx;
	}
	.items1-bot{
		position: relative;
		width: 750upx;
		background: #FAFAFA;
		height: 100upx;
	}
	.SD-bot{
		position: relative;
		width: 750upx;
	}
	.SD-bot-items{
		position: relative;
		width: 33.3333%;
		font-family: PingFangSC-Regular;
		font-size: 24upx;
		color: #9B9B9B;
		line-height: 80upx;
	}
	.text-SD1{
		padding-left: 8%;
	}
	.text-SD2{
		padding-left: 4%;
	}
	.text-SD3{
		padding-left: 3%;
	}
	.SD-bot-items .image1{
		position: absolute;
		width: 26upx;
		height: 24upx;
		top: 28upx;
		left: 26upx;
	}
	.SD-bot-items .image2{
		position: absolute;
		width: 32upx;
		height: 32upx;
		top: 24upx;
		left: -6upx;
	}
	.SD-bot-items .image3{
		position: absolute;
		width: 32upx;
		height: 32upx;
		top: 24upx;
		left: -14upx;
	}
</style>
