<template>
	<view class="InvestorList-information">
		<view class="Investor-name">
			<view class="Investor-name-box">
				<view><image :src="xin"></image></view>
				<view>真实姓名</view>
				<view><input type="text" placeholder="请输入" placeholder-style="color:#D2D2D2"/></view>
			</view>
		</view>
		<view class="Investor-wx">
			<view class="Investor-wx-box">
				<view><image :src="xin"></image></view>
				<view>微信号</view>
				<view><input type="text" placeholder="请输入" placeholder-style="color:#D2D2D2"/></view>
			</view>
		</view>
		<view class="Investor-mailbox">
			<view class="Investor-mailbox-box">
				<view><image :src="xin"></image></view>
				<view>邮箱</view>
				<view><input type="text" placeholder="请输入" placeholder-style="color:#D2D2D2"/></view>
			</view>
		</view>
		<view class="Investor-City">
			<view class="Investor-City-box">
				<view><image :src="xin"></image></view>
				<view>常住城市</view>
				<view>
					<picker @change="bindPickerChange" :value="index" :range="array">
						<view class="ziti">{{pickerValue? pickerValue : '请选择'}}</view>
					</picker>
				</view>
				<view><image :src="right"></image></view>
			</view>
		</view>
		<view class="Investor-identity">
			<view class="Investor-identity-box">
				<view><image :src="xin"></image></view>
				<view>投资人身份</view>
				<view>
					<picker @change="bindPickerChange1" :value="index1" :range="array1">
						<view class="ziti">{{pickerValue1? pickerValue1 : '请选择'}}</view>
					</picker>
				</view>
				<view><image :src="right"></image></view>
			</view>
		</view>
		<view class="Investor-field">
			<view class="Investor-field-box">
				<view><image :src="xin"></image></view>
				<view>关注领域</view>
				<view>请选择</view>
				<view><image :src="right"></image></view>
			</view>
		</view>
		<view class="Investor-Rotation">
			<view class="Investor-Rotation-box">
				<view><image :src="xin"></image></view>
				<view>关注轮次</view>
				<view>
					<picker @change="Finan" :value="index" :range="arr">
						<view class="ziti">{{picker? picker : '请选择'}}</view>
					</picker>
				</view>
				<view><image :src="right"></image></view>
			</view>
		</view>
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
		<view class="Investor-Tips">
			上传名片会提高认证成功率
		</view>
		<view class="Investor-Submission">
			<view @tap="gotoSubmissionseccess">
				<view>
					提交
				</view>
			</view>
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
				serverUrl: 'https://img01.iambuyer.com/imgup/upLoad/fileUpload',
				index: 0, // 默认选择第一个
				array: ['中国', '美国', '巴西', '日本'],
				pickerValue: "", // 选中的值
				index1: 0, // 默认选择第一个
				array1: ['个人投资人', '机构投资人'],
				pickerValue1: "", // 选中的值
				arr:[],
				picker: "", // 选中的值
			};
		},
		components: {
			imageUploadOne
		},
		computed: {
		},
		created() {
			this.Financingrounds()
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
			},
			bindPickerChange: function(e) {
				console.log('picker发送选择改变，携带值为', e.target.value);
				this.array.map((items, index) => {
					if(index === e.target.value) {
						this.pickerValue = items;
					}
				})
			},
			bindPickerChange1: function(e) {
				this.array1.map((items, index) => {
					if(index === e.target.value) {
						this.pickerValue1 = items;
					}
				})
			},
			Finan: function(e) {
				
					if(index === e.target.value) {
						this.picker = items;
					}
	
			},
			gotoSubmissionseccess(e) {
				console.log('去' + e + '提交成功');
				uni.navigateTo({
					url: '/modules/pageMy/myList/myListAuthentication/AuthenticationList/Submission-success/Submission-success',
				});
			},
			Financingrounds(){//融资轮次列表
				if (uni.getStorageSync('landRegist')) {
					let landRegistLG = JSON.parse(uni.getStorageSync('landRegist')); // 读取缓存的用户信息
					console.log(landRegistLG.user.id);
					// let params = {}; // 请求总数居时 参数为空
					uni.showLoading({ // 展示loading
						title: '加载中'
					});
					uni.request({
						url: this.api2 + '/field/levelList', //接口地址。
						// data: this.endParams(params),
						method: 'GET',
						header: {
							Authorization: "Bearer " + landRegistLG.token //将token放到请求头中
						},
						success: (response) => {
							uni.hideLoading();
							console.log(response.data.content);
							this.arr=response.data.content
							// console.log(this.arr.name)
							for(var i=0;i<=response.data.content.length;i++){
								this.arr=response.data.content[i].name
								console.log(this.arr)
								return this.arr
							}
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
	.InvestorList-information{
		width: 100%;
		height: 100%;
	}
	input {
		color: #D2D2D2;
	}
	.Investor-name{
		width:100%;
		height: 122upx;
		background: #FFFFFF;
	}
	.Investor-name-box{
		width: 90%;
		height: 100%;
		border-bottom: 2upx solid #F5F5F5;
		margin: 0 auto;
		display: flex;
		position: relative;
	}
	.Investor-name-box view:nth-of-type(1){
		width: 20upx;
		height: 20upx;
		padding-top: 26upx;
	}
	.Investor-name-box view:nth-of-type(1) image{
		width: 100%;
		height: 100%;
	}
	.Investor-name-box view:nth-of-type(2){
		width: 142upx;
		height: 32upx;
		font-size: 30upx;
		color: #2E2E30;
		padding-top: 30upx;
		padding-left: 10upx;
	}
	.Investor-name-box view:nth-of-type(3){
		width: 200upx;
		height: 35upx;
		position: absolute;
		right: 0;
		top: 40upx;
		font-size: 30upx;
		color: #D2D2D2;
		text-align: right;
	}
	.Investor-wx{
		width:100%;
		height: 122upx;
		background: #FFFFFF;
	}
	.Investor-wx-box{
		width: 90%;
		height: 100%;
		border-bottom: 2upx solid #F5F5F5;
		margin: 0 auto;
		display: flex;
		position: relative;
	}
	.Investor-wx-box view:nth-of-type(1){
		width: 20upx;
		height: 20upx;
		padding-top: 26upx;
	}
	.Investor-wx-box view:nth-of-type(1) image{
		width: 100%;
		height: 100%;
	}
	.Investor-wx-box view:nth-of-type(2){
		width: 142upx;
		height: 32upx;
		font-size: 30upx;
		color: #2E2E30;
		padding-top: 30upx;
		padding-left: 10upx;
	}
	.Investor-wx-box view:nth-of-type(3){
		width: 200upx;
		height: 35upx;
		position: absolute;
		right: 0;
		top: 40upx;
		font-size: 30upx;
		color: #D2D2D2;
		text-align: right;
	}
	.Investor-mailbox{
		width:100%;
		height: 122upx;
		background: #FFFFFF;
	}
	.Investor-mailbox-box{
		width: 90%;
		height: 100%;
		border-bottom: 2upx solid #F5F5F5;
		margin: 0 auto;
		display: flex;
		position: relative;
	}
	.Investor-mailbox-box view:nth-of-type(1){
		width: 20upx;
		height: 20upx;
		padding-top: 26upx;
	}
	.Investor-mailbox-box view:nth-of-type(1) image{
		width: 100%;
		height: 100%;
	}
	.Investor-mailbox-box view:nth-of-type(2){
		width: 142upx;
		height: 32upx;
		font-size: 30upx;
		color: #2E2E30;
		padding-top: 30upx;
		padding-left: 10upx;
	}
	.Investor-mailbox-box view:nth-of-type(3){
		width: 200upx;
		height: 35upx;
		position: absolute;
		right: 0;
		top: 40upx;
		font-size: 30upx;
		color: #D2D2D2;
		text-align: right;
	}
	.ziti{
		position: absolute;
		right: 0upx;
		width: 300upx !important;
		height: 30upx;
		top: -30upx;
		font-size: 30upx !important;
	}
	.Investor-City{
		width:100%;
		height: 122upx;
		background: #FFFFFF;
	}
	.Investor-City-box{
		width: 90%;
		height: 100%;
		border-bottom: 2upx solid #F5F5F5;
		margin: 0 auto;
		display: flex;
		position: relative;
	}
	.Investor-City-box view:nth-of-type(1){
		width: 20upx;
		height: 20upx;
		padding-top: 26upx;
	}
	.Investor-City-box view:nth-of-type(1) image{
		width: 100%;
		height: 100%;
	}
	.Investor-City-box view:nth-of-type(2){
		width: 142upx;
		height: 32upx;
		font-size: 30upx;
		color: #2E2E30;
		padding-top: 30upx;
		padding-left: 10upx;
	}
	.Investor-City-box view:nth-of-type(3){
		width: 100upx;
		height: 35upx;
		position: absolute;
		right: 40upx;
		top: 40upx;
		
		color: #D2D2D2;
		text-align: right;
	}
	.Investor-City-box view:nth-of-type(4){
		position: absolute;
		right: 0;
		top: 40upx;
		width: 25upx;
		height: 18upx;
	}.Investor-City-box view:nth-of-type(4) image{
		width: 100%;
		height: 100%;
	}
	.Investor-identity{
		width:100%;
		height: 122upx;
		background: #FFFFFF;
	}
	.Investor-identity-box{
		width: 90%;
		height: 100%;
		border-bottom: 2upx solid #F5F5F5;
		margin: 0 auto;
		display: flex;
		position: relative;
	}
	.Investor-identity-box view:nth-of-type(1){
		width: 20upx;
		height: 20upx;
		padding-top: 26upx;
	}
	.Investor-identity-box view:nth-of-type(1) image{
		width: 100%;
		height: 100%;
	}
	.Investor-identity-box view:nth-of-type(2){
		width: 152upx;
		height: 32upx;
		font-size: 30upx;
		color: #2E2E30;
		padding-top: 30upx;
		padding-left: 10upx;
	}
	.Investor-identity-box view:nth-of-type(3){
		width: 200upx;
		height: 35upx;
		position: absolute;
		right: 40upx;
		top: 40upx;
		font-size: 30upx;
		color: #D2D2D2;
		text-align: right;
	}
	.Investor-identity-box view:nth-of-type(4){
		position: absolute;
		right: 0;
		top: 40upx;
		width: 25upx;
		height: 18upx;
	}.Investor-identity-box view:nth-of-type(4) image{
		width: 100%;
		height: 100%;
	}
	.Investor-field{
		width:100%;
		height: 122upx;
		background: #FFFFFF;
		margin-top: 20upx;
	}
	.Investor-field-box{
		width: 90%;
		height: 100%;
		border-bottom: 2upx solid #F5F5F5;
		margin: 0 auto;
		display: flex;
		position: relative;
	}
	.Investor-field-box view:nth-of-type(1){
		width: 20upx;
		height: 20upx;
		padding-top: 26upx;
	}
	.Investor-field-box view:nth-of-type(1) image{
		width: 100%;
		height: 100%;
	}
	.Investor-field-box view:nth-of-type(2){
		width: 152upx;
		height: 32upx;
		font-size: 30upx;
		color: #2E2E30;
		padding-top: 30upx;
		padding-left: 10upx;
	}
	.Investor-field-box view:nth-of-type(3){
		width: 200upx;
		height: 35upx;
		position: absolute;
		right: 40upx;
		top: 40upx;
		font-size: 30upx;
		color: #D2D2D2;
		text-align: right;
	}
	.Investor-field-box view:nth-of-type(4){
		position: absolute;
		right: 0;
		top: 40upx;
		width: 25upx;
		height: 18upx;
	}.Investor-field-box view:nth-of-type(4) image{
		width: 100%;
		height: 100%;
	}
	.Investor-Rotation{
		width:100%;
		height: 122upx;
		background: #FFFFFF;
	}
	.Investor-Rotation-box{
		width: 90%;
		height: 100%;
		border-bottom: 2upx solid #F5F5F5;
		margin: 0 auto;
		display: flex;
		position: relative;
	}
	.Investor-Rotation-box view:nth-of-type(1){
		width: 20upx;
		height: 20upx;
		padding-top: 26upx;
	}
	.Investor-Rotation-box view:nth-of-type(1) image{
		width: 100%;
		height: 100%;
	}
	.Investor-Rotation-box view:nth-of-type(2){
		width: 152upx;
		height: 32upx;
		font-size: 30upx;
		color: #2E2E30;
		padding-top: 30upx;
		padding-left: 10upx;
	}
	.Investor-Rotation-box view:nth-of-type(3){
		width: 200upx;
		height: 35upx;
		position: absolute;
		right: 40upx;
		top: 40upx;
		font-size: 30upx;
		color: #D2D2D2;
		text-align: right;
	}
	.Investor-Rotation-box view:nth-of-type(4){
		position: absolute;
		right: 0;
		top: 40upx;
		width: 25upx;
		height: 18upx;
	}.Investor-Rotation-box view:nth-of-type(4) image{
		width: 100%;
		height: 100%;
	}
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
	.Investor-Tips {
		width: 90%;
		height: 25upx;
		margin: 0 auto;
		font-size: 24upx;
		color: #9B9B9B;
	}
	.Investor-Submission {
		width: 100%;
		height: 122upx;
		background: #FFFFFF;
		bottom: 0;
		position: absolute;
	}
	
	.Investor-Submission view:nth-of-type(1) view {
		width: 690upx;
		height: 90upx;
		background: #02C2A2;
		border-radius: 2px;
		margin-top: 20upx;
		text-align: center;
		line-height: 90upx;
		font-size: 28upx;
		color: #FFFFFF;
	}
	.Investor-Submission view:nth-of-type(1){
		margin: 0 auto;
	}
</style>
