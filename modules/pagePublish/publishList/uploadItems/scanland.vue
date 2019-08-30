<template>
	<view class="scanLand-content">
		<view class="scan-cont">
			<view class="scanLand-box">
				<view class="SL-title">第1步</view>
				<view class="SL-strc">在电脑浏览器中输入“iambuyer.com”</view>
				<view class="SL-imgBoxOne">
					<image class="SL-img" :src="scanTapOne"></image>
				</view>
			</view>
			<view class="scanLand-box">
				<view class="SL-title">第2步</view>
				<view class="SL-strc">点击下方按钮，扫描电脑上的二维码</view>
				<view class="SL-imgBoxTwo">
					<image class="SL-img" :src="scanTapTwo"></image>
				</view>
			</view>
		</view>
		<view class="SL-btn">
			<view class="SL-btn-text" @tap='scanLand()'>点击扫码</view>
		</view>
	</view>
</template>

<script>
	import { mapMutations } from 'vuex';
	export default {
	    data () {
	      return {
			scanTapOne: this.Static + 'mbcImg/publish/scanTapOne.png',
	        scanTapTwo: this.Static + 'mbcImg/publish/scanTapTwo.png',
			token: 0,
	      };
	    },
		props: {
			msgData: {
				type: Object
			}
		},
		mounted() {
			console.log(this.msgData, '扫码需要的参数');
		},
	    methods: {
			...mapMutations({
				setScanLandSuccess: 'setScanLandSuccess'
			}),
			scanLand () {
				console.log('触发扫码登录');
				let _this = this;
				uni.scanCode({
					onlyFromCamera: true,
					success: function (res) {
						console.log('条码类型：' + res.scanType);
						console.log('条码内容：' + res.result);
						_this.token = res.result; // 条码内容
						uni.setStorageSync('SacnToken', _this.token); // 缓存扫码成功的token
						if (uni.getStorageSync('landRegist')) {
							let landRegistLG = JSON.parse(uni.getStorageSync('landRegist')); // 读取缓存的用户信息
							console.log(landRegistLG.user.id);
							let url = '/pc/bindUserIdAndToken?token=' + _this.token + '&userId=' + landRegistLG.user.id;
							if (_this.msgData.projId) { // 重新上传BP 需要穿项目id
								url = '/pc/bindUserIdAndToken?token=' + _this.token + '&userId=' + landRegistLG.user.id + '&projId=' + _this.msgData.projId;
							}
							let params = {}; // 请求总数居时 参数为空
							uni.showLoading({ // 展示loading
								title: '加载中'
							});
							uni.request({
								url: _this.api2 + url, //接口地址。
								data: _this.endParams(params),
								header: {
									Authorization:"Bearer "+landRegistLG.token//将token放到请求头中
								},
								success: (response) => {
									console.log(response.data.content, 'PC登录成功');
									_this.$store.commit('setScanLandSuccess', true); // 更新setScanLandSuccess
									uni.hideLoading(); // 隐藏 loading
								},
								fail: (error) => {
									uni.hideLoading(); // 隐藏 loading
									uni.showToast({
										title: '网络繁忙，请稍后',
										icon: 'none',
										duration: 1000
									});
									_this.$store.commit('setScanLandSuccess', false); // 更新setScanLandSuccess
									console.log(error, '网络繁忙，请稍后');
								}
							});
						}
					}
				});
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
		padding-top: 100upx;
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
		background: rgba(2,194,162,0.20);
		border: 0 solid rgba(2,194,162,0.40);
		border-radius: 2px;
		position: relative;
		width: 394upx;
		height: 94upx;
		margin-left: 178upx;
	}
	.SL-imgBoxTwo{
		position: relative;
		width: 100%;
		margin: 40upx 0 120upx;
	}
	.SL-imgBoxTwo>image{
		border-radius: 2px;
		position: relative;
		width: 240upx;
		height: 208upx;
		margin: auto;
		margin-left: 248upx;
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
