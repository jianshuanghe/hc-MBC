<template>
	<view class="publishUpload-Content">
		<!-- 扫码登录pc -->
		<scanland></scanland>
		<!-- 上传完成 -->
		<uploadFile v-if="false"></uploadFile>
	</view>
</template>

<script>
	import scanland from "./uploadItems/scanland.vue";
	import uploadFile from "./uploadItems/uploadFile.vue";
	export default {
		data() {
			return {};
		},
		
		components: {
			scanland,
			uploadFile
		},
		computed: {
			// ...mapGetters(['GET_HOME'])
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
		computed: {
		},
		created() {
			console.log('在组件中并不能使用页面生命周期函数');
		},
		mounted() {
		},
		methods: {
		}
	};
</script>

<style>
</style>
