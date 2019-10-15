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
		<!-- 返回主页按钮 -->
		<goHome v-if='isShare === 1'></goHome>
	</view>
</template>

<script>
	import seekCapitalTitle from "./seekCapitalItems/seekCapitalTitle.vue";
	import seekCapitalList from "./seekCapitalItems/seekCapitalList.vue";
	import multipleScreen from "./seekCapitalItems/multipleScreen/multipleScreen.vue";
	import publishProject from "./seekCapitalItems/publishProject.vue";
	import goHome from '@/components/goHome/goHome.vue';
	import { mapMutations, mapGetters } from 'vuex';
	export default {
		data() {
			return {
				isShare: 0, // 0代表没有分享, 1代表分享后需要展示返回主页，2代表.....
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
			goHome,
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
		onLoad(option) {
			if (option.share) { // 赋值分享参数
				this.isShare = Number(option.share);
				if (this.isShare === 1) {
					uni.setStorageSync('clickItems', 1);
					this.$store.commit('setHome',1);
				}
			}
		},
		// 分享
		onShareAppMessage(res) {
			if (res.from === 'button') {// 来自页面内分享按钮
			  console.log(res.target)
			}
			return {
			  title: '找资本',
			  path: '/modules/pageHome/seekCapital/seekCapital?share=1',
			  // share参数代表分享，
					// share=1代表用户分享出去的是当前页，用户打开页面需要展示返回主页按钮；
					// share=2.....
			}
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
