<template>
	<view class="Investor-card">
		<view class="Investor-card-box">
			<view><image :src="xin"></image></view>
			<view>名片原件</view>
			<view>
				<view class="ziti" v-if="!logo">点击上传</view>
				<div class="Img-Upload">
					<imageUploadOne 
					class="img"
						v-model="imageData" 
						:server-url="serverUrl" 
						limit= 1
						@delete="deleteImage" 
						@add="addImage">
					</imageUploadOne>
				</div>
			</view>
			<view><image :src="right"></image></view>
		</view>
	</view>
</template>

<script>
	import right from '@/static/mbcImg/my/right1.png'
	import xin from '@/static/mbcImg/my/Image 1.png'
	import imageUploadOne from '@/components/imageUpload/imageUploadOne.vue'
	export default {
		data() {
			return {
				logo: '',
				xin:xin,
				right:right,
				imageData : [],
				serverUrl: 'https://img01.iambuyer.com/imgup/upLoad/fileUpload'
			};
		},
		components: {
			imageUploadOne
		},
		computed: {
		},
		created() {
			console.log('在组件中并不能使用页面生命周期函数');
		},
		mounted() {
		},
		methods: {
			deleteImage: function(e){
				console.log(e, '删除图片')
				this.logo = ''; // 清空数据
			},
			addImage: function(e){
				console.log(e, '添加图片')
				if(e.allImages) { // 上传成功
					this.logo = (e.allImages[0]);
				}
			}
		}
	};
</script>

<style>
	.Img-Upload{
		width: 120upx !important;
		height: 80upx;
		position: absolute;
		right: 58upx;
		top: -45upx;
		font-size: 226upx;
	}
	.imageUpload{
		width: 200upx !important;
	}
	.ziti{
		position: absolute;
		right: 0upx;
		width: 300upx !important;
		height: 30upx;
		top: -30upx;
		font-size: 30upx !important;
	}
	.Investor-card{
		width:100%;
		height: 122upx;
		background: #FFFFFF;
		margin-top: 20upx;
	}
	.Investor-card-box{
		width: 90%;
		height: 100%;
		border-bottom: 2upx solid #F5F5F5;
		margin: 0 auto;
		display: flex;
		position: relative;
	}
	.Investor-card-box view:nth-of-type(1){
		width: 20upx;
		height: 20upx;
		padding-top: 26upx;
	}
	.Investor-card-box view:nth-of-type(1) image{
		width: 100%;
		height: 100%;
	}
	.Investor-card-box view:nth-of-type(2){
		width: 152upx;
		height: 32upx;
		font-size: 30upx;
		color: #2E2E30;
		padding-top: 30upx;
		padding-left: 10upx;
	}
	.Investor-card-box view:nth-of-type(3){
		width: 200upx;
		height: 35upx;
		position: absolute;
		right: 40upx;
		top: 40upx;
		font-size: 30upx;
		color: #D2D2D2;
		text-align: right;
	}
	.Investor-card-box view:nth-of-type(4){
		position: absolute;
		right: 0;
		top: 40upx;
		width: 25upx;
		height: 18upx;
	}.Investor-card-box view:nth-of-type(4) image{
		width: 100%;
		height: 100%;
	}
</style>
