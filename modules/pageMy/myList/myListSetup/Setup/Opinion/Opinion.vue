<template>
	<view class="OpinionList">
		<view>
			<textarea placeholder="请输入您想反馈的意见" maxlength="300" @input="descInput" v-model="desc" />
			<span class="numberV">{{remnane}}/300</span>
		</view>
		<view @tap="Preservation">保存</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				txtVal: 1,
				desc:"",
				remnane:0
			};
		},
		components: {
			
		},
		computed: {},
		created() {},
		mounted() {},
		methods: {
			descInput(){
				var txtVal = this.desc.length;
				this.remnane = 1 + txtVal;
			},
			Preservation(){
				if (uni.getStorageSync('landRegist')) {
					let landRegistLG = JSON.parse(uni.getStorageSync('landRegist')); // 读取缓存的用户信息
					console.log(landRegistLG.user.id);
					let params = {
						userId:landRegistLG.user.id,
						context:this.desc
					}; // 请求总数居时 参数为空
					uni.showLoading({ // 展示loading
						title: '加载中'
					});
					uni.request({
						url: this.api2 + '/feedback/add' ,
						data: this.endParams(params),
						method: 'POST',
						header: {
							Authorization: "Bearer " + landRegistLG.token //将token放到请求头中
						},
						success: (response) => {
							uni.hideLoading();
							console.log(response.data);
							uni.navigateBack({
								
							})
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
	};
</script>

<style>
	.OpinionList{
		width: 100%;
		height: 100%;
		background: #FFFFFF;
		padding: 2upx;
	}
	.OpinionList view:nth-of-type(1){
		width: 90%;
		height: 370upx;
		margin: 30upx auto 30upx auto;
		position: relative;
	}
	.OpinionList view:nth-of-type(1) textarea{
		width: 100%;
		height: 100%;
		background: #F9F9F9;
		padding: 20upx;
		padding-bottom: 50upx;
	}
	.numberV{
		font-size: 28upx;
		color: #D2D2D2;
		position: absolute;
		bottom: 0;
		right: 40upx;
	}
	.OpinionList view:nth-of-type(2){
		width: 90%;
		height: 90upx;
		background: #02C2A2;
		margin: 100upx auto 100upx auto;
		text-align: center;
		line-height: 90upx;
		font-size: 32upx;
		color: #FFFFFF;
	}
</style>
