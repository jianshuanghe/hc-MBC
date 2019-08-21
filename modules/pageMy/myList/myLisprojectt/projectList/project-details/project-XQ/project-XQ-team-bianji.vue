<template>
	<view class="projectXQteam">
		<view class="Entrepreneurs-card">
			<view class="Entrepreneurs-card-box">
				<view><image :src="xin"></image></view>
				<view>上传照片</view>
				<view>
					<image class="ziti" :src="arr.projUserImg" v-if="!logo">点击上传</image>
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
					<image></image>
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
		<view class="del" @tap="del">
			删除
		</view>
		<view class="Investor-Submission" @tap="update">
			<view>
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
				xin:this.Static + 'mbcImg/my/xin.png',
				id:'',
				projUserName:'',
				projUserPosition:'',
				desc:'',
				logo: '',
				imageData : [],
				serverUrl: 'https://img01.iambuyer.com/imgup/upLoad/fileUpload',
				txtVal: 1,
				remnane:0,
				arr:[],
				List:[]
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
			this.List=this.GET_MY.MyList.Company;
			this.Submission();
		},
		methods: {
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
				}
			},
			update(){
				if (uni.getStorageSync('landRegist')) {
					let landRegistLG = JSON.parse(uni.getStorageSync('landRegist')); // 读取缓存的用户信息
					console.log(landRegistLG.user.id);
					let params = {
						id:Number(this.id),
						projUserName:this.projUserName,
						projUserPosition:this.projUserPosition,
						projUserContent:this.desc,
						projUserImg:this.logo
					}; // 请求总数居时 参数为空
					uni.showLoading({ // 展示loading
						title: '加载中'
					});
					// console.log(params)
					uni.request({
						url: this.api2 + '/proj/user/updateProjUser', //接口地址。
						data: this.endParams(params),
						method: 'POST',
						header: {
							Authorization: "Bearer " + landRegistLG.token //将token放到请求头中
						},
						success: (response) => {
							uni.hideLoading();
							console.log(response.data);
							// this.$store.commit('setCompany', this.List);
							// let setLvliData = this.GET_MY.MyList.Company.projUsers;
							// console.log(params, '--------------params---------------')
							// setLvliData.unshift(params);
							// this.$store.commit('setCompany', setLvliData);
							// uni.navigateBack({})
							uni.navigateTo({
								url:'/modules/pageMy/myList/myLisprojectt/projectList/project-details/project-details?id='+this.arr.projId
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
			},
			Submission(){
				if (uni.getStorageSync('landRegist')) {
					let landRegistLG = JSON.parse(uni.getStorageSync('landRegist')); // 读取缓存的用户信息
					console.log(landRegistLG.user.id);
					// let params = {
					// 	projId:Number(this.id),
					// 	projUserName:this.projUserName,
					// 	projUserPosition:this.projUserPosition,
					// 	projUserContent:this.desc,
					// 	projUserImg:this.logo
					// }; // 请求总数居时 参数为空
					uni.showLoading({ // 展示loading
						title: '加载中'
					});
					// console.log(params)
					uni.request({
						url: this.api2 + '/proj/user/getProjUser?projUserId='+this.id, //接口地址。
						// data: this.endParams(params),
						method: 'GET',
						header: {
							Authorization: "Bearer " + landRegistLG.token //将token放到请求头中
						},
						success: (response) => {
							uni.hideLoading();
							console.log(response.data);
							this.arr=response.data.content
							this.projUserName=this.arr.projUserName
							this.projUserPosition=this.arr.projUserPosition
							this.desc=this.arr.projUserContent
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
			del(){
				if (uni.getStorageSync('landRegist')) {
					let landRegistLG = JSON.parse(uni.getStorageSync('landRegist')); // 读取缓存的用户信息
					console.log(landRegistLG.user.id);
					let params = {
						projId:Number(this.id),
					}; // 请求总数居时 参数为空
					uni.showLoading({ // 展示loading
						title: '加载中'
					});
					// console.log(params)
					uni.request({
						url: this.api2 + '/proj/user/delProjUser?projUserIds='+this.id, //接口地址。
						// data: this.endParams(params),
						method: 'GET',
						header: {
							Authorization: "Bearer " + landRegistLG.token //将token放到请求头中
						},
						success: (response) => {
							uni.hideLoading();
							console.log(response.data);
							// let setLvliData = this.GET_MY.MyList.Company.projUsers;
							// setLvliData.splice(this.id, 1);
							// this.$store.commit('setCompany', setLvliData);
							// uni.navigateBack({})
							uni.navigateTo({
								url:'/modules/pageMy/myList/myLisprojectt/projectList/project-details/project-details?id='+this.arr.projId
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
			},
		},
		
	};
</script>

<style>
	.project-XQ-gsname{
		width: 100%;
	}
	input {
		color: #D2D2D2;
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
		width: 90upx;
		height: 90upx;
		top: -20upx;
		font-size: 30upx;
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
		color: #D2D2D2;
	}
	.numberV{
		font-size: 28upx;
		color: #D2D2D2;
		position: absolute;
		bottom: 0;
		right: 40upx;
	}
	.del{
		width: 100%;
		height: 100upx;
		background: #FFFFFF;
		text-align: center;
		color: red;
		line-height: 100upx;
		border-top:2upx solid  #F5F5F5;
	}
</style>
