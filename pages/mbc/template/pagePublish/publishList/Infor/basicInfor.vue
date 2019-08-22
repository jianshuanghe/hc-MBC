<template>
	<view class="">
		<view class="basicInfor-content">
			<view class="infor-content-box">
				<view class="basicInfor-box">
					<!-- 项目名称 -->
					<view class="BI-items">
						<view class="left BI-items-left">
							<view class="mustFill">
								<image :src='xing'></image>
							</view>
							<view class="BI-text-left">项目名称</view>
						</view>
						<view class="right BI-items-right">
							<view class="BI-text-right">
								<wInput
									v-model="listData.publishParams.projName"
									placeholder="请输入"
								></wInput>
							</view>
						</view>
						<view class="clear"></view>
						<view class="line"></view>
					</view>
					<!-- 一句话介绍 -->
					<view class="BI-items">
						<view class="left BI-items-left">
							<view class="mustFill">
								<image :src='xing'></image>
							</view>
							<view class="BI-text-left">一句话介绍</view>
						</view>
						<view class="right BI-items-right">
							<view class="BI-text-right">
								<wInput
									v-model="listData.publishParams.projSlogan"
									placeholder="请输入"
								></wInput>
							</view>
						</view>
						<view class="clear"></view>
						<view class="line"></view>
					</view>
					<!-- 所属领域 -->
					<view class="BI-items">
						<view class="left BI-items-left">
							<view class="mustFill">
								<image :src='xing'></image>
							</view>
							<view class="BI-text-left">所属领域</view>
						</view>
						<view class="right BI-items-right">
							<view class="BI-text-right">
								<picker @change="bindPickerChange" value=0 :range="listData.array" range-key='name'>
									<view class="uni-input BI-picker" :class="listData.pickerValue ? 'BI-pickered' : ''">{{listData.pickerValue? listData.pickerValue : '请选择'}}</view>
									<image :src="rightArrow" class="BI-rightArrow"></image>
								</picker>
							</view>
						</view>
						<view class="clear"></view>
						<view class="line"></view>
					</view>
					<!-- 所在地区 -->
					<view class="BI-items">
						<view class="left BI-items-left">
							<view class="mustFill">
								<image :src='xing'></image>
							</view>
							<view class="BI-text-left">所在地区</view>
						</view>
						<view class="right BI-items-right">
							<view class="BI-text-right">
								<picker mode="multiSelector" @columnchange="columnChange" @cancel='cancelPC' @change='clickPC' :value="listData.multiIndex" :range="listData.multiArray" range-key='name'>
									<view class="uni-input BI-picker" :class="listData.paramsPC.ptext ? 'BI-pickered' : ''">{{listData.paramsPC.ptext ? listData.paramsPC.ptext + '-' + listData.paramsPC.ctext : '请选择'}}</view>
									<image :src="rightArrow" class="BI-rightArrow"></image>
								</picker>
							</view>
						</view>
						<view class="clear"></view>
						<view class="line"></view>
					</view>
					<!-- 项目logo -->
					<view class="BI-items">
						<view class="left BI-items-left">
							<view class="mustFill">
								<image :src='xing'></image>
							</view>
							<view class="BI-text-left">项目log</view>
						</view>
						<view class="right BI-items-right">
							<view class="BI-text-right">
								<view class="BI-picker" v-if="!listData.logo">点击上传</view>
								<image class="BI-picker-Img" v-if="listData.logo" :src="listData.logo"></image>
								<view class="Img-logo">
									<!-- 图片上传 -->
									<view class="Img-Upload">
										<imageUploadOne 
											v-model="listData.imageData" 
											:server-url="listData.serverUrl" 
											limit= 1
											@delete="deleteImage" 
											@add="addImage">
										</imageUploadOne>
									</view>
								</view>
								<image :src="rightArrow" class="BI-rightArrow"></image>
							</view>
						</view>
						<view class="clear"></view>
					</view>
				</view>
			</view>
			<view class="tip-infor">请上传清晰容易识别的照片，支持jpg、png格式</view>
		</view>
		<view class="companyInfor-content">
			<view class="company-content-box">
				<view class="basicInfor-box">
					<!-- 公司全称 -->
					<view class="BI-items">
						<view class="left BI-items-left">
							<view class="mustFill">
								<image :src='xing'></image>
							</view>
							<view class="BI-text-left">公司全称</view>
						</view>
						<view class="right BI-items-right">
							<view class="BI-text-right">
								<wInput
									v-model="listData.publishParams.compName"
									placeholder="请输入"
								></wInput>
							</view>
						</view>
						<view class="clear"></view>
						<view class="line"></view>
					</view>
					<!-- 官网(选填) -->
					<view class="BI-items">
						<view class="left BI-items-left">
							<!-- <view class="mustFill">
								<image :src='xing'></image>
							</view> -->
							<view class="BI-text-left">官网(选填)</view>
						</view>
						<view class="right BI-items-right">
							<view class="BI-text-right">
								<wInput
									v-model="listData.publishParams.compUrl"
									placeholder="请输入"
								></wInput>
							</view>
						</view>
						<view class="clear"></view>
					</view>
				</view>
			</view>
		</view>
		<view class="btn-box">
			<view class="SL-btn" >
				<view class="SL-btn-text" @tap="clickPublishPost()">提交</view>
			</view>
		</view>
	</view>
