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
								v-model="text"
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
								v-model="text"
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
								<view class="uni-input BI-picker">{{pickerValue? pickerValue : '请选择'}}</view>
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
							<picker @change="bindPickerChange" :value="index" :range="array">
								<view class="uni-input BI-picker">{{pickerValue? pickerValue : '请选择'}}</view>
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
	import imageUploadOne from '@/components/imageUpload/imageUploadOne.vue'
	import xing from '@/static/mbcImg/common/xing.png';
	import rightArrow from '@/static/mbcImg/publish/rightArrow.png';
	export default {
	    components: {
	      wInput,
		  imageUploadOne
	    },
	    data () {
	      return {
				text: '',
				logo: '', // 项目logo
				xing: xing,
				rightArrow:rightArrow,
				index: 0, // 默认选择第一个
				array: ['中国', '美国', '巴西', '日本'],
				pickerValue: "", // 选中的值
				imageData : [],
				serverUrl: 'https://img01.iambuyer.com/imgup/upLoad/fileUpload'
		  };
	    },
	    created () {
		},
	    mounted () {
	    },
	    methods: {
			bindPickerChange: function(e) {
				console.log('picker发送选择改变，携带值为', e.target.value);
				this.array.map((items, index) => {
					if(String(index) === String(e.target.value)) {
						this.pickerValue = items;
					}
				})
			},
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
