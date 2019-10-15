<template>
	<view class="myListreceive">
		<view class="SUI-tent" v-for="(item,index) in List" :key="index">
			<view class="left SUI-left-img">
				<view class="SUI-File">
					<image class="file" :src="scanLogo"></image>
				</view>
			</view>
			<view class="left SUI-cont-text">
				<view class="SUI-text-top"  @tap="clickBPshow(item.fileNamePath)">{{item.fileName}}</view>
				<view class="SUI-text-bot1"  @tap="clickBPshow(item.fileNamePath)">投递人:{{item.userName}}&nbsp;&nbsp;&nbsp;&nbsp;{{item.createTime|dateTime}}</view>
			</view>
			<view class="SUI-text-lianxi" @tap="gotoxiangmuxiang(item.projId)">
				委托联系
			</view>
			<view class="clear"></view>
		</view>
		<view class="meirenkanwo" v-if="List!==undefined &&List.length==0">
			<image :src="kong" mode=""></image>
			您还没有收到BP！
		</view>
	</view>
</template>

<script>
	import date from '@/static/mbcJs/dateTime.js';
	import { mapMutations, mapGetters } from 'vuex';
	export default {
	    data () {
	      return {
			kong:this.Static + 'mbcImg/my/kong.png',
			scanLogo: this.Static + 'mbcImg/publish/scanLogo.png',
	        rightArrow: this.Static + 'mbcImg/publish/rightArrow.png',
			List:[]
	      };
	    },
        onLoad(option) {
        	this.shareToHome(option); // 转发页打开规则函数
        },
		// 分享
		onShareAppMessage(res) {
			  if (res.from === 'button') {// 来自页面内分享按钮
				console.log(res.target)
			  }
			  return this.titleOrPathApp
		},
		onLoad: function() {
			//获取标签
			this.getHeader();
		},
		filters: {
		  /* 格式化时间戳 */
		  dateTime (val) {
		    return date.dateTime('y.m.d h minute', val);
		  }
		},
	    methods: {
			gotoxiangmuxiang(e){
				uni.navigateTo({
					url:'/modules/pageHome/homeList/FinancProject/FinancProject?id=' + e
				})
			},
			clickBPshow(e){
				uni.showLoading({ // 展示loading
					title: '加载中,请稍后!'
				});
				uni.downloadFile({
					url: e,

					success: function (res) {
						console.log(res, '--------------------pdf----------------------')
						var filePath = res.tempFilePath;
						uni.openDocument({
						  filePath: filePath,
						  success: function (res) {
							console.log('打开文档成功');
							uni.hideLoading(); // 隐藏 loading
						  }
						});
					}
				});
			},
			getHeader() {
				if (uni.getStorageSync('landRegist')) {
					let landRegistLG = JSON.parse(uni.getStorageSync('landRegist')); // 读取缓存的用户信息
					console.log(landRegistLG.user.id);
					// let params = {}; // 请求总数居时 参数为空
					uni.showLoading({ // 展示loading
						title: '加载中'
					});
					uni.request({
						url: this.api2 + '/bp/list?userId='+landRegistLG.user.id, //接口地址。
						// data: this.endParams(params),
						method: 'GET',
						header: {
							Authorization: "Bearer " + landRegistLG.token //将token放到请求头中
						},
						success: (response) => {
							uni.hideLoading();
							console.log(response.data);
							this.List = response.data.rows
							console.log(this.List,'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
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
			},
	    }
	}
</script>

<style>
	.myListreceive{
		width: 100%;
		min-height: 100%;
		background: #FFFFFF;
		padding:2upx;
	}
	.SUI-tent{
		position: relative;
		width: 670upx;
		margin-left: 40upx;
		margin-bottom: 14upx;
		border-bottom: 2upx solid #F5F5F5;
	}
	.SUI-left-img{
		position: relative;
		width: 110upx;
	}
	.SUI-File{
		position: relative;
		width: 92upx;
		height: 90upx;
	}
	.SUI-File>image{
		position: relative;
		width: 92upx;
		height: 90upx;
		margin-top: 22upx;
	}
	.SUI-cont-text{
		position: relative;
		width: 488upx;
	}
	.SUI-text-top{
		font-family: PingFang-SC-Bold;
		font-size: 32upx;
		color: #2E2E30;
		letter-spacing: 0;
		line-height: 60upx;
		margin-top: 10upx;
		font-weight: bold;
	}
	.SUI-text-bot{
		font-family: PingFangSC-Regular;
		font-size: 24upx;
		color: #9B9B9B;
		letter-spacing: 0;
		line-height: 32upx;
	}
	.SUI-text-bot1{
		font-family: PingFangSC-Regular;
		font-size: 24upx;
		color: #9B9B9B;
		letter-spacing: 0;
		line-height: 64upx;
	}
	.SUI-right-img{
		position: relative;
		width: 20upx;
	}
	.SUI-right-img>image{
		position: relative;
		width: 26upx;
		height: 28upx;
		margin-top: 52upx;
	}
	.SL-btn{
		position: absolute;
		width: 690upx;
		margin-left: 30upx;
		background: #02C2A2;
		border-radius: 2px;
		top: 400upx;
	}
	.SL-btn-text{
		font-family: PingFangSC-Regular;
		font-size: 28upx;
		color: #FFFFFF;
		letter-spacing: 0;
		text-align: center;
		line-height: 90upx;
	}
	.SUI-text-lianxi{
		width: 200upx;
		height: 50upx;
		font-size: 26upx;
		color: #02C2A2;
		position: absolute;
		right: -110upx;
		top: 20upx;
	}
	.meirenkanwo {
		width: 284upx;
		height: 280upx;
		display: block;
		margin: 120upx auto auto auto;
		font-size: 28upx;
		text-align: center;
		color: #9B9B9B;
	}

	.meirenkanwo image {
		width: 100%;
		height: 85%;
	}
</style>
