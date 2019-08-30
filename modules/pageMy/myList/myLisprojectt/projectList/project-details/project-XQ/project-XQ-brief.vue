<template>
	<view class="project-XQ-brief">
		<view class="project-XQ-brief-image">
			<view>添加图片</view>
			<!-- <view class="images-thr">
				<image class="ziti" :src="img[0]" v-if="!logo">点击上传</image>
				<image class="ziti" :src="img[1]" v-if="!logo">点击上传</image>
				<image class="ziti" :src="img[2]" v-if="!logo">点击上传</image>
			</view> -->
			<view class="Img-Upload">
				<imageUploadMore
				 class="imhae"
					v-model="imageData" 
					:server-url="serverUrl" 
					limit= 3
					@delete="deleteImage" 
					@add="addImage">
				</imageUploadMore>
			</view>
			<view>注：最多只能上传3张图片</view>
		</view>
		<view class="projectXQteam-resume">
			<view><image :src="xin"></image>项目简介</view>
			<view>
				<textarea placeholder="请描述你的项目提供哪些产品与服务" maxlength="500" @input="descInput" v-model="projContent" placeholder-style="color:#D2D2D2" />
				<span class="numberV">{{remnane}}/500</span>
			</view>
		</view>
		<view class="jiange"></view>
		<view class="projectXQteam-resume">
			<view>市场需求</view>
			<view>
				<textarea placeholder="你的产品解决了什么问题" maxlength="500" @input="descInput2" v-model="conentMarket" placeholder-style="color:#D2D2D2" />
				<span class="numberV">{{remnane2}}/500</span>
			</view>
		</view>
		<view class="jiange"></view>
		<view class="projectXQteam-resume">
			<view>用户画像</view>
			<view>
				<textarea placeholder="产品面向的用户有什么样的特征,如何获取用户" maxlength="500" @input="descInput3" v-model="conentPortrait" placeholder-style="color:#D2D2D2" />
				<span class="numberV">{{remnane3}}/500</span>
			</view>
		</view>
		<view class="jiange"></view>
		<view class="projectXQteam-resume">
			<view>商业模式</view>
			<view>
				<textarea placeholder="产品的用户规模及财务数据等" maxlength="500" @input="descInput4" v-model="conentModel" placeholder-style="color:#D2D2D2" />
				<span class="numberV">{{remnane4}}/500</span>
			</view>
		</view>
		<view class="jiange"></view>
		<view class="projectXQteam-resume">
			<view>核心资源</view>
			<view>
				<textarea placeholder="产品的核心资源是什么" maxlength="500" @input="descInput5" v-model="conentCore" placeholder-style="color:#D2D2D2" />
				<span class="numberV">{{remnane5}}/500</span>
			</view>
		</view>
		<view class="datas-List-case-bao" @tap="updata">
			<view>
				<view>
					保存
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import imageUploadMore from '@/components/imageUpload/imageUploadMore.vue'
	export default {
		data() {
			return {
				logo: '',
				logo2:'',
				logo3:'',
				xin: this.Static + 'mbcImg/common/xing.png',
				imageData: [],
				serverUrl: 'https://img01.iambuyer.com/imgup/upLoad/fileUpload',
				txtVal: 1,
				remnane:0,
				remnane2:0,
				remnane3:0,
				remnane4:0,
				remnane5:0,
				desc:'',
				id:'',
				projContent:'',
				conentMarket:'',
				conentModel:'',
				conentCore:'',
				conentPortrait:'',
				img:[]
			};
		},
		components: {
			imageUploadMore
		},
		computed: {},
		created() {
			this.Getinto();
		},
		mounted() {},
		onLoad:function(options){
			this.id = options.id
			console.log(this.id)
		},
		methods: {
			descInput(){
				var txtVal = this.projContent.length;
				this.remnane = 1 + txtVal;
			},
			descInput2(){
				var txtVal2 = this.conentMarket.length;
				this.remnane2 = 1 + txtVal2;
			},
			descInput3(){
				var txtVal3 = this.conentPortrait.length;
				this.remnane3 = 1 + txtVal3;
			},
			descInput4(){
				var txtVal4 = this.conentModel.length;
				this.remnane4 = 1 + txtVal4;
			},
			descInput5(){
				var txtVal5 = this.conentCore.length;
				this.remnane5 = 1 + txtVal5;
			},
			deleteImage: function(e) {
				console.log(e, '删除图片')
				this.logo = ''; // 清空数据
				this.logo1 = '';
				this.logo2 = '';
			},
			addImage: function(e) {
				console.log(e, '添加图片')
				if (e.allImages) { // 上传成功
					this.logo = (e.allImages[0].imgName);
					this.logo2=(e.allImages[1].imgName);
					this.logo3=(e.allImages[2].imgName);
					console.log(this.logo,this.logo2,this.logo3)
				}
			},
			Getinto(){
				if (uni.getStorageSync('landRegist')) {
					let landRegistLG = JSON.parse(uni.getStorageSync('landRegist')); // 读取缓存的用户信息
					console.log(landRegistLG.user.id);
					uni.showLoading({ // 展示loading
						title: '加载中'
					});
					uni.request({
						url: this.api2 + '/proj/getProjContent?projId='+this.id, //接口地址。
						// data: this.endParams(params),
						method: 'GET',
						header: {
							Authorization: "Bearer " + landRegistLG.token //将token放到请求头中
						},
						success: (response) => {
							uni.hideLoading();
							console.log(response.data.content);
							// this.array2 = response.data.content
							this.projContent=response.data.content.projContent
							this.conentMarket=response.data.content.conentMarket
							this.conentModel=response.data.content.conentModel
							this.conentData=response.data.content.conentData
							this.conentCore=response.data.content.conentCore
							this.conentPortrait=response.data.content.conentPortrait
							this.img=response.data.content.imgs
							
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
			updata(){
				if (uni.getStorageSync('landRegist')) {
					let landRegistLG = JSON.parse(uni.getStorageSync('landRegist')); // 读取缓存的用户信息
					console.log(landRegistLG.user.id);
					let params = {
						id:this.id,
						projContent:this.projContent,
						conentMarket:this.conentMarket,
						conentModel:this.conentModel,
						conentData:this.conentData,
						conentCore:this.conentCore,
						conentPortrait:this.conentPortrait,
						imgs:[
							this.logo,
							this.logo2,
							this.logo3,
						]
					}; // 请求总数居时 参数为空
					uni.showLoading({ // 展示loading
						title: '加载中'
					});
					uni.request({
						url: this.api2 + '/proj/setProjContent', //接口地址。
						data: this.endParams(params),
						method: 'POST',
						header: {
							Authorization: "Bearer " + landRegistLG.token //将token放到请求头中
						},
						success: (response) => {
							uni.hideLoading();
							console.log(response.data.content);
							// this.array2 = response.data.content
							uni.navigateTo({
								url:'/modules/pageMy/myList/myLisprojectt/projectList/project-details/project-details?id='+this.id
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
	.project-XQ-brief{
		width: 100%;
		min-height: 100%;
		background: #FFFFFF;
		padding: 2upx;
		padding-bottom: 130upx;
	}
	.project-XQ-brief-image{
		width: 90%;
		height: 400upx;
		margin: 0 auto;
		border-bottom: 2upx solid #F5F5F5;
	}
	.project-XQ-brief-image view:nth-of-type(1){
		font-size: 28upx;
		color: #2E2E30;
		padding-top: 40upx;
	}
	.ziti{
		margin-top: 50upx;
		width: 148upx;
		height: 148upx;
	}
	/* images-thr */
	.Img-Upload{
		width: 148upx;
		height: 148upx;
		margin-top: 40upx;
		display: flex;
		position: relative;
	}
	.imhae{
		width: 148upx !important;
		height: 148upx !important;
		position: absolute;
		top: -40upx;
		left: -10upx;
	}
	.project-XQ-brief-image view:nth-of-type(3){
		width: 100%;
		height: 30upx;
		font-size: 24upx;
		color: #9B9B9B;
		margin-top: 40upx;
	}
	.projectXQteam-resume{
		width: 100%;
		height: 388upx;
		background: #FFFFFF;
		margin-top: 20upx;
	}
	.projectXQteam-resume view:nth-of-type(1){
		padding-left: 55upx;
		padding-top: 42upx;
		font-size: 28upx;
		color: #2E2E30;
		position: relative;
		width: 130upx;
		text-align: right;
		height: 40upx;
	}
	.projectXQteam-resume view:nth-of-type(1) image{
		width: 15upx;
		height: 15upx;
		margin-top: -10upx;
		position: absolute;
		margin-top: 10upx;
		margin-left: -20upx;
	}
	.projectXQteam-resume view:nth-of-type(2){
		width: 90%;
		height: 280upx;
		margin: 0 auto;
		position: relative;
	}
	.projectXQteam-resume view:nth-of-type(2) textarea{
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
	.jiange{
		width: 100%;
		height: 20upx;
		background: #F9F9F9;
	}
	.datas-List-case-bao {
		width: 100%;
		height: 122upx;
		background: #FFFFFF;
		bottom: 0;
		position: fixed;
	}
	
	.datas-List-case-bao view:nth-of-type(1) view {
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
	
	.datas-List-case-bao view:nth-of-type(1) {
		margin: 0 auto;
	}
</style>
