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
