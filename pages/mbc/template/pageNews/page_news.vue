<template>
	<view class="newsContent">
		<!-- 联系人组件 -->
		<!-- <newsContacts></newsContacts> -->
		<!-- 系统通知 -->
		<system></system>
	</view>
</template>
<script>
	import newsContacts from "./newsList/news-Contacts.vue"
	import system from "./newsList/news-system.vue"
	import {
		mapMutations,
		mapGetters
	} from 'vuex';

	export default {
		data() {
			return {
				num: [],
				arr: [],
				}
		},
		components: {
			newsContacts,
			system
		},
		computed: {},
		created() {
			if (uni.getStorageSync('landRegist')) {
				let landRegistLG = JSON.parse(uni.getStorageSync('landRegist')); // 读取缓存的用户信息
				console.log(landRegistLG.user.id);
				// let params = {}; // 请求总数居时 参数为空
				uni.showLoading({ // 展示loading
					title: '加载中'
				});
				uni.request({
					url: this.api2 + '/noticeInfo/list?userId='+landRegistLG.user.id , //接口地址。
					// data: this.endParams(params),
					method: 'GET',
					header: {
						Authorization: "Bearer " + landRegistLG.token //将token放到请求头中
					},
					success: (response) => {
						console.log(response.data);
						this.num = response.data
						console.log(this.num)
						this.$store.commit('setNews', this.num);
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
		mounted() {},
		methods: {
			
		}
	};
</script>

<style>
	.item {
		font-size: 28upx;
		line-height: 60upx;
		height: 60upx;
		border-bottom: 2upx solid #f1f1f1;
		padding-left: 30upx;
		padding-right: 30upx;
		color: #888;
		text-align: left;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.des {
		text-align: center;
		padding: 30upx;
		margin-top: 100upx;
		font-size: 30upx;
		color: #888888;
	}

	button {
		width: 330upx;
		float: left;
		margin-left: 30upx;
		margin-top: 30upx;
		padding: 10upx 20upx;
		font-size: 32upx;
	}
</style>
