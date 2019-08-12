<template>
	<view class="InvestorList-information">
		<view class="Investor-name">
			<view class="Investor-name-box">
				<view><image :src="xin"></image></view>
				<view>真实姓名</view>
				<view><input type="text" placeholder="请输入" placeholder-style="color:#D2D2D2"/></view>
			</view>
		</view>
		<view class="Investor-wx">
			<view class="Investor-wx-box">
				<view><image :src="xin"></image></view>
				<view>微信号</view>
				<view><input type="text" placeholder="请输入" placeholder-style="color:#D2D2D2"/></view>
			</view>
		</view>
		<view class="Investor-mailbox">
			<view class="Investor-mailbox-box">
				<view><image :src="xin"></image></view>
				<view>邮箱</view>
				<view><input type="text" placeholder="请输入" placeholder-style="color:#D2D2D2"/></view>
			</view>
		</view>
		<view class="Investor-City">
			<view class="Investor-City-box">
				<view><image :src="xin"></image></view>
				<view>常住城市</view>
				<view>
					<picker @change="bindPickerChange" :value="index" :range="array">
						<view class="ziti">{{pickerValue? pickerValue : '请选择'}}</view>
					</picker>
				</view>
				<view><image :src="right"></image></view>
			</view>
		</view>
		<view class="Investor-identity">
			<view class="Investor-identity-box">
				<view><image :src="xin"></image></view>
				<view>投资人身份</view>
				<view>
					<picker @change="bindPickerChange1" :value="index1" :range="array1">
						<view class="ziti">{{pickerValue1? pickerValue1 : '请选择'}}</view>
					</picker>
				</view>
				<view><image :src="right"></image></view>
			</view>
		</view>
	</view>
</template>

