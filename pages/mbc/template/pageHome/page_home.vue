<template>
	<view class="homeContent">
		<!-- 搜索 -->
		<homeSearch></homeSearch>
		<scroll-view :scroll-top="scrollTop" scroll-y="true" class="scroll-Y" @scrolltoupper="upper" @scrolltolower="loadMore"
		@scroll="scroll">
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
			searchCondition: {  // 分页属性
              page: '1',
              name: ''
            },
            pageNum: 0, // 数据总页数
            pageList: [] // 后台返回数据
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
	created() {
		console.log('在组件中并不能使用页面生命周期函数');
		this.getList();
	},
	mounted() {
		
	},
	methods: {
		...mapMutations({
			setFinanceListData: 'setFinanceListData'
		}),
		upper: function(e) {
			console.log(e)
		},
		loadMore: function() {
			console.log('触发加载更多。。。');
			 setTimeout(() => {
			    this.getMoreList();
			}, 500)
		},
		scroll: function(e) {
			console.log(e)
			this.old.scrollTop = e.detail.scrollTop
		},
		goTop: function(e) {
			// 解决view层不同步的问题
			this.scrollTop = this.old.scrollTop
			this.$nextTick(function() {
				this.scrollTop = 0
			});
			uni.showToast({
				icon:"none",
				title:"纵向滚动 scrollTop 值已被修改为 0"
			})
		},
		getList(){
			console.log('获取首页数据');
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
						this.pageList = response.data.rows; // 第一页返回的数据
						this.pageNum = this.this.pageNums(response.data.rows.total) // 总页数
						uni.hideLoading(); // 隐藏 loading
						this.$store.commit('setFinanceListData', this.pageList); // 更新setFinanceListData
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
		getMoreList(){
			this.searchCondition.page = String(parseInt(this.searchCondition.page) + 1);
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
						this.pageList = response.data.rows; // 第一页返回的数据
						this.pageNum = this.this.pageNums(response.data.rows.total) // 总页数
						uni.hideLoading(); // 隐藏 loading
						this.$store.commit('setFinanceListData', this.pageList); // 更新setFinanceListData
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
		height: 1300upx;
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
</style>
