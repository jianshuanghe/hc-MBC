<template>
	<view class="project-XQ-edit">
		<view class="Investor-name">
			<view class="Investor-name-box">
				<view>
					<image :src="xin"></image>
				</view>
				<view>项目名称</view>
				<view><input type="text" placeholder="请输入" placeholder-style="color:#D2D2D2" /></view>
			</view>
		</view>
		<view class="Investor-name">
			<view class="Investor-name-box">
				<view>
					<image :src="xin"></image>
				</view>
				<view>一句话介绍</view>
				<view><input type="text" placeholder="请输入" placeholder-style="color:#D2D2D2"/></view>
			</view>
		</view>
		<view class="Investor-field">
			<view class="Investor-field-box">
				<view>
					<image :src="xin"></image>
				</view>
				<view>所属领域</view>
				<view>
					<picker @change="Finanarry" :value="index" :range="arry" range-key='name'>
						<view class="ziti">{{pickerarry? pickerarry : '请选择'}}</view>
					</picker>
				</view>
				<view>
					<image :src="right"></image>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import imageUploadOne from '@/components/imageUpload/imageUploadOne.vue'
	export default {
		data() {
			return {
				logo: '',
				xin: this.Static + 'mbcImg/common/xing.png',
				right: this.Static + 'mbcImg/my/right.png',
				index: 0, // 默认选择第一个
				arry: [],
				pickerValue: "", // 选中的值
				pickerarry: "", // 选中的值
				id1:''
			};
		},
		components: {
			imageUploadOne
		},
		created() {
			//融资领域
			this.Financinfield();
		},
		methods: {
			Finanarry: function(e) {
				this.arry.map((items, index) => {
					if (String(index) === String(e.target.value)) {
						this.pickerarry = items.name;
						this.id1=items.id
						console.log(this.pickerarry, this.id1)
					}
				})
			},
			Financinfield(){//融资领域
				if (uni.getStorageSync('landRegist')) {
					let landRegistLG = JSON.parse(uni.getStorageSync('landRegist')); // 读取缓存的用户信息
					console.log(landRegistLG.user.id);
					// let params = {}; // 请求总数居时 参数为空
					uni.showLoading({ // 展示loading
						title: '加载中'
					});
					uni.request({
						url: this.api2 + '/field/fieldList', //接口地址。
						// data: this.endParams(params),
						method: 'GET',
						header: {
							Authorization: "Bearer " + landRegistLG.token //将token放到请求头中
						},
						success: (response) => {
							uni.hideLoading();
							// console.log(response.data.content);
							this.arry=response.data.content
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
		},
		
	};
</script>

<style>
	.ziti {
		position: absolute;
		right: 0upx;
		width: 300upx !important;
		height: 30upx;
		top: -30upx;
		font-size: 30upx !important;
	}
	.project-XQ-edit{
		width: 100%;
		min-height: 100%;
	}
	.Investor-name {
		width: 100%;
		height: 122upx;
		background: #FFFFFF;
	}
	
	.Investor-name-box {
		width: 90%;
		height: 100%;
		border-bottom: 2upx solid #F5F5F5;
		margin: 0 auto;
		display: flex;
		position: relative;
	}
	
	.Investor-name-box view:nth-of-type(1) {
		width: 20upx;
		height: 20upx;
		padding-top: 26upx;
	}
	
	.Investor-name-box view:nth-of-type(1) image {
		width: 100%;
		height: 100%;
	}
	
	.Investor-name-box view:nth-of-type(2) {
		width: 152upx;
		height: 32upx;
		font-size: 30upx;
		color: #2E2E30;
		padding-top: 30upx;
		padding-left: 10upx;
	}
	
	.Investor-name-box view:nth-of-type(3) {
		width: 300upx;
		height: 35upx;
		position: absolute;
		right: 0;
		top: 40upx;
		font-size: 30upx;
		color: #D2D2D2;
		text-align: right;
	}
	.Investor-field {
		width: 100%;
		height: 122upx;
		background: #FFFFFF;
	}
	
	.Investor-field-box {
		width: 90%;
		height: 100%;
		border-bottom: 2upx solid #F5F5F5;
		margin: 0 auto;
		display: flex;
		position: relative;
	}
	
	.Investor-field-box view:nth-of-type(1) {
		width: 20upx;
		height: 20upx;
		padding-top: 26upx;
	}
	
	.Investor-field-box view:nth-of-type(1) image {
		width: 100%;
		height: 100%;
	}
	
	.Investor-field-box view:nth-of-type(2) {
		width: 152upx;
		height: 32upx;
		font-size: 30upx;
		color: #2E2E30;
		padding-top: 30upx;
		padding-left: 10upx;
	}
	
	.Investor-field-box view:nth-of-type(3) {
		width: 200upx;
		height: 35upx;
		position: absolute;
		right: 40upx;
		top: 40upx;
		font-size: 30upx;
		color: #D2D2D2;
		text-align: right;
	}
	
	.Investor-field-box view:nth-of-type(4) {
		position: absolute;
		right: 0;
		top: 40upx;
		width: 25upx;
		height: 18upx;
	}
	
	.Investor-field-box view:nth-of-type(4) image {
		width: 100%;
		height: 100%;
	}
</style>
