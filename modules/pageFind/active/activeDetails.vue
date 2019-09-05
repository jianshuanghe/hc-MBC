<template>
	<view class="activeDetails-content">
		<contentCC :msgData="dataList"></contentCC>
		<constSubmit :msgData="data"></constSubmit>
	</view>
</template>

<script>
	import contentCC from "./activeItems/content.vue";
	import constSubmit from "./activeItems/constSubmit.vue";
	import { mapGetters } from 'vuex';
	export default {
	    data () {
			return {
				id: '',
				dataList: {},// 后台返回数据
				data: {
					content: 0, // 0表示未申请过 1表示已经申请过
					id: -1 // id
				} // 接口返回值 
			};
	    },
		components: {
			contentCC,
			constSubmit
		},
		computed: {
			 ...mapGetters(['ENTRUSTSINGUP'])
		},
		watch: {
			ENTRUSTSINGUP: {
				handler (a, b) {
				  if (a.success === true) {
					  this.getList(this.id)
				  }
				},
				deep: true
			}
		},
		onLoad(option) {
			this.id = option.id;
			this.data.id = option.id;
			this.getUserApply(option.id);
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
							console.log(this.dataList, '---------------this.dataList-----------');
							let activityContent = this.dataList.activity.activityContent.replace(/\<img/gi, '<img style="max-width:100%;height:auto" ');
							this.dataList.activity.activityContent = activityContent;
							this.data.isEndTime = response.data.content.isEndTime; //是否过期 1 活动过期 0 未过期可以报名
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
			getUserApply(e){
				if (uni.getStorageSync('landRegist')) {
				    let landRegistLG = JSON.parse(uni.getStorageSync('landRegist')); // 读取缓存的用户信息
				    console.log(landRegistLG.user.id);
					let params = {}; // 请求总数居时 参数为空
					uni.showLoading({ // 展示loading
						title: '加载中'
					});
					uni.request({
						url: this.api2 + '/activity/is/sgin?activityId=' + e+ '&userId=' + landRegistLG.user.id, //接口地址。
						data: this.endParams(params),
						header: {
							Authorization:"Bearer "+landRegistLG.token//将token放到请求头中
						},
						success: (response) => {
							console.log(response.data);
							let data = response.data.content;
							this.dataList = data;
							this.data.content = response.data.content;
							this.getList(this.id);
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
	.activeDetails-content{
		position: relative;
		width: 750upx;
	}
</style>
