<template>
	<view class="constSubmit-content">
		<view class="constSubmit">
			<view class="left const-box" @tap="setClickRecord('love', items, msgData)">
				<view class="img-box">
					<image class="img"  :src="items.love ? loved : love"></image>
				</view>
				<view :class="items.love ? 'text1' : 'text'">收藏</view>
			</view>
			<view class="left submit-box">
				<view class="TD-box left">投递BP</view>
				<view :class="msgData.content === 0 ? 'WL-box left' : 'WL-box1 left'" @tap='Apply()'> {{msgData.content === 0 ? '投递委托联系' : '已委托'}}</view>
				<view class="clear"></view>
			</view>
			<view class="clear"></view>
		</view>
		<!-- 全局设置申请组件 -->
		<entrust v-if="entrust.entrustShow"></entrust>
	</view>
</template>

<script>
	import { mapMutations, mapGetters } from 'vuex';
	
	export default {
	    data () {
			return {
				love: this.Static + 'mbcImg/home/seekCapital/like.png',
				loved: this.Static + 'mbcImg/home/seekCapital/liked.png',
				entrust:{
					entrustShow: false, // 默认不显示
					type: 0, // 0代表服务申请， 1项目委托
					success: false, // 是否申请成功
					params: {
						modelId: 0, // 0 代表投资人ID  1代表投资机构ID 2代表项目ID
						projectName: '', // 委托项目
						userId: '', // 申请人ID
						applyeType: 0 ,// 创业者联系投资人 1创业者联系投资机构
						phone: 0, // 电话
						name: '', // 姓名
						serverId: '', // 服务ID
						time: '', // 提交成功时间
					}
				},
				items: { // 记录用户收藏功能 ----投资人
					id: 0, // id
					love: false // 收藏
				},
				clickRecordsInMArr: [] ,// 记录用户收藏行为 ----投资人
				userType: '99', // 用户类型  -1 未认证 0 创业者 1 个人投资人 2 机构投资人
				authState: '99' // -1 未认证 0 待审核 1审核通过 2 审核失败
			};
	    },
		components: {
		},
		props: {
			msgData: {
				type: Object
			}
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
		mounted() {
			this.entrust = this.ENTRUST;
			console.log(this.ENTRUST, 'ENTRUST');
			console.log(this.msgData, 'dasdasda');
			this.getClickRecord();
			this.getUserType();
		},
		methods: {
			...mapMutations({
				setEnTrustShow: 'setEnTrustShow',
				setEntrustType: 'setEntrustType',
				setEntrustParams: 'setEntrustParams'
			}),
			getUserType () {
				console.log('判断用户是否认证');
				if (uni.getStorageSync('UserData')) {
					let UserData = JSON.parse(uni.getStorageSync('UserData')); // 读取缓存的用户信息
					this.authState = UserData.authState; // -1 未认证 0 待审核 1审核通过 2 审核失败
					this.userType = UserData.userType; // 用户类型  -1 未认证 0 创业者 1 个人投资人 2 机构投资人
				}
			},
			getClickRecord () {
				console.log('获取缓存中的用户点击行为数组记录');
				if (uni.getStorageSync('clickRecordsInMArr')) {
					this.clickRecordsInMArr = JSON.parse(uni.getStorageSync('clickRecordsInMArr')); // 获取缓存中的用户点击行为数组记录
					this.clickRecordsInMArr.map((item, index) => {
						console.log(item.id, this.msgData.id, 'id')
						if (String(item.id) === this.msgData.id) { // 取出缓存中存在的状态
						   console.log(item.id, '取出缓存中存在的状态');
						   this.items = item;
						   console.log(this.items);
						}
					});
				}
			},
			setClickRecord (e, items, evn) {
				console.log(e, items, evn, '记录用户行为');
				if (e === 'love') { // 收藏
					if (this.items.love === false) {
						this.items.love = true; // 点击之后状态变化
						this.upDataIsLoved(evn); // 收藏
						this.resetClickRecord(items);
					} else {
						this.items.love = false; // 点击之后状态变化
						this.upDataIsLove(evn); // 收藏
						this.resetClickRecord(items);
					}
				};
			},
			resetClickRecord (e) {
				console.log(e, '重置缓存中用户行为数据');
				if (uni.getStorageSync('clickRecordsInMArr')) {
					this.clickRecordsInMArr = JSON.parse(uni.getStorageSync('clickRecordsInMArr')); // 获取缓存中的用户点击行为数组记录
					this.clickRecordsInMArr.map((item, index) => {
						console.log(item.id, e.id, '重置id')
						console.log(this.items, 'e')
						if (String(item.id) === String(e.id)) { // 取出缓存中存在的状态
							this.clickRecordsInMArr[index] = e; // 重置数据
							uni.setStorageSync('clickRecordsInMArr', JSON.stringify(this.clickRecordsInMArr));// 缓存用户点击行为数组记录
						}
					});
				}
			},
			upDataIsLoved(e) { // 收藏
				console.log('跟新用户行为数据');
				if (uni.getStorageSync('landRegist')) {
					let landRegistLG = JSON.parse(uni.getStorageSync('landRegist')); // 读取缓存的用户信息
					console.log(landRegistLG.user.id);
					let params = {
						"type":"2", // 0 项目 1投资人 2 投资机构 3 投资文章
						"modelId": e.id, // //根据类型传递ID
						"userId": landRegistLG.user.id
					}; // 请求总数居时 参数为空
					uni.request({
						url: this.api2 + '/follow/add', //接口地址。
						data: this.endParams(params),
						method: 'POST',
						header: {
							Authorization:"Bearer "+landRegistLG.token//将token放到请求头中
						},
						success: (response) => {
							console.log(response.data);
						},
						fail: (error) => {
							console.log(error, '网络繁忙，请稍后');
						}
					});
				}
			},
			upDataIsLove(e) { // 取消收藏
				console.log('跟新用户行为数据');
				if (uni.getStorageSync('landRegist')) {
					let landRegistLG = JSON.parse(uni.getStorageSync('landRegist')); // 读取缓存的用户信息
					console.log(landRegistLG.user.id);
					let params = {
						"type":"2", // 0 项目 1投资人 2 投资机构 3 投资文章
						"modelId": e.id, // //根据类型传递ID
						"userId": landRegistLG.user.id
					}; // 请求总数居时 参数为空
					uni.request({
						url: this.api2 + '/follow/del', //接口地址。
						data: this.endParams(params),
						method: 'POST',
						header: {
							Authorization:"Bearer "+landRegistLG.token//将token放到请求头中
						},
						success: (response) => {
							console.log(response.data);
						},
						fail: (error) => {
							console.log(error, '网络繁忙，请稍后');
						}
					});
				}
			},
			clickTel () {
				console.log('触发拨打电话');
				uni.makePhoneCall({
					phoneNumber: '010-61723026' // 拨打电话
				});
			},
			Apply () {
				console.log('触发申请');
				if (this.userType === 0) { // 1 个人投资人 2 机构投资人
					if (this.authState !== 1) { // 没有认证.或者认证没通过
						uni.showToast({
							title: '认证创业者可见全部内容',
							icon: 'none',
							duration: 1000
						});
						return
					} else {
						console.log('认证创业者')
					}
				} else {
					uni.showToast({
						title: '认证创业者可见全部内容',
						icon: 'none',
						duration: 1000
					});
					return
				}
				if (this.msgData.content === 1) {
					uni.showToast({
						title: '您已经申请过了！',
						icon: 'none',
						duration: 1000
					});
				} else {
					this.entrust.params.serverId = this.msgData.serverId;
					this.entrust.params.modelId = this.msgData.modelId;
					this.entrust.params.projectName = this.msgData.projectName;
					this.entrust.params.applyeType = 1;
					this.$store.commit('setEntrustType', 1); // 更新setEntrustType
					this.$store.commit('setEntrustParams', this.entrust.params); // 更新setEntrustParams
					this.$store.commit('setEnTrustShow', true); // 更新setEnTrustShow
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
		width: 40upx;
		margin: auto;
		top: 16upx;
	}
	.img-box>image{
		position: relative;
		width: 40upx;
		height: 36upx;
		margin: auto;
	}
	.const-box .text{
		font-family: PingFangSC-Regular;
		font-size: 20upx;
		color: #9B9B9B;
		text-align: center;
		line-height: 36upx;
	}
	.text1{
		font-family: PingFangSC-Regular;
		font-size: 20upx;
		color: #02C2A2;
		text-align: center;
		line-height: 36upx;
	}
	.submit-box{
		position: relative;
		width: 60%;
		font-family: PingFangSC-Regular;
		font-size: 32upx;
		color: #FFFFFF;
		letter-spacing: 0;
	}
	.TD-box{
		position: relative;
		width: 50%;
		background-image: linear-gradient(-135deg, #F77F3B 0%, #FAD161 100%);
		text-align: center;
		line-height: 100upx;
	}
	.WL-box{
		position: relative;
		width: 50%;
		background-image: linear-gradient(-134deg,  #57D6CF 0%, #15D49F 100%);
		text-align: center;
		line-height: 100upx;
	}
</style>
