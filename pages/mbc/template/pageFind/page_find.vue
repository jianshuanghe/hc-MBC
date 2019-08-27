<template>
	<view class="findContent">
		<!-- 搜索 -->
		<findSearch></findSearch>
		<!-- tab切换 -->
		<findTab></findTab>
		<!-- 列表展示 -->
		<findList></findList>
	</view>
</template>
<script>
	import findSearch from "./findList/findSearch.vue";
	import findTab from "./findList/findTab.vue";
	import findList from "./findList/findList.vue";
	export default {
		data() {
			return {};
		},
		components: {
			findSearch,
			findTab,
			findList
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
.des {
	text-align: center;
	padding: 30upx;
	margin-top: 100upx;
	font-size: 30upx;
	color: #888888;
}
button {
	width: 330upx;
	float: left;
	margin-left: 30upx;
	margin-top: 30upx;
	padding: 10upx 20upx;
	font-size: 32upx;
}
</style>
