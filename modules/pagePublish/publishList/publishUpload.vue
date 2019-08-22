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
				data: {}
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
		created() {
			console.log('在组件中并不能使用页面生命周期函数');
			if(uni.getStorageSync('SacnToken')) {
				if (uni.getStorageSync('SacnToken')) {
					this.$store.commit('setScanLandSuccess', true); // 更新setScanLandSuccess
				}
			}
		},
		onLoad(option) {
			this.data.projId = option.projId; // 如果是更新项目中的附件。需要传递项目ID
		},
		mounted() {
		},
		methods: {
			...mapMutations({
				setScanLandSuccess: 'setScanLandSuccess'
			})
		}
	};
</script>

<style>
</style>
