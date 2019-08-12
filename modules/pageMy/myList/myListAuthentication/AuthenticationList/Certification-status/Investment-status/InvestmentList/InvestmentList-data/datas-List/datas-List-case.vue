<template>
	<view class="datas-List-case">
		<view class="datas-List-case-name">
			<view class="datas-List-case-name-box">
				<view><image :src="xin"></image></view>
				<view>项目名称</view>
				<view><input type="text" placeholder="请输入" placeholder-style="color:#D2D2D2"/></view>
			</view>
		</view>
		<view class="datas-List-case-name">
			<view class="datas-List-case-name-box">
				<view><image :src="xin"></image></view>
				<view>简介</view>
				<view><input type="text" placeholder="请输入" placeholder-style="color:#D2D2D2"/></view>
			</view>
		</view>
		<view class="datas-List-case-yes">
			<view class="datas-List-case-yes-box">
				<view><image :src="xin"></image></view>
				<view>投资时间</view>
				<view>
					<picker @change="bindPickerChange" :value="index" :range="array">
						<view class="ziti">{{pickerValue? pickerValue : '请选择'}}</view>
					</picker>
				</view>
				<view><image :src="right"></image></view>
			</view>
		</view>
		<view class="datas-List-case-yes">
			<view class="datas-List-case-yes-box">
				<view><image :src="xin"></image></view>
				<view>投资轮次</view>
				<view>
					<picker @change="bindPickerChange2" :value="index" :range="array2">
						<view class="ziti">{{pickerValue2? pickerValue2 : '请选择'}}</view>
					</picker>
				</view>
				<view><image :src="right"></image></view>
			</view>
		</view>
		<view class="datas-List-case-logo">
			<view class="datas-List-case-logo-box">
				<view><image src=""></image></view>
				<view>机构logo</view>
				<view>
					<view class="ziti" v-if="!logo">点击上传</view>
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
		<view class="datas-List-case-Tips">
			请上传清晰可见，容易识别的照片，支持JPG、PNG格式
		</view>
		<view class="datas-List-case-bao">
			<view>
				<view>
					保存
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import xin from '@/static/mbcImg/my/Image 1.png'
	import right from '@/static/mbcImg/my/right1.png'
	import imageUploadOne from '@/components/imageUpload/imageUploadOne.vue'
	export default {
		data() {
			return {
				logo: '',
				xin:xin,
				right:right,
				index: 0, // 默认选择第一个
				index2: 0, // 默认选择第一个
				array: ['2015-05-23', '2018-19-25','2019-16-17'],
				array2: ['一轮', '二轮','天使轮'],
				pickerValue: "", // 选中的值
				pickerValue2: "", // 选中的值
				imageData : [],
				serverUrl: 'https://img01.iambuyer.com/imgup/upLoad/fileUpload'
			};
		},
		components: {
			imageUploadOne
		},
		computed: {
		},
		created() {
			console.log('在组件中并不能使用页面生命周期函数');
		},
		mounted() {
		},
		methods: {
			bindPickerChange: function(e) {
				console.log('picker发送选择改变，携带值为', e.target.value);
				this.array.map((items, index) => {
					if(index === e.target.value) {
						this.pickerValue = items;
					}
				})
			},
			bindPickerChange2: function(e) {
				console.log('picker发送选择改变，携带值为', e.target.value);
				this.array2.map((items, index) => {
					if(index === e.target.value) {
						this.pickerValue2 = items;
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
	input {
		color: #D2D2D2;
	}
	.datas-List-case{
		width: 100%;
		height: 100%;
		
	}
	.datas-List-case-name{
		width:100%;
		height: 122upx;
		background: #FFFFFF;
	}
	.datas-List-case-name-box{
		width: 90%;
		height: 100%;
		border-bottom: 2upx solid #F5F5F5;
		margin: 0 auto;
		display: flex;
		position: relative;
	}
	.datas-List-case-name-box view:nth-of-type(1){
		width: 20upx;
		height: 20upx;
		padding-top: 26upx;
	}
	.datas-List-case-name-box view:nth-of-type(1) image{
		width: 100%;
		height: 100%;
	}
	.datas-List-case-name-box view:nth-of-type(2){
		width: 142upx;
		height: 32upx;
		font-size: 30upx;
		color: #2E2E30;
		padding-top: 30upx;
		padding-left: 10upx;
	}
	.datas-List-case-name-box view:nth-of-type(3){
		width: 200upx;
		height: 35upx;
		position: absolute;
		right: 0;
		top: 40upx;
		font-size: 30upx;
		color: #D2D2D2;
		text-align: right;
	}
	.ziti{
		position: absolute;
		right: 0upx;
		width: 300upx !important;
		height: 30upx;
		top: -30upx;
		font-size: 30upx !important;
	}
	.datas-List-case-yes{
		width:100%;
		height: 122upx;
		background: #FFFFFF;
	}
	.datas-List-case-yes-box{
		width: 90%;
		height: 100%;
		border-bottom: 2upx solid #F5F5F5;
		margin: 0 auto;
		display: flex;
		position: relative;
	}
	.datas-List-case-yes-box view:nth-of-type(1){
		width: 20upx;
		height: 20upx;
		padding-top: 26upx;
	}
	.datas-List-case-yes-box view:nth-of-type(1) image{
		width: 100%;
		height: 100%;
	}
	.datas-List-case-yes-box view:nth-of-type(2){
		width: 142upx;
		height: 32upx;
		font-size: 30upx;
		color: #2E2E30;
		padding-top: 30upx;
		padding-left: 10upx;
	}
	.datas-List-case-yes-box view:nth-of-type(3){
		width: 100upx;
		height: 35upx;
		position: absolute;
		right: 40upx;
		top: 40upx;
		
		color: #D2D2D2;
		text-align: right;
	}
	.datas-List-case-yes-box view:nth-of-type(4){
		position: absolute;
		right: 0;
		top: 40upx;
		width: 25upx;
		height: 18upx;
	}.datas-List-case-yes-box view:nth-of-type(4) image{
		width: 100%;
		height: 100%;
	}
	.Img-Upload{
		width: 120upx !important;
		height: 80upx;
		position: absolute;
		right: 58upx;
		top: -45upx;
		font-size: 226upx;
	}
	.imageUpload{
		width: 200upx !important;
	}
	.datas-List-case-logo{
		width:100%;
		height: 122upx;
		background: #FFFFFF;
	}
	.datas-List-case-logo-box{
		width: 90%;
		height: 100%;
		border-bottom: 2upx solid #F5F5F5;
		margin: 0 auto;
		display: flex;
		position: relative;
	}
	.datas-List-case-logo-box view:nth-of-type(1){
		width: 20upx;
		height: 20upx;
		padding-top: 26upx;
	}
	.datas-List-case-logo-box view:nth-of-type(1) image{
		width: 100%;
		height: 100%;
	}
	.datas-List-case-logo-box view:nth-of-type(2){
		width: 152upx;
		height: 32upx;
		font-size: 30upx;
		color: #2E2E30;
		padding-top: 30upx;
		padding-left: 10upx;
	}
	.datas-List-case-logo-box view:nth-of-type(3){
		width: 200upx;
		height: 35upx;
		position: absolute;
		right: 40upx;
		top: 40upx;
		font-size: 30upx;
		color: #D2D2D2;
		text-align: right;
	}
	.datas-List-case-logo-box view:nth-of-type(4){
		position: absolute;
		right: 0;
		top: 40upx;
		width: 25upx;
		height: 18upx;
	}.datas-List-case-logo-box view:nth-of-type(4) image{
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
	.datas-List-case-bao view:nth-of-type(1){
		margin: 0 auto;
	}
</style>
