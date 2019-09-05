<template>
	<view class="EntrepreneursList-information">
		<view class="Entrepreneurs-name">
			<view class="Entrepreneurs-name-box">
				<view><image :src="xin"></image></view>
				<view>真实姓名</view>
				<view><input type="text" placeholder="请输入" placeholder-style="color:#D2D2D2" v-model="name"/></view>
			</view>
		</view>
		<view class="Entrepreneurs-wx">
			<view class="Entrepreneurs-wx-box">
				<view><image :src="xin"></image></view>
				<view>微信号</view>
				<view><input type="text" placeholder="请输入" placeholder-style="color:#D2D2D2" v-model="wx"/></view>
			</view>
		</view>
		<view class="Entrepreneurs-mailbox">
			<view class="Entrepreneurs-mailbox-box">
				<view><image :src="xin"></image></view>
				<view>邮箱</view>
				<view><input type="text" placeholder="请输入" placeholder-style="color:#D2D2D2" v-model="mailbox"/></view>
			</view>
		</view>
		<view class="Entrepreneurs-project">
			<view class="Entrepreneurs-project-box">
				<view><image :src="xin"></image></view>
				<view>项目</view>
				<view><input type="text" placeholder="请输入" placeholder-style="color:#D2D2D2" v-model="project"/></view>
			</view>
		</view>
		<view class="Entrepreneurs-company">
			<view class="Entrepreneurs-company-box">
				<view><image :src="xin"></image></view>
				<view>公司名称</view>
				<view><input type="text" placeholder="请输入" placeholder-style="color:#D2D2D2" v-model="company"/></view>
			</view>
		</view>
		<view class="Entrepreneurs-position">
			<view class="Entrepreneurs-position-box">
				<view><image :src="xin"></image></view>
				<view>职位</view>
				<view><input type="text" placeholder="请输入" placeholder-style="color:#D2D2D2" v-model="position"/></view>
			</view>
		</view>
		<view class="BI-items">
			<view class="left BI-items-left">
				<view class="mustFill">
					<image :src='xin'></image>
				</view>
				<view class="BI-text-left">上传名片</view>
			</view>
			<view class="right BI-items-right">
				<view class="BI-text-right">
					<view class="zitia" v-if="!logo">点击上传</view>
					<view class="Img-logo">
						<!-- 图片上传 -->
						<view class="Img-Upload">
							<imageUploadOne v-model="imageData" :server-url="serverUrl" limit=1 @delete="deleteImage" @add="addImage">
							</imageUploadOne>
						</view>
					</view>
					<image :src="right" class="BI-rightArrow"></image>
				</view>
			</view>
			<view class="clear"></view>
		</view>
		<view class="Entrepreneurs-Tips">
			上传名片会提高认证成功率
		</view>
		<view class="Entrepreneurs-Submission">
			<view>
				<view @tap="gotoSubmissionseccess">
					提交
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
				name:'',
				wx:'',
				mailbox:'',
				project:'',
				company:'',
				position:'',
				logo: '',
				xin:this.Static + 'mbcImg/common/xing.png',
				right:this.Static + 'mbcImg/my/right.png',
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
			getHeader() {
				if (uni.getStorageSync('landRegist')) {
					let landRegistLG = JSON.parse(uni.getStorageSync('landRegist')); // 读取缓存的用户信息
					console.log(landRegistLG.user.id);
					// let params = {}; // 请求总数居时 参数为空
					uni.showLoading({ // 展示loading
						title: '加载中'
					});
					uni.request({
						url: this.api2 + '/user/' + landRegistLG.user.id, //接口地址。
						// data: this.endParams(params),
						method: 'GET',
						header: {
							Authorization: "Bearer " + landRegistLG.token //将token放到请求头中
						},
						success: (response) => {
							uni.hideLoading();
							console.log(response.data);
							this.List=response.data.content
							this.$store.commit('setheader', this.List); // 更新vuex
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
			deleteImage: function(e){
				console.log(e, '删除图片')
				this.logo = ''; // 清空数据
			},
			addImage: function(e){
				console.log(e, '添加图片')
				if(e.allImages) { // 上传成功
				console.log(e);
					this.logo = (e.allImages[0].imgName);
				}
			},
			gotoSubmissionseccess(e) {
				console.log('去' + e + '提交成功');
				if(this.name===''){
					uni.showToast({
						title: '姓名不能为空,请重填',
						icon: 'none',
						duration: 1000
					});
					return false;
				}else if(this.wx===''){
					uni.showToast({
						title: '微信号不能为空,请重填',
						icon: 'none',
						duration: 1000
					});
					return false;
				}else if(this.mailbox===''){
					uni.showToast({
						title: '邮箱不能为空,请重填',
						icon: 'none',
						duration: 1000
					});
					return false;
				}else if(!/^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/.test(this.mailbox)){
					uni.showToast({
						title: '邮箱格式有误,请重填',
						icon: 'none',
						duration: 1000
					});
					return false;
				}else if(this.project===''){
					uni.showToast({
						title: '项目不能为空,请重填',
						icon: 'none',
						duration: 1000
					});
					return false;
				}else if(this.company===''){
					uni.showToast({
						title: '公司名称不能为空,请重填',
						icon: 'none',
						duration: 1000
					});
					return false;
				}else if(this.position===''){
					uni.showToast({
						title: '公司职位不能为空,请重填',
						icon: 'none',
						duration: 1000
					});
					return false;
				}else if(this.logo===''){
					uni.showToast({
						title: '名片原件不能为空,请重填',
						icon: 'none',
						duration: 1000
					});
					return false;
				}else{
					if (uni.getStorageSync('landRegist')) {
						let landRegistLG = JSON.parse(uni.getStorageSync('landRegist')); // 读取缓存的用户信息
						console.log(landRegistLG.user.id);
						let params = {
							userId:landRegistLG.user.id,
							userName:this.name,
							email:this.mailbox,
							wxCode:this.wx,
							position:this.position,
							compName:this.company,
							userProj:this.project,
							userType:0,
							userCard:this.logo
						}; // 请求总数居时 参数为空
						uni.showLoading({ // 展示loading
							title: '加载中'
						});
						uni.request({
							url: this.api2 + '/auth/add', //接口地址。
							data: this.endParams(params),
							method: 'POST',
							header: {
								Authorization: "Bearer " + landRegistLG.token //将token放到请求头中
							},
							success: (response) => {
								uni.hideLoading();
								console.log(response.data);
								this.getHeader()
								
								uni.navigateTo({
									'url':'../../AuthenticationList/Submission-success/Submission-success'
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
				// uni.navigateTo({
				// 	url: '/modules/pageMy/myList/myListAuthentication/AuthenticationList/Submission-success/Submission-success',
				// });
			}
		}
	};
</script>

<style>
	.zitia {
		position: absolute;
		right: 50upx !important;
		height: 30upx;
		top: 30upx;
		font-size: 30upx !important;
		color: #D2D2D2
	}
	.BI-items {
		position: relative;
		width: 100%;
		margin: 0 auto;
		background: #FFFFFF;
	}
	
	.BI-items-left {
		position: relative;
		width: 36%;
	}
	
	.BI-text-left {
		position: relative;
		font-family: PingFang-SC-Medium;
		font-size: 30upx;
		color: #2E2E30;
		letter-spacing: 0;
		padding: 0px;
		margin-top: 44upx;
		margin-bottom: 44upx;
		line-height: 36upx;
		margin-left: 70upx
	}
	
	.BI-items-right {
		position: relative;
		width: 64%;
	}
	
	.BI-text-right {
		position: relative;
		width: 90%;
		margin-top: 44upx;
		margin-bottom: 44upx;
		margin: 0 auto;
	}
	
	.Img-Upload {
		width: 120upx;
		height: 80upx;
		position: absolute;
		right: 28upx;
		top: 30upx !important;
	}
	
	.mustFill {
		position: absolute;
		left: 40upx;
		top: 10upx;
	}
	
	.mustFill>image {
		position: relative;
		width: 20upx;
		height: 20upx;
		top: 20upx;
	}
	
	.uni-input-wrapper {
		text-align: right;
	}
	
	.BI-rightArrow {
		position: absolute;
		width: 25upx;
		height: 18upx;
		right: 15upx;
		top: 50upx;
	}
	
	.uni-input-placeholder {
		color: #D2D2D2 !important;
	}
	
	.InvestorList-information {
		width: 100%;
		height: 100%;
		padding-bottom: 200upx;
	}
	.EntrepreneursList-information{
		width: 100%;
		height: 100%;
	}
	.Entrepreneurs-name{
		width:100%;
		height: 122upx;
		background: #FFFFFF;
	}
	.Entrepreneurs-name-box{
		width: 90%;
		height: 100%;
		border-bottom: 2upx solid #F5F5F5;
		margin: 0 auto;
		display: flex;
		position: relative;
	}
	.Entrepreneurs-name-box view:nth-of-type(1){
		width: 20upx;
		height: 20upx;
		padding-top: 26upx;
	}
	.Entrepreneurs-name-box view:nth-of-type(1) image{
		width: 100%;
		height: 100%;
	}
	.Entrepreneurs-name-box view:nth-of-type(2){
		width: 142upx;
		height: 32upx;
		font-size: 30upx;
		color: #2E2E30;
		padding-top: 30upx;
		padding-left: 10upx;
	}
	.Entrepreneurs-name-box view:nth-of-type(3){
		width: 200upx;
		height: 35upx;
		position: absolute;
		right: 0;
		top: 40upx;
		font-size: 30upx;
		color: #D2D2D2;
		text-align: right;
	}
	.Entrepreneurs-wx{
		width:100%;
		height: 122upx;
		background: #FFFFFF;
	}
	.Entrepreneurs-wx-box{
		width: 90%;
		height: 100%;
		border-bottom: 2upx solid #F5F5F5;
		margin: 0 auto;
		display: flex;
		position: relative;
	}
	.Entrepreneurs-wx-box view:nth-of-type(1){
		width: 20upx;
		height: 20upx;
		padding-top: 26upx;
	}
	.Entrepreneurs-wx-box view:nth-of-type(1) image{
		width: 100%;
		height: 100%;
	}
	.Entrepreneurs-wx-box view:nth-of-type(2){
		width: 142upx;
		height: 32upx;
		font-size: 30upx;
		color: #2E2E30;
		padding-top: 30upx;
		padding-left: 10upx;
	}
	.Entrepreneurs-wx-box view:nth-of-type(3){
		width: 200upx;
		height: 35upx;
		position: absolute;
		right: 0;
		top: 40upx;
		font-size: 30upx;
		color: #D2D2D2;
		text-align: right;
	}
	.Entrepreneurs-mailbox{
		width:100%;
		height: 122upx;
		background: #FFFFFF;
	}
	.Entrepreneurs-mailbox-box{
		width: 90%;
		height: 100%;
		border-bottom: 2upx solid #F5F5F5;
		margin: 0 auto;
		display: flex;
		position: relative;
	}
	.Entrepreneurs-mailbox-box view:nth-of-type(1){
		width: 20upx;
		height: 20upx;
		padding-top: 26upx;
	}
	.Entrepreneurs-mailbox-box view:nth-of-type(1) image{
		width: 100%;
		height: 100%;
	}
	.Entrepreneurs-mailbox-box view:nth-of-type(2){
		width: 142upx;
		height: 32upx;
		font-size: 30upx;
		color: #2E2E30;
		padding-top: 30upx;
		padding-left: 10upx;
	}
	.Entrepreneurs-mailbox-box view:nth-of-type(3){
		width: 300upx;
		height: 35upx;
		position: absolute;
		right: 0;
		top: 40upx;
		font-size: 30upx;
		color: #D2D2D2;
		text-align: right;
	}
	.Entrepreneurs-project{
		width:100%;
		height: 122upx;
		background: #FFFFFF;
		
	}
	.Entrepreneurs-project-box{
		width: 90%;
		height: 100%;
		border-bottom: 2upx solid #F5F5F5;
		margin: 0 auto;
		display: flex;
		position: relative;
	}
	.Entrepreneurs-project-box view:nth-of-type(1){
		width: 20upx;
		height: 20upx;
		padding-top: 26upx;
	}
	.Entrepreneurs-project-box view:nth-of-type(1) image{
		width: 100%;
		height: 100%;
	}
	.Entrepreneurs-project-box view:nth-of-type(2){
		width: 142upx;
		height: 32upx;
		font-size: 30upx;
		color: #2E2E30;
		padding-top: 30upx;
		padding-left: 10upx;
	}
	.Entrepreneurs-project-box view:nth-of-type(3){
		width: 200upx;
		height: 35upx;
		position: absolute;
		right: 0;
		top: 40upx;
		font-size: 30upx;
		color: #D2D2D2;
		text-align: right;
	}
	.Entrepreneurs-company{
		width:100%;
		height: 122upx;
		background: #FFFFFF;
	}
	.Entrepreneurs-company-box{
		width: 90%;
		height: 100%;
		border-bottom: 2upx solid #F5F5F5;
		margin: 0 auto;
		display: flex;
		position: relative;
	}
	.Entrepreneurs-company-box view:nth-of-type(1){
		width: 20upx;
		height: 20upx;
		padding-top: 26upx;
	}
	.Entrepreneurs-company-box view:nth-of-type(1) image{
		width: 100%;
		height: 100%;
	}
	.Entrepreneurs-company-box view:nth-of-type(2){
		width: 142upx;
		height: 32upx;
		font-size: 30upx;
		color: #2E2E30;
		padding-top: 30upx;
		padding-left: 10upx;
	}
	.Entrepreneurs-company-box view:nth-of-type(3){
		width: 200upx;
		height: 35upx;
		position: absolute;
		right: 0;
		top: 40upx;
		font-size: 30upx;
		color: #D2D2D2;
		text-align: right;
	}
	.Entrepreneurs-position{
		width:100%;
		height: 122upx;
		background: #FFFFFF;
	}
	.Entrepreneurs-position-box{
		width: 90%;
		height: 100%;
		border-bottom: 2upx solid #F5F5F5;
		margin: 0 auto;
		display: flex;
		position: relative;
	}
	.Entrepreneurs-position-box view:nth-of-type(1){
		width: 20upx;
		height: 20upx;
		padding-top: 26upx;
	}
	.Entrepreneurs-position-box view:nth-of-type(1) image{
		width: 100%;
		height: 100%;
	}
	.Entrepreneurs-position-box view:nth-of-type(2){
		width: 142upx;
		height: 32upx;
		font-size: 30upx;
		color: #2E2E30;
		padding-top: 30upx;
		padding-left: 10upx;
	}
	.Entrepreneurs-position-box view:nth-of-type(3){
		width: 200upx;
		height: 35upx;
		position: absolute;
		right: 0;
		top: 40upx;
		font-size: 30upx;
		color: #D2D2D2;
		text-align: right;
	}
	.Entrepreneurs-Tips {
		width: 90%;
		height: 25upx;
		margin: 20upx auto;
		font-size: 24upx;
		color: #9B9B9B;
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
	.ziti{
		position: absolute;
		right: 0upx;
		width: 300upx !important;
		height: 30upx;
		top: -30upx;
		font-size: 30upx !important;
	}
	.Entrepreneurs-card{
		width:100%;
		height: 122upx;
		background: #FFFFFF;
		margin-top: 40upx;
	}
	.Entrepreneurs-card-box{
		width: 90%;
		height: 100%;
		border-bottom: 2upx solid #F5F5F5;
		margin: 0 auto;
		display: flex;
		position: relative;
	}
	.Entrepreneurs-card-box view:nth-of-type(1){
		width: 20upx;
		height: 20upx;
		padding-top: 26upx;
	}
	.Entrepreneurs-card-box view:nth-of-type(1) image{
		width: 100%;
		height: 100%;
	}
	.Entrepreneurs-card-box view:nth-of-type(2){
		width: 142upx;
		height: 32upx;
		font-size: 30upx;
		color: #2E2E30;
		padding-top: 30upx;
		padding-left: 10upx;
	}
	.Entrepreneurs-card-box view:nth-of-type(3){
		width: 200upx;
		height: 35upx;
		position: absolute;
		right: 40upx;
		top: 40upx;
		font-size: 30upx;
		color: #D2D2D2;
		text-align: right;
	}
	.Entrepreneurs-card-box view:nth-of-type(4){
		position: absolute;
		right: 0;
		top: 40upx;
		width: 25upx;
		height: 18upx;
	}.Entrepreneurs-card-box view:nth-of-type(4) image{
		width: 100%;
		height: 100%;
	}
	.Entrepreneurs-Submission {
		width: 100%;
		height: 122upx;
		background: #FFFFFF;
		bottom: 0;
		position: absolute;
	}
	
	.Entrepreneurs-Submission view:nth-of-type(1) view {
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
	.Entrepreneurs-Submission view:nth-of-type(1){
		margin: 0 auto;
	}
</style>
