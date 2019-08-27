<template>
	<view class="activeDetails-content">
		<contentCC :msgData="dataList"></contentCC>
	</view>
</template>

<script>
	import contentCC from "./informationItems/content.vue";
	export default {
	    data () {
			return {
				dataList: [] // 后台返回数据
			};
	    },
		components: {
			contentCC
		},
		computed: {},
		watch: {},
		onLoad(option) {
			console.log(option)
			this.getList(option.id)
		},
	    methods: {
			getList (e) {
				if (uni.getStorageSync('landRegist')) {
				    let landRegistLG = JSON.parse(uni.getStorageSync('landRegist')); // 读取缓存的用户信息
				    console.log(landRegistLG.user.id);
					let params = {}; // 请求总数居时 参数为空
					uni.showLoading({ // 展示loading
						title: '加载中'
					});
					uni.request({
						url: this.api2 + '/activity/detail?activityId=' + e, //接口地址。
						data: this.endParams(params),
						header: {
							Authorization:"Bearer "+landRegistLG.token//将token放到请求头中
						},
						success: (response) => {
							console.log(response.data.content);
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
	.activeDetails-content{
		position: relative;
		width: 750upx;
	}
</style>
