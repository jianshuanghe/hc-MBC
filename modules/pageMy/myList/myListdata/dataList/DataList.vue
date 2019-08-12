<template>
	<view class="DataList">
		<view class="dataHeadportrait">
			<view>
				头像
				<image :src="right"></image>
			</view>
			<view>
				<image :src="Listdata.headImg" v-if="!logo" class="ziti"></image>
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
		</view>
		<view class="dataname">
			<view>
				<view>名字</view>
				<view><input v-model="name" placeholder="请填写"/></view>
				<view><image :src="right"></image></view>
			</view>
		</view>
		<view class="dataNumber">
			<view>
				<view>手机号</view>
				<view>{{Listdata.userPhone}}</view>
				<view><image :src="right"></image></view>
			</view>
		</view>
		<view class="dataMailbox">
			<view>
				<view>邮箱</view>
				<view><input v-model="mail" placeholder="请填写"/></view>
				<view><image :src="right"></image></view>
			</view>
		</view>
		<view class="datatijiao">
			<view @tap="subminsdata">提交</view>
		</view>
	</view>
	
</template>

<script>
	import right from '@/static/mbcImg/my/right.png'
	import green from '@/static/mbcImg/my/green.png'
	import imageUploadOne from '@/components/imageUpload/imageUploadOne.vue'
	import { mapMutations,mapGetters } from 'vuex';
	export default {
		data() {
			return {
				logo: '',
				right:right,
				green:green,
				name:'',
				mail:'',
				Listdata: [],
				imageData : [],
				serverUrl: 'https://img01.iambuyer.com/imgup/upLoad/fileUpload'
			};
		},
		components: {
			imageUploadOne
		},
		computed: {
			...mapGetters(['GET_MY'])
		},
		watch: {
			GET_MY: {
				handler(a, b) {
					console.log(a, b, 'header----list');
				},
				deep: true
			}
		},
		created() {
			
			this.Listdata = this.GET_MY.MyList.header;
			this.name=this.Listdata.userName
			this.mail=this.Listdata.userEmail
			console.log(this.Listdata, 'this.Listdata');
		},
		mounted() {},
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
			},
			subminsdata(){
				console.log(this.name)
				if (uni.getStorageSync('landRegist')) {
					let landRegistLG = JSON.parse(uni.getStorageSync('landRegist')); // 读取缓存的用户信息
					console.log(landRegistLG.user.id);
					// let params = {
					// 	userId:760,
					// 	headImg:this.logo,
					// 	userName:this.name,
					// 	email:this.mail
					// }; // 请求总数居时 参数为空
					uni.showLoading({ // 展示loading
						title: '加载中'
					});
					uni.request({
						url: this.api2 + '/user/760' ,data:{
							userId:760,
							userName:this.name
						}, //接口地址。
						// data: this.endParams(params),
						method: 'POST',
						header: {
							Authorization: "Bearer " + landRegistLG.token //将token放到请求头中
						},
						success: (response) => {
							uni.hideLoading();
							console.log(response.data);
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
	.ziti{
		position: absolute;
		right: 0upx;
		width: 300upx;
		height: 30upx;
		font-size: 30upx;
	}
	.DataList{
		width: 100%;
		height: 100%;
	}
	.dataHeadportrait{
		width: 100%;
		height: 120upx;
		background: #FFFFFF;
		/* margin-top: 20upx; */
	}
	.dataHeadportrait view:nth-of-type(1){
		width: 90%;
		height: 100%;
		margin: 0 auto;
		border-bottom: 2upx solid #F5F5F5;
		font-size: 28upx;
		color: #2E2E30;
		line-height: 120upx;
		position: relative;
	}
	.dataHeadportrait view:nth-of-type(1) image{
		width: 18upx;
		height: 18upx;
		position: absolute;
		right: 0upx;
		top: 52upx;
	}
	.dataHeadportrait view:nth-of-type(2){
		width: 80upx;
		height: 80upx;
		position: absolute;
		top:22upx;
		right: 86upx;
	}
	.dataHeadportrait view:nth-of-type(2) image{
		width: 100%;
		height: 100%;
	}
	.dataname{
		width: 100%;
		height: 120upx;
		background: #FFFFFF;
		/* display: flex; */
		/* position: relative; */
		/* margin-top: 20upx; */
	}
	.dataname view:nth-of-type(1){
		width: 90%;
		height: 100%;
		margin: 0 auto;
		border-bottom: 2upx solid #F5F5F5;
		position: relative;
		line-height: 120upx;
		display: flex;
	}
	.dataname view:nth-of-type(1) view:nth-of-type(1){
		font-size: 28upx;
		color: #2E2E30;
	}
	.dataname view:nth-of-type(1) view:nth-of-type(2){
		width: 300upx;
		height: 100%;
		font-size: 28upx;
		text-align: right;
		margin-right: 30upx;
		color: #3C3D3F;
	}
	.dataname view:nth-of-type(1) view:nth-of-type(2) input{
		margin-top: 40upx;
	}
	.dataname view:nth-of-type(1) view:nth-of-type(3){
		width: 25upx;
		height: 18upx;
		padding-top: 30upx;
	}
	.dataname view:nth-of-type(1) view:nth-of-type(3) image{
		width: 100%;
		height: 100%;
	}
	.dataNumber{
		width: 100%;
		height: 120upx;
		background: #FFFFFF;
		/* display: flex; */
		/* position: relative; */
		/* margin-top: 20upx; */
	}
	.dataNumber view:nth-of-type(1){
		width: 90%;
		height: 100%;
		margin: 0 auto;
		border-bottom: 2upx solid #F5F5F5;
		position: relative;
		line-height: 120upx;
		display: flex;
	}
	.dataNumber view:nth-of-type(1) view:nth-of-type(1){
		font-size: 28upx;
		color: #2E2E30;
	}
	.dataNumber view:nth-of-type(1) view:nth-of-type(2){
		width: 200upx;
		height: 100%;
		font-size: 28upx;
		line-height: 120upx;
		text-align: right;
		margin-right: 30upx;
		color: #3C3D3F;
	}
	.dataNumber view:nth-of-type(1) view:nth-of-type(3){
		width: 25upx;
		height: 18upx;
		padding-top: 30upx;
	}
	.dataNumber view:nth-of-type(1) view:nth-of-type(3) image{
		width: 100%;
		height: 100%;
	}
	.dataMailbox{
		width: 100%;
		height: 120upx;
		background: #FFFFFF;
	}
	.dataMailbox view:nth-of-type(1){
		width: 90%;
		height: 100%;
		margin: 0 auto;
		border-bottom: 2upx solid #F5F5F5;
		position: relative;
		line-height: 120upx;
		display: flex;
	}
	.dataMailbox view:nth-of-type(1) view:nth-of-type(1){
		font-size: 28upx;
		color: #2E2E30;
	}
	.dataMailbox view:nth-of-type(1) view:nth-of-type(2){
		width: 400upx;
		height: 100%;
		font-size: 28upx;
		line-height: 120upx;
		text-align: right;
		margin-right: 30upx;
		color: #D2D2D2;
	}
	.dataMailbox view:nth-of-type(1) view:nth-of-type(2) input{
		margin-top: 40upx;
	}
	.dataMailbox view:nth-of-type(1) view:nth-of-type(3){
		width: 25upx;
		height: 18upx;
		padding-top: 30upx;
	}
	.dataMailbox view:nth-of-type(1) view:nth-of-type(3) image{
		width: 100%;
		height: 100%;
	}
	.datatijiao{
		width: 100%;
		height: 120upx;
		background: #FFFFFF;
		position: absolute;
		bottom: 0;
	}
	.datatijiao view:nth-of-type(1){
		width: 90%;
		height: 80%;
		background: #02C2A2;
		margin: 15upx auto 10upx auto ;
		text-align: center;
		line-height: 96upx;
		font-size: 32upx;
		color: #FFFFFF;
	}
</style>
