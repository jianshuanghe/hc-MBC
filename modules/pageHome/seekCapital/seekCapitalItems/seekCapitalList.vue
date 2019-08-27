<template>
	<view class="seekCapitalList-content">
			<view class="scrollContent">
				<!-- 列表 -->
				<view >
					<investor v-if="SEEKCAPITALTITLE === 1"></investor>
				</view>
				<view >
					<investInstitution v-if="SEEKCAPITALTITLE === 2"></investInstitution>
				</view>
			</view>
	</view>
</template>

<script>
	import investor from "./investor/investor.vue";
	import investInstitution from "./investInstitution/investInstitution.vue";
	import { mapMutations, mapGetters } from 'vuex';
	export default {
		data() {
			return {
				invest: { // 投资人
					loadingText: '加载更多...',
					search: { // 搜索
						pageNum: 0, // 总页数
						searchCondition: {  // 分页属性
							page: '1'
						}
					},
					listData: '' // 列表数据
				},
				investInstitution: { // 投资机构
					loadingText: '加载更多...',
					search: { // 搜索
						pageNum: 0, // 总页数
						searchCondition: {  // 分页属性
							page: '1'
						}
					},
					listData: '' // 列表数据
				},
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
			investor,
			investInstitution
		},
		computed: {
			...mapGetters(['SEEKCAPITALTITLE'])
		},
		watch: {
			SEEKCAPITALTITLE: {
				handler (a, b) {
					console.log(a, 'title所造index');
					if (a === 1) {
						console.log('切换到投资人， 修改投资机构');
						this.$store.commit('setSeekInvestInstitution', this.investInstitution); // 初始化投资机构 参数
						this.$store.commit('setInvestInsSearch', this.investInsSearch); // 初始化投资机构 参数
					} else {
						console.log('切换到投资机构， 修改投资人');
						this.$store.commit('setSeekInvest', this.invest); // 初始化投资人 参数
						this.$store.commit('setInvestorSearch', this.investorSearch); // 初始化投资机构 参数
					}
				},
				deep: true
			}
		},
		created() {
		},
		mounted() {
		},
		methods: {
			setSeekInvest: 'setSeekInvest',
			setSeekInvestInstitution: 'setSeekInvestInstitution',
			setInvestorSearch: 'setInvestorSearch',
			setInvestInsSearch: 'setInvestInsSearch'
		}
	};
</script>

<style>
	.seekCapitalList-content{
		position: fixed;
		width: 750upx;
		/* padding: 0 15px; */
		background: #fff;
		height: 1162upx;
		padding-bottom: 100upx;
		// #ifdef MP-WEIXIN || MP-TOUTIAO || MP-BAIDU || MP-ALIPAY
			padding-bottom: 400upx;
		// #endif
		top: 172upx;
	}
</style>
