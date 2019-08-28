<template>
	<view class="datas-List-vitae">
		<view class="datas-List-vitae-name">
			<view class="datas-List-vitae-name-box">
				<view>
					<image :src="xin"></image>
				</view>
				<view>机构名称</view>
				<view><input type="text" placeholder="请输入" placeholder-style="color:#D2D2D2" v-model="compName" /></view>
			</view>
		</view>
		<view class="datas-List-vitae-name">
			<view class="datas-List-vitae-name-box">
				<view>
					<image :src="xin"></image>
				</view>
				<view>职位</view>
				<view><input type="text" placeholder="请输入" placeholder-style="color:#D2D2D2" v-model="position" /></view>
			</view>
		</view>
		<view class="datas-List-vitae-yes">
			<view class="datas-List-vitae-yes-box">
				<view>
					<image :src="xin"></image>
				</view>
				<view>是否在职</view>
				<view>
					<picker @change="bindPickerChange" :value="index" :range="array">
						<view class="ziti">{{pickerValue? pickerValue : '请选择'}}</view>
					</picker>
				</view>
				<view>
					<image :src="right"></image>
				</view>
			</view>
		</view>
		<view class="BI-items">
			<view class="left BI-items-left">
				<view class="mustFill">
					<image :src='xin'></image>
				</view>
				<view class="BI-text-left">机构logo</view>
			</view>
			<view class="right BI-items-right">
				<view class="BI-text-right">
					<image class="ziti1" :src="List.compLogo" v-if="!logo">点击上传</image>
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
		
		<view class="datas-List-vitae-Tips">
			请上传清晰可见，容易识别的照片，支持JPG、PNG格式
		</view>
		<view class="del" @tap="del">
			删除
		</view>
		<view class="datas-List-vitae-bao">
			<view>
				<view @tap="lvli">
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
				logo: '',
				xin: this.Static + 'mbcImg/common/xing.png',
				right: this.Static + 'mbcImg/my/right.png',
				index: 0, // 默认选择第一个
				array: ['是', '否'],
				compName: '',
				position: '',
				pickerValue: "", // 选中的值
				pick: '',
				imageData: [],
				serverUrl: 'https://img01.iambuyer.com/imgup/upLoad/fileUpload',
				Listdata: [],
				List:[],
			};
		},
		components: {
			imageUploadOne,
		},
		computed: {
			...mapGetters(['GET_MY'])
		},
		created(options) {
			this.Listdata = this.GET_MY.MyList.Lvli;
		},
		onLoad: function(options) {
			this.id=options.id
			console.log(this.id)
		},
		mounted() {
			this.yemian();
		},
		methods: {
			...mapMutations({
				setLvli: 'setLvli'
			}),
			lvli(){
				if(this.compName===''){
					uni.showToast({
						title: '机构名不能为空,请重填',
						icon: 'none',
						duration: 1000
					});
					return false;
				}else if(this.position === ''){
					uni.showToast({
						title: '职位不能为空,请重填',
						icon: 'none',
						duration: 1000
					});
					return false;
				}else if(this.pickerValue === ''){
					uni.showToast({
						title: '在职情况不能为空,请重填',
						icon: 'none',
						duration: 1000
					});
					return false;
				}
				if(this.List.isIncu=='1'){
					if (uni.getStorageSync('landRegist')) {
						let landRegistLG = JSON.parse(uni.getStorageSync('landRegist')); // 读取缓存的用户信息
						console.log(landRegistLG.user.id);
						let params = {
							id:this.id,
							userId: landRegistLG.user.id,
							compName: this.compName,
							position: this.position,
							isIncu: 0,
							compLogo: this.logo
						}; // 请求总数居时 参数为空
						uni.showLoading({ // 展示loading
							title: '加载中'
						});
						console.log(params)
						console.log(this.pick)
						uni.request({
							url: this.api2 + '/user/expe/update', //接口地址。
							data: this.endParams(params),
							method: 'POST',
							header: {
								Authorization: "Bearer " + landRegistLG.token //将token放到请求头中
							},
							success: (response) => {
								uni.hideLoading();
								console.log(response.data);
								let setLvliData = this.GET_MY.MyList.Lvli;
								// setLvliData.unshift(params);
								// this.$store.commit('setLvli', setLvliData);
								// uni.navigateTo({
								// 	'url':'../../AuthenticationList/Certification-status/Investment-status/InvestmentList/InvestmentList-data/InvestmentList-data'
								// })
								uni.navigateTo({
									'url':'../../InvestmentList-data/InvestmentList-data'
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
				}else{
					if (uni.getStorageSync('landRegist')) {
						let landRegistLG = JSON.parse(uni.getStorageSync('landRegist')); // 读取缓存的用户信息
						console.log(landRegistLG.user.id);
						let params = {
							id:this.id,
							userId: landRegistLG.user.id,
							compName: this.compName,
							position: this.position,
							isIncu: 1,
							compLogo: this.logo
						}; // 请求总数居时 参数为空
						uni.showLoading({ // 展示loading
							title: '加载中'
						});
						console.log(params)
						console.log(this.pick)
						uni.request({
							url: this.api2 + '/user/expe/update', //接口地址。
							data: this.endParams(params),
							method: 'POST',
							header: {
								Authorization: "Bearer " + landRegistLG.token //将token放到请求头中
							},
							success: (response) => {
								uni.hideLoading();
								console.log(response.data);
								this.Listdata=params
								console.log(this.Listdata)
								// this.$store.commit('setLvli',this.Listdata);
								uni.navigateTo({
									'url':'../../InvestmentList-data/InvestmentList-data'
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
			},
			yemian(){
				if (uni.getStorageSync('landRegist')) {
					let landRegistLG = JSON.parse(uni.getStorageSync('landRegist')); // 读取缓存的用户信息
					console.log(landRegistLG.user.id);
					// let params = {}; // 请求总数居时 参数为空
					uni.showLoading({ // 展示loading
						title: '加载中'
					});
					uni.request({
						url: this.api2 + '/user/expe/info?id='+ this.id, //接口地址。
						// data: this.endParams(params),
						method: 'GET',
						header: {
							Authorization: "Bearer " + landRegistLG.token //将token放到请求头中
						},
						success: (response) => {
							uni.hideLoading();
							console.log(response.data);
							this.List=response.data.content
							// this.$store.commit('setCollection', this.List);
							console.log(this.List,'asdasd')
							this.compName=this.List.compName
							this.position=this.List.position
							if(this.List.isIncu==1){
								this.pickerValue="是"
							}
							if(this.List.isIncu==0){
								this.pickerValue="否"
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
			},
			del(){
				if (uni.getStorageSync('landRegist')) {
					let landRegistLG = JSON.parse(uni.getStorageSync('landRegist')); // 读取缓存的用户信息
					console.log(landRegistLG.user.id);
					// let params = {}; // 请求总数居时 参数为空
					uni.showLoading({ // 展示loading
						title: '加载中'
					});
					uni.request({
						url: this.api2 + '/user/expe/del?ids='+ this.id, //接口地址。
						// data: this.endParams(params),
						method: 'GET',
						header: {
							Authorization: "Bearer " + landRegistLG.token //将token放到请求头中
						},
						success: (response) => {
							uni.hideLoading();
							console.log(response.data);
							let setLvliData = this.GET_MY.MyList.Lvli;
							// setLvliData.shift();
							this.$store.commit('setLvli', setLvliData);
							uni.navigateTo({
								'url':'../../InvestmentList-data/InvestmentList-data'
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
			bindPickerChange: function(e) {
				console.log('picker发送选择改变，携带值为', e.target.value);
				this.array.map((items, index) => {
					if (index == e.target.value) {
						this.pickerValue = items;
						this.pick = e.target.value
						console.log(this.pick)
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
			},
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
		right: 15upx;
		top: 50upx;
	}
	
	
	
	.datas-List-vitae {
		width: 100%;
		height: 100%;
	}
	.datas-List-vitae-name {
		width: 100%;
		height: 122upx;
		background: #FFFFFF;
	}

	.datas-List-vitae-name-box {
		width: 90%;
		height: 100%;
		border-bottom: 2upx solid #F5F5F5;
		margin: 0 auto;
		display: flex;
		position: relative;
	}

	.datas-List-vitae-name-box view:nth-of-type(1) {
		width: 20upx;
		height: 20upx;
		padding-top: 26upx;
	}

	.datas-List-vitae-name-box view:nth-of-type(1) image {
		width: 100%;
		height: 100%;
	}

	.datas-List-vitae-name-box view:nth-of-type(2) {
		width: 142upx;
		height: 32upx;
		font-size: 30upx;
		color: #2E2E30;
		padding-top: 30upx;
		padding-left: 10upx;
	}

	.datas-List-vitae-name-box view:nth-of-type(3) {
		width: 200upx;
		height: 35upx;
		position: absolute;
		right: 0;
		top: 40upx;
		font-size: 30upx;
		text-align: right;
	}

	.datas-List-vitae-name-box view:nth-of-type(3) input {
		color: #D2D2D2;
	}

	.ziti {
		position: absolute;
		right: 0upx;
		width: 100upx !important;
		height: 80upx;
		top: -30upx;
		font-size: 30upx !important;
	}
	.ziti1 {
		position: absolute;
		right: 50upx;
		width: 70upx !important;
		height: 70upx;
		top: 27upx;
		font-size: 30upx !important;
	}

	.datas-List-vitae-yes {
		width: 100%;
		height: 122upx;
		background: #FFFFFF;
	}

	.datas-List-vitae-yes-box {
		width: 90%;
		height: 100%;
		border-bottom: 2upx solid #F5F5F5;
		margin: 0 auto;
		display: flex;
		position: relative;
	}

	.datas-List-vitae-yes-box view:nth-of-type(1) {
		width: 20upx;
		height: 20upx;
		padding-top: 26upx;
	}

	.datas-List-vitae-yes-box view:nth-of-type(1) image {
		width: 100%;
		height: 100%;
	}

	.datas-List-vitae-yes-box view:nth-of-type(2) {
		width: 142upx;
		height: 32upx;
		font-size: 30upx;
		color: #2E2E30;
		padding-top: 30upx;
		padding-left: 10upx;
	}

	.datas-List-vitae-yes-box view:nth-of-type(3) {
		width: 100upx;
		height: 35upx;
		position: absolute;
		right: 40upx;
		top: 40upx;

		color: #D2D2D2;
		text-align: right;
	}

	.datas-List-vitae-yes-box view:nth-of-type(4) {
		position: absolute;
		right: 0;
		top: 40upx;
		width: 25upx;
		height: 18upx;
	}

	.datas-List-vitae-yes-box view:nth-of-type(4) image {
		width: 100%;
		height: 100%;
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

	.datas-List-vitae-logo {
		width: 100%;
		height: 122upx;
		background: #FFFFFF;
	}

	.datas-List-vitae-logo-box {
		width: 90%;
		height: 100%;
		border-bottom: 2upx solid #F5F5F5;
		margin: 0 auto;
		display: flex;
		position: relative;
	}

	.datas-List-vitae-logo-box view:nth-of-type(1) {
		width: 20upx;
		height: 20upx;
		padding-top: 26upx;
	}

	.datas-List-vitae-logo-box view:nth-of-type(1) image {
		width: 100%;
		height: 100%;
	}

	.datas-List-vitae-logo-box view:nth-of-type(2) {
		width: 152upx;
		height: 32upx;
		font-size: 30upx;
		color: #2E2E30;
		padding-top: 30upx;
		padding-left: 10upx;
	}

	.datas-List-vitae-logo-box view:nth-of-type(3) {
		width: 200upx;
		height: 35upx;
		position: absolute;
		right: 40upx;
		top: 40upx;
		font-size: 30upx;
		color: #D2D2D2;
		text-align: right;
	}

	.datas-List-vitae-logo-box view:nth-of-type(4) {
		position: absolute;
		right: 0;
		top: 40upx;
		width: 25upx;
		height: 18upx;
	}

	.datas-List-vitae-logo-box view:nth-of-type(4) image {
		width: 100%;
		height: 100%;
	}

	.datas-List-vitae-Tips {
		width: 90%;
		height: 25upx;
		margin: 0 auto;
		font-size: 24upx;
		color: #9B9B9B;
	}

	.datas-List-vitae-bao {
		width: 100%;
		height: 122upx;
		background: #FFFFFF;
		bottom: 0;
		position: absolute;
	}
	.del{
		width: 100%;
		height: 100upx;
		background: #FFFFFF;
		text-align: center;
		color: red;line-height: 100upx;
		margin-top: 40upx;
	}
	.datas-List-vitae-bao view:nth-of-type(1) view {
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

	.datas-List-vitae-bao view:nth-of-type(1) {
		margin: 0 auto;
	}
</style>
