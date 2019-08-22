<template>
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
								v-model="publishParams.projName"
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
								v-model="publishParams.projSlogan"
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
							<picker @change="bindPickerChange" :value="index" :range="array">
								<view class="uni-input BI-picker" :class="pickerValue ? 'BI-pickered' : ''">{{pickerValue? pickerValue : '请选择'}}</view>
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
							<picker mode="multiSelector" @columnchange="columnChange" @cancel='cancelPC' @change='clickPC' :value="multiIndex" :range="multiArray" range-key='name'>
								<view class="uni-input BI-picker" :class="paramsPC.ptext ? 'BI-pickered' : ''">{{paramsPC.ptext ? paramsPC.ptext + '-' + paramsPC.ctext : '请选择'}}</view>
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
							<view class="BI-picker" v-if="!logo">点击上传</view>
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
							<image :src="rightArrow" class="BI-rightArrow"></image>
						</view>
					</view>
					<view class="clear"></view>
				</view>
			</view>
		</view>
		<view class="tip-infor">请上传清晰容易识别的照片，支持jpg、png格式</view>
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
				publishParams: {
					userId: 0, //用户ID
					projName: "项目名称1", //项目名称
					projSlogan: "项目口号", //项目口号
					fieldCode: "", //领域Code
					pcode: "", //省市
					ccode: "",
					projLogo: "y7UHY2LAQnNHKGGhcjjc2BUIwHWAqRwb3tTX5BFOfSNVAo0bA2HVU8PUgaQKLchqUHo9ra.png", //项目logo
					compName: "公司名称111", //公司名称
					compUrl: "www.baidu.com", //公司官网
					encloToken: "6034c60d-7553-4679-80c7-6145890fd8fb" //token
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
				text: '',
				logo: '', // 项目logo
				xing:  this.Static + 'mbcImg/common/xing.png',
				rightArrow: this.Static + 'mbcImg/publish/rightArrow.png',
				index: 0, // 默认选择第一个
				array: ['中国', '美国', '巴西', '日本'],
				pickerValue: "", // 选中的值
				imageData : [],
				serverUrl: 'https://img01.iambuyer.com/imgup/upLoad/fileUpload'
		  };
	    },
		computed: {
			...mapGetters(['GET_PUBLISH'])
		},
		watch: {
			GET_PUBLISH: {
			  handler (a, b) {
				this.clickItemsIndex = a.titleIndex;
			  },
			  deep: true
			}
		},
	    created () {
			if(uni.getStorageSync('areaPorC')) {
				this.areaPorC = JSON.parse(uni.getStorageSync('areaPorC'));
				this.multiArray.push(this.areaPorC.province);
				this.multiArray.push(this.areaPorC.city[0]);
				this.province.text = this.areaPorC.province[0].name; // 省份 ----- 默认选择的省份
				this.province.pcode = this.areaPorC.province[0].value; //code ----默认选择的省份code
				console.log(this.areaPorC.city[0], '获取数据第一组数据-----城市');
				this.areaPorC.city[0].map((items, index) => {
					if (index === 0) {
						this.city.text = items.name; // 城市 ------默认选择的城市
						this.city.pcode = items.value; //code -----默认的城市code
					}
				})
				console.log(this.multiArray, 'created');
			}
		},
	    mounted () {
	    },
	    methods: {
			...mapMutations({
				setPublishParams: 'setPublishParams'
			}),
			bindPickerChange: function(e) {
				console.log('picker发送选择改变，携带值为', e.target.value);
				this.array.map((items, index) => {
					if(String(index) === String(e.target.value)) {
						this.pickerValue = items;
					}
				})
			},
			// 省市S
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
					this.areaPorC.city.map((items, index) => {
						if (String(index) === String(indexPC)) {
							console.log(items, '与当前省份联动的城市');
							this.multiArray[1] = items; // 赋值新数组
							this.city.text = items[0].name; // 城市 ------默认选择的城市
							this.city.pcode = items[0].value; //code -----默认的城市code
						}
					})
				} else if (column === 1) {
					this.areaPorC.city.map((item, index) => {
						if (String(index) === String(this.province.index)) { // 根据记录下的省份index,去查找对应的城市数组
							item.map((item2, index2) => {
								if (String(index2) === String(indexPC)) {
									this.city.text = item2.name; // 城市 ---- 用户选的城市
									this.city.pcode = item2.value; //code ---用户选的城市code
								}
							})
						}
					})
				};
			},
			// 省市E
			deleteImage: function(e){
				console.log(e, '删除图片')
				this.logo = ''; // 清空数据
			},
			addImage: function(e){
				console.log(e, '添加图片')
				if(e.allImages) { // 上传成功
					this.logo = (e.allImages[0]);
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
	
</style>
