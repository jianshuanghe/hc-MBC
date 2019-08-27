<template>
	<view class="homeContent">
		<!-- 搜索 -->
		<homeSearch></homeSearch>
		<scroll-view :scroll-top="scrollTop" scroll-y="true" class="scroll-Y" @scrolltoupper="upper" @scrolltolower="loadMore"
		@scroll="scroll">
			<view class="scrollContent">
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
			<view class="loading-more" v-if="clickItemsIndex === 1 && HomeList.finance.listData.length > 0">
			    <text class="loading-more-text">{{loadingText}}</text>
			</view>
			<view class="loading-more"  v-if="clickItemsIndex === 2 && HomeList.invest.listData.length > 0">
			    <text class="loading-more-text">{{loadingText}}</text>
			</view>
		</scroll-view>
	</view>
</template>
<script>
import homeSearch from "./homeList/home-search.vue";
import homeBanner from "./homeList/home-banner.vue";
import homeTt from "./homeList/home-tt.vue";
import homePutInSeek from "./homeList/home-putInSeek.vue";
import homeModules from "./homeList/home-modules.vue";
import homeList from "./homeList/home-list.vue";
import { mapMutations, mapGetters } from 'vuex';
export default {
	data() {
		return {
			scrollTop: 0,
			old: {
				scrollTop: 0
			},
			loadingText: '加载更多...',
			clickItemsIndex: 1,
			HomeList:{
				titleIndex: 1, // 切换的title
				finance: {
					loadingText: '加载更多...',
					search: { // 搜索
						pageNum: 0, // 总页数
						searchCondition: {  // 分页属性
							page: '1'
						}
					},
					listData: '' // 主页在融项目列表数据
				},
				invest: {
					loadingText: '加载更多...',
					search: { // 搜索
						pageNum: 0, // 总页数
						searchCondition: {  // 分页属性
							page: '1'
						}
					},
					listData: '' // 主页投资机构列表数据
				}
			},
			paramsList: {}, // 切换title，数显数据函数的参数
			searchCondition: {  // 分页属性
              page: '1',
              name: ''
            },
            pageNum: 0, // 数据总页数
            pageList: [], // 后台返回数据
			items: { // 用户缓存用户行为的子项 ------项目
              id: 0, // id
			  doc: false, // 留言
              find: false, // 查看
              like: false, // 点赞
              love: false // 收藏
            },
            clickRecordsArr: [] ,// 用户点击行为数组记录 ----项目
			itemsInv: { // 记录用户收藏功能 ----投资人
				userId: 0, // id
				love: false // 收藏
			},
			clickRecordsInvArr: [] // 记录用户收藏行为 ----投资人
		};
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
		...mapGetters(['GET_HOME'])
	},
	watch: {
		GET_HOME: {
			handler (a, b) {
				this.HomeList = a.HomeList; // 切换的title
				if (this.HomeList.titleIndex === 2) {
					this.paramsList = this.HomeList.invest; // 参数为投资机构 
					this.loadingText = this.HomeList.invest.loadingText; // 底部加载提示显示
				} else {
					this.paramsList = this.HomeList.finance; // 参数为在融项目模块 
					this.loadingText = this.HomeList.invest.loadingText; // 底部加载提示显示
				}
			},
			deep: true
		}
	},
	created() {
		console.log('在组件中并不能使用页面生命周期函数');
		this.getFinanceList(this.HomeList.finance); // 首页初始化时，默认显示在融项目，参数为在融项目模块
		this.getInvestList(this.HomeList.invest);
		this.getClickRecordsArr(); // 获取缓冲的用户行为数据
	},
	mounted() {
		
	},
	methods: {
		...mapMutations({
			setFinance: 'setFinance',
			setInvest: 'setInvest'
		}),
		getClickRecordsArr () { // 获取缓冲的用户行为数据
			// 项目
			if (uni.getStorageSync('clickRecordsArr')) {
              this.clickRecordsArr = JSON.parse(uni.getStorageSync('clickRecordsArr')); // 获取缓存中的用户点击行为数组记录
			}
			// 投资人
			if (uni.getStorageSync('clickRecordsInvArr')) {
			  this.clickRecordsInvArr = JSON.parse(uni.getStorageSync('clickRecordsInvArr')); // 获取缓存中的用户点击行为数组记录
			}
		},
		upper: function(e) {
			console.log(e)
		},
		loadMore: function() {
			console.log('触发加载更多。。。');
			if(this.HomeList.titleIndex === 1){ // 在融项目
				let pageNum = this.paramsList.search.pageNum;
				let page = Number(this.paramsList.search.searchCondition.page);
				console.log(pageNum, '总页数');
				console.log(pageNum, '当前页数');
				if (page < pageNum) { // 当前页数小于总页数时上啦加载数据
					setTimeout(() => {
						this.getFinanceMoreList(this.paramsList);
					}, 500)
				} else {
					this.loadingText = '已经没有数据了';
					this.paramsList.loadingText = this.loadingText;
					this.$store.commit('setFinance', this.paramsList); // 更新setFinance
					uni.showToast({
						title: '已经没有数据了！',
						icon: 'none',
						duration: 1000
					});
				}
			} else if (this.HomeList.titleIndex === 2) {
				let pageNum = this.paramsList.search.pageNum;
				let page = Number(this.paramsList.search.searchCondition.page);
				console.log(pageNum, '总页数');
				console.log(pageNum, '当前页数');
				if (page < pageNum) { // 当前页数小于总页数时上啦加载数据
					setTimeout(() => {
						this.getInvestMoreList(this.paramsList);
					}, 500)
				} else {
					this.loadingText = '已经没有数据了';
					this.paramsList.loadingText = this.loadingText;
					this.$store.commit('setInvest', this.paramsList); // 更新setInvest
					uni.showToast({
						title: '已经没有数据了！',
						icon: 'none',
						duration: 1000
					});
				}
			}
			 
		},
		scroll: function(e) {
			console.log(e)
			this.old.scrollTop = e.detail.scrollTop
		},
		goScrollTop: function(e) {
			// 解决view层不同步的问题
			this.scrollTop = this.old.scrollTop;
			console.log(this.scrollTop - 5);
			this.$nextTick(function() {
				this.scrollTop = Number(this.scrollTop - 5)
			});
		},
		getFinanceList(e){
			console.log(e, '数显数据函数的参数');
			if (uni.getStorageSync('landRegist')) {
			    let landRegistLG = JSON.parse(uni.getStorageSync('landRegist')); // 读取缓存的用户信息
			    console.log(landRegistLG.user.id);
				let params = {}; // 请求总数居时 参数为空
				uni.showLoading({ // 展示loading
					title: '加载中'
				});
				uni.request({
					url: this.api2 + '/proj/list?page=' + this.searchCondition.page, //接口地址。
					data: this.endParams(params),
					method: 'POST',
					header: {
						Authorization:"Bearer "+landRegistLG.token//将token放到请求头中
					},
					success: (response) => {
						console.log(response.data);
						e.listData = response.data.rows; // 第一页返回的数据
						let pageList = [...response.data.rows];
						if (this.clickRecordsArr.length < this.pageList.length) { // 缓存中的数据小于缓存的
							console.log('缓存中的数据小于缓存的');
							for (let i = 0; i < this.pageList.length; i++) { // 用户行为数据
								console.log(this.pageList[i]);
									let items = { // 用户缓存用户行为的子项
										id: 0, // id
										doc: false, // 留言
										find: false, // 查看
										like: false, // 点赞
										love: false // 收藏
									};
								items.id = this.pageList[i].id; // 赋值id
								this.clickRecordsArr.push(items);
								console.log(this.clickRecordsArr, '用户行为数据');
							}
							uni.setStorageSync('clickRecordsArr', JSON.stringify(this.clickRecordsArr));// 缓存用户点击行为数组记录
						} else if (this.clickRecordsArr.length >= this.pageList.length) { // 缓存中的数据大于等于接口每次返回的数据
							console.log('缓存中的数据大于等于接口每次返回的数据');
							this.clickRecordsArr.map((item, index) => {
								console.log(item.id, '打印缓存中的id');
								pageList.map((item1, index) => {
									if (item1) {
										console.log(item1.id, '打印接口中的id');
										if (item1.id === item.id) { // 二次校验，如果缓存中的存在该id，则不需要再次缓存，之缓存不存在的
											pageList.splice(index, 1); // 将接口返回的数据去重
										}
									};
								});
								console.log(pageList, '去重后的数据');
							});
							if (pageList.length > 0) {
								console.log('去重后剩余数据');
								pageList.map((item, index) => {
									let items = { // 用户缓存用户行为的子项
										id: 0, // id
										doc: false, // 留言
										find: false, // 查看
										like: false, // 点赞
										love: false // 收藏
									};
									items.id = item.id; // 赋值id
									this.clickRecordsArr.push(items);
									uni.setStorageSync('clickRecordsArr', JSON.stringify(this.clickRecordsArr));// 缓存用户点击行为数组记录
								});
							}
						}
						e.search.pageNum = this.pageNums(response.data.total) // 总页数
						console.log(response.data.total, e.search.pageNum);
						uni.hideLoading(); // 隐藏 loading
						if (e.search.pageNum === 1) {
							this.loadingText = '已经没有数据了！';
						}
						this.$store.commit('setFinance', e); // 更新setFinance
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
		getFinanceMoreList(e){
			console.log(e, '数显数据函数的参数More');
			e.search.searchCondition.page = String(parseInt(e.search.searchCondition.page) + 1);
			if (uni.getStorageSync('landRegist')) {
			    let landRegistLG = JSON.parse(uni.getStorageSync('landRegist')); // 读取缓存的用户信息
			    console.log(landRegistLG.user.id);
				let params = {}; // 请求总数居时 参数为空
				uni.showLoading({ // 展示loading
					title: '加载中'
				});
				uni.request({
					url: this.api2 + '/proj/list?page=' + e.search.searchCondition.page, //接口地址。
					data: this.endParams(params),
					method: 'POST',
					header: {
						Authorization:"Bearer "+landRegistLG.token//将token放到请求头中
					},
					success: (response) => {
						console.log(response.data);
						e.listData = e.listData.concat(response.data.rows);
						let pageList = [...response.data.rows];
						console.log('缓存中的数据大于等于接口每次返回的数据');
						this.clickRecordsArr.map((item, index) => {
							console.log(item.id, '打印缓存中的id');
							pageList.map((item1, index) => {
								if (item1) {
									console.log(item1.instId, '打印接口中的id');
									if (item1.id === item.id) { // 二次校验，如果缓存中的存在该id，则不需要再次缓存，之缓存不存在的
										pageList.splice(index, 1); // 将接口返回的数据去重
									}
								};
							});
							console.log(pageList, '去重后的数据');
						  });
						  if (pageList.length > 0) {
							console.log(pageList, '去重后剩余数据');
							pageList.map((item, index) => {
								let items = { // 用户缓存用户行为的子项
									id: 0, // id
									doc: false, // 留言
									find: false, // 查看
									like: false, // 点赞
									love: false // 收藏
								};
								items.id = item.id; // 赋值id
								this.clickRecordsArr.push(items);
								uni.setStorageSync('clickRecordsArr', JSON.stringify(this.clickRecordsArr));// 缓存用户点击行为数组记录
							});
						}
						uni.hideLoading(); // 隐藏 loading
						this.$store.commit('setFinance', e); // 更新setFinance
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
				uni.request({
					url: this.api2 + '/inve/list?type=0&sortType=ID&area=&leves=&fields=&page=' + this.searchCondition.page, //接口地址。
					data: this.endParams(params),
					header: {
						Authorization:"Bearer "+landRegistLG.token//将token放到请求头中
					},
					success: (response) => {
						console.log(response.data);
						e.listData = response.data.rows; // 第一页返回的数据
						let pageList = [...response.data.rows];
						if (this.clickRecordsArr.length < this.pageList.length) { // 缓存中的数据小于缓存的
							console.log('缓存中的数据小于缓存的');
							for (let i = 0; i < this.pageList.length; i++) { // 用户行为数据
								console.log(this.pageList[i]);
									let itemsInv = { // 用户缓存用户行为的子项
										userId: 0, // id
										love: false // 收藏
									};
								itemsInv.userId = this.pageList[i].userId; // 赋值id
								this.clickRecordsInvArr.push(itemsInv);
								console.log(this.clickRecordsInvArr, '用户行为数据');
							}
							uni.setStorageSync('clickRecordsInvArr', JSON.stringify(this.clickRecordsInvArr));// 缓存用户点击行为数组记录
						} else if (this.clickRecordsInvArr.length >= this.pageList.length) { // 缓存中的数据大于等于接口每次返回的数据
							console.log('缓存中的数据大于等于接口每次返回的数据');
							this.clickRecordsInvArr.map((item, index) => {
								console.log(item.userId, '打印缓存中的id');
								pageList.map((item1, index) => {
									if (item1) {
										console.log(item1.userId, '打印接口中的id');
										if (item1.userId === item.userId) { // 二次校验，如果缓存中的存在该id，则不需要再次缓存，之缓存不存在的
											pageList.splice(index, 1); // 将接口返回的数据去重
										}
									};
								});
								console.log(pageList, '去重后的数据');
							});
							if (pageList.length > 0) {
								console.log('去重后剩余数据');
								pageList.map((item, index) => {
									let itemsInv = { // 用户缓存用户行为的子项
										userId: 0, // id
										love: false // 收藏
									};
									itemsInv.userId = item.userId; // 赋值id
									this.clickRecordsInvArr.push(itemsInv);
									uni.setStorageSync('clickRecordsInvArr', JSON.stringify(this.clickRecordsInvArr));// 缓存用户点击行为数组记录
								});
							}
						}
						e.search.pageNum = this.pageNums(response.data.total) // 总页数
						console.log(response.data.total, e.search.pageNum);
						uni.hideLoading(); // 隐藏 loading
						if (e.search.pageNum === 1) {
							this.loadingText = '已经没有数据了！';
						}
						this.$store.commit('setInvest', e); // 更新setInvest
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
				uni.request({
					url: this.api2 + '/inve/list?type=0&sortType=ID&area=&leves=&fields=&page=' + e.search.searchCondition.page, //接口地址。
					data: this.endParams(params),
					header: {
						Authorization:"Bearer "+landRegistLG.token//将token放到请求头中
					},
					success: (response) => {
						console.log(response.data);
						e.listData = e.listData.concat(response.data.rows);
						let pageList = [...response.data.rows];
						console.log('缓存中的数据大于等于接口每次返回的数据');
						this.clickRecordsInvArr.map((item, index) => {
							console.log(item.userId, '打印缓存中的id');
							pageList.map((item1, index) => {
								if (item1) {
									console.log(item1.instId, '打印接口中的id');
									if (item1.userId === item.userId) { // 二次校验，如果缓存中的存在该id，则不需要再次缓存，之缓存不存在的
										pageList.splice(index, 1); // 将接口返回的数据去重
									}
								};
							});
							console.log(pageList, '去重后的数据');
						  });
						  if (pageList.length > 0) {
							console.log(pageList, '去重后剩余数据');
							pageList.map((item, index) => {
								let itemsInv = { // 用户缓存用户行为的子项
									userId: 0, // id
									love: false // 收藏
								};
								itemsInv.userId = item.userId; // 赋值id
								this.clickRecordsInvArr.push(itemsInv);
								uni.setStorageSync('clickRecordsInvArr', JSON.stringify(this.clickRecordsInvArr));// 缓存用户点击行为数组记录
							});
						}
						uni.hideLoading(); // 隐藏 loading
						this.$store.commit('setInvest', e); // 更新setInvest
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
.scroll-Y {
		height: 100vh;
		padding-bottom: 100upx;
	}

	.scroll-view_H {
		white-space: nowrap;
		width: 100%;
	}

	.scroll-view-item {
		height: 1300upx;
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
        padding-top: 10px;
        padding-bottom: 10px;
        text-align: center;
    }
    .loading-more-text {
        font-size: 28upx;
        color: #999;
    }
</style>
