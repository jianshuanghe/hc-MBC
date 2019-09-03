<template>
	<view class="projectXQgsname">
		<view class="Investor-name">
			<view class="Investor-name-box">
				<view>
					<image :src="xin"></image>
				</view>
				<view>公司全称</view>
				<view><input type="text" placeholder="请输入" placeholder-style="color:#D2D2D2" v-model="List.compName"/></view>
			</view>
		</view>
		<view class="Investor-name">
			<view class="Investor-name-box">
				<view>
					<image></image>
				</view>
				<view>公司地址</view>
				<view><input type="text" placeholder="请输入" placeholder-style="color:#D2D2D2" v-model="List.compAddr"/></view>
			</view>
		</view>
		<view class="Investor-Submission">
			<view @tap="Submission">
				<view>
					提交
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
				xin:this.Static + 'mbcImg/common/xing.png',
				name:'',
				address:'',
				id:'',
				List:[]
			};
		},
		components: {
			
		},
		computed: {
			...mapGetters(['GET_MY'])
		},
		onLoad:function(options){
			this.id = options.id
			console.log(this.id)
		},
		created() {
			this.List=this.GET_MY.MyList.Company;
			console.log(this.List)
		},
		methods: {
			Submission(){
				if(this.List.compName === ''){
					uni.showToast({
						title: '公司名不能为空,请重填',
						icon: 'none',
						duration: 1000
					});
					return false;
				} 
				if (uni.getStorageSync('landRegist')) {
					let landRegistLG = JSON.parse(uni.getStorageSync('landRegist')); // 读取缓存的用户信息
					console.log(landRegistLG.user.id);
					let params = {
						id:this.id,
						compName:this.List.compName,
						compAddr:this.List.compAddr
					}; // 请求总数居时 参数为空
					uni.showLoading({ // 展示loading
						title: '加载中'
					});
					uni.request({
						url: this.api2 + '/proj/setProjComp', //接口地址。
						data: this.endParams(params),
						method: 'POST',
						header: {
							Authorization: "Bearer " + landRegistLG.token //将token放到请求头中
						},
						success: (response) => {
							uni.hideLoading();
							console.log(response.data);
							this.$store.commit('setCompany', this.List);
							uni.navigateBack({
								
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
		
	};
</script>

<style>
	.project-XQ-gsname{
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
		width: 300upx;
		height: 35upx;
		position: absolute;
		right: 0;
		top: 40upx;
		font-size: 30upx;
		color: #D2D2D2;
		text-align: right;
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
