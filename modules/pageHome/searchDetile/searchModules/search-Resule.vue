<template>
	<view class="rearchResule">
		<view class='searchBox'  v-if="isSearch">
			<!-- 搜索结果顶部tab -->
			<resuleTab></resuleTab>
			<!-- 搜索结果数据展示 -->
			<view class="resuleBox">
				<!-- 综合 -->
				<comprehensive :class="clickItemsIndex === 1 ? 'show' : 'hide'"></comprehensive>
				<!-- 项目 -->
				<project  :class="clickItemsIndex === 2 ? 'show' : 'hide'"></project>
				<!-- 投资人 -->
				<investor :class="clickItemsIndex === 3 ? 'show' : 'hide'"></investor>
				<!-- 投资机构 -->
				<investment :class="clickItemsIndex === 4 ? 'show' : 'hide'"></investment>
				<!-- 资讯 -->
				<information :class="clickItemsIndex === 5 ? 'show' : 'hide'"></information>
			</view>
		</view>
		<!-- 搜索历史 -->
		<view class="searchHistoryBox" v-else>
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
	import { mapMutations, mapGetters } from 'vuex';
	export default {
		data() {
			return {
				isSearch: false,
				clickItemsIndex: 1 ,// 默认展示综合
			};
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
		  ...mapGetters(['GET_HOME'])
		},
		watch: {
			GET_HOME: {
			  handler (a, b) {
				  this.isSearch = a.HomeSearch.isSearch;
				  this.clickItemsIndex = a.HomeSearch.clickItemsIndex;
			  },
			  deep: true
			}
		},
		created() {
			console.log('在组件中并不能使用页面生命周期函数');
		},
		mounted() {
		},
		methods: {
			...mapMutations({
				setIsSearch: 'setIsSearch', // 判断用户是否在搜索状态
				setSeachProject: 'setSeachProject',
				setSeachInvestor: 'setSeachInvestor',
				setSeachInvesten: 'setSeachInvesten',
				setSeachActive: 'setSeachActive',
				setSearchHistoryData: 'setSearchHistoryData' // 搜索的历史数据
			}),
		}
	};
</script>

<style>
	.resuleBox{
		position: relative;
		width: 100%;
		padding-top: 174upx;
	}
	.searchHistoryBox{
		position: relative;
		width: 100%;
		padding-top: 114upx;
	}
</style>
