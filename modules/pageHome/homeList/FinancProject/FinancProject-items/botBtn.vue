<template>
	<view class="constSubmit-content">
		<view class="constSubmit">
			<view class="left const-box">
				<view class="TD-box left">
					<view class="img-box" @tap="setClickRecord('love', items, msgData)">
						<image class="img"  :src="items.love ? loved : love"></image>
					</view>
					<view :class="items.love ? 'text1' : 'text'">收藏</view>
				</view>
				<view class="WL-box left" @tap="clickBPshow()">
					<view class="img-box">
						<image class="img" :src="text"></image>
					</view>
					<view class="text">BP</view>
				</view>
				<view class="clear"></view>
			</view>
			<view :class="msgData.content === 0 ? 'left submit-box' : 'left submit-box1'" @tap='Apply()'> {{msgData.content === 0 ? '委托联系' : '已委托'}}</view>
			<view class="clear"></view>v>
		</view>
		<!-- 全局设置申请组件 -->
		<entrust v-if="entrust.entrustShow"></entrust>
	</view>
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
				love: this.Static + 'mbcImg/home/seekCapital/like.png',
				loved: this.Static + 'mbcImg/home/seekCapital/liked.png',
				text: this.Static + 'mbcImg/home/seekCapital/text.png',
				texted: this.Static + 'mbcImg/home/seekCapital/texted.png',
				finance: {
					loadingText: '加载更多...',
					search: { // 搜索
						pageNum: 0, // 总页数
						searchCondition: {  // 分页属性
							page: '1'
						}
					},
					listData: '' // 主页在融项目列表数据
				},
				items: { // 用户缓存用户行为的子项
					id: '', // id
					doc: false, // 留言
					find: false, // 查看
					like: false, // 点赞
					love: false // 收藏
				},
				clickRecordsArr: [] ,// 用户点击行为数组记录
				entrust:{
					entrustShow: false, // 默认不显示
					type: 1, // 0代表服务申请， 1项目委托
					success: false, // 是否申请成功
					params: {
						modelId: 2, // 0 代表投资人ID  1代表投资机构ID 2代表项目ID
						projectName: '', // 委托项目
						userId: '', // 申请人ID
						applyeType: 2 ,// 创业者联系投资人 1创业者联系投资机构 2代表项目
						phone: 0, // 电话
						name: '', // 姓名
						serverId: '', // 服务ID
						time: '', // 提交成功时间
					}
				},
				userType: '99', // 用户类型  -1 未认证 0 创业者 1 个人投资人 2 机构投资人
				authState: '99' // -1 未认证 0 待审核 1审核通过 2 审核失败
			};
	    },
		props: {
			msgData: {
				type: Object
			}
		},
		mounted() {
			console.log(this.msgData, '子组件获取的数据2');
			this.getClickRecord();
			this.getUserType();
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
			console.log(this.ENTRUST, 'ENTRUST')
		},
		beforeDestroy () {
			console.log('页面销毁之前缓存数据')
			this.$store.commit('setEnTrustShow', false); // 更新setEntrustSignUp
			this.$store.commit('setAuthShow', false); // 更新setAuthShow
		},
	    methods: {
			...mapMutations({
				setEnTrustShow: 'setEnTrustShow',
				setEntrustType: 'setEntrustType',
				setEntrustParams: 'setEntrustParams',
				setAuthShow: 'setAuthShow',
				setUserActive: 'setUserActive',
				setFinance: 'setFinance'
			}),
			message() {
				
			},
			getUserType () {
				console.log('判断用户是否认证');
				if (uni.getStorageSync('UserData')) {
					let UserData = JSON.parse(uni.getStorageSync('UserData')); // 读取缓存的用户信息
					this.authState = UserData.authState; // -1 未认证 0 待审核 1审核通过 2 审核失败
					this.userType = UserData.userType; // 用户类型  -1 未认证 0 创业者 1 个人投资人 2 机构投资人
				}
			},
			clickBPshow () {
				console.log('触发预览BP');
				console.log(this.msgData.enclosurePath);
				// this.isBPshow = true;
				if (this.userType ==='1' || this.userType === '2') { // 1 个人投资人 2 机构投资人
					if (this.authState !== '1') { // 没有认证.或者认证没通过
						this.$store.commit('setAuthShow', true); // 更新setAuthShow
						return
					} else {
						this.$store.commit('setAuthShow', false); // 更新setAuthShow
						console.log('认证投资人或者投资机构')
					}
				} else if (this.userType ==='-1') {
					this.$store.commit('setAuthShow', true); // 更新setAuthShow
					return
				} else if (this.userType ==='0') {
					this.$store.commit('setAuthShow', false); // 更新setAuthShow
					uni.showToast({
						title: '您已成为创业者身份，无法委托联系项目',
						icon: 'none',
						duration: 1000
					});
					return
				}
				uni.showLoading({ // 展示loading
					title: '加载中,请稍后!'
				});
				uni.downloadFile({
					url: this.msgData.enclosurePath,
					success: function (res) {
						console.log(res, '--------------------pdf----------------------')
						var filePath = res.tempFilePath;
						uni.openDocument({
						  filePath: filePath,
						  success: function (res) {
							console.log('打开文档成功');
							uni.hideLoading(); // 隐藏 loading
						  }
						});
					}
				});
			},
			Apply () {
				console.log('触发申请');
				if (this.userType ==='1' || this.userType === '2') { // 1 个人投资人 2 机构投资人
					if (this.authState !== '1') { // 没有认证.或者认证没通过
						this.$store.commit('setAuthShow', true); // 更新setAuthShow
						return
					} else {
						this.$store.commit('setAuthShow', false); // 更新setAuthShow
						console.log('认证投资人或者投资机构')
					}
				} else if (this.userType ==='-1') {
					this.$store.commit('setAuthShow', true); // 更新setAuthShow
					return
				} else if (this.userType ==='0') {
					if (this.authState !== '1') { // 创业者审核没有成功状态
						this.$store.commit('setAuthShow', true); // 更新setAuthShow
						return
					} else if (this.authState === '1') { // 创业者成功
						this.$store.commit('setAuthShow', false); // 更新setAuthShow
						uni.showToast({
							title: '您已成为创业者身份，无法委托联系项目',
							icon: 'none',
							duration: 1000
						});
						return
					}
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
					this.entrust.params.applyeType = 2;
					this.$store.commit('setEntrustType', 1); // 更新setEntrustType
					this.$store.commit('setEntrustParams', this.entrust.params); // 更新setEntrustParams
					this.$store.commit('setEnTrustShow', true); // 更新setEnTrustShow
				}
			},
			getClickRecord () {
				console.log('获取缓存中的用户点击行为数组记录');
				if (uni.getStorageSync('clickRecordsArr')) {
					this.clickRecordsArr = JSON.parse(uni.getStorageSync('clickRecordsArr')); // 获取缓存中的用户点击行为数组记录
					this.clickRecordsArr.map((item, index) => {
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
						this.$store.commit('setUserActive', 0); // 更新setUserActive
						this.$store.commit('setFinance', this.finance); // 更新setFinance
						this.items.love = true; // 点击之后状态变化
						this.upDataIsLoved(evn); // 收藏
						this.resetClickRecord(items);
					} else {
						this.$store.commit('setUserActive', 2); // 更新setUserActive
						this.$store.commit('setFinance', this.finance); // 更新setFinance
						this.items.love = false; // 点击之后状态变化
						this.upDataIsLove(evn); // 收藏
						this.resetClickRecord(items);
					}
				};
			},
			resetClickRecord (e) {
				console.log(e, '重置缓存中用户行为数据');
				if (uni.getStorageSync('clickRecordsArr')) {
					this.clickRecordsArr = JSON.parse(uni.getStorageSync('clickRecordsArr')); // 获取缓存中的用户点击行为数组记录
					this.clickRecordsArr.map((item, index) => {
						console.log(item.id, e.id, '重置id')
						console.log(this.items, 'e')
						if (String(item.id) === String(e.id)) { // 取出缓存中存在的状态
							this.clickRecordsArr[index] = e; // 重置数据
							uni.setStorageSync('clickRecordsArr', JSON.stringify(this.clickRecordsArr));// 缓存用户点击行为数组记录
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
						"type":"0", // 0 项目 1投资人 2 投资机构 3 投资文章
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
						"type":"0", // 0 项目 1投资人 2 投资机构 3 投资文章
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
			goToEntrust (e) {
				console.log(e, 'to委托联系');
				uni.navigateTo({
					url: '/modules/pageHome/homeList/entrust/entrust?id=' + 1
				});
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
	.TD-box{
		position: relative;
		width: 50%;
		text-align: center;
	}
	.WL-box{
		position: relative;
		width: 50%;
		text-align: center;
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
		height: 38upx;
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
		text-align: center;
		letter-spacing: 0;
		background-image: linear-gradient(-134deg,  #57D6CF 0%, #15D49F 100%);
		line-height: 100upx;
	}
</style>
