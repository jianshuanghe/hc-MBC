<template>
	<view class="publishUpload-Content">
		<!-- 扫码登录pc -->
		<scanland :msgData="data" v-if="GET_PUBLISH.scanLandSuccess === false"></scanland>
		<!-- 上传完成 -->
		<uploadFile v-if="GET_PUBLISH.scanLandSuccess === true"></uploadFile>
	</view>
</template>
<script>
	import scanland from "./uploadItems/scanland.vue";
	import uploadFile from "./uploadItems/uploadFile.vue";
	import { mapMutations, mapGetters } from 'vuex';
	export default {
		data() {
			return {
				data: {},
				params: {
					sourceProList: false,
					id: 0
				} // 判断链接上有参数
			};
		},

		components: {
			scanland,
			uploadFile
		},
		computed: {
			...mapGetters(['GET_PUBLISH'])
		},
		watch: {
		  // GET_HOME: {
		  //   handler (a, b) {
		  //     this.clickItemsIndex = a.HomeList.titleIndex; // 切换的title
			 //  console.log(this.clickItemsIndex, '切换的数据');
		  //   },
		  //   deep: true
		  // }
		},
       onLoad(option) {
       	this.shareToHome(option); // 转发页打开规则函数
       },
		// 分享
		onShareAppMessage(res) {
			  if (res.from === 'button') {// 来自页面内分享按钮
				console.log(res.target)
			  }
			  return this.titleOrPathApp
		},
		created() {
			console.log('在组件中并不能使用页面生命周期函数');

		},
		beforeDestroy () {
			console.log('页面销毁之前缓存数据');
			if (this.params.sourceProList === true) {
				this.$store.commit('setScanLandSuccess', false); // 更新setScanLandSuccess
				if (uni.getStorageSync('landRegist')) {
					let landRegistLG = JSON.parse(uni.getStorageSync('landRegist')); // 读取缓存的用户信息
					console.log(landRegistLG.user.id);
					// let params = {}; // 请求总数居时 参数为空
					uni.showLoading({ // 展示loading
						title: '加载中'
					});
					uni.request({
						url: this.api2 + '/proj/' + this.data.projId, //接口地址。
						// data: this.endParams(params),
						method: 'GET',
						header: {
							Authorization: "Bearer " + landRegistLG.token //将token放到请求头中
						},
						success: (response) => {
							uni.hideLoading();
							console.log(response.data);
							this.$store.commit('setCompany', response.data.content);
							this.params = false;
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
			};
		},
		onLoad(option) {
			this.data.projId = option.projId; // 如果是更新项目中的附件。需要传递项目ID
			if (option.projId) {
				this.params.sourceProList = true;
				this.params.id = option.projId;
			} else {
				if(uni.getStorageSync('SacnToken')) {
					if (uni.getStorageSync('SacnToken')) {
						this.$store.commit('setScanLandSuccess', true); // 更新setScanLandSuccess
					}
				} else {
					this.$store.commit('setScanLandSuccess', false); // 更新setScanLandSuccess
				}
			}
			uni.setStorageSync('isUpLoadFileParams', JSON.stringify(this.params));
		},
		mounted() {
		},
		methods: {
			...mapMutations({
				setScanLandSuccess: 'setScanLandSuccess',
				setCompany: 'setCompany'
			})
		}
	};
</script>

<style>
</style>
