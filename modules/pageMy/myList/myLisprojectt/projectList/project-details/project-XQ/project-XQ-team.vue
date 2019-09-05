<template>
	<view class="projectXQteam">
		<view class="BI-items">
			<view class="left BI-items-left">
				<view class="mustFill">
					<image :src='xin'></image>
				</view>
				<view class="BI-text-left">上传照片</view>
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
		<view class="Investor-name">
			<view class="Investor-name-box">
				<view>
					<image :src="xin"></image>
				</view>
				<view>真实姓名</view>
				<view><input type="text" placeholder="请输入" placeholder-style="color:#D2D2D2" v-model="projUserName"/></view>
			</view>
		</view>
		<view class="Investor-name">
			<view class="Investor-name-box">
				<view>
					<image :src="xin"></image>
				</view>
				<view>职务</view>
				<view><input type="text" placeholder="请输入" placeholder-style="color:#D2D2D2" v-model="projUserPosition"/></view>
			</view>
		</view>
		<view class="projectXQteam-one">
			<view>简介</view>
			<view>
				<textarea placeholder="请详细描述一下您想要的服务" maxlength="150" @input="descInput" v-model="desc" placeholder-style="color:#D2D2D2" />
				<span class="numberV">{{remnane}}/150</span>
			</view>
		</view>
		<view class="Investor-Submission">
			<view @tap="Submission">
				<view>
					提交
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import imageUploadOne from '@/components/imageUpload/imageUploadOne.vue'
	import {
		mapMutations,
		mapGetters
	} from 'vuex';
	export default {
		data() {
			return {
				right:this.Static + 'mbcImg/my/right.png',
				xin:this.Static + 'mbcImg/common/xing.png',
				id:'',
				projUserName:'',
				projUserPosition:'',
				desc:'',
				logo: '',
				logo2:'',
				imageData : [],
				serverUrl: 'https://img01.iambuyer.com/imgup/upLoad/fileUpload',
				txtVal: 1,
				remnane:0
			};
		},
		components: {
			imageUploadOne
		},
		computed: {
			...mapGetters(['GET_MY'])
		},
		onLoad:function(options){
			this.id = options.id
			console.log(this.id)
		},
		created() {
			
		},
		methods: {
			...mapMutations({
				setCompany: 'setCompany',
				setHistory:'setHistory',
				setTime: 'setTime'
			}),
			descInput(){
				var txtVal = this.desc.length;
				this.remnane = 1 + txtVal;
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
					this.logo2=(e.allImages[0].imgUrl)
				}
			},
			Submission(){
				if(this.logo==''){
					uni.showToast({
						title: '照片不能为空,请重填',
						icon: 'none',
						duration: 1000
					});
					return false;
				}else if(this.projUserName==''){
					uni.showToast({
						title: '姓名不能为空,请重填',
						icon: 'none',
						duration: 1000
					});
					return false;
				}else if(this.projUserPosition==''){
					uni.showToast({
						title: '姓名不能为空,请重填',
						icon: 'none',
						duration: 1000
					});
					return false;
				}
				if (uni.getStorageSync('landRegist')) {
					let landRegistLG = JSON.parse(uni.getStorageSync('landRegist')); // 读取缓存的用户信息
					console.log(landRegistLG.user.id);
					let params = {
						projId:Number(this.id),
						projUserName:this.projUserName,
						projUserPosition:this.projUserPosition,
						projUserContent:this.desc,
						projUserImg:this.logo
					}; // 请求总数居时 参数为空
					uni.showLoading({ // 展示loading
						title: '加载中'
					});
					console.log(params)
					uni.request({
						url: this.api2 + '/proj/user/addProjUser', //接口地址。
						data: this.endParams(params),
						method: 'POST',
						header: {
							Authorization: "Bearer " + landRegistLG.token //将token放到请求头中
						},
						success: (response) => {
							uni.hideLoading();
							console.log(response.data);
							// let setLvliData = this.GET_MY.MyList.Company.projUsers;
							// let par = {
							// 	id:response.data.content,
							// 	projId:Number(this.id),
							// 	projUserName:this.projUserName,
							// 	projUserPosition:this.projUserPosition,
							// 	projUserContent:this.desc,
							// 	projUserImg:this.logo2
							// };
							// setLvliData.unshift(par);
							// this.$store.commit('setCompany', setLvliData);
							// uni.navigateBack({
							// 	
							// })
							this.shujuxiang();
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
			shujuxiang() { //项目详情
				if (uni.getStorageSync('landRegist')) {
					let landRegistLG = JSON.parse(uni.getStorageSync('landRegist')); // 读取缓存的用户信息
					console.log(landRegistLG.user.id);
					// let params = {}; // 请求总数居时 参数为空
					uni.showLoading({ // 展示loading
						title: '加载中'
					});
					uni.request({
						url: this.api2 + '/proj/' + this.id, //接口地址。
						// data: this.endParams(params),
						method: 'GET',
						header: {
							Authorization: "Bearer " + landRegistLG.token //将token放到请求头中
						},
						success: (response) => {
							uni.hideLoading();
							console.log(response.data);
							this.arr = response.data.content
							this.$store.commit('setCompany', this.arr);
							this.$store.commit('setHistory', this.arr);
							uni.navigateBack({delta: 1});
							console.log(this.arr)
							
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
	.BI-items {
		position: relative;
		width: 100%;
		margin: 0 auto;
		background: #FFFFFF;
	}
	.zitia {
		position: absolute;
		right: 50upx !important;
		height: 30upx;
		top: 30upx;
		font-size: 30upx !important;
		color: #D2D2D2
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
	
	
	
	.project-XQ-gsname{
		width: 100%;
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
		width: 142upx;
		height: 32upx;
		font-size: 30upx;
		color: #2E2E30;
		padding-top: 30upx;
		padding-left: 10upx;
	}
	
	.Investor-name-box view:nth-of-type(3) {
		width: 200upx;
		height: 35upx;
		position: absolute;
		right: 0;
		top: 40upx;
		font-size: 30upx;
		color: #D2D2D2;
		text-align: right;
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
	
	.Investor-Submission view:nth-of-type(1) {
		margin: 0 auto;
	}
	.ziti{
		position: absolute;
		right: 0upx;
		width: 300upx !important;
		height: 30upx;
		top: -30upx;
		font-size: 30upx !important;
	}
	.Img-Upload{
		width: 120upx !important;
		height: 80upx;
		position: absolute;
		right: 58upx;
		top: -45upx;
		font-size: 226upx;
	}
	.Entrepreneurs-card{
		width:100%;
		height: 122upx;
		background: #FFFFFF;
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
	.projectXQteam-one{
		width: 100%;
		height: 388upx;
		background: #FFFFFF;
		margin-top: 20upx;
	}
	.projectXQteam-one view:nth-of-type(1){
		padding-left: 55upx;
		padding-top: 52upx;
		font-size: 14px;
		color: #2E2E30;
	}
	.projectXQteam-one view:nth-of-type(2){
		width: 90%;
		height: 280upx;
		margin: 0 auto;
		position: relative;
	}
	.projectXQteam-one view:nth-of-type(2) textarea{
		padding: 20upx;
		width: 100%;
		height: 100%;
		background: #FFFFFF;
	}
	.numberV{
		font-size: 28upx;
		color: #D2D2D2;
		position: absolute;
		bottom: 0;
		right: 40upx;
	}
</style>
