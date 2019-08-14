<template>
	<view class="seekCapitalList-content">
			<view class="scrollContent">
				<!-- 列表 -->
				<view >
					<investor v-if="GET_HOME.seekCapital.titleIndex === 1"></investor>
				</view>
				<view >
					<investInstitution v-if="GET_HOME.seekCapital.titleIndex === 2"></investInstitution>
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
				scrollTop: 0,
				old: {
					scrollTop: 0
				},
				loadingText: '加载更多...',
				seekCapital:{
					titleIndex: 1, // 切换的title
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
					}
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
				},
				paramsList: {}, // 切换title，数显数据函数的参数
				searchCondition: {  // 分页属性
	              page: '1',
	              name: ''
	            },
	            pageNum: 0, // 数据总页数
	            pageList: [] // 后台返回数据
			};
		},
		components: {
			investor,
			investInstitution
		},
		computed: {
			...mapGetters(['GET_HOME', 'INVESTORSEARCH', 'INVERSTINSSEARCH', 'SEEKCAPITALTITLE'])
		},
		watch: {
			GET_HOME: {
				handler (a, b) {
					this.seekCapital = a.seekCapital; // 获取vux中的数据
				},
				deep: true
			},
			SEEKCAPITALTITLE: {
				handler (a, b) {
					console.log(b, '切换的title11');
					this.seekCapital.titleIndex = b; // 切换的title
					if (this.seekCapital.titleIndex === 1) {
						this.$store.commit('setSeekInvestInstitution', this.seekCapital.investInstitution); // 初始化投资机构 参数
						this.$store.commit('setInvestInsSearch', this.investInsSearch); // 初始化投资机构 参数
					} else {
						this.$store.commit('setSeekInvest', this.seekCapital.invest); // 初始化投资人 参数
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
		padding: 0 15px;
		background: #fff;
		height: 1162upx;
		padding-bottom: 100upx;
		top: 172upx;
	}
</style>
