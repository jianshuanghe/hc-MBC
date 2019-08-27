<template>
	<view class="uploadBP-centent">
		<scanUploadItems></scanUploadItems>
	</view>
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
		},
		watch: {
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
