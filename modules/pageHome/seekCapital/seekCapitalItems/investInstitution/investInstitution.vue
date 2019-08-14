
<template>
	<view class="listInvest">
		<scroll-view :scroll-top="scrollTop" scroll-y="true" class="scroll-Y" @scrolltoupper="upper" @scrolltolower="loadMore"
		@scroll="scroll">
			<view v-for="(items,index) in investInstitution.listData" :key="index" >
				<investInstitutionItems :msgData="items"></investInstitutionItems>
			</view>
			<view class="loading-more">
			    <text class="loading-more-text">{{loadingText}}</text>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	import investInstitutionItems from "./investInstitutionItems/investInstitution-items.vue";
	import { mapMutations, mapGetters } from 'vuex';
	export default {
	    data() {
	    	return {
				titleIndex: 1,
	    		scrollTop: 0,
	    		old: {
	    			scrollTop: 0
	    		},
	    		loadingText: '加载更多...',
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
	    		investInsSearch: { // 筛选结果 --- 投资项目参数
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
	    	investInstitutionItems
	    },
	    computed: {
	      ...mapGetters(['SEEKCAPITALTITLE'])
	    },
	    watch: {
	      SEEKCAPITALTITLE: {
	      	handler (a, b) {
	      		console.log(b, '切换的title11');
	      		this.titleIndex = a; // 切换的title
	      		this.goTop(); // 页面触底之后调取loadMore方法，为了让用户再次调用此方法，需要自動将scroll向上滚动一些位置，这样下次滑动才会触发loadMore方法，详细需要看API
	      	},
	      	deep: true
	      }
	    },
	    created() {
	    	console.log('在组件中并不能使用页面生命周期函数');
	    	this.getInvestMentList(this.investInstitution);
	    },
	    mounted() {
	    	
	    },
	    methods: {
	    	...mapMutations({
	    		setSeekInvestInstitution: 'setSeekInvestInstitution'
	    	}),
	    	upper: function(e) {
	    		console.log(e)
	    	},
	    	loadMore: function() {
	    		console.log('触发加载更多。。。');
	    		if (this.titleIndex === 2) { // 投资机构
	    			let pageNum = this.investInstitution.search.pageNum;
	    			let page = Number(this.investInstitution.search.searchCondition.page);
	    			console.log(pageNum, '总页数2');
	    			console.log(pageNum, '当前页数3');
	    			if (page < pageNum) { // 当前页数小于总页数时上啦加载数据
	    				setTimeout(() => {
	    					this.getInvestMentMoreList(this.investInstitution);
	    				}, 500)
	    			} else {
	    				this.loadingText = '已经没有数据了';
	    				this.investInstitution.loadingText = this.loadingText;
	    				this.$store.commit('setSeekInvestInstitution', this.investInstitution); // 更新setInvest
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
	    	getInvestMentList(e){
	    		console.log(e, '数显数据函数的参数');
	    		if (uni.getStorageSync('landRegist')) {
	    		    let landRegistLG = JSON.parse(uni.getStorageSync('landRegist')); // 读取缓存的用户信息
	    		    console.log(landRegistLG.user.id);
	    			let params = {}; // 请求总数居时 参数为空
	    			uni.showLoading({ // 展示loading
	    				title: '加载中'
	    			});
	    			let P = this.investInsSearch; // 投资项目参数
	    			uni.request({
	    				url: this.api2 + '/inve/list?type=1' + '&sortType=' + P.sortType + '&area=' + P.area + '&leves=' + P.leves + '&fields=' + P.fields + '&page=' + this.searchCondition.page, //接口地址。
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
	    					this.$store.commit('setSeekInvestInstitution', e); // 更新setInvest
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
	    	getInvestMentMoreList(e){
	    		console.log(e, '数显数据函数的参数More');
	    		e.search.searchCondition.page = String(parseInt(e.search.searchCondition.page) + 1);
	    		if (uni.getStorageSync('landRegist')) {
	    		    let landRegistLG = JSON.parse(uni.getStorageSync('landRegist')); // 读取缓存的用户信息
	    		    console.log(landRegistLG.user.id);
	    			let params = {}; // 请求总数居时 参数为空
	    			uni.showLoading({ // 展示loading
	    				title: '加载中'
	    			});
	    			let P = this.investInsSearch; // 投资项目参数
	    			uni.request({
	    				url: this.api2 + '/inve/list?type=1' + '&sortType=' + P.sortType + '&area=' + P.area + '&leves=' + P.leves + '&fields=' + P.fields + '&page=' + e.search.searchCondition.page, //接口地址。
	    				data: this.endParams(params),
	    				header: {
	    					Authorization:"Bearer "+landRegistLG.token//将token放到请求头中
	    				},
	    				success: (response) => {
	    					console.log(response.data);
	    					e.listData = e.listData.concat(response.data.rows);
	    					uni.hideLoading(); // 隐藏 loading
	    					this.$store.commit('setSeekInvestInstitution', e); // 更新setInvest
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
		height: 1162upx;
	}
	
	.scroll-view_H {
		white-space: nowrap;
		width: 100%;
	}
	
	.scroll-view-item {
		height: 1162upx;
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
