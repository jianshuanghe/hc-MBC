<template>
	<view class="looServices-content">
		<view v-for="(items,index) in dataList" :key="index">
			<items :msgData="items"></items>
		</view>
		<!-- 返回主页按钮 -->
		<goHome v-if='isShare === 1'></goHome>
	</view>
	
</template>

<script>
	import goHome from '@/components/goHome/goHome.vue';
	import items from "./servicesItems/items.vue";
	import { mapMutations } from 'vuex';
	export default {
	    data () {
			return {
				isShare: 0, // 0代表没有分享, 1代表分享后需要展示返回主页，2代表.....
				dataList: [] // 后台返回数据
			};
	    },
		components: {
			goHome,
			items,
		},
		computed: {},
		watch: {},
		created() {
			this.getLookServices();
			this.$store.commit('setEnTrustShow', false); // 更新setEnTrustShow  进入列表页面申请组件默认不显示
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
			  title: '找服务',
			  path: '/modules/pageHome/homeModules/lookServices/lookServices?share=1',
			  // share参数代表分享，
					// share=1代表用户分享出去的是当前页，用户打开页面需要展示返回主页按钮；
					// share=2.....
			}
		},
	    methods: {
			...mapMutations({
				setEnTrustShow: 'setEnTrustShow'
			}),
			getLookServices(){
				console.log('获取发现服务数据');
				uni.showLoading({ // 展示loading
					title: '加载中'
				});
				uni.request({
					url: this.api2 + '/server/list', //接口地址。
					header: {},
					success: (response) => {
						console.log(response.data);
						this.dataList = response.data.content;
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
	};
</script>

<style>
	.looServices-content{
		position: relative;
		width: 690upx;
		min-height: 1334upx;
		padding: 0 30upx;
		background: #fff;
	}
	
	
</style>
