<template>
	<div class="entrust-content">
		<div class="entrust-box">
			<div class="success-box">
				<div class="img">
					<image class="img-box" :src="iiImg"></image>
				</div>
				<div class="En-title">申请提交成功</div>
				<div class="En-ins">您提交的信息正在处理，请耐心等待</div>
				<div class="En-more">查看其他项目</div>
			</div>
			<div class="input-box">
				<div class="En-my-other">
					<div class="En-in-title">您的信息</div>
					<div class="En-in-name">
						姓名
						<text class="right">周星星</text>
					</div>
					<div class="En-in-name">
						手机号
						<text class="right">13224566789</text>
					</div>
				</div>
				<div class="line"></div>
				<div class="En-my-other">
					<div class="En-in-title">委托联系信息</div>
					<div class="En-in-name">
						类别
						<text class="right">项目</text>
					</div>
					<div class="En-in-name">
						名称
						<text class="right">如何秀</text>
					</div>
					<div class="En-in-name">
						名称
						<image class="right" :src="iiImg"></image>
					</div>
				</div>
			</div>
			<div class="time">提交时间:  2019.03.31</div>
		</div>
	</div>
</template>

<script>
	import iiImg from '@/static/mbcImg/home/banner1.png';
	import yuan from '@/static/mbcImg/home/seekCapital/yuan.png';
	export default {
	    data () {
			return {
				iiImg: iiImg,
				yuan: yuan
			};
	    },
		props: {
			msgData: {
				type: Object
			}
		},
	    methods: {
	    }
	};
</script>

<style>
	.entrust-content{
		position: relative;
		width: 750upx;
		padding: 30upx;
		background: #FFf;
		height: 100vh;
	}
	.entrust-box{
		position: relative;
		width: 100%;
	}
	.success-box{
		position: relative;
		width: 100%;
	}
	.img{
		position: relative;
		width: 104upx;
		height: 104upx;
		margin: auto;
		margin-top: 100upx;
	}
	.img>image{
		position: relative;
		width: 100%;
		height: 100%;
		border-radius: 50%;
	}
	.En-title{
		font-family: PingFang-SC-Medium;
		font-size: 36upx;
		color: #2E2E30;
		letter-spacing: 0;
		text-align: center;
		line-height: 88upx;
		margin-top: 44upx;
	}
	.En-ins{
		position: relative;
		width: 100%;
		font-family: PingFang-SC-Medium;
		font-size: 28upx;
		color: #9B9B9B;
		letter-spacing: 0;
		line-height: 20upx;
		margin-bottom: 50upx;
		text-align: center;
	}
	.En-more{
		background: #02C2A2;
		border-radius: 2px;
		position: relative;
		width: 300upx;
		margin: auto;
		font-family: PingFangSC-Regular;
		font-size: 28upx;
		color: #FFFFFF;
		letter-spacing: 0;
		line-height: 90upx;
		text-align: center;
	}
	.input-box{
		background: #FAFAFA;
		padding: 30upx;
		margin-top: 110upx;
	}
	.En-my-other{
		position: relative;
		width: 100%;
	}
	.En-in-title{
		font-family: PingFang-SC-Bold;
		font-size: 28upx;
		color: #2E2E30;
		letter-spacing: 0;
		line-height: 50upx;
	}
	.En-in-name{
		font-family: PingFang-SC-Medium;
		font-size: 28upx;
		color: #2E2E30;
		letter-spacing: 0;
		line-height: 60upx;
	}
	.En-in-name>text{
		color: #5D5D5D;
		letter-spacing: 0;
		text-align: right;
	}
	.En-in-name>image{
		position: relative;
		width: 54upx;
		height: 54upx;
	}
	.time{
		font-family: PingFangSC-Regular;
		font-size: 24upx;
		color: #9B9B9B;
		line-height: 100upx;
	}
	.line{
		margin: 30upx 0;
	}
</style>
