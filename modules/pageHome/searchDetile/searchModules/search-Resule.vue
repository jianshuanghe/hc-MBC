<template>
	<view class="rearchResule">
		<view class='searchBox' v-if="false">
			<!-- 搜索结果顶部tab -->
			<resuleTab></resuleTab>
			<!-- 搜索结果数据展示 -->
			<view class="resuleBox">
				<!-- 综合 -->
				<comprehensive v-if='true'></comprehensive>
				<!-- 项目 -->
				<project  v-if='false'></project>
				<!-- 投资人 -->
				<investor v-if='false'></investor>
				<!-- 投资机构 -->
				<investment v-if='false'></investment>
				<!-- 资讯 -->
				<information v-if='false'></information>
			</view>
		</view>
		<!-- 搜索历史 -->
		<view class="searchHistoryBox">
			<searchHistory></searchHistory>
		</view>
	</view>
</template>

<script>
	import resuleTab from "./resule/resuleTab.vue";
	import comprehensive from "./resule/comprehensive.vue";
	import project from "./resule/project.vue";
	import investor from "./resule/investor.vue";
	import investment from "./resule/investment.vue";
	import information from "./resule/information.vue";
	import searchHistory from "./search-History.vue";
	export default {
		data() {
			return {};
		},
		components: {
			resuleTab,
			comprehensive,
			project,
			investor,
			investment,
			information,
			searchHistory
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
	.resuleBox{
		position: relative;
		width: 100%;
		padding-top: 180upx;
	}
	.searchHistoryBox{
		position: relative;
		width: 100%;
		padding-top: 120upx;
	}
</style>
