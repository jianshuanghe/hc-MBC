<template>
	<div class="entrust-content">
		<div class="entrust-box">
			<div class="input-box-my">
				<div class="En-my">
					<div class="En-title">您的信息</div>
					<div class="En-name">
						姓名
						<div class="input-right right">
							<wInput
								v-model="phone"
								type="number"
								maxlength="11"
								placeholder="请输入手机号码"
							></wInput>
						</div>
					</div>
					<div class="line"></div>
					<div class="En-in-name">
						手机号
						<div class="input-right right">
							<wInput
								v-model="phone"
								type="number"
								maxlength="11"
								placeholder="请输入手机号码"
							></wInput>
						</div>
					</div>
				</div>
			</div>
			<div class="entrust-box">
				<div class="input-box">
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
			</div>
			<div class="submit-box">
				<div class="left cancal">取消</div>
				<div class="left submit">确定</div>
				<div class="clear"></div>
			</div>
		</div>
	</div>
</template>

<script>
	import iiImg from '@/static/mbcImg/home/banner1.png';
	import wInput from '@/components/watch-login/watch-input1.vue';
	export default {
	    data () {
			return {
				iiImg: iiImg,
				phone: '1231231'
			};
	    },
		components: {
		  wInput
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
	.uni-input-wrapper{
		text-align: right;
	}
	.input-box-my{
		padding: 30upx;
	}
	.En-my{
		position: relative;
		width: 100%;
	}
	.En-title{
		font-family: PingFang-SC-Bold;
		font-size: 40upx;
		color: #2E2E30;
		letter-spacing: 0;
		line-height: 120upx;
		text-align: left;
	}
	.En-name{
		font-family: PingFang-SC-Medium;
		font-size: 28upx;
		color: #2E2E30;
		letter-spacing: 0;
		line-height: 100upx;
	}
	
	.input-right{
		color: #5D5D5D;
		letter-spacing: 0;
		text-align: right;
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
	.submit-box{
		position: relative;
		width: 100%;
		background: #F5F5F5;
		margin-top: 240upx;
	}
	.cancal{
		position: relative;
		width: 50%;
		font-family: PingFangSC-Regular;
		font-size: 28upx;
		color: #2E2E30;
		letter-spacing: 0;
		line-height: 90upx;
		text-align: center;
	}
	.submit{
		position: relative;
		width: 50%;
		background: #02C2A2;
		font-family: PingFangSC-Regular;
		font-size: 28upx;
		color: #FFFFFF;
		letter-spacing: 0;
		line-height: 90upx;
		text-align: center;
	}
	
	.main-input{
		text-align: right !important;
	}
	.uni-input-wrapper{
		text-align: right !important;
	}
</style>
