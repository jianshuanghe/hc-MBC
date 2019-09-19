<template>
	<view class="s"  v-if="GET_HOME.HomeSearch.investor.listData.length > 0">
		<view class="resule-modules-content">
			<!-- 总数居 -->
			<view class="resule-modules-num">投资人({{GET_HOME.HomeSearch.investor.listNum}})</view>
			<!-- 数据列表 -->
			<view class="S" v-if="clickItemsIndex !== 1">
				<view class="resule-modules-list" v-for="(items,index) in GET_HOME.HomeSearch.investor.listData" :key="index">
					<investorItems :msgData="items"></investorItems>
				</view>
				<view class="resule-modules-more" @tap="getMoreInvstorList(GET_HOME.HomeSearch.investor)">{{GET_HOME.HomeSearch.investor.loadingText}}</view>
			</view>
			<!-- 综合展示 -->
			<view class="M" v-if="clickItemsIndex === 1">
				<view class="resule-modules-list" v-for="(items,index) in GET_HOME.HomeSearch.investor.listData" :key="index">
					<investorItems :msgData="items" v-if='index < 3'></investorItems>
				</view>
				<view class="resule-modules-more" @tap="getMoreInvstorList(GET_HOME.HomeSearch.investor)">查看更多</view>
			</view>
		</view>
	</view>
	<empty v-else>抱歉，没有找到相关内容~</empty>
</template>

<script>
	import empty from "@/components/empty/empty.vue";
	import investorItems from "./investor/items.vue";
	import { mapMutations, mapGetters } from 'vuex';
	export default {
		data() {
			return {
				searchText: '', // 搜索的内容
				clickItemsIndex: 1 ,// 默认展示综合
				investor: { // 投资人
					listNum: 0, // 总数居
					loadingText: '查看更多',
					search: { // 搜索
						pageNum: 0, // 总页数
						searchCondition: {  // 分页属性
							page: '1'
						}
					},
					listData: '' // 列表数据
				}
			};
		},
		components: {
			investorItems,
			empty
		},
		computed: {
		  ...mapGetters(['GET_HOME'])
		},
		watch: {
			GET_HOME: {
				handler (a, b) {
					this.searchText = a.HomeSearch.searchText;
					this.investor = a.HomeSearch.investor;
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
				setSeachInvestor: 'setSeachInvestor',
				setSearchItemsIndex: 'setSearchItemsIndex'
			}),
			getMoreInvstorList(e) {
				console.log('搜索项目数据接口');
				this.$store.commit('setSearchItemsIndex', 3); // 更新setSearchItemsIndex
				if (e.loadingText === '已经没有数据了!') { // 禁止刷新接口
					return false
				};
				e.search.searchCondition.page = String(parseInt(e.search.searchCondition.page) + 1);
				let params = {
					userName: this.searchText
				}; 
				uni.showLoading({ // 展示loading
					title: '加载中'
				});
				uni.request({
					url: this.api2 + '/index/select/user?page=' + e.search.searchCondition.page, //接口地址。
					data: params,
					method: 'POST',
					header: {},
					success: (response) => {
						console.log(response.data);
						if (response.data.rows.length > 0) {
							e.listData = e.listData.concat(response.data.rows);
							e.listNum = response.data.total; // 总数居
							e.search.pageNum = this.pageNums(response.data.total) // 总页数
							console.log(response.data.total, e.search.pageNum);
							uni.hideLoading(); // 隐藏 loading
							this.$store.commit('setSeachInvestor', e); // 更新setSeachProject
						} else {
							e.loadingText = '已经没有数据了!';
							uni.hideLoading(); // 隐藏 loading
							uni.showToast({
								title: '已经没有数据了!',
								icon: 'none',
								duration: 1000
							});
							this.$store.commit('setSeachInvestor', e); // 更新setSeachProject
						}
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
	};
</script>

<style>
	.resule-modules-content{
		position: relative;
		width: 100%;
		background: #fff;
		margin-bottom: 20upx;
	}
	.resule-modules-num{
		position: relative;
		width: 690upx;
		margin-top: 26upx;
		background: #fff;
		margin: auto;
		text-align: left;
		font-family: PingFang-SC-Medium;
		font-size: 24upx;
		color: #5D5D5D;
		line-height: 24upx;
		padding-top: 28upx;
	}
	.resule-modules-more{
		font-family: PingFangSC-Regular;
		font-size: 26upx;
		text-align: center;
		color: #02C2A2;
		line-height: 70upx;
	}
</style>