</template>

<script>
	import wInput from './../../../../../../components/watch-login/watch-input1.vue';
	import imageUploadOne from '@/components/imageUpload/imageUploadOne.vue';
	import { mapMutations, mapGetters } from 'vuex';
	export default {
	    components: {
	      wInput,
		  imageUploadOne
	    },
	    data () {
	      return {
			  xing:  this.Static + 'mbcImg/common/xing.png',
			  rightArrow: this.Static + 'mbcImg/publish/rightArrow.png',
			  listData: {
				publishParams: {
					userId: 0, //用户ID
					projName: "", //项目名称
					projSlogan: "", //项目口号
					fieldCode: "", //领域Code
					pcode: "", //省市
					ccode: "",
					projLogo: "", //项目logo
					compName: "", //公司名称
					compUrl: "", //公司官网
					encloToken: "38952c85-79c2-48cc-b537-2a6d3116c909" //token
				},
				// 省市S
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
				// 省市E
				array: [],
				pickerValue: "", // 选中的值,页面展示数据
				imageData : [],
				serverUrl: 'https://img01.iambuyer.com/imgup/upLoad/fileUpload' ,// 图片上传地址
				isPostSucccess: false // 默认没有提交成功
			  }
		  };
	    },
		computed: {
			...mapGetters(['GET_PUBLISH'])
		},
		watch: {
			GET_PUBLISH: {
			  handler (a, b) {
			  },
			  deep: true
			}
		},
	    created () {
			if(uni.getStorageSync('SacnToken')) {
				this.listData.publishParams.encloToken = uni.getStorageSync('SacnToken');
			};
			if(uni.getStorageSync('areaPorC')) {
				this.listData.areaPorC = JSON.parse(uni.getStorageSync('areaPorC'));
				this.listData.multiArray.push(this.listData.areaPorC.province);
				this.listData.multiArray.push(this.listData.areaPorC.city[0]);
				this.listData.province.text = this.listData.areaPorC.province[0].name; // 省份 ----- 默认选择的省份
				this.listData.province.pcode = this.listData.areaPorC.province[0].value; //code ----默认选择的省份code
				console.log(this.listData.areaPorC.city[0], '获取数据第一组数据-----城市');
				this.listData.areaPorC.city[0].map((items, index) => {
					if (index === 0) {
						this.listData.city.text = items.name; // 城市 ------默认选择的城市
						this.listData.city.pcode = items.value; //code -----默认的城市code
					}
				})
				console.log(this.listData.multiArray, 'created');
				this.getField(); // 获取领域
			};
			if (uni.getStorageSync('landRegist')) {
				let landRegistLG = JSON.parse(uni.getStorageSync('landRegist')); // 读取缓存的用户信息
				console.log(landRegistLG.user.id);
				this.listData.userId = landRegistLG.user.id;
			};
			if (uni.getStorageSync('publishListData')) {
				let publishListData = JSON.parse(uni.getStorageSync('publishListData')); // 读取缓存的用户信息
				console.log(publishListData);
				this.listData = publishListData;
			};
		},
	    mounted () {
	    },
		beforeDestroy () {
			console.log('页面销毁之前缓存数据')
			if (this.listData.isPostSucccess === false) { // 如果用户没有提交数据之前用户切换页面,需要缓存数据
				uni.setStorageSync('publishListData', JSON.stringify(this.listData));// 缓存确认成功的数据
			}
		},
	    methods: {
			...mapMutations({
				setPublishParams: 'setPublishParams'
			}),
			getField () { // 公共组件领域
				let fieldData = [];
				if (uni.getStorageSync('landRegist')) {
					let landRegistLG = JSON.parse(uni.getStorageSync('landRegist')); // 读取缓存的用户信息
					console.log(landRegistLG.user.id);
					let params = {}; // 请求总数居时 参数为空
					uni.request({
						url: this.api2 + '/field/fieldList', //接口地址。
						data: this.endParams(params),
						header: {
							Authorization:"Bearer "+landRegistLG.token//将token放到请求头中
						},
						success: (response) => {
							console.log(response.data.content); // 领域
							let field = response.data.content;
							field.map((items, index) => {
								let fieldItems = {
									name: items.name,
									value: items.id,
								};
								fieldData.push(fieldItems);
							});
							this.listData.array = fieldData;
						},
						fail: (error) => {
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
				this.listData.array.map((items, index) => {
					if(String(index) === String(e.target.value)) {
						this.listData.pickerValue = items.name; // 页面展示的领域text
						this.listData.publishParams.fieldCode = items.value; // 参数接口里的code
					}
				})
			},
			// 省市S
			cancelPC () {
				console.log('触发取消省市选择');
			},
			clickPC () {
				console.log('触发确认城市');
				this.listData.paramsPC = { // 用于接口数据省和市
					ptext: this.listData.province.text, // 页面显示字段
					pcode: this.listData.province.pcode ,// 传给后台参数
					ctext: this.listData.city.text, // 页面显示字段
					ccode: this.listData.city.pcode // 传给后台参数
				}
			},
			columnChange: function(e) {
				console.log('修改的列为：' + e.detail.column + '，值为：' + JSON.stringify(e.detail));
				this.listData.multiIndex[e.detail.column] = e.detail.value
				let column = e.detail.column; // 第几列 0, 1
				let indexPC = e.detail.value; // 第一列滚动到的位置,1---31
				if (column === 0) { // 用户在操作第一列
					this.listData.areaPorC.province.map((item, index) => {
						if (String(index) === String(indexPC)) {
							this.listData.province.index = indexPC; // 记录用户选择是省份index
							this.listData.province.text = item.name; // 省份 ----- 用户原则的省份
							this.listData.province.pcode = item.value; //code ----用户选择的省份code
						};
					});
					this.listData.areaPorC.city.map((items, index) => {
						if (String(index) === String(indexPC)) {
							console.log(items, '与当前省份联动的城市');
							this.listData.multiArray[1] = items; // 赋值新数组
							this.listData.city.text = items[0].name; // 城市 ------默认选择的城市
							this.listData.city.pcode = items[0].value; //code -----默认的城市code
						}
					})
				} else if (column === 1) {
					this.listData.areaPorC.city.map((item, index) => {
						if (String(index) === String(this.listData.province.index)) { // 根据记录下的省份index,去查找对应的城市数组
							item.map((item2, index2) => {
								if (String(index2) === String(indexPC)) {
									this.listData.city.text = item2.name; // 城市 ---- 用户选的城市
									this.listData.city.pcode = item2.value; //code ---用户选的城市code
								}
							})
						}
					})
				};
			},
			// 省市E
			deleteImage: function(e){
				console.log(e, '删除图片')
				this.listData.logo = ''; // 清空数据
				this.listData.imageData = []; // 显示数据
			},
			addImage: function(e){
				console.log(e, '添加图片')
				if(e.allImages) { // 上传成功
					this.listData.logo = e.allImages[0].imgUrl;
					this.listData.publishParams.projLogo = e.allImages[0].imgName; // 接口中的logo
					this.listData.imageData = e.allImages[0]; // 显示数据
				}
			},
			clickPublishPost () {
				console.log('触发提交按钮');
				this.listData.publishParams.pcode = this.listData.paramsPC.pcode;
				this.listData.publishParams.ccode = this.listData.paramsPC.ccode;
				let data = this.listData.publishParams;
				if (data.projName === '') { // 项目名称不能为空
					 uni.showToast({
						title: '项目名称不能为空',
						icon: 'none',
						duration: 500
					});
				  return false;
				};
				if (data.projSlogan === '') { // 项目口号不能为空
					 uni.showToast({
						title: '项目口号不能为空',
						icon: 'none',
						duration: 500
					});
				  return false;
				};
				if (data.fieldCode === '') { // 领域不能为空
					 uni.showToast({
						title: '领域不能为空',
						icon: 'none',
						duration: 500
					});
				  return false;
				};
				if (data.pcode === '') { // 地区不能为空
					 uni.showToast({
						title: '地区不能为空',
						icon: 'none',
						duration: 500
					});
				  return false;
				};
				if (data.projLogo === '') { // 项目logo不能为空
					 uni.showToast({
						title: '项目logo不能为空',
						icon: 'none',
						duration: 500
					});
				  return false;
				};
				if (data.compName === '') { // 公司名称不能为空
					 uni.showToast({
						title: '公司名称不能为空',
						icon: 'none',
						duration: 500
					});
				  return false;
				};
				if (uni.getStorageSync('landRegist')) {
					let landRegistLG = JSON.parse(uni.getStorageSync('landRegist')); // 读取缓存的用户信息
					console.log(landRegistLG.user.id);
					let params = this.listData.publishParams; // 请求总数居时 参数为空
					uni.request({
						url: this.api2 + '/proj/add', //接口地址。
						data: this.endParams(params),
						method: 'POST',
						header: {
							Authorization:"Bearer "+landRegistLG.token//将token放到请求头中
						},
						success: (response) => {
							console.log(response.data);
							if (response.data.code === 200) {
								uni.setStorageSync('clickItemsIndexPublish', 1);
								console.log('切换上传BP和基本信息');
								this.$store.commit('setPublishTitleIndex', 1); // 更新setPublishTitleIndex
								uni.removeStorageSync('isUpLoadFile'); // 确认上传成功清空isUpLoadFile
								uni.removeStorageSync('SacnToken'); // 确认上传成功清空token
								uni.removeStorageSync('publishListData'); // 确认上传成功清空publishListData
								uni.showToast({
									title: '发布成功',
									icon: 'none',
									duration: 1000
								});
							} else {
								uni.showToast({
									title: response.data.message,
									icon: 'none',
									duration: 1000
								});
							}
						},
						fail: (error) => {
							console.log(error, '网络繁忙，请稍后');
							uni.showToast({
								title: '网络繁忙，请稍后',
								icon: 'none',
								duration: 500
							});
						}
					});
				}
			}
	    }
	  };
</script>

<style>
	.basicInfor-content{
		position: relative;
		width: 100%;
	}
	.infor-content-box{
		position: relative;
		padding: 14upx 30upx;
		background: #fff;
		height: 640upx;
		margin-top: 88upx;
	}
	.tip-infor{
		position: relative;
		padding: 14upx 30upx;
		height: 86upx;
		font-family: PingFangSC-Light;
		font-size: 24upx;
		color: #9B9B9B;
		line-height: 40upx;
	}
	.basicInfor-box{
		position: relative;
		width: 100%;
	}
	.BI-items{
		position: relative;
		width: 100%;
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
		margin-left: 24upx
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
		right: 28upx;
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
		width: 24upx;
		height: 24upx;
		right: 0;
		top: 6upx;
	}
	.uni-input-placeholder{
		color: #D2D2D2 !important;
	}
	.companyInfor-content{
		position: relative;
		width: 100%;
	}
	.company-content-box{
		position: relative;
		padding: 14upx 30upx;
		background: #fff;
		height: 234upx;
	}
	.basicInfor-box{
		position: relative;
		width: 100%;
	}
	.BI-items{
		position: relative;
		width: 100%;
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
		margin-left: 24upx
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
	.uni-input-placeholder{
		color: #D2D2D2 !important;
	}
	.SL-btn{
		position: absolute;
		width: 690upx;
		margin-left: 30upx;
		background: #02C2A2;
		border-radius: 2px;
		margin-top: 40upx;
		margin-bottom: 200upx;
	}
	.SL-btn-text{
		font-family: PingFangSC-Regular;
		font-size: 28upx;
		color: #FFFFFF;
		letter-spacing: 0;
		text-align: center;
		line-height: 90upx;
	}
</style>
