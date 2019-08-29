<template>
	<view class="seekCapital-content">
		<!-- title -->
		<seekCapitalTitle></seekCapitalTitle>
		<!-- 筛选 -->
		<multipleScreen></multipleScreen>
		<!-- list -->
		<seekCapitalList></seekCapitalList>
		<!-- publish -->
		<publishProject></publishProject>
	</view>
</template>

<script>
	import seekCapitalTitle from "./seekCapitalItems/seekCapitalTitle.vue";
	import seekCapitalList from "./seekCapitalItems/seekCapitalList.vue";
	import multipleScreen from "./seekCapitalItems/multipleScreen/multipleScreen.vue";
	import publishProject from "./seekCapitalItems/publishProject.vue";
	import { mapMutations, mapGetters } from 'vuex';
	export default {
		data() {
			return {
				investorSearch: { // 筛选结果 --- 投资人参数
					sortType: 'ID', // 排序 ID 综合 INFO_COUNT 最热 CREATE_TIME 最新
					area: '', //  省份codelist
					leves: '', //  轮数idlist
					fields: '' // 领域 idlist
				},
				investInsSearch: { // 筛选结果 --- 投资项目参数
					sortType: 'ID', // 排序 ID 综合 INFO_COUNT 最热 CREATE_TIME 最新
					area: '', //  省份codelist
					leves: '', //  轮数idlist
					fields: '' // 领域 idlist
				}
			};
		},
		
		components: {
			seekCapitalTitle,
			seekCapitalList,
			multipleScreen,
			publishProject
		},
		computed: {
			...mapGetters(['GET_HOME'])
		},
		watch: {
		  GET_HOME: {
		    handler (a, b) {
		      this.clickItemsIndex = a.HomeList.titleIndex; // 切换的title
			  console.log(this.clickItemsIndex, '切换的数据');
		    },
		    deep: true
		  }
		},
		created() {
			console.log('在组件中并不能使用页面生命周期函数');
		},
		mounted() {
		},
		beforeDestroy () {
			console.log('页面销毁之前缓存数据')
			this.$store.commit('setInvestorSearch', this.investorSearch); // 更新setInvestorSearch
			this.$store.commit('setInvestInsSearch', this.investInsSearch); // 更新setInvestInsSearch
		},
		methods: {
			...mapMutations({
				setInvestorSearch: 'setInvestorSearch', // 投资人参数
				setInvestInsSearch: 'setInvestInsSearch' // 投资项目参数
			})
		},
	}
</script>

<style>
</style>
