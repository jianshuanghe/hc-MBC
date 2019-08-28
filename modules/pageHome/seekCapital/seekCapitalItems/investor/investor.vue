
<template>
	<view class="s"  v-if="invest.listData.length > 0">
		<view class="listInvest">
			<scroll-view :scroll-top="scrollTop" scroll-y="true" class="scroll-Y" @scrolltoupper="upper" @scrolltolower="loadMore"
			@scroll="scroll">
				<view v-for="(items,index) in invest.listData" :key="index" >
					<investItems :msgData="items"></investItems>
				</view>
				<view class="loading-more">
					<text class="loading-more-text">{{loadingText}}</text>
				</view>
			</scroll-view>
		</view>
	</view>
	<empty v-else>抱歉，没有找到相关内容~</empty>
</template>

<script>
	import empty from "@/components/empty/empty.vue";
	import investItems from "./inverstorItems/invest-Items.vue";
	import { mapMutations, mapGetters } from 'vuex';
	export default {
	    data () {
			return {
				titleIndex: 1,
				scrollTop: 0,
				old: {
					scrollTop: 0
				},
				loadingText: '加载更多...',
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
				investorSearch: { // 筛选结果 --- 投资人参数
					sortType: 'ID', // 排序 ID 综合 INFO_COUNT 最热 CREATE_TIME 最新
					area: '', //  省份codelist
					leves: '', //  轮数idlist
					fields: '' // 领域 idlist
				},
				searchCondition: {  // 分页属性
				  page: '1',
				  name: ''
				},
				pageNum: 0, // 数据总页数
				pageList: [] // 后台返回数据
			};
	    },
		components: {
			investItems,
			empty
		},
		computed: {
          ...mapGetters(['GET_HOME', 'SEEKCAPITALTITLE', 'INVESTORSEARCH', 'INVESTORSEARCHTYPE', 'AREADATA', 'FIELDDATA', 'LEVELDATA'])
        },
		watch: {
			GET_HOME: {
			  handler (a, b) {
			    this.invest = a.seekCapital.invest; // 获取vuex中的投资人数据
			  },
			  deep: true
			},
			SEEKCAPITALTITLE: {
				handler (a, b) {
					console.log(b, '切换的title11');
					this.titleIndex = a; // 切换的title
					this.goTop(); // 页面触底之后调取loadMore方法，为了让用户再次调用此方法，需要自動将scroll向上滚动一些位置，这样下次滑动才会触发loadMore方法，详细需要看API
				},
				deep: true
			},
			INVESTORSEARCH: {
				handler (a, b) {
					console.log(a, '获取VUX投资人的参数')
					this.investorSearch = a; // 接口投资人参数
					this.getInvestList(this.invest);
				},
				deep: true
			},
			INVESTORSEARCHTYPE: {
				handler (a, b) {
					this.resetFile();
				},
				deep: true
			}
        },
		created() {
			console.log('在组件中并不能使用页面生命周期函数');
			this.getInvestList(this.invest);
		},
	    methods: {
			...mapMutations({
				setSeekInvest: 'setSeekInvest',
				setAreaData: 'setAreaData', // 公共组件省市区
				setFieldData: 'setFieldData', // 公共组件领域
				setLevelData: 'setLevelData', // 公共组件融资阶段
			}),
			resetFile () { // 重置右侧筛选数据，当左侧综合变化时，需要触发此项
				let AREADATA = this.AREADATA;
				let FIELDDATA = this.FIELDDATA;
				let LEVELDATA = this.LEVELDATA;
				AREADATA.province.map((items, index) => {
					items.checked = false;
				});
				FIELDDATA.map((items, index) => {
					items.checked = false;
				});
				LEVELDATA.map((items, index) => {
					items.checked = false;
				});
				this.$store.commit('setAreaData', AREADATA); // 更新setAreaData
				this.$store.commit('setFieldData', FIELDDATA); // 更新setFieldData
				this.$store.commit('setLevelData', LEVELDATA); // 更新setLevelData
			},
			upper: function(e) {
				console.log(e)
			},
			loadMore: function() {
				console.log('触发加载更多。。。');
				let pageNum = this.invest.search.pageNum;
				let page = Number(this.invest.search.searchCondition.page);
				console.log(page, '当前页数1');
				console.log(pageNum, '总页数1');
				console.log(this.invest, '头责任的加载更多，原始数据');
				if (page < pageNum) { // 当前页数小于总页数时上啦加载数据
					setTimeout(() => {
						this.getInvestMoreList(this.invest);
					}, 500)
				} else {
					this.loadingText = '已经没有数据了';
					this.invest.loadingText = this.loadingText;
					this.$store.commit('setSeekInvest', this.invest); // 更新setFinance
					uni.showToast({
						title: '已经没有数据了！',
						icon: 'none',
						duration: 1000
					});
				}
			},
			scroll: function(e) {
				console.log(e)
				this.old.scrollTop = e.detail.scrollTop
			},
			goTop: function(e) { // 切换title时回到顶部
				// 解决view层不同步的问题
				this.scrollTop = this.old.scrollTop;
				console.log(this.scrollTop - 50);
				this.$nextTick(function() {
					this.scrollTop = 0
				});
			},
			goScrollTop: function(e) {
				// 解决view层不同步的问题
				this.scrollTop = this.old.scrollTop;
				console.log(this.scrollTop - 50);
				this.$nextTick(function() {
					this.scrollTop = Number(this.scrollTop - 50)
				});
			},
			getInvestList(e){
				console.log(e, '数显数据函数的参数');
				if (uni.getStorageSync('landRegist')) {
				    let landRegistLG = JSON.parse(uni.getStorageSync('landRegist')); // 读取缓存的用户信息
				    console.log(landRegistLG.user.id);
					let params = {}; // 请求总数居时 参数为空
					uni.showLoading({ // 展示loading
						title: '加载中'
					});
					let P = this.investorSearch; // 投资人参数
					uni.request({
						url: this.api2 + '/inve/list?type=0' + '&sortType=' + P.sortType + '&area=' + P.area + '&leves=' + P.leves + '&fields=' + P.fields + '&page=' + this.searchCondition.page, //接口地址。
						data: this.endParams(params),
						header: {
							Authorization:"Bearer "+landRegistLG.token//将token放到请求头中
						},
						success: (response) => {
							console.log(response.data);
							e.listData = response.data.rows; // 第一页返回的数据
							e.search.pageNum = this.pageNums(response.data.total) // 总页数
							console.log(response.data.total, e.search.pageNum);
							if (e.search.pageNum === 1) { // 总页数为1时，显示没有数据了
								this.loadingText = '已经没有数据了';
								e.loadingText = '已经没有数据了!';
							}
							uni.hideLoading(); // 隐藏 loading
							this.$store.commit('setSeekInvest', e); // 更新setInvest
						},
						fail: (error) => {
							uni.hideLoading(); // 隐藏 loading
							uni.showToast({
								title: '网络繁忙，请稍后',
								icon: 'none',
								duration: 1000
							});
							console.log(error, '网络繁忙，请稍后');
						}
					});
				}
			},
			getInvestMoreList(e){
				console.log(e, '数显数据函数的参数More');
				e.search.searchCondition.page = String(parseInt(e.search.searchCondition.page) + 1);
				if (uni.getStorageSync('landRegist')) {
				    let landRegistLG = JSON.parse(uni.getStorageSync('landRegist')); // 读取缓存的用户信息
				    console.log(landRegistLG.user.id);
					let params = {}; // 请求总数居时 参数为空
					uni.showLoading({ // 展示loading
						title: '加载中'
					});
					let P = this.investorSearch; // 投资人参数
					uni.request({
						url: this.api2 + '/inve/list?type=0' + '&sortType=' + P.sortType + '&area=' + P.area + '&leves=' + P.leves + '&fields=' + P.fields + '&page=' + e.search.searchCondition.page, //接口地址。
						data: this.endParams(params),
						header: {
							Authorization:"Bearer "+landRegistLG.token//将token放到请求头中
						},
						success: (response) => {
							console.log(response.data);
							e.listData = e.listData.concat(response.data.rows);
							uni.hideLoading(); // 隐藏 loading
							this.$store.commit('setSeekInvest', e); // 更新setInvest
							this.goScrollTop(); // 页面触底之后调取loadMore方法，为了让用户再次调用此方法，需要自動将scroll向上滚动一些位置，这样下次滑动才会触发loadMore方法，详细需要看API
						},
						fail: (error) => {
							uni.hideLoading(); // 隐藏 loading
							uni.showToast({
								title: '网络繁忙，请稍后',
								icon: 'none',
								duration: 1000
							});
							console.log(error, '网络繁忙，请稍后');
						}
					});
				}
			}
	    }
	};
</script>

<style>
	.scroll-Y {
		height: 88vh;
		// #ifdef MP-WEIXIN || MP-TOUTIAO || MP-BAIDU || MP-ALIPAY
			padding-bottom: 400upx;
		// #endif
	}
	
	.scroll-view_H {
		white-space: nowrap;
		width: 100%;
	}
	
	.scroll-view-item {
		height: 88vh;
		line-height: 300upx;
		text-align: center;
		font-size: 36upx;
	}
	
	.scroll-view-item_H {
		display: inline-block;
		width: 100%;
		height: 300upx;
		line-height: 300upx;
		text-align: center;
		font-size: 36upx;
	}
	.loading-more {
		align-items: center;
		justify-content: center;
		padding-top: 20upx;
		padding-bottom: 40upx;
		text-align: center;
	}
	.loading-more-text {
		font-size: 28upx;
		color: #999;
	}
</style>
