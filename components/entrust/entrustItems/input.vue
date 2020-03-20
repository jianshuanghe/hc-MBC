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
								v-model="entrust.params.name"
								placeholder="请输入姓名"
							></wInput>
						</div>
					</div>
					<div class="line"></div>
					<div class="En-in-name">
						手机号
						<div class="input-right right">
							<wInput
								v-model="entrust.params.phone"
								type="number"
								maxlength="11"
								placeholder="请输入手机号码"
							></wInput>
						</div>
					</div>
				</div>
			</div>
			<div class="entrust-box" v-if='entrust.type === 1'>
				<div class="input-box">
					<div class="En-my-other">
						<div class="En-in-title">委托联系信息</div>
						<div class="En-in-name">
							类别
							<text class="right">{{entrust.params.applyeType | applyeType}}</text>
						</div>
						<div class="En-in-name">
							名称
							<text class="right">{{entrust.params.projectName}}</text>
						</div>
						<!-- <div class="En-in-name">
							名称
							<image class="right" :src="iiImg"></image>
						</div> -->
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
				entrust:{
					entrustShow: false, // 默认不显示
					type: 0, // 0代表服务申请， 1项目委托
					success: false, // 是否申请成功
					params: {
						modelId: 0, // 代表投资人ID  代表投资机构ID 代表项目ID
						projectName: '', // 委托项目
						userId: '', // 申请人ID
						applyeType: 0 ,// 创业者联系投资人 1创业者联系投资机构 2 项目
						phone: 0, // 电话
						name: '', // 姓名
						serverId: '', // 服务ID
						time: '', // 提交成功时间
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
		filters: {
		  /* 格式化applyeType */
		  applyeType (val) {
		    if (val === 0) {
				return '投资人';
			} else if (val === 1) {
				return '投资机构';
			} else if (val === 2) {
				return '项目';
			}
		  },
		},
		computed: {
		  ...mapGetters(['ENTRUSSHOW', 'ENTRUST'])
		},
		created() {
			this.entrust = this.ENTRUST;
			console.log(this.ENTRUST, 'ENTRUST');
			if (uni.getStorageSync('UserData')) {
				let UserData = JSON.parse(uni.getStorageSync('UserData')); // 读取缓存的用户信息
				this.entrust.params.phone = UserData.userPhone;
				this.entrust.params.name = UserData.userName;
			}
			if (uni.getStorageSync('landRegist')) {
				let landRegistLG = JSON.parse(uni.getStorageSync('landRegist')); // 读取缓存的用户信息
				this.entrust.params.userId = landRegistLG.user.id;
			}
		},
	    methods: {
			...mapMutations({
				setEnTrustShow: 'setEnTrustShow',
				setEntrustParams: 'setEntrustParams',
				setEntrustSuccess: 'setEntrustSuccess'
			}),
			clickCancal () {
				console.log('触发取消申请');
				this.$store.commit('setEnTrustShow', false); // 更新setEnTrustShow
			},
			clickSubmit () {
				console.log('用户触发提交按钮')
				this.landFail().then(res => {
					if (res === true) {
						if (this.entrust.type === 0) {
							this.postFuWu();
						} else if (this.entrust.type === 1) {
							this.postWeiTuo();
						}
					}
				})
				.catch(err => {
					console.log(err);
				});
			},
			postFuWu () {
				console.log('服务类')
				if (uni.getStorageSync('landRegist')) {
					let landRegistLG = JSON.parse(uni.getStorageSync('landRegist')); // 读取缓存的用户信息
					console.log(landRegistLG.user.id);
					let params = {
							serverId: Number(this.entrust.params.serverId),
							userId: this.entrust.params.userId,
							userPhone: this.entrust.params.phone,
							userName: this.entrust.params.name
					}; // 请求总数居时 参数为空
					uni.showLoading({ // 展示loading
						title: '加载中'
					});
					uni.request({
						url: this.api2 + '/server/apply', //接口地址。
						data: this.endParams(params),
						method: 'POST',
						header: {
							Authorization:"Bearer "+landRegistLG.token//将token放到请求头中
						},
						success: (response) => {
							console.log(response.data);
							if (response.data.content.time) {
								this.entrust.params.time = response.data.content.time;
							}
							this.$store.commit('setEntrustSuccess', true); // 更新setEntrustSuccess
							this.$store.commit('setEntrustParams', this.entrust.params); // 更新setEntrustParams
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
			},
			postWeiTuo () {
				console.log('委托类')
				if (uni.getStorageSync('landRegist')) {
					let landRegistLG = JSON.parse(uni.getStorageSync('landRegist')); // 读取缓存的用户信息
					console.log(landRegistLG.user.id);
					let params = {
							modelId: Number(this.entrust.params.modelId),
							applyeType: String(this.entrust.params.applyeType),
							userId: this.entrust.params.userId,
							userPhone: this.entrust.params.phone,
							userName: this.entrust.params.name
					}; // 请求总数居时 参数为空
					uni.showLoading({ // 展示loading
						title: '加载中'
					});
					uni.request({
						url: this.api2 + '/contact/apply', //接口地址。
						data: this.endParams(params),
						method: 'POST',
						header: {
							Authorization:"Bearer "+landRegistLG.token//将token放到请求头中
						},
						success: (response) => {
							console.log(response.data, '2020-03-20');
							if (response.data.content.time) {
								this.entrust.params.time = response.data.content.time;
							}
							this.$store.commit('setEntrustSuccess', true); // 更新setEntrustSuccess
							this.$store.commit('setEntrustParams', this.entrust.params); // 更新setEntrustParams
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
		position: relative;
		width: 750upx;
		padding: 30upx;
		background: #FFf;
		height: 100vh;
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
