<template>
	<view class="datas-List-case">
		<view class="datas-List-case-name">
			<view class="datas-List-case-name-box">
				<view>
					<image :src="xin"></image>
				</view>
				<view>项目名称</view>
				<view><input type="text" placeholder="请输入" placeholder-style="color:#D2D2D2" v-model="projName" /></view>
			</view>
		</view>
		<view class="datas-List-case-name">
			<view class="datas-List-case-name-box">
				<view>
					<image></image>
				</view>
				<view>简介</view>
				<view><input type="text" placeholder="请输入" placeholder-style="color:#D2D2D2" v-model="projContent" /></view>
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
		<view class="datas-List-case-Tips">
			请上传清晰可见，容易识别的照片，支持JPG、PNG格式
		</view>
		<view class="datas-List-case-yes">
			<view class="datas-List-case-yes-box">
				<view>
					<image :src="xin"></image>
				</view>
				<view>投资时间和轮次</view>
			</view>
		</view>
		<view class="datas-List-case-nei" v-for="(item,index) in time" :key="index">
			<view class="datas-List-case-nei-one">
				<view>
					<image :src="Ima1" mode=""></image>
				</view>
				<view>{{item.startTime}}</view>
				<view>{{item.levelCodeStr}}</view>
				<view @tap="dele(index)">删除</view>
			</view>
		</view>
		<view class="datas-List-case-add" @tap="gotodatasListtime">
			<view>
				<span>+</span> <span>添加时间和轮次</span>
			</view>
		</view>

		<view class="datas-List-case-bao" @tap="caseadd">
			<view>
				<view>
					保存
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
				Ima1: this.Static + 'mbcImg/my/Ima1.png',
				logo: '',
				xin: this.Static + 'mbcImg/common/xing.png',
				right: this.Static + 'mbcImg/my/right.png',
				imageData: [],
				serverUrl: 'https://img01.iambuyer.com/imgup/upLoad/fileUpload',
				time: [],
				projName: '',
				projContent: '',
				projLogo: '',
				id:'',
				shijian:'',
				userInveLevelList: [],
				times:[],
			};
		},
		// 分享
		onShareAppMessage(res) {
			  if (res.from === 'button') {// 来自页面内分享按钮
				console.log(res.target)
			  }
			  return this.titleOrPathApp
		},
		computed: {
			...mapGetters(['GET_MY']),
		},
		components: {
			imageUploadOne
		},
		watch: {
			GET_MY: {
				handler(a, b) {
					// console.log(a,b)
					this.time=a.MyList.Times;
					// console.log(this.time, '-----------------this.time-----------------')
					let paramsTime = [...this.time];
					paramsTime.map((items, index) =>{
						let objItems = {
							levelCode: items.levelCode,
							startTime: items.startTime+'-01'
						};
						this.userInveLevelList.push(objItems);
					})
				},
				deep: true
			},
		},
		created() {
		},
		methods: {
			...mapMutations({
				setCase: 'setCase',
				setListCase: 'setListCase',
				setCollection: 'setCollection'
			}),
			dataheader() { //个人信息
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
							// console.log(response.data);
							let List = response.data.content;
							this.$store.commit('setCollection', List);
							this.dataconter();
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
			dataconter() { //任职履历
				if (uni.getStorageSync('landRegist')) {
					let landRegistLG = JSON.parse(uni.getStorageSync('landRegist')); // 读取缓存的用户信息
					console.log(landRegistLG.user.id);
					// let params = {}; // 请求总数居时 参数为空
					uni.showLoading({ // 展示loading
						title: '加载中'
					});
					uni.request({
						url: this.api2 + '/user/subsInfo/' + landRegistLG.user.id, //接口地址。
						// data: this.endParams(params),
						method: 'GET',
						header: {
							Authorization: "Bearer " + landRegistLG.token //将token放到请求头中
						},
						success: (response) => {
							uni.hideLoading();
							console.log(response.data);
							let Listcase = response.data.content.userInves;
							this.$store.commit('setListCase', Listcase);
							uni.navigateBack({delta: 1});
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
			caseadd() {
				if(this.projName==''){
					uni.showToast({
						title: '项目名称不能为空,请重填',
						icon: 'none',
						duration: 1000
					});
					return false;
				}else if(this.time.length==0){
					uni.showToast({
						title: '投资时间和轮数不能为空,请重填',
						icon: 'none',
						duration: 1000
					});
					return false;
				}else if(this.logo==''){
					uni.showToast({
						title: '名片不能为空,请重填',
						icon: 'none',
						duration: 1000
					});
					return false;
				}
				if (uni.getStorageSync('landRegist')) {
					let landRegistLG = JSON.parse(uni.getStorageSync('landRegist')); // 读取缓存的用户信息
					console.log(landRegistLG.user.id);
					let params = {
						userId: landRegistLG.user.id,
						projName: this.projName,
						projContent: this.projContent,
						projLogo: this.logo,
						userInveLevelList: this.userInveLevelList
					};
					 // 请求总数居时 参数为空
					 console.log(this.userInveLevelList,'this.userInveLevelList')
					uni.showLoading({ // 展示loading
						title: '加载中'
					});
					console.log(params)
					uni.request({
						url: this.api2 + '/user/inve/add', //接口地址。
						data: this.endParams(params),
						method: 'POST',
						header: {
							Authorization: "Bearer " + landRegistLG.token //将token放到请求头中
						},
						success: (response) => {
							uni.hideLoading();
							console.log(response.data);
							let caseadd=params
							// this.$store.commit('setCase', caseadd);
							let nav=[]
							this.$store.commit('setTimes', nav);
							// uni.navigateTo({
							// 	'url':'../../InvestmentList-data/InvestmentList-data'
							// })
							this.dataheader();
							// uni.navigateBack({
							// 	
							// })
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
			dele(index) {
				this.time.splice(index, 1)
			},
			gotodatasListtime(e) {
				console.log(e + '轮次时间选择')
				uni.navigateTo({
					url: './datas-List-time2',
				});
			},
			bindPickerChange: function(e) {
				console.log('picker发送选择改变，携带值为', e.target.value);
				this.array.map((items, index) => {
					if (index === e.target.value) {
						this.pickerValue = items;
					}
				})
			},
			bindPickerChange2: function(e) {
				console.log('picker发送选择改变，携带值为', e.target.value);
				this.array2.map((items, index) => {
					if (index === e.target.value) {
						this.pickerValue2 = items;
					}
				})
			},
			deleteImage: function(e) {
				console.log(e, '删除图片')
				this.logo = ''; // 清空数据
			},
			addImage: function(e) {
				console.log(e, '添加图片')
				if (e.allImages) { // 上传成功
					this.logo = (e.allImages[0].imgName);
				}
			}
		}
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
		right: 18upx;
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
	.datas-List-case {
		width: 100%;
		height: 100%;

	}

	.datas-List-case-name {
		width: 100%;
		height: 122upx;
		background: #FFFFFF;
	}

	.datas-List-case-name-box {
		width: 90%;
		height: 100%;
		border-bottom: 2upx solid #F5F5F5;
		margin: 0 auto;
		display: flex;
		position: relative;
	}

	.datas-List-case-name-box view:nth-of-type(1) {
		width: 20upx;
		height: 20upx;
		padding-top: 26upx;
	}

	.datas-List-case-name-box view:nth-of-type(1) image {
		width: 100%;
		height: 100%;
	}

	.datas-List-case-name-box view:nth-of-type(2) {
		width: 142upx;
		height: 32upx;
		font-size: 30upx;
		color: #2E2E30;
		padding-top: 30upx;
		padding-left: 10upx;
	}

	.datas-List-case-name-box view:nth-of-type(3) {
		width: 200upx;
		height: 35upx;
		position: absolute;
		right: 0;
		top: 40upx;
		font-size: 30upx;
		color: #D2D2D2;
		text-align: right;
	}

	.ziti {
		position: absolute;
		right: 0upx;
		width: 300upx !important;
		height: 30upx;
		top: -30upx;
		font-size: 30upx !important;
	}

	.datas-List-case-yes {
		width: 100%;
		height: 122upx;
		background: #FFFFFF;
		margin-top: 20upx;
		border-bottom: 2upx solid #F5F5F5;
	}

	.datas-List-case-yes-box {
		width: 90%;
		height: 100%;

		margin: 0 auto;
		display: flex;
		position: relative;
	}

	.datas-List-case-yes-box view:nth-of-type(1) {
		width: 20upx;
		height: 20upx;
		padding-top: 26upx;
	}

	.datas-List-case-yes-box view:nth-of-type(1) image {
		width: 100%;
		height: 100%;
	}

	.datas-List-case-yes-box view:nth-of-type(2) {
		width: 242upx;
		height: 32upx;
		font-size: 30upx;
		color: #2E2E30;
		padding-top: 30upx;
		padding-left: 10upx;
	}

	.Img-Upload {
		width: 120upx !important;
		height: 80upx;
		position: absolute;
		right: 58upx;
		top: -45upx;
		font-size: 226upx;
	}

	.imageUpload {
		width: 200upx !important;
	}

	.datas-List-case-logo {
		width: 100%;
		height: 122upx;
		background: #FFFFFF;
	}

	.datas-List-case-logo-box {
		width: 90%;
		height: 100%;
		border-bottom: 2upx solid #F5F5F5;
		margin: 0 auto;
		display: flex;
		position: relative;
	}

	.datas-List-case-logo-box view:nth-of-type(1) {
		width: 20upx;
		height: 20upx;
		padding-top: 26upx;
	}

	.datas-List-case-logo-box view:nth-of-type(1) image {
		width: 100%;
		height: 100%;
	}

	.datas-List-case-logo-box view:nth-of-type(2) {
		width: 152upx;
		height: 32upx;
		font-size: 30upx;
		color: #2E2E30;
		padding-top: 30upx;
		padding-left: 10upx;
	}

	.datas-List-case-logo-box view:nth-of-type(3) {
		width: 200upx;
		height: 35upx;
		position: absolute;
		right: 40upx;
		top: 40upx;
		font-size: 30upx;
		color: #D2D2D2;
		text-align: right;
	}

	.datas-List-case-logo-box view:nth-of-type(4) {
		position: absolute;
		right: 0;
		top: 40upx;
		width: 25upx;
		height: 18upx;
	}

	.datas-List-case-logo-box view:nth-of-type(4) image {
		width: 100%;
		height: 100%;
	}

	.datas-List-case-Tips {
		width: 90%;
		height: 25upx;
		margin: 0 auto;
		font-size: 24upx;
		color: #9B9B9B;
	}

	.datas-List-case-bao {
		width: 100%;
		height: 122upx;
		background: #FFFFFF;
		bottom: 0;
		position: absolute;
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

	.datas-List-case-add {
		width: 100%;
		height: 80upx;
		text-align: center;
		line-height: 80upx;
	}

	.datas-List-case-add view span:nth-of-type(1) {
		font-size: 50upx;
		color: #02C2A2;
		/* padding-top: 20upx; */
		display: block;
	}

	.datas-List-case-add view span:nth-of-type(2) {
		margin-left: 10upx;
		display: block;
	}

	.datas-List-case-add view {
		width: 250upx;
		height: 100%;
		margin: 0 auto;
		display: flex;
		line-height: 80upx;
	}

	.datas-List-case-nei {
		width: 100%;
		height: 100upx;
		background: #FFFFFF;
	}

	.datas-List-case-nei-one {
		position: relative;
		width: 90%;
		height: 100%;
		margin: 0 auto;
		border-bottom: 2upx solid #F5F5F5;
		display: flex;

	}

	.datas-List-case-nei-one view:nth-of-type(1) {
		width: 8%;
		height: 100%;
	}

	.datas-List-case-nei-one view:nth-of-type(1) image {
		width: 60%;
		height: 35upx;
		padding-top: 35upx;
	}

	.datas-List-case-nei-one view:nth-of-type(2) {
		width: 115upx;
		height: 100%;
		line-height: 100upx;
		font-size: 18upx;
		overflow: hidden;
	}

	.datas-List-case-nei-one view:nth-of-type(3) {
		width: 200upx;
		height: 100%;
		line-height: 100upx;
		font-size: 18upx;
		margin-left: 100upx;
	}

	.datas-List-case-nei-one view:nth-of-type(4) {
		width: 100upx;
		height: 100%;
		line-height: 100upx;
		text-align: center;
		padding-left: 180upx;
	}
</style>
