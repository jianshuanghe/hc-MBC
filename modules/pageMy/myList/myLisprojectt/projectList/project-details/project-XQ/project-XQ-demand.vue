<template>
	<view class="project-XQ-demand">
		<view class="Investor-name">
			<view class="Investor-name-box">
				<view>
					<image :src="xin"></image>
				</view>
				<view>融资金额</view>
				<view><input type="text" placeholder="请输入" placeholder-style="color:#D2D2D2" v-model="money"/></view>
				<view>万元</view>
			</view>
		</view>
		<view class="datas-List-vitae-yes">
			<view class="datas-List-vitae-yes-box">
				<view>
					<image :src="xin"></image>
				</view>
				<view>融资轮次</view>
				<view>
					<picker @change="bindPickerChange2" :value="index" :range="array2" range-key='name'>
						<view class="ziti" :class="{'tou':tou}">{{pickerValue2? pickerValue2 : '请选择'}}</view>
					</picker>
				</view>
				<view>
					<image :src="right"></image>
				</view>
			</view>
		</view>
		<view class="datas-List-case-bao" @tap="gotodatasListcase">
			<view>
				<view>
					保存
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		mapMutations,
		mapGetters
	} from 'vuex';
	export default {
		data() {
			return {
				xin: this.Static + 'mbcImg/common/xing.png',
				right: this.Static + 'mbcImg/my/right.png',
				index: 0, // 默认选择第一个
				array2: [],
				pickerValue2: "", // 选中的
				lunid:'',
				logo: '',
				money:'',
				List:[],
				tou:false,
				
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
			...mapGetters(['GET_MY'])
		},
		created() {
			this.Financingrounds();
			
		},
		onLoad:function(options){
			this.id = options.id
			console.log(this.id)
		},
		mounted() {
			
		},
		methods: {
			...mapMutations({
				setCompany: 'setCompany',
				setHistory:'setHistory'
			}),
			detailed(){
				if (uni.getStorageSync('landRegist')) {
					let landRegistLG = JSON.parse(uni.getStorageSync('landRegist')); // 读取缓存的用户信息
					console.log(landRegistLG.user.id);
					// let params = {
					// 	id:this.List.id,
					// 	finanLevelCode:this.lunid,
					// 	finanMoney:this.money
					// };
					 // 请求总数居时 参数为空
					uni.showLoading({ // 展示loading
						title: '加载中'
					});
					uni.request({
						url: this.api2 + '/proj/getProjInve?projId='+this.id, //接口地址。
						// data: this.endParams(params),
						method: 'GET',
						header: {
							Authorization: "Bearer " + landRegistLG.token //将token放到请求头中
						},
						success: (response) => {
							uni.hideLoading();
							console.log(response.data);
							this.List=response.data.content
							this.money=response.data.content.finanMoney
							let FainId=response.data.content.finanLevelCode
							this.array2.map((items, index) => {
								if (String(FainId) === String(items.id)) {
									if(this.pickerValue2!=='请输入'){
										this.tou=true
									}
									this.pickerValue2 = items.name;
									this.lunid = items.id
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
			gotodatasListcase(){
				if(this.money==''){
					uni.showToast({
						title: '请填写融资金额',
						icon: 'none',
						duration: 1000
					});
					return false;
				}else if(this.pickerValue2==''){
					uni.showToast({
						title: '请选择融资轮数',
						icon: 'none',
						duration: 1000
					});
					return false;
				}
				if(!/^[0-9]+$/.test(this.money)){
					uni.showToast({
						title: '融资金额必须为数字',
						icon: 'none',
						duration: 1000
					});
					return false;
				}
				if (uni.getStorageSync('landRegist')) {
					let landRegistLG = JSON.parse(uni.getStorageSync('landRegist')); // 读取缓存的用户信息
					console.log(landRegistLG.user.id);
					let params = {
						id:this.List.id,
						finanLevelCode:this.lunid,
						finanMoney:this.money
					};
					 // 请求总数居时 参数为空
					 console.log(params)
					uni.showLoading({ // 展示loading
						title: '加载中'
					});
					uni.request({
						url: this.api2 + '/proj/setProjInve', //接口地址。
						data: this.endParams(params),
						method: 'POST',
						header: {
							Authorization: "Bearer " + landRegistLG.token //将token放到请求头中
						},
						success: (response) => {
							uni.hideLoading();
							console.log(response.data);
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
			},
			Financingrounds() { //融资轮次列表
				if (uni.getStorageSync('landRegist')) {
					let landRegistLG = JSON.parse(uni.getStorageSync('landRegist')); // 读取缓存的用户信息
					console.log(landRegistLG.user.id);
					// let params = {}; // 请求总数居时 参数为空
					uni.showLoading({ // 展示loading
						title: '加载中'
					});
					uni.request({
						url: this.api2 + '/field/levelList', //接口地址。
						// data: this.endParams(params),
						method: 'GET',
						header: {
							Authorization: "Bearer " + landRegistLG.token //将token放到请求头中
						},
						success: (response) => {
							uni.hideLoading();
							console.log(response.data.content);
							this.array2 = response.data.content
							this.detailed();
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
			bindPickerChange2: function(e) {
				console.log('picker发送选择改变，携带值为', e.target.value);
				this.array2.map((items, index) => {
					if (String(index) === String(e.target.value)) {
						if(this.pickerValue2!=='请输入'){
							this.tou=true
						}
						this.pickerValue2 = items.name;
						this.lunid = items.id
						console.log(this.lunid)
					}
				})
			}
		}
	};
</script>

<style>
	.tou{
		color: black;
	}
	.project-XQ-demand{
		width: 100%;
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
		right: 80upx;
		top: 45upx;
		font-size: 30upx;
		color: #D2D2D2;
		text-align: right;
	}
	.Investor-name-box view:nth-of-type(4) {
		width: 80upx;
		height: 40upx;
		position: absolute;
		right: 0upx;
		top: 40upx;
		font-size: 30upx;
		color: #2E2E30;
		text-align: right;
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
		width: 18upx;
		height: 18upx;
	}
	
	.datas-List-vitae-yes-box view:nth-of-type(4) image {
		width: 100%;
		height: 100%;
	}
	
	.ziti {
		position: absolute;
		right: 0upx;
		width: 300upx !important;
		height: 30upx;
		top: -30upx;
		font-size: 30upx !important;
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
</style>
