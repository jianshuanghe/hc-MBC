<template>
	<view class="looServices-content">
		<items></items>
	</view>
	
</template>

<script>
	import items from "./servicesItems/items.vue";
	export default {
	    data () {
			return {
				dataList: [] // 后台返回数据
			};
	    },
		components: {
			items,
		},
		computed: {},
		watch: {},
		created() {
			this.getLookServices();
		},
	    methods: {
			getLookServices(){
				console.log('获取发现服务数据');
				if (uni.getStorageSync('landRegist')) {
				    let landRegistLG = JSON.parse(uni.getStorageSync('landRegist')); // 读取缓存的用户信息
					let params = {}; // 请求总数居时 参数为空
					uni.showLoading({ // 展示loading
						title: '加载中'
					});
					uni.request({
						url: this.api2 + '/server/list', //接口地址。
						header: {
							Authorization:"Bearer "+landRegistLG.token//将token放到请求头中
						},
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
