<template>
	<view class="myHistory">
		<!-- 未认证 -->
		<Historyone v-if="List.userType==0"></Historyone>
		<!-- 创业者 -->
		<Historytwo v-if="List.userType == -1"></Historytwo>
		<!-- 投资人 -->
		<HistoryThree v-if="List.userType==1"></HistoryThree>
		<HistoryThree v-if="List.userType==2"></HistoryThree>
	</view>
</template>

<script>
	import Historyone from './Historyone/Historyone.vue'
	import Historytwo from './Historytwo/Historytwo.vue'
	import HistoryThree from './HistoryThree/HistoryThree.vue'
	import {
		mapMutations,
		mapGetters
	} from 'vuex';
	export default {
		// props:['Mylist'],
		data() {
			return {
				List:[]
			};
		},
		components: {
			Historyone,
			Historytwo,
			HistoryThree
		},
		
		created() {
			this.getHeader();
		},
		methods: {
			getHeader() {
				if (uni.getStorageSync('landRegist')) {
					let landRegistLG = JSON.parse(uni.getStorageSync('landRegist')); // 读取缓存的用户信息
					console.log(landRegistLG.user.id);
					// let params = {}; // 请求总数居时 参数为空
					uni.showLoading({ // 展示loading
						title: '加载中'
					});
					uni.request({
						url: this.api2 + '/user/' + landRegistLG.user.id, //接口地址。
						// data: this.endParams(params),
						method: 'GET',
						header: {
							Authorization: "Bearer " + landRegistLG.token //将token放到请求头中
						},
						success: (response) => {
							uni.hideLoading();
							console.log(response.data);
							this.List = response.data.content
							console.log(this.List,'asdasdasdasdasdsssssss')
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
		},
	};
</script>

<style>
	.myHistory{
		width: 100%;
		height: 144upx;
		background: #FFFFFF;
	}
	
	
</style>
