<template>
	<div class="uploadBP-centent">
		<scanUploadItems></scanUploadItems>
	</div>
</template>

<script>
	import scanUploadItems from "./uploadItems/scanUploadItems.vue";
	export default {
		data() {
			return {};
		},
		
		components: {
			scanUploadItems
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
	.uploadBP-centent{
		position: relative;
		width: 100%;
		margin-top: 88upx;
	}
</style>
