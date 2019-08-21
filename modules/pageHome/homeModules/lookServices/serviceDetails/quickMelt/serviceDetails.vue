<template>
	<view class="serciveDetails-conetnt">
		<detailTop></detailTop>
		<detailsContent></detailsContent>
		<constSubmit  :msgData= 'data'></constSubmit>
	</view>
</template>

<script>
	import detailTop from "./detailsItems/detailTop.vue";
	import detailsContent from "./detailsItems/detailsContent.vue";
	import constSubmit from "./detailsItems/constSubmit.vue";
	export default {
	    data () {
			return {
				dataList: [] ,// 后台返回数据
				data: {
					serverId: 1000, // 服务ID
					content: 1000 // 记录用户是否申请过 1申请过，0未申请
				}
			};
	    },
		components: {
			detailTop,
			detailsContent,
			constSubmit
		},
		computed: {},
		watch: {},
		created() {
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
