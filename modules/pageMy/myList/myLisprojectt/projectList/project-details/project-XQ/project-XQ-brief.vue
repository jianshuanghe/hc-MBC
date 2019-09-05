<template>
	<view class="project-XQ-brief">
		<scroll-view :scroll-top="scrollTop" scroll-y="true" class="scroll-Y" @scrolltoupper="upper" @scrolltolower="loadMore"
		@scroll="scroll">
			<view class="project-XQ-brief-image">
				<view>添加图片</view>
				<!--<view class="images-thr" v-if="img.length!==0">
					<image class="ziti" :src="img[0]">点击上传</image>
					<image class="ziti" :src="img[1]">点击上传</image>
					<image class="ziti" :src="img[2]">点击上传</image>
				</view> -->
				<view class="Img-Upload" v-if="isImgShow">
					<imageUploadMore
					 class="imhae"
						v-model="imageData"
						:server-url="serverUrl" 
						limit=3
						@delete="deleteImage" 
						@add="addImage">
					</imageUploadMore>
				</view>
				<view class="zhuyi">注：最多只能上传3张图片</view>
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
					<textarea placeholder="你的产品通过什么方式实现盈利？" maxlength="500" @input="descInput4" v-model="conentData" placeholder-style="color:#D2D2D2" />
					<span class="numberV">{{remnane6}}/500</span>
				</view>
			</view>
			<view class="jiange"></view>
			<view class="projectXQteam-resume">
				<view>运营数据</view>
				<view>
					<textarea placeholder="产品的用户规模及财务数据等" maxlength="500" @input="descInput4" v-model="conentModel" placeholder-style="color:#D2D2D2" />
					<span class="numberV">{{remnane4}}/500</span>
				</view>
			</view>
			<view class="jiange"></view>
			<view class="jiange"></view>
			<view class="projectXQteam-resume">
				<view>核心资源</view>
				<view>
					<textarea placeholder="产品的核心资源是什么" maxlength="500" @input="descInput5" v-model="conentCore" placeholder-style="color:#D2D2D2" />
					<span class="numberV">{{remnane5}}/500</span>
				</view>
			</view>
			<view class="datas-List-case-bao">
				<view>
					<view  @tap="updata">
						保存
					</view>
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	import imageUploadMore from '@/components/imageUpload/imageUploadMore.vue';
	import { mapMutations } from 'vuex';
	export default {
		data() {
			return {
				logo: '',
				logo2:'',
				logo3:'',
				xin: this.Static + 'mbcImg/common/xing.png',
				imageData: '',
				serverUrl: 'https://img01.iambuyer.com/imgup/upLoad/fileUpload',
				txtVal: 0,
				remnane:0,
				remnane2:0,
				remnane3:0,
				remnane4:0,
				remnane5:0,
				remnane6: 0,
				desc:'',
				id:'',
				projContent:'',
				conentMarket:'',
				conentModel:'',
				conentCore:'',
				conentPortrait:'',
				conentData: '',
				img:[],
				array2:[],
				images:[],
				isImgShow: false, // 等接口放回数据之后再显示
				imgList: [] // 附件数组
			};
		},
		components: {
			imageUploadMore
		},
		computed: {},
		mounted() {
			
		},
		onLoad:function(options){
			this.id = options.id
			console.log(this.id)
			this.Getinto();
		},
		methods: {
			...mapMutations({
				setCompany: 'setCompany',
				setHistory:'setHistory'
			}),
			descInput(){
				setTimeout(() => { 
					var txtVal = this.projContent.length;
					this.remnane = 0 + txtVal;
				}, 0)
			},
			descInput2(){
				var txtVal2 = this.conentMarket.length;
				this.remnane2 = 0 + txtVal2;
			},
			descInput3(){
				var txtVal3 = this.conentPortrait.length;
				this.remnane3 = 0 + txtVal3;
			},
			descInput4(){
				var txtVal4 = this.conentModel.length;
				this.remnane4 = 0 + txtVal4;
			},
			descInput5(){
				var txtVal5 = this.conentCore.length;
				this.remnane5 = 0 + txtVal5;
			},
			descInput6(){
				var txtVal6 = this.conentData.length;
				this.remnane6 = 0 + txtVal6;
			},
			deleteImage: function(e) {
				console.log(e, '删除图片')
				this.logo = '';
				this.logo2 ='';
				this.logo3 ='';
				if (e.allImages.length === 1) {
					this.logo = (e.allImages[0].imgName);
				} else if (e.allImages.length === 2) {
					this.logo = (e.allImages[0].imgName);
					this.logo2=(e.allImages[1].imgName);
				} else if (e.allImages.length === 3) {
					this.logo = (e.allImages[0].imgName);
					this.logo2=(e.allImages[1].imgName);
					this.logo3=(e.allImages[2].imgName);
				};
			},
			addImage: function(e) {
				console.log(e, '添加图片')
				this.logo = '';
				this.logo2 ='';
				this.logo3 ='';
				if (e.allImages) { // 上传成功
				e.allImages.map((items,index)=>{
					this.images.push(items.imgName)
				})
				console.log(this.images, '--------------------------------this.images-------------------------')
					if (e.allImages.length === 1) {
						this.logo = (e.allImages[0].imgName);
					} else if (e.allImages.length === 2) {
						this.logo = (e.allImages[0].imgName);
						this.logo2=(e.allImages[1].imgName);
					} else if (e.allImages.length === 3) {
						this.logo = (e.allImages[0].imgName);
						this.logo2=(e.allImages[1].imgName);
						this.logo3=(e.allImages[2].imgName);
					}
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
							this.array2 = response.data.content
							this.projContent=response.data.content.projContent
							this.conentMarket=response.data.content.conentMarket
							this.conentModel=response.data.content.conentModel
							this.conentData=response.data.content.conentData
							this.conentCore=response.data.content.conentCore
							this.conentPortrait=response.data.content.conentPortrait
							this.conentData = response.data.content.conentData;
							let imgs = response.data.content.imgs;
							let imgList = [];
							imgs.map((items, index) => {
								if (items) {
									// let imgName = items.split('/');
									let imgObj = {
										imgUrl: items,
										imgName: items
									};
									imgList.push(imgObj);
								}
							})
							// 对附件赋值S用于接口传参数
							if (imgs.length === 1) {
								this.logo = (imgs[0]);
							} else if (imgs.length === 2) {
								this.logo = (imgs[0]);
								this.logo2=(imgs[1]);
							} else if (imgs.length === 3) {
								this.logo = (imgs[0]);
								this.logo2=(imgs[1]);
								this.logo3=(imgs[2]);
							}
							// 对附件赋值E用于接口传参数
							this.imageData=imgList;
							this.isImgShow = true;
							console.log(this.imageData);
							this.descInput();
							this.descInput2();
							this.descInput3();
							this.descInput4();
							this.descInput5();
							this.descInput6();
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
							console.log(params)
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
		/* font-size: 28upx; */
		/* color: #2E2E30; */
		/* padding-top: 10upx; */
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
		top: -200upx;
		display: flex;
		position: relative;
	}
	.imhae{
		width: 148upx !important;
		height: 148upx !important;
		position: absolute;
		/* top: -40upx; */
		top: 200upx;
		left: -10upx;
	}
	.zhuyi{
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
		z-index: 20;
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
