<template>
	<view class="activeDetails-content">
		<contentCC :msgData="dataList"></contentCC>
	</view>
</template>

<script>
	import contentCC from "./informationItems/content.vue";
	export default {
	    data () {
			return {
				dataList: [] // 后台返回数据
			};
	    },
		components: {
			contentCC
		},
		computed: {},
		watch: {},
		onLoad(option) {
			console.log(option)
		},
	    methods: {
	    }
	};
</script>

<style>
	.activeDetails-content{
		position: relative;
		width: 750upx;
	}
</style>
