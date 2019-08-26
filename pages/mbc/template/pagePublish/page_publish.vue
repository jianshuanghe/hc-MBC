<template>
	<view class="publishContent">
		<view class="des">
			<!-- title -->
			<publishTitle></publishTitle>
			<!-- content -->
			<!-- pc登录上传 -->
			<uploadBP v-if='GET_PUBLISH.titleIndex === 1'></uploadBP>
			<!-- infor -->
			<view class="inforContent"  v-if='GET_PUBLISH.titleIndex === 2'>
				<!-- 基本信息 -->
				<basicInfor ></basicInfor>
			</view>
		</view>
	</view>
</template>
<script>
	import publishTitle from "./publishList/publishTitle.vue";
	import uploadBP from "./publishList/uploadBP/uploadBP.vue";
	import basicInfor from "./publishList/Infor/basicInfor.vue";
	import { mapMutations, mapGetters } from 'vuex';
export default {
	data() {
		return {
			areaData: {}
		};
	},
	components: {
		publishTitle,
		uploadBP,
		basicInfor
	},
	computed: {
		...mapGetters(['GET_PUBLISH'])
	},
	created() {
		if(uni.getStorageSync('isUpLoadFile')) {
			let isUpLoadFile = JSON.parse(uni.getStorageSync('isUpLoadFile')); // 
			this.$store.commit('setIsUploadFileSuccess', isUpLoadFile.isSuccess); // 更新setIsUploadFileSuccess
			this.$store.commit('setIsUploadFileContent', isUpLoadFile.content); // 更新setIsUploadFileContent
		};
		if(uni.getStorageSync('SacnToken')) {
			this.isTokenConnect();
		}
	},
	mounted() {
	},
	methods: {
		...mapMutations({
			setIsUploadFileSuccess: 'setIsUploadFileSuccess',
			setIsUploadFileContent: 'setIsUploadFileContent'
		}),
		isTokenConnect () {
			console.log('校验token是否有效')
			if (uni.getStorageSync('landRegist')) {
				let landRegistLG = JSON.parse(uni.getStorageSync('landRegist')); // 读取缓存的用户信息
				console.log(landRegistLG.user.id);
				let params = {}; // 请求总数居时 参数为空
				uni.request({
					url: this.api2 + '/pc/isTokenConnect?token=' + uni.getStorageSync('SacnToken'), //接口地址。
					data: this.endParams(params),
					header: {
						Authorization:"Bearer "+landRegistLG.token//将token放到请求头中
					},
					success: (response) => {
						console.log(response.data.content); // 领域
					},
					fail: (error) => {
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

</style>
