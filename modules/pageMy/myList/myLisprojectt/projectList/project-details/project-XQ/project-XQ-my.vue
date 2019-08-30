<template>
	<view class="InvestorList-information">
		<view class="Investor-name">
			<view class="Investor-name-box">
				<view>
					<image :src="xin"></image>
				</view>
				<view>项目名称</view>
				<view><input type="text" placeholder="请输入" placeholder-style="color:#D2D2D2" v-model="name"/></view>
			</view>
		</view>
		<view class="Investor-wx">
			<view class="Investor-wx-box">
				<view>
					<image :src="xin"></image>
				</view>
				<view>一句话介绍</view>
				<view><input type="text" placeholder="请输入" maxlength="30" placeholder-style="color:#D2D2D2" v-model="ntroduce"/></view>
			</view>
		</view>
		<view class="Investor-field">
			<view class="Investor-field-box">
				<view>
					<image :src="xin"></image>
				</view>
				<view>所属领域</view>
				<view>
					<picker @change="Finanarry" :value="index" :range="arry" range-key='name'>
						<view class="ziti" :class="{'tou':tou}">{{pickerarry? pickerarry : '请选择'}}</view>
					</picker>
				</view>
				<view>
					<image :src="right"></image>
				</view>
			</view>
		</view>
		<view class="Investor-City">
			<view class="Investor-City-box">
				<view>
					<image :src="xin"></image>
				</view>
				<view>所在地区</view>
				<view>
					<picker mode="multiSelector" @columnchange="columnChange" @cancel='cancelPC' @change='clickPC' :value="multiIndex" :range="multiArray" range-key='name'>
						<view class="uni-input BI-picker ziti" :class="paramsPC.ptext ? 'BI-pickered' : ''">{{paramsPC.ptext ? paramsPC.ptext : '请选择'}}</view>
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
				<view class="BI-text-left">项目logo</view>
			</view>
			<view class="right BI-items-right">
				<view class="BI-text-right">
					<image class="zitia" v-if="!logo" :src="img.projLogo"></image>
					<view class="Img-logo">
						<!-- 图片上传 -->
						<view class="Img-Upload">
							<imageUploadOne 
								v-model="imageData" 
								:server-url="serverUrl" 
								limit= 1
								@delete="deleteImage" 
								@add="addImage">
							</imageUploadOne>
						</view>
					</view>
					<image :src="right" class="BI-rightArrow"></image>
				</view>
			</view>
			<view class="clear"></view>
		</view>
		<view class="Investor-Tips">
			请上传清晰容易识别的照片，支持jpg、png格式
		</view>
		<view class="Investor-Submission">
			<view @tap="Submissionseccess">
				<view>
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
				tou:false,
				logo: '',
				xin: this.Static + 'mbcImg/common/xing.png',
				right: this.Static + 'mbcImg/my/right.png',
				imageData: [],
				serverUrl: 'https://img01.iambuyer.com/imgup/upLoad/fileUpload',
				index: 0, // 默认选择第一个
				array: [],
				pickerValue: "", // 选中的值
				pickerarry: "", // 选中的值
				id1:'',
				arry:[],
				id:'',
				name:'',
				ntroduce:'',
				img:[],
				multiArray: [
				],
				multiIndex: [0, 0],
				areaPorC: {}, // 获取缓存的省市
				province: { // 用户选择的省份
					index: 0, // 记录用户选择省份index
					text: '', // 页面显示字段
					pcode: '' // 传给后台参数
				},
				city: { // 用户选择的城市
					text: '', // 页面显示字段
					ccode: '' // 传给后台参数
				},
				paramsPC: { // 用于接口数据省和市
					ptext: '', // 页面显示字段
					pcode: '' ,// 传给后台参数
					ctext: '', // 页面显示字段
					ccode: '' // 传给后台参数
				},
			};
		},
		components: {
			imageUploadOne
		},
		computed: {},
		created() {
			//融资领域
			this.Financinfield();
			if(uni.getStorageSync('areaPorC')) {
				this.areaPorC = JSON.parse(uni.getStorageSync('areaPorC'));
				this.multiArray.push(this.areaPorC.province);
				// this.multiArray.push(this.areaPorC.city[0]);
				this.province.text = this.areaPorC.province[0].name; // 省份 ----- 默认选择的省份
				this.province.pcode = this.areaPorC.province[0].value; //code ----默认选择的省份code
				console.log(this.areaPorC.city[0], '获取数据第一组数据-----城市');
				// this.areaPorC.city[0].map((items, index) => {
				// 	if (index === 0) {
				// 		this.city.text = items.name; // 城市 ------默认选择的城市
				// 		this.city.pcode = items.value; //code -----默认的城市code
				// 	}
				// })
				// console.log(this.multiArray, 'created');
			}
		},
		mounted() {},
		onLoad:function(options){
			this.id = options.id
			console.log(this.id)
		},
		methods: {
			cancelPC () {
				console.log('触发取消省市选择');
			},
			clickPC () {
				console.log('触发确认城市');
				this.paramsPC = { // 用于接口数据省和市
					ptext: this.province.text, // 页面显示字段
					pcode: this.province.pcode ,// 传给后台参数
					ctext: this.city.text, // 页面显示字段
					ccode: this.city.pcode // 传给后台参数
				}
				console.log(this.paramsPC)
			},
			columnChange: function(e) {
				console.log('修改的列为：' + e.detail.column + '，值为：' + JSON.stringify(e.detail));
				this.multiIndex[e.detail.column] = e.detail.value
				let column = e.detail.column; // 第几列 0, 1
				let indexPC = e.detail.value; // 第一列滚动到的位置,1---31
				if (column === 0) { // 用户在操作第一列
					this.areaPorC.province.map((item, index) => {
						if (String(index) === String(indexPC)) {
							this.province.index = indexPC; // 记录用户选择是省份index
							this.province.text = item.name; // 省份 ----- 用户原则的省份
							this.province.pcode = item.value; //code ----用户选择的省份code
						};
					});
					// this.areaPorC.city.map((items, index) => {
					// 	if (String(index) === String(indexPC)) {
					// 		console.log(items, '与当前省份联动的城市');
					// 		this.multiArray[1] = items; // 赋值新数组
					// 		this.city.text = items[0].name; // 城市 ------默认选择的城市
					// 		this.city.pcode = items[0].value; //code -----默认的城市code
					// 	}
					// })
				} 
				// else if (column === 1) {
				// 	this.areaPorC.city.map((item, index) => {
				// 		if (String(index) === String(this.province.index)) { // 根据记录下的省份index,去查找对应的城市数组
				// 			item.map((item2, index2) => {
				// 				if (String(index2) === String(indexPC)) {
				// 					this.city.text = item2.name; // 城市 ---- 用户选的城市
				// 					this.city.pcode = item2.value; //code ---用户选的城市code
				// 				}
				// 			})
				// 		}
				// 	})
				// };
			},
			deleteImage: function(e) {
				console.log(e, '删除图片')
				this.logo = ''; // 清空数据
			},
			addImage: function(e) {
				console.log(e, '添加图片')
				if (e.allImages) { // 上传成功
					this.logo = (e.allImages[0]);
				}
			},
			bindPickerChange: function(e) {
				console.log('picker发送选择改变，携带值为', e.target.value);
				this.array.map((items, index) => {
					if (String(index) === String(e.target.value)) {
						this.pickerValue = items;
					}
				})
			},
			Finanarry: function(e) {
				this.arry.map((items, index) => {
					if (String(index) === String(e.target.value)) {
						if(this.pickerarry!=='请选择'){
							this.tou=true
						}
						this.pickerarry = items.name;
						this.id1=items.id
						console.log(this.pickerarry, this.id1)
					}
				})
			},
			Submissionseccess(){
				if (uni.getStorageSync('landRegist')) {
					let landRegistLG = JSON.parse(uni.getStorageSync('landRegist')); // 读取缓存的用户信息
					console.log(landRegistLG.user.id);
					let params = {
						id:this.id,
						projName:this.name,
						projSlogan:this.ntroduce,
						fieldCode:this.id1,
						projLogo:this.logo,
						pcode:this.province.pcode
					}; // 请求总数居时 参数为空
					uni.showLoading({ // 展示loading
						title: '加载中'
					});
					uni.request({
						url: this.api2 + '/proj/setProjBasi', //接口地址。
						data: this.endParams(params),
						method: 'POST',
						header: {
							Authorization: "Bearer " + landRegistLG.token //将token放到请求头中
						},
						success: (response) => {
							uni.hideLoading();
							console.log(response.data);
							// uni.navigateBack({
							// })
							uni.navigateTo({
								url:'/modules/pageMy/myList/myLisprojectt/projectList/project-details/project-details?id='+this.peorid
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
			xiang(e){
				if (uni.getStorageSync('landRegist')) {
					let landRegistLG = JSON.parse(uni.getStorageSync('landRegist')); // 读取缓存的用户信息
					console.log(landRegistLG.user.id);
					// let params = {}; // 请求总数居时 参数为空
					uni.showLoading({ // 展示loading
						title: '加载中'
					});
					uni.request({
						url: this.api2 + '/proj/getProjBasi?projId='+this.id, //接口地址。
						// data: this.endParams(params),
						method: 'GET',
						header: {
							Authorization: "Bearer " + landRegistLG.token //将token放到请求头中
						},
						success: (response) => {
							uni.hideLoading();
							console.log(response.data.content);
							this.img=response.data.content
							this.name=response.data.content.projName
							this.ntroduce=response.data.content.projSlogan
							this.ntroduce=response.data.content.projSlogan
							this.province.pcode=response.data.content.pcode
							let pcode=response.data.content.pcode
							console.log(pcode)
							this.areaPorC.province.map((item, index) => {
								if (String(pcode) === String(item.value)) {
									this.paramsPC.ptext = item.name; // 省份 ----- 用户原则的省份
									// this.province.pcode = item.value; //code ----用户选择的省份code
									console.log(item.name,item.value)
								};
							});
							// console.log(FainId, '融资id');
							let FainId=response.data.content.fieldCode
							console.log(this.arry, '融资数组');
							this.arry.map((items, index) => {
								if (String(FainId) === String(items.id)) {
									if(this.pickerarry!=='请选择'){
										this.tou=true
									}
									this.pickerarry = items.name;
									this.id1=items.id
								}
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
			Financinfield(){//融资领域
				if (uni.getStorageSync('landRegist')) {
					let landRegistLG = JSON.parse(uni.getStorageSync('landRegist')); // 读取缓存的用户信息
					console.log(landRegistLG.user.id);
					// let params = {}; // 请求总数居时 参数为空
					uni.showLoading({ // 展示loading
						title: '加载中'
					});
					uni.request({
						url: this.api2 + '/field/fieldList', //接口地址。
						// data: this.endParams(params),
						method: 'GET',
						header: {
							Authorization: "Bearer " + landRegistLG.token //将token放到请求头中
						},
						success: (response) => {
							uni.hideLoading();
							// console.log(response.data.content);
							this.arry=response.data.content
							this.xiang();
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
	.tou{
		color: black;
	}
	.BI-items{
		position: relative;
		width: 100%;
		margin: 0 auto;
		background: #FFFFFF;
	}
	.BI-items-left{
		position: relative;
		width: 36%;
	}
	.BI-text-left{
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
	.BI-items-right{
		position: relative;
		width: 64%;
	}
	.BI-text-right{
		position: relative;
		width: 90%;
		margin-top: 44upx;
		margin-bottom: 44upx;
		margin: 0 auto;
	}
	.Img-Upload{
		width: 120upx;
		height: 80upx;
		position: absolute;
		right: 28upx;
		top: 30upx !important;
	}
	.mustFill{
		position: absolute;
		left: 40upx;
		top: 10upx;
	}
	.mustFill>image{
		position: relative;
		width: 20upx;
		height: 20upx;
		top: 20upx;
	}
	.uni-input-wrapper{
		text-align: right;
	}
	.BI-rightArrow{
		position: absolute;
		width: 25upx;
		height: 18upx;
		right: 15upx;
		top: 50upx;
	}
	.uni-input-placeholder{
		color: #D2D2D2 !important;
	}
	.InvestorList-information {
		width: 100%;
		height: 100%;
	}

	.img{
		position: absolute;
		top: 0;
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

	.Investor-wx {
		width: 100%;
		height: 122upx;
		background: #FFFFFF;
	}

	.Investor-wx-box {
		width: 90%;
		height: 100%;
		border-bottom: 2upx solid #F5F5F5;
		margin: 0 auto;
		display: flex;
		position: relative;
	}

	.Investor-wx-box view:nth-of-type(1) {
		width: 20upx;
		height: 20upx;
		padding-top: 26upx;
	}

	.Investor-wx-box view:nth-of-type(1) image {
		width: 100%;
		height: 100%;
	}

	.Investor-wx-box view:nth-of-type(2) {
		width: 202upx;
		height: 32upx;
		font-size: 30upx;
		color: #2E2E30;
		padding-top: 30upx;
		padding-left: 10upx;
	}

	.Investor-wx-box view:nth-of-type(3) {
		width: 300upx;
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
	.zitia {
		position: absolute;
		right: 50upx !important;
		height: 30upx;
		top: 20upx;
		font-size: 30upx !important;
		color:#D2D2D2;
		width:80upx;
		height: 80upx;
	}

	.Investor-City {
		width: 100%;
		height: 122upx;
		background: #FFFFFF;
	}

	.Investor-City-box {
		width: 90%;
		height: 100%;
		border-bottom: 2upx solid #F5F5F5;
		margin: 0 auto;
		display: flex;
		position: relative;
	}

	.Investor-City-box view:nth-of-type(1) {
		width: 20upx;
		height: 20upx;
		padding-top: 26upx;
	}

	.Investor-City-box view:nth-of-type(1) image {
		width: 100%;
		height: 100%;
	}

	.Investor-City-box view:nth-of-type(2) {
		width: 142upx;
		height: 32upx;
		font-size: 30upx;
		color: #2E2E30;
		padding-top: 30upx;
		padding-left: 10upx;
	}

	.Investor-City-box view:nth-of-type(3) {
		width: 100upx;
		height: 35upx;
		position: absolute;
		right: 40upx;
		top: 40upx;

		color: #D2D2D2;
		text-align: right;
	}

	.Investor-City-box view:nth-of-type(4) {
		position: absolute;
		right: 0;
		top: 40upx;
		width: 25upx;
		height: 18upx;
	}

	.Investor-City-box view:nth-of-type(4) image {
		width: 100%;
		height: 100%;
	}

	.Investor-field {
		width: 100%;
		height: 122upx;
		background: #FFFFFF;
	}

	.Investor-field-box {
		width: 90%;
		height: 100%;
		border-bottom: 2upx solid #F5F5F5;
		margin: 0 auto;
		display: flex;
		position: relative;
	}

	.Investor-field-box view:nth-of-type(1) {
		width: 20upx;
		height: 20upx;
		padding-top: 26upx;
	}

	.Investor-field-box view:nth-of-type(1) image {
		width: 100%;
		height: 100%;
	}

	.Investor-field-box view:nth-of-type(2) {
		width: 152upx;
		height: 32upx;
		font-size: 30upx;
		color: #2E2E30;
		padding-top: 30upx;
		padding-left: 10upx;
	}

	.Investor-field-box view:nth-of-type(3) {
		width: 200upx;
		height: 35upx;
		position: absolute;
		right: 40upx;
		top: 40upx;
		font-size: 30upx;
		color: #D2D2D2;
		text-align: right;
	}

	.Investor-field-box view:nth-of-type(4) {
		position: absolute;
		right: 0;
		top: 40upx;
		width: 25upx;
		height: 18upx;
	}

	.Investor-field-box view:nth-of-type(4) image {
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

	.Investor-card {
		width: 100%;
		height: 122upx;
		background: #FFFFFF;
		margin-top: 20upx;
	}

	.Investor-card-box {
		width: 90%;
		height: 100%;
		border-bottom: 2upx solid #F5F5F5;
		margin: 0 auto;
		display: flex;
		position: relative;
	}

	.Investor-card-box view:nth-of-type(1) {
		width: 20upx;
		height: 20upx;
		padding-top: 26upx;
	}

	.Investor-card-box view:nth-of-type(1) image {
		width: 100%;
		height: 100%;
	}

	.Investor-card-box view:nth-of-type(2) {
		width: 152upx;
		height: 32upx;
		font-size: 30upx;
		color: #2E2E30;
		padding-top: 30upx;
		padding-left: 10upx;
	}

	.Investor-card-box view:nth-of-type(3) {
		width: 200upx;
		height: 35upx;
		position: absolute;
		right: 40upx;
		top: 40upx;
		font-size: 30upx;
		color: #D2D2D2;
		text-align: right;
	}

	.Investor-card-box view:nth-of-type(4) {
		position: absolute;
		right: 0;
		top: 40upx;
		width: 25upx;
		height: 18upx;
	}

	.Investor-card-box view:nth-of-type(4) image {
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

	.Investor-Submission view:nth-of-type(1) {
		margin: 0 auto;
	}
</style>
