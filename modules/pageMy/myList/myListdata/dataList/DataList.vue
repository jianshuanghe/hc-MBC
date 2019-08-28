<template>
	<view class="DataList">
		<view class="BI-items">
			<view class="left BI-items-left">
				<view class="mustFill">
					<image></image>
				</view>
				<view class="BI-text-left">头像</view>
			</view>
			<view class="right BI-items-right">
				<view class="BI-text-right">
					<image class="ziti" v-if="!logo" :src="Listdata.headImg">点击上传</image>
					<view class="Img-logo">
						<!-- 图片上传 -->
						<view class="Img-Upload">
							<imageUploadOne 
								v-model="imageData" :server-url="serverUrl" limit=1 @delete="deleteImage" @add="addImage">
							</imageUploadOne>
						</view>
					</view>
					<image :src="right" class="BI-rightArrow"></image>
				</view>
			</view>
			<view class="clear"></view>
		</view>
		<view class="dataname">
			<view>
				<view>名字</view>
				<view><input v-model="name" placeholder="请填写" /></view>
				<view>
					<image :src="right"></image>
				</view>
			</view>
		</view>
		<view class="dataname-two">
			<view>
				<view>微信号</view>
				<view><input v-model="wx" placeholder="请填写" /></view>
				<view>
					<image :src="right"></image>
				</view>
			</view>
		</view>
		<view class="dataNumber">
			<view>
				<view>手机号</view>
				<view>{{Listdata.userPhone}}</view>
				<view>
					<image :src="right"></image>
				</view>
			</view>
		</view>
		<view class="dataMailbox">
			<view>
				<view>邮箱</view>
				<view><input v-model="mail" placeholder="请填写" /></view>
				<view>
					<image :src="right"></image>
				</view>
			</view>
		</view>
		<view class="datatijiao">
			<view @tap="subminsdata">提交</view>
		</view>
	</view>

</template>

