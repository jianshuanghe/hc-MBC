<template>
	<view class="searchDetile-content">
		<!-- 搜索框 -->
		<serchBox></serchBox>
		<!-- 搜索结果 -->
		<rearchResule></rearchResule>
		<!-- 搜索历史 -->
	</view>
</template>

<script>
	import serchBox from "./searchModules/serch-Box.vue";
	import rearchResule from "./searchModules/search-Resule.vue";
	export default {
		data() {
			return {};
		},
		components: {
			serchBox,
			rearchResule
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
	.searchDetile-content{
		min-height: 1334upx;
	}
</style>
