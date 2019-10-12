<template>
	<div class="constSubmit-content">
		<div class="constSubmit">
			<div class="left const-box" @tap='clickTel()'>
				<div class="img-box">
					<image class="img" :src="tel"></image>
				</div>
				<div class="text">咨询客服</div>
			</div>
			<div :class="msgData.content === 0 ? 'left submit-box' : 'left submit-box1'" @tap='Apply()'> {{msgData.content === 0 ? '立即申请' : '已申请'}}</div>
			<div class="clear"></div>
		</div>
		<!-- 全局设置申请组件 -->
		<entrust v-if="entrust.entrustShow"></entrust>
	</div>
</template>

<script>
	import { mapMutations, mapGetters } from 'vuex';
	
	import entrust from "@/components/entrust/entrust.vue";
	export default {
		components: {
			entrust
		},
	    data () {
			return {
				tel: this.Static + 'mbcImg/home/lookServices/tel.png',
				entrust:{
					entrustShow: false, // 默认不显示
					type: 0, // 0代表服务申请， 1项目委托
					success: false, // 是否申请成功
					params: {
						modelId: 0, // 0 代表投资人ID  1代表投资机构ID 2代表项目ID
						projectName: '', // 委托项目
						userId: '', // 申请人ID
						applyeType: 104 ,// 104代表是服务
						phone: 0, // 电话
						name: '', // 姓名
						serverId: '', // 服务ID
						time: '', // 提交成功时间
					}
				},
			};
	    },
		props: {
			msgData: {
				type: Object
			}
		},
		components: {
		},
		computed: {
          ...mapGetters(['ENTRUSSHOW', 'ENTRUST'])
        },
		watch: {
		  ENTRUSSHOW: {
            handler (a, b) {
              this.entrust.entrustShow = a; // 申请组件
            },
            deep: true
          }
        },
		created() {
			this.entrust = this.ENTRUST;
			console.log(this.ENTRUST, 'ENTRUST');
			console.log(this.msgData, 'dasdasda')
		},
		beforeDestroy () {
			console.log('页面销毁之前缓存数据')
			this.$store.commit('setEnTrustShow', false); // 更新setEntrustSignUp
		},
	    methods: {
			...mapMutations({
				setEnTrustShow: 'setEnTrustShow',
				setEntrustType: 'setEntrustType',
				setEntrustParams: 'setEntrustParams'
			}),
			clickTel () {
				if (!uni.getStorageSync('landRegist')) {
					this.landRegistra(); // 判断登录状态
				};
				if (uni.getStorageSync('landRegist')) {
					console.log('触发拨打电话');
					uni.makePhoneCall({
						phoneNumber: '010-61723026' // 拨打电话
					});
				}
			},
			Apply () {
				if (!uni.getStorageSync('landRegist')) {
					this.landRegistra(); // 判断登录状态
				};
				if (uni.getStorageSync('landRegist')) {
					console.log('触发申请');
					if (this.msgData.content === 1) {
						uni.showToast({
							title: '您已经申请过了！',
							icon: 'none',
							duration: 1000
						});
					} else {
						this.entrust.params.serverId = this.msgData.serverId;
						this.entrust.params.applyeType = 104;
						this.$store.commit('setEntrustType', 0); // 更新setEntrustType
						this.$store.commit('setEntrustParams', this.entrust.params); // 更新setEntrustParams
						this.$store.commit('setEnTrustShow', true); // 更新setEnTrustShow
					}
				}
			}
	    }
	};
</script>

<style>
	.constSubmit-content{
		position: fixed;
		bottom: 0;
		width: 750upx;
		height: 100upx;
		background: #FFFFFF;
		box-shadow: 0 -2upx 0 0 #F5F5F5;
	}
	.constSubmit{
		position: relative;
		width: 100%;
	}
	.const-box{
		position: relative;
		width: 40%;
	}
	.img-box{
		position: relative;
		width: 32upx;
		margin: auto;
		top: 15upx;
	}
	.img-box>image{
		position: relative;
		width: 35upx;
		height: 40upx;
		margin: auto;
	}
	.const-box .text{
		font-family: PingFangSC-Regular;
		font-size: 20upx;
		color: #9B9B9B;
		text-align: center;
		line-height: 24upx;
	}
	.submit-box{
		position: relative;
		width: 60%;
		background-image: linear-gradient(-134deg,  #57D6CF 0%, #15D49F 100%);
		font-family: PingFangSC-Regular;
		font-size: 32upx;
		color: #FFFFFF;
		letter-spacing: 0;
		text-align: center;
		line-height: 100upx;
	}
	.submit-box1{
		position: relative;
		width: 60%;
		background: #E2E2E2;
		font-family: PingFangSC-Regular;
		font-size: 32upx;
		color: #FFFFFF;
		letter-spacing: 0;
		text-align: center;
		line-height: 100upx;
	}
</style>