<script>
	import right from '@/static/mbcImg/my/right.png'
	import imageUploadOne from '@/components/imageUpload/imageUploadOne.vue'
	import {
		mapMutations,
		mapGetters
	} from 'vuex';
	export default {
		data() {
			return {
				List: [],
				logo: '',
				right: this.Static + 'mbcImg/my/right.png',
				name: '',
				mail: '',
				Listdata: [],
				imageData: [],
				serverUrl: 'https://img01.iambuyer.com/imgup/upLoad/fileUpload',
				logo2:'',
				wx:''
			};
		},
		components: {
			imageUploadOne
		},
		computed: {
			...mapGetters(['GET_MY'])
		},
		created() {

			this.Listdata = this.GET_MY.MyList.header;
			this.name = this.Listdata.userName
			this.mail = this.Listdata.userEmail
			this.wx=this.Listdata.userWx
			console.log(this.Listdata, 'this.Listdata');
		},

		methods: {
			deleteImage: function(e) {
				console.log(e, '删除图片')
				this.logo = ''; // 清空数据
			},
			addImage: function(e) {
				console.log(e, '添加图片')
				if (e.allImages) { // 上传成功
					// console.log(e.allImages[0].imgName)
					this.logo = (e.allImages[0].imgName);
					this.logo2=(e.allImages[0].imgUrl)
				}
			},
			subminsdata() {
				console.log(this.name)
				if (uni.getStorageSync('landRegist')) {
					let landRegistLG = JSON.parse(uni.getStorageSync('landRegist')); // 读取缓存的用户信息
					console.log(landRegistLG.user.id);
					let params = {
						userId: landRegistLG.user.id,
						headImg: this.Listdata.headImg,
						userName: this.name,
						email: this.mail,
						user:this.wx
					}; // 请求总数居时 参数为空
					console.log(landRegistLG.user.id, this.logo, this.name, this.mail)
					uni.showLoading({ // 展示loading
						title: '加载中'
					});
					uni.request({
						url: this.api2 + '/user/' + landRegistLG.user.id, //接口地址。
						data: this.endParams(params),
						method: 'POST',
						header: {
							Authorization: "Bearer " + landRegistLG.token //将token放到请求头中
						},
						success: (response) => {
							uni.hideLoading();
							console.log(response.data);
							// let muabout=this.GET_MY.MyList.header
							// muabout=params
							// params.headImg=this.logo2
							this.$store.commit('setMation',params)
							wx.navigateBack({
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
	.BI-items{
		position: relative;
		width: 100%;
		height: 120upx;
		background: #FFFFFF;
	}
	.BI-items-left{
		position: relative;
		width: 36%;
	}
	.BI-text-left{
		position: relative;
		font-family: PingFang-SC-Medium;
		font-size: 28upx;
		color: #2E2E30;
		letter-spacing: 0;
		padding: 0px;
		margin-top: 44upx;
		margin-bottom: 44upx;
		line-height: 36upx;
		margin-left: 40upx
	}
	.BI-items-right{
		position: relative;
		width: 64%;
	}
	.BI-text-right{
		position: relative;
		width: 100%;
		margin-top: 44upx;
		margin-bottom: 44upx
	}
	.BI-picker{
		position: relative;
		font-family: PingFang-SC-Medium;
		font-size: 28upx;
		color: #D2D2D2;
		overflow: hidden;
		text-overflow: clip;
		white-space: pre;
		word-break: keep-all;
		letter-spacing: 0;
		padding: 0px;
		margin-top: 44upx;
		margin-bottom: 44upx;
		line-height: 36upx;
		margin-left: 24upx;
		text-align: right;
		-webkit-box-flex: 1;
		-webkit-flex: 1;
		-ms-flex: 1;
		flex: 1;
		text-align: right;
		padding-right: 24upx;
		margin-left: 0px;
	}
	.BI-pickered{
		color: #2E2E30 !important;
	}
	.Img-Upload{
		width: 120upx;
		height: 80upx;
		position: absolute;
		right: 80upx;
		top: -20upx;
	}
	.BI-picker-Img{
		width: 80upx;
		height: 80upx;
		position: absolute;
		right: 28upx;
		top: -20upx;
	}
	.mustFill{
		position: absolute;
		left: 0;
	}
	.mustFill>image{
		position: relative;
		width: 14upx;
		height: 14upx;
	}
	.uni-input-wrapper{
		text-align: right;
	}
	.BI-rightArrow{
		position: absolute;
		width: 25upx;
		height: 18upx;
		right: 40upx;
		top: 6upx;
	}
	.ziti {
		position: absolute;
		right: 80upx;
		width: 80upx;
		height: 80upx;
		top: -30upx;
		font-size: 30upx;
	}

	.DataList {
		width: 100%;
		height: 100%;
	}

	.dataHeadportrait {
		width: 100%;
		height: 120upx;
		background: #FFFFFF;
		/* margin-top: 20upx; */
	}

	.dataHeadportrait view:nth-of-type(1) {
		width: 90%;
		height: 100%;
		margin: 0 auto;
		border-bottom: 2upx solid #F5F5F5;
		font-size: 28upx;
		color: #2E2E30;
		line-height: 120upx;
		position: relative;
	}

	.dataHeadportrait view:nth-of-type(1) image {
		width: 18upx;
		height: 18upx;
		position: absolute;
		right: 0upx;
		top: 52upx;
	}

	.dataHeadportrait view:nth-of-type(2) {
		width: 80upx;
		height: 80upx;
		position: absolute;
		top: 22upx;
		right: 86upx;
	}

	.dataHeadportrait view:nth-of-type(2) image {
		width: 100%;
		height: 100%;
	}

	.dataname {
		width: 100%;
		height: 120upx;
		background: #FFFFFF;
	}

	.dataname view:nth-of-type(1) {
		width: 90%;
		height: 100%;
		margin: 0 auto;
		border-bottom: 2upx solid #F5F5F5;
		border-top: 2upx solid #F5F5F5;
		position: relative;
		line-height: 120upx;
		display: flex;
	}

	.dataname view:nth-of-type(1) view:nth-of-type(1) {
		font-size: 28upx;
		color: #2E2E30;
	}

	.dataname view:nth-of-type(1) view:nth-of-type(2) {
		width: 300upx;
		height: 100%;
		font-size: 28upx;
		text-align: right;
		margin-right: 30upx;
		color: #3C3D3F;
	}

	.dataname view:nth-of-type(1) view:nth-of-type(2) input {
		margin-top: 40upx;
	}

	.dataname view:nth-of-type(1) view:nth-of-type(3) {
		width: 25upx;
		height: 18upx;
		padding-top: 30upx;
	}

	.dataname view:nth-of-type(1) view:nth-of-type(3) image {
		width: 100%;
		height: 100%;
	}
	
	.dataname-two {
		width: 100%;
		height: 120upx;
		background: #FFFFFF;
	}

	.dataname-two view:nth-of-type(1) {
		width: 90%;
		height: 100%;
		margin: 0 auto;
		border-bottom: 2upx solid #F5F5F5;
		position: relative;
		line-height: 120upx;
		display: flex;
	}

	.dataname-two view:nth-of-type(1) view:nth-of-type(1) {
		font-size: 28upx;
		color: #2E2E30;
	}

	.dataname-two view:nth-of-type(1) view:nth-of-type(2) {
		width: 300upx;
		height: 100%;
		font-size: 28upx;
		text-align: right;
		margin-right: 30upx;
		color: #3C3D3F;
	}

	.dataname-two view:nth-of-type(1) view:nth-of-type(2) input {
		margin-top: 40upx;
	}

	.dataname-two view:nth-of-type(1) view:nth-of-type(3) {
		width: 25upx;
		height: 18upx;
		padding-top: 30upx;
	}

	.dataname-two view:nth-of-type(1) view:nth-of-type(3) image {
		width: 100%;
		height: 100%;
	}

	.dataNumber {
		width: 100%;
		height: 120upx;
		background: #FFFFFF;
	}

	.dataNumber view:nth-of-type(1) {
		width: 90%;
		height: 100%;
		margin: 0 auto;
		border-bottom: 2upx solid #F5F5F5;
		position: relative;
		line-height: 120upx;
		display: flex;
	}

	.dataNumber view:nth-of-type(1) view:nth-of-type(1) {
		font-size: 28upx;
		color: #2E2E30;
	}

	.dataNumber view:nth-of-type(1) view:nth-of-type(2) {
		width: 200upx;
		height: 100%;
		font-size: 28upx;
		line-height: 120upx;
		text-align: right;
		margin-right: 30upx;
		color: #3C3D3F;
	}

	.dataNumber view:nth-of-type(1) view:nth-of-type(3) {
		width: 25upx;
		height: 18upx;
		padding-top: 30upx;
	}

	.dataNumber view:nth-of-type(1) view:nth-of-type(3) image {
		width: 100%;
		height: 100%;
	}

	.dataMailbox {
		width: 100%;
		height: 120upx;
		background: #FFFFFF;
	}

	.dataMailbox view:nth-of-type(1) {
		width: 90%;
		height: 100%;
		margin: 0 auto;
		border-bottom: 2upx solid #F5F5F5;
		position: relative;
		line-height: 120upx;
		display: flex;
	}

	.dataMailbox view:nth-of-type(1) view:nth-of-type(1) {
		font-size: 28upx;
		color: #2E2E30;
	}

	.dataMailbox view:nth-of-type(1) view:nth-of-type(2) {
		width: 400upx;
		height: 100%;
		font-size: 28upx;
		line-height: 120upx;
		text-align: right;
		margin-right: 30upx;
		color: #D2D2D2;
	}

	.dataMailbox view:nth-of-type(1) view:nth-of-type(2) input {
		margin-top: 40upx;
	}

	.dataMailbox view:nth-of-type(1) view:nth-of-type(3) {
		width: 25upx;
		height: 18upx;
		padding-top: 30upx;
	}

	.dataMailbox view:nth-of-type(1) view:nth-of-type(3) image {
		width: 100%;
		height: 100%;
	}

	.datatijiao {
		width: 100%;
		height: 120upx;
		background: #FFFFFF;
		position: absolute;
		bottom: 0;
	}

	.datatijiao view:nth-of-type(1) {
		width: 90%;
		height: 80%;
		background: #02C2A2;
		margin: 15upx auto 10upx auto;
		text-align: center;
		line-height: 96upx;
		font-size: 32upx;
		color: #FFFFFF;
	}
</style>
