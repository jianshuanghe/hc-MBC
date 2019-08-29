<template>
	<view>
		<view class="constSubmit-content">
			<view class="constSubmit">
				<view class="left const-box" @tap="clickTel()">
					<view class="img-box">
						<image class="img" :src="tel"></image>
					</view>
					<view class="text">咨询客服</view>
				</view>
				<div class="left submit-box1" v-if="msgData.isEndTime === '1'" @tap='Applyed()'>活动已结束</div>
				<view v-else :class="(msgData.content === 0  && entrustSignUp.success === false) ? 'left submit-box' : 'left submit-box1'" @tap='Apply()'> {{(msgData.content === 0  && entrustSignUp.success === false) ? '立即报名' : '已报名'}}</view>
				<view class="clear"></view>
			</view>
		</view>
		<signUp v-if= 'entrustSignUp.entrustShow'></signUp>
	</view>
</template>

<script>
	import signUp from './signUp.vue';
	import { mapMutations, mapGetters } from 'vuex';
	export default {
	    data () {
			return {
				tel: this.Static + 'mbcImg/home/lookServices/tel.png',
				entrustSignUp:{
					entrustShow: false, // 默认不显示
					success: false, // 是否申请成功
					params: {
						modelId: 0, // 活动ID
						phone: 0, // 电话
						name: '', // 姓名
					}
				},
				data: {
					id: -1,
					content: 0, // 0表示未申请过 1表示已经申请过
				} // 接口返回值 
			};
	    },
		components: {
			signUp
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
			ENTRUSTSINGUPSHOW: {
				handler (a, b) {
				  this.entrustSignUp.entrustShow = a; // 申请组件
				},
				deep: true
			}
		},
		created() {
			this.entrustSignUp = this.ENTRUSTSINGUP;
			this.entrustSignUp.params.modelId = this.msgData.id; // 活动id
		},
		mounted() {
			this.entrustSignUp = this.ENTRUSTSINGUP;
			console.log(this.msgData, 'this.msgDatay.id')
			console.log(this.msgData.id, 'this.msgData.id')
			this.entrustSignUp.params.modelId = this.msgData.id; // 活动id
		},
		beforeDestroy () {
			console.log('页面销毁之前缓存数据')
			this.$store.commit('setEntrustSignUpShow', false); // 更新setEntrustSignUp
		},
	    methods: {
			...mapMutations({
				setEntrustSignUp: 'setEntrustSignUp',
				setEntrustSignUpShow: 'setEntrustSignUpShow'
			}),
			clickTel () {
				console.log('触发拨打电话');
				uni.makePhoneCall({
					phoneNumber: '010-61723026' // 拨打电话
				});
			},
			Applyed () {
				uni.showToast({
					title: '该活动已结束！',
					icon: 'none',
					duration: 1000
				});
			},
			Apply () {
				console.log(this.msgData.content, this.entrustSignUp.success);
				if (this.msgData.content === 1  || this.entrustSignUp.success === true) {
					uni.showToast({
						title: '该活动已报名！',
						icon: 'none',
						duration: 1000
					});
					return
				};
				this.entrustSignUp.entrustShow = true; // 显示提交组件
				this.$store.commit('setEntrustSignUpShow', true); // 更新setEntrustSignUp
				this.$store.commit('setEntrustSignUp', this.entrustSignUp); // 更新setEntrustSignUp
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
		top: 12upx;
	}
	.img-box>image{
		position: relative;
		width: 32upx;
		height: 32upx;
		margin: auto;
	}
	.const-box .text{
		font-family: PingFangSC-Regular;
		font-size: 20upx;
		color: #9B9B9B;
		text-align: center;
		line-height: 20upx;
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
</style>
