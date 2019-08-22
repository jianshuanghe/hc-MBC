<template>
	<view class="screen-content">
		<view class="line"></view>
		<view class="screen-box">
			<view class="screen-item" @tap='clickScreen(items.code)'  v-for="(items,index) in dataList" :key="index" >
				<view class="left screen-item-text">{{items.text}}</view>
				<image class="right screen-item-cleck" :src='check' v-if='clickItemsCode === items.code'></image>
				<view class="clear"></view>
				<view class="line"></view>
			</view>
		</view>
	</view>
</template>

<script>
	import { mapMutations, mapGetters } from 'vuex';
	export default {
	    data () {
			return {
				check: this.Static + 'mbcImg/home/seekCapital/check.png',
				dataList: [
					{
						text: '综合',
						code: 'ID'
					},
					{
						text: '最新',
						code: 'CREATE_TIME'
					},
					{
						text: '最热',
						code: 'INFO_COUNT'
					}
				],
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
				},
				clickItemsCode: '', // 用户选中的code参数
				clickItemsTitle: 1 // 当前title,所在的位置，1代表的投资人，2代表时投资项目
			};
	    },
		computed: {
			...mapGetters(['SEEKCAPITALTITLE', 'INVESTORSEARCH', 'INVERSTINSSEARCH'])
		},
		watch: {
			INVESTORSEARCH: {
				handler (a, b) {
					console.log(a, '获取VUX投资人的参数')
					this.investorSearch = a; // 接口投资人参数
				},
				deep: true
			},
			INVERSTINSSEARCH: {
				handler (a, b) {
					console.log(a, '获取VUX投资项目参数')
					this.investInsSearch = a; // 接口投资项目参数
				},
				deep: true
			},
			SEEKCAPITALTITLE: {
				handler (a, b) {
					console.log(a, '获取VUX切换的title');
					this.clickItemsTitle = a; // 切换的title
					this.$store.commit('setScreenShow', false); // 更新setScreenShow
					this.$store.commit('setMultipleShow', false); // 更新setMultipleShow
				},
				deep: true
			}
		},
		mounted(){
		},
	    methods: {
			...mapMutations({
				setSeekInvest: 'setSeekInvest', // 投资人分页
				setSeekInvestInstitution: 'setSeekInvestInstitution', // 投资项目参数
				setInvestorSearch: 'setInvestorSearch', // 投资人参数
				setInvestInsSearch: 'setInvestInsSearch' // 投资项目参数
			}),
			clickScreen (e) {
				console.log(e, this.SEEKCAPITALTITLE, '触发点击综合选项items.code');
				this.clickItemsCode = e;
				this.$store.commit('setSeekInvest', this.invest); // 更新setInvest
				this.$store.commit('setSeekInvestInstitution', this.investInstitution); // 更新setSeekInvestInstitution
				if (this.SEEKCAPITALTITLE === 1) { // 跟新投资人参数
					console.log('投资人参数');
					this.investorSearch.sortType = this.clickItemsCode;
					this.$store.commit('setInvestorSearch', this.investorSearch); // 更新setInvestorSearch
				} else if (this.SEEKCAPITALTITLE === 2) { // 跟新投资项目参数
					console.log('投资项目参数');
					this.investInsSearch.sortType = this.clickItemsCode;
					this.$store.commit('setInvestInsSearch', this.investInsSearch); // 更新setInvestInsSearch
				};
				setTimeout(() => {
				  this.$store.commit('setScreenShow', false); // 更新setScreenShow
				}, 300);
			}
	    }
	};
</script>

<style>
	.screen-content{
		position: relative;
		width: 100%;
		position: fixed;
		background: rgba(46,46,48,0.20);
		height: 2000upx;
		z-index: 102;
	}
	.screen-box{
		position: relative;
		width: 100%;
		padding: 0 30upx;
		margin-top: 0upx;
		background: #fff;
		z-index: 101;
		width: 100%;
	}
	.screen-item{
		position: relative;
		width: 100%;
	}
	.screen-item-text{
		position: relative;
		width: 60%;
		font-family: PingFangSC-Regular;
		font-size: 28upx;
		color: #2E2E30;
		line-height: 100upx;
	}
	.screen-item-cleck{
		position: absolute;
		width: 30upx;
		height: 30upx;
		top: 44upx;
		right: 60upx;
	}
</style>
