<template>
	<view class="homeContent">
		<!-- 搜索 -->
		<homeSearch></homeSearch>
		<!-- banner -->
		<homeBanner></homeBanner>
		<!-- 融头条 -->
		<homeTt></homeTt>
		<!-- 发布项目、寻找资本 -->
		<homePutInSeek></homePutInSeek>
		<!-- 服务模块 -->
		<homeModules></homeModules>
		<!-- 列表 -->
		<homeList></homeList>
	</view>
</template>
<script>
import homeSearch from "./homeList/home-search.vue";
import homeBanner from "./homeList/home-banner.vue";
import homeTt from "./homeList/home-tt.vue";
import homePutInSeek from "./homeList/home-putInSeek.vue";
import homeModules from "./homeList/home-modules.vue";
import homeList from "./homeList/home-list.vue";
export default {
	data() {
		return {};
	},
	components: {
		homeSearch,
		homeBanner,
		homeTt,
		homePutInSeek,
		homeModules,
		homeList
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
	.homeContent{
		width: 100%;
		min-height: 100%;
	}
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