<script>
	import right from '@/static/mbcImg/my/right1.png'
	import xin from '@/static/mbcImg/my/Image 1.png'
	import imageUploadOne from '@/components/imageUpload/imageUploadOne.vue'
	export default {
		data() {
			return {
				
				logo: '',
				xin:xin,
				right:right,
				imageData : [],
				serverUrl: 'https://img01.iambuyer.com/imgup/upLoad/fileUpload',
				index: 0, // 默认选择第一个
				array: ['中国', '美国', '巴西', '日本'],
				pickerValue: "", // 选中的值
				index1: 0, // 默认选择第一个
				array1: ['个人投资人', '机构投资人'],
				pickerValue1: "", // 选中的值
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
			deleteImage: function(e){
				console.log(e, '删除图片')
				this.logo = ''; // 清空数据
			},
			addImage: function(e){
				console.log(e, '添加图片')
				if(e.allImages) { // 上传成功
					this.logo = (e.allImages[0]);
				}
			},
			bindPickerChange: function(e) {
				console.log('picker发送选择改变，携带值为', e.target.value);
				this.array.map((items, index) => {
					if(index === e.target.value) {
						this.pickerValue = items;
					}
				})
			},
			bindPickerChange1: function(e) {
				this.array1.map((items, index) => {
					if(index === e.target.value) {
						this.pickerValue1 = items;
					}
				})
			}
		}
	};
</script>

<style>
	.InvestorList-information{
		width: 100%;
		height: 100%;
	}
	input {
		color: #D2D2D2;
	}
	.Investor-name{
		width:100%;
		height: 122upx;
		background: #FFFFFF;
	}
	.Investor-name-box{
		width: 90%;
		height: 100%;
		border-bottom: 2upx solid #F5F5F5;
		margin: 0 auto;
		display: flex;
		position: relative;
	}
	.Investor-name-box view:nth-of-type(1){
		width: 20upx;
		height: 20upx;
		padding-top: 26upx;
	}
	.Investor-name-box view:nth-of-type(1) image{
		width: 100%;
		height: 100%;
	}
	.Investor-name-box view:nth-of-type(2){
		width: 142upx;
		height: 32upx;
		font-size: 30upx;
		color: #2E2E30;
		padding-top: 30upx;
		padding-left: 10upx;
	}
	.Investor-name-box view:nth-of-type(3){
		width: 200upx;
		height: 35upx;
		position: absolute;
		right: 0;
		top: 40upx;
		font-size: 30upx;
		color: #D2D2D2;
		text-align: right;
	}
	.Investor-wx{
		width:100%;
		height: 122upx;
		background: #FFFFFF;
	}
	.Investor-wx-box{
		width: 90%;
		height: 100%;
		border-bottom: 2upx solid #F5F5F5;
		margin: 0 auto;
		display: flex;
		position: relative;
	}
	.Investor-wx-box view:nth-of-type(1){
		width: 20upx;
		height: 20upx;
		padding-top: 26upx;
	}
	.Investor-wx-box view:nth-of-type(1) image{
		width: 100%;
		height: 100%;
	}
	.Investor-wx-box view:nth-of-type(2){
		width: 142upx;
		height: 32upx;
		font-size: 30upx;
		color: #2E2E30;
		padding-top: 30upx;
		padding-left: 10upx;
	}
	.Investor-wx-box view:nth-of-type(3){
		width: 200upx;
		height: 35upx;
		position: absolute;
		right: 0;
		top: 40upx;
		font-size: 30upx;
		color: #D2D2D2;
		text-align: right;
	}
	.Investor-mailbox{
		width:100%;
		height: 122upx;
		background: #FFFFFF;
	}
	.Investor-mailbox-box{
		width: 90%;
		height: 100%;
		border-bottom: 2upx solid #F5F5F5;
		margin: 0 auto;
		display: flex;
		position: relative;
	}
	.Investor-mailbox-box view:nth-of-type(1){
		width: 20upx;
		height: 20upx;
		padding-top: 26upx;
	}
	.Investor-mailbox-box view:nth-of-type(1) image{
		width: 100%;
		height: 100%;
	}
	.Investor-mailbox-box view:nth-of-type(2){
		width: 142upx;
		height: 32upx;
		font-size: 30upx;
		color: #2E2E30;
		padding-top: 30upx;
		padding-left: 10upx;
	}
	.Investor-mailbox-box view:nth-of-type(3){
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
	.Investor-City{
		width:100%;
		height: 122upx;
		background: #FFFFFF;
	}
	.Investor-City-box{
		width: 90%;
		height: 100%;
		border-bottom: 2upx solid #F5F5F5;
		margin: 0 auto;
		display: flex;
		position: relative;
	}
	.Investor-City-box view:nth-of-type(1){
		width: 20upx;
		height: 20upx;
		padding-top: 26upx;
	}
	.Investor-City-box view:nth-of-type(1) image{
		width: 100%;
		height: 100%;
	}
	.Investor-City-box view:nth-of-type(2){
		width: 142upx;
		height: 32upx;
		font-size: 30upx;
		color: #2E2E30;
		padding-top: 30upx;
		padding-left: 10upx;
	}
	.Investor-City-box view:nth-of-type(3){
		width: 100upx;
		height: 35upx;
		position: absolute;
		right: 40upx;
		top: 40upx;
		
		color: #D2D2D2;
		text-align: right;
	}
	.Investor-City-box view:nth-of-type(4){
		position: absolute;
		right: 0;
		top: 40upx;
		width: 25upx;
		height: 18upx;
	}.Investor-City-box view:nth-of-type(4) image{
		width: 100%;
		height: 100%;
	}
	.Investor-identity{
		width:100%;
		height: 122upx;
		background: #FFFFFF;
	}
	.Investor-identity-box{
		width: 90%;
		height: 100%;
		border-bottom: 2upx solid #F5F5F5;
		margin: 0 auto;
		display: flex;
		position: relative;
	}
	.Investor-identity-box view:nth-of-type(1){
		width: 20upx;
		height: 20upx;
		padding-top: 26upx;
	}
	.Investor-identity-box view:nth-of-type(1) image{
		width: 100%;
		height: 100%;
	}
	.Investor-identity-box view:nth-of-type(2){
		width: 152upx;
		height: 32upx;
		font-size: 30upx;
		color: #2E2E30;
		padding-top: 30upx;
		padding-left: 10upx;
	}
	.Investor-identity-box view:nth-of-type(3){
		width: 200upx;
		height: 35upx;
		position: absolute;
		right: 40upx;
		top: 40upx;
		font-size: 30upx;
		color: #D2D2D2;
		text-align: right;
	}
	.Investor-identity-box view:nth-of-type(4){
		position: absolute;
		right: 0;
		top: 40upx;
		width: 25upx;
		height: 18upx;
	}.Investor-identity-box view:nth-of-type(4) image{
		width: 100%;
		height: 100%;
	}
</style>
