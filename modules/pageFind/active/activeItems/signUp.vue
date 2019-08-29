<template>
	<div class="entrust-content">
		<div class="entrust-box">
			<div class="input-box-my">
				<div class="En-my">
					<div class="En-title">您的信息</div>
					<div class="En-name">
						姓名
						<div class="input-right right">
							<wInput
								v-model="entrustSignUp.params.name"
								placeholder="请输入姓名"
							></wInput>
						</div>
					</div>
					<div class="line"></div>
					<div class="En-in-name">
						手机号
						<div class="input-right right">
							<wInput
								v-model="entrustSignUp.params.phone"
								type="number"
								maxlength="11"
								placeholder="请输入手机号码"
							></wInput>
						</div>
					</div>
				</div>
			</div>
			<div class="submit-box">
				<div class="left cancal" @tap="clickCancal()">取消</div>
				<div class="left submit" @tap='clickSubmit()'>确定</div>
				<div class="clear"></div>
			</div>
		</div>
	</div>
</template>

<script>
	import wInput from '@/components/watch-login/watch-input1.vue';
	import { mapMutations, mapGetters } from 'vuex';
	export default {
	    data () {
			return {
				entrustSignUp:{
					entrustShow: false, // 默认不显示
					success: false, // 是否申请成功
					params: {
						modelId: 0, // 代表投资人ID  代表投资机构ID 代表项目ID
						phone: 0, // 电话
						name: '', // 姓名
					}
				},
			};
	    },
		components: {
		  wInput
		},
		props: {
			msgData: {
				type: Object
			}
		},
		computed: {
		  ...mapGetters(['ENTRUSTSINGUPSHOW', 'ENTRUSTSINGUP'])
		},
		watch: {
			ENTRUSTSINGUP: {
				handler (a, b) {
				  this.entrustSignUp = a; // 申请组件
				  console.log(this.entrustSignUp);
				},
				deep: true
			}
		},
		created() {
			this.entrustSignUp = this.ENTRUSTSINGUP;
			console.log(this.entrustSignUp);
			if (uni.getStorageSync('UserData')) {
				let UserData = JSON.parse(uni.getStorageSync('UserData')); // 读取缓存的用户信息
				this.entrustSignUp.params.phone = UserData.userPhone;
				this.entrustSignUp.params.name = UserData.userName;
			}
		},
	    methods: {
			...mapMutations({
				setEntrustSignUp: 'setEntrustSignUp',
				setEntrustSignUpShow: 'setEntrustSignUpShow'
			}),
			clickCancal () {
				console.log('触发取消申请');
				this.$store.commit('setEntrustSignUpShow', false); // 更新setEnTrustShow
			},
			clickSubmit () {
				console.log('委托类')
				if (uni.getStorageSync('landRegist')) {
					let landRegistLG = JSON.parse(uni.getStorageSync('landRegist')); // 读取缓存的用户信息
					console.log(landRegistLG.user.id);
					let params = {
						activityId: Number(this.entrustSignUp.params.modelId),
						userId: landRegistLG.user.id,
						userPhone: this.entrustSignUp.params.phone,
						userName: this.entrustSignUp.params.name
					}; // 请求总数居时 参数为空
					uni.showLoading({ // 展示loading
						title: '加载中'
					});
					uni.request({
						url: this.api2 + '/activity/sgin', //接口地址。
						data: this.endParams(params),
						method: 'POST',
						header: {
							Authorization:"Bearer "+landRegistLG.token//将token放到请求头中
						},
						success: (response) => {
							console.log(response.data);
							if (response.data.code === 200) {
								this.$store.commit('setEntrustSignUpShow', false); // 更新setEntrustSignUp
								this.entrustSignUp.success = true; // 报名成功
								this.$store.commit('setEntrustSignUp', this.entrustSignUp); // 更新setEntrustSignUp
							} else {
								uni.showToast({
									title: '网络繁忙，请稍后',
									icon: 'none',
									duration: 1000
								});
							}
							uni.hideLoading(); // 隐藏 loading
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
	.entrust-content{
		position: fixed;
		width: 750upx;
		padding: 30upx;
		background: #FFf;
		height: 100vh;
		top: 0;
	}
	.entrust-box{
		position: relative;
		width: 100%;
	}
	.success-box{
		position: relative;
		width: 100%;
	}
	.img{
		position: relative;
		width: 104upx;
		height: 104upx;
		margin: auto;
		margin-top: 100upx;
	}
	.img>image{
		position: relative;
		width: 100%;
		height: 100%;
		border-radius: 50%;
	}
	.En-title{
		font-family: PingFang-SC-Medium;
		font-size: 36upx;
		color: #2E2E30;
		letter-spacing: 0;
		text-align: center;
		line-height: 88upx;
		margin-top: 44upx;
	}
	.En-ins{
		position: relative;
		width: 100%;
		font-family: PingFang-SC-Medium;
		font-size: 28upx;
		color: #9B9B9B;
		letter-spacing: 0;
		line-height: 20upx;
		margin-bottom: 50upx;
		text-align: center;
	}
	.En-more{
		background: #02C2A2;
		border-radius: 2px;
		position: relative;
		width: 300upx;
		margin: auto;
		font-family: PingFangSC-Regular;
		font-size: 28upx;
		color: #FFFFFF;
		letter-spacing: 0;
		line-height: 90upx;
		text-align: center;
	}
	.input-box{
		background: #FAFAFA;
		padding: 30upx;
		margin-top: 110upx;
	}
	.uni-input-wrapper{
		text-align: right;
	}
	.input-box-my{
		padding: 30upx;
	}
	.En-my{
		position: relative;
		width: 100%;
	}
	.En-title{
		font-family: PingFang-SC-Bold;
		font-size: 40upx;
		color: #2E2E30;
		letter-spacing: 0;
		line-height: 120upx;
		text-align: left;
	}
	.En-name{
		font-family: PingFang-SC-Medium;
		font-size: 28upx;
		color: #2E2E30;
		letter-spacing: 0;
		line-height: 100upx;
	}
	
	.input-right{
		color: #5D5D5D;
		letter-spacing: 0;
		text-align: right;
	}
	
	
	
	.En-my-other{
		position: relative;
		width: 100%;
	}
	.En-in-title{
		font-family: PingFang-SC-Bold;
		font-size: 28upx;
		color: #2E2E30;
		letter-spacing: 0;
		line-height: 50upx;
	}
	.En-in-name{
		font-family: PingFang-SC-Medium;
		font-size: 28upx;
		color: #2E2E30;
		letter-spacing: 0;
		line-height: 60upx;
	}
	.En-in-name>text{
		color: #5D5D5D;
		letter-spacing: 0;
		text-align: right;
	}
	.En-in-name>image{
		position: relative;
		width: 54upx;
		height: 54upx;
	}
	.time{
		font-family: PingFangSC-Regular;
		font-size: 24upx;
		color: #9B9B9B;
		line-height: 100upx;
	}
	.line{
		margin: 30upx 0;
	}
	.submit-box{
		position: relative;
		width: 100%;
		background: #F5F5F5;
		margin-top: 240upx;
	}
	.cancal{
		position: relative;
		width: 50%;
		font-family: PingFangSC-Regular;
		font-size: 28upx;
		color: #2E2E30;
		letter-spacing: 0;
		line-height: 90upx;
		text-align: center;
	}
	.submit{
		position: relative;
		width: 50%;
		background: #02C2A2;
		font-family: PingFangSC-Regular;
		font-size: 28upx;
		color: #FFFFFF;
		letter-spacing: 0;
		line-height: 90upx;
		text-align: center;
	}
	
	.main-input{
		text-align: right !important;
	}
	.uni-input-wrapper{
		text-align: right !important;
	}
</style>
