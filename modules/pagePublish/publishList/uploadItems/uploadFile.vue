<template>
	<view class="scanLand-content">
		<view class="scan-cont">
			<view class="scanLand-box">
				<view class="SL-imgBoxTwo">
					<image class="SL-img" :src="pc"></image>
					<view class="SL-pc">已登录陌拜资本官网</view>
				</view>
				<view class="SL-title">请上传BP</view>
				<view class="SL-strc">请在电脑上传BP,完成后点击按钮会同步到手机端</view>
			</view>
		</view>
		<view class="SL-btn">
			<view class="SL-btn-text" @tap="isFileUpload()">完成</view>
		</view>
	</view>
</template>

<script>
	import { mapMutations } from 'vuex';
	export default {
	    data () {
	      return {
			pc: this.Static + 'mbcImg/publish/pc.png',
			isUpLoadFile: {
				isSuccess: false, // 默认没有确认上传
				content:{} // 确认上传之后返回的数据
			}
	      };
	    },
	    methods: {
			...mapMutations({
				setIsUploadFileSuccess: 'setIsUploadFileSuccess',
				setIsUploadFileContent: 'setIsUploadFileContent'
			}),
			isFileUpload () {
				console.log('点击触发确完成组件');
				if (uni.getStorageSync('landRegist')) {
					let landRegistLG = JSON.parse(uni.getStorageSync('landRegist')); // 读取缓存的用户信息
					console.log(landRegistLG.user.id);
					let params = {}; // 请求总数居时 参数为空
					uni.showLoading({ // 展示loading
						title: '加载中'
					});
					let SacnToken = uni.getStorageSync('SacnToken'); // 读取缓存的用户信息
					console.log(SacnToken);
					uni.request({
						url: this.api2 + '/proj/isFileUpload?token=' + SacnToken, //接口地址。
						data: this.endParams(params),
						header: {
							Authorization:"Bearer "+landRegistLG.token//将token放到请求头中
						},
						success: (response) => {
							console.log(response.data.code);
							//测试---------------------------------------------------------------------------------------------------------------
							// this.isUpLoadFile.isSuccess = true;
							// this.isUpLoadFile.content = response.data.content;
							// uni.setStorageSync('isUpLoadFile', JSON.stringify(this.isUpLoadFile));// 缓存确认成功的数据
							//测试---------------------------------------------------------------------------------------------------------------
							if (response.data.code === 200) {
								console.log('上传成功');
								this.isUpLoadFile.isSuccess = true;
								this.isUpLoadFile.content = response.data.content;
								uni.setStorageSync('isUpLoadFile', JSON.stringify(this.isUpLoadFile));// 缓存确认成功的数据
								this.$store.commit('setIsUploadFileSuccess', true); // 更新setIsUploadFileSuccess
								this.$store.commit('setIsUploadFileContent', this.isUpLoadFile.content); // 更新setIsUploadFileContent
								uni.navigateBack({delta: 1});
							} else {
								uni.showToast({
									title: response.data.message,
									icon: 'none',
									duration: 1000
								});
							}
							this.dataList = response.data.content;
							uni.hideLoading(); // 隐藏 loading
						},
						fail: (error) => {
							uni.hideLoading(); // 隐藏 loading
							uni.showToast({
								title: '网络繁忙，请稍后',
								icon: 'none',
								duration: 1000
							});
							console.log(error, '网络繁忙，请稍后');
						}
					});
				}
			}
	    }
	}
</script>

<style>
	.scanLand-content{
		position: fixed;
		width: 750upx;
		top: 0;
		background: #fff;
		height: 1334upx;
	}
	.scan-cont{
		position: relative;
		width: 100%;
		padding-top: 160upx;
		margin-bottom: 260upx;
	}
	.scanLand-box{
		position: relative;
		width: 100%;
	}
	.SL-title{
		position: relative;
	}
	.SL-title{
		font-family: PingFang-SC-Bold;
		font-size: 48upx;
		width: 690upx;
		margin-left: 30upx;
		color: #2E2E30;
		letter-spacing: 0;
		text-align: center;
		line-height: 100upx;
		margin-top: 40upx;
	}
	.SL-strc{
		font-family: PingFangSC-Regular;
		font-size: 28upx;
		width: 690upx;
		margin-left: 30upx;
		text-align: center;
		color: #5D5D5D;
		line-height: 80upx;
	}
	.SL-imgBoxOne{
		position: relative;
		width: 100%;
		margin-top: 40upx;
	}
	.SL-imgBoxOne>image{
		border-radius: 2px;
		position: relative;
		width: 394upx;
		height: 94upx;
		margin-left: 178upx;
	}
	.SL-pc{
		font-family: PingFangSC-Regular;
		font-size: 28upx;
		color: #02C2A2;
		line-height: 40upx;
		text-align: center;
	}
	.SL-imgBoxTwo{
		position: relative;
		width: 100%;
		margin-top: 40upx;
	}
	.SL-imgBoxTwo>image{
		border-radius: 2px;
		position: relative;
		width: 250upx;
		height: 208upx;
		margin-left: 260upx;
	}
	.SL-btn{
		position: absolute;
		width: 690upx;
		margin-left: 30upx;
		background: #02C2A2;
		border-radius: 2px;
	}
	.SL-btn-text{
		font-family: PingFangSC-Regular;
		font-size: 28upx;
		color: #FFFFFF;
		letter-spacing: 0;
		text-align: center;
		line-height: 90upx;
	}
</style>
