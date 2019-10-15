<template>
	<view class="serciveDetails-conetnt">
		<detailTop></detailTop>
		<detailsContent></detailsContent>
		<constSubmit :msgData= 'data'></constSubmit>
		<!-- 返回主页按钮 -->
		<goHome v-if='isShare === 1'></goHome>
	</view>
</template>

<script>
	import goHome from '@/components/goHome/goHome.vue';
	import detailTop from "./detailsItems/detailTop.vue";
	import detailsContent from "./detailsItems/detailsContent.vue";
	import constSubmit from "./detailsItems/constSubmit.vue";
	import { mapMutations, mapGetters } from 'vuex';
	export default {
	    data () {
			return {
				isShare: 0, // 0代表没有分享, 1代表分享后需要展示返回主页，2代表.....
				dataList: [] ,// 后台返回数据
				data: {
					serverId: 1000, // 服务ID
					content: 0 // 记录用户是否申请过 1申请过，0未申请
				}
			};
	    },
		onLoad(option) {
			if (option.share) { // 赋值分享参数
				this.isShare = Number(option.share);
				if (this.isShare === 1) {
					uni.setStorageSync('clickItems', 1);
					this.$store.commit('setHome',1);
				}
			}
		},
		// 分享
		onShareAppMessage(res) {
			if (res.from === 'button') {// 来自页面内分享按钮
			  console.log(res.target)
			}
			return {
			  title: 'BP诊断',
			  path: '/modules/pageHome/homeModules/lookServices/serviceDetails/BPD/serviceDetails?share=1',
			  // share参数代表分享，
					// share=1代表用户分享出去的是当前页，用户打开页面需要展示返回主页按钮；
					// share=2.....
			}
		},
		components: {
			goHome,
			detailTop,
			detailsContent,
			constSubmit
		},
		computed: {
			...mapGetters(['LANDREGIST'])
		},
		watch: {
			LANDREGIST: {
			  handler (a, b) {
				console.log(a, b, '登录状态');
				if (a === 1) {
					this.getUserApply(this.data.serverId);
				}
			  },
			  deep: true
			}
		},
		onLoad(option) {
			this.data.serverId = option.serverId;
			this.getUserApply(option.serverId);
		},
	    methods: {
			getUserApply(e){
				if (uni.getStorageSync('landRegist')) {
				    let landRegistLG = JSON.parse(uni.getStorageSync('landRegist')); // 读取缓存的用户信息
				    console.log(landRegistLG.user.id);
					let params = {}; // 请求总数居时 参数为空
					uni.showLoading({ // 展示loading
						mask: true,
						title: '加载中'
					});
					uni.request({
						url: this.api2 + '/server/is/apply?serverId=' + e + '&userId=' + landRegistLG.user.id, //接口地址。
						data: this.endParams(params),
						header: {
							Authorization:"Bearer "+landRegistLG.token//将token放到请求头中
						},
						success: (response) => {
							console.log(response.data);
							this.data.content = response.data.content;
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
	    }
	};
</script>

<style>
	.serciveDetails-conetnt{
		position: relative;
		width: 100%;
	}
</style>
