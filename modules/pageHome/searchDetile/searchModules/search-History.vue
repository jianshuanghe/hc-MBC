<template>
	<view class="searchHistory-content">
		<view class="searchHistory">
		  <view class="SH-cont">
			<view class="top-SH">
			  <p class="">热门推荐</p>
			</view>
			<view class="cont-SH">
			  <view class="search-Box-Sh">
				<view class="search-Items left" >
				  <p class="" @click="clickHistoryList">搜索名称1</p>
				</view>
				<view class="clear"></view>
			  </view>
			</view>
		  </view>
		</view>
		<view class="searchHistory">
		  <view class="SH-cont">
			<view class="top-SH">
			  <p class="">搜索历史</p>
			</view>
			<view class="cont-SH">
			  <view class="search-Box-Sh">
				<view class="search-Items left"  v-for="(items,index) in searchHistoryData" :key="index">
				  <p class="" @click="clickHistoryList(items)">{{items}}</p>
				</view>
				<view class="clear"></view>
			  </view>
			</view>
		  </view>
		  <view class="SH-clear" @click="clickRemoveHistory">
			<p class="">清除历史记录 </p>
		  </view>
		</view>
    </view>
</template>

<script>
	import { mapMutations, mapGetters } from 'vuex';
	export default {
	    data () {
	      return {
	        value: '商机名称',
			results: '',
	        searchText: '',
			searchHistoryData: [], // 用来盛放搜索的历史记录
	        project: { // 项目
				listNum: 0, // 总数居
	        	loadingText: '查看更多',
	        	search: { // 搜索
	        		pageNum: 0, // 总页数
	        		searchCondition: {  // 分页属性
	        			page: '1'
	        		}
	        	},
	        	listData: '' // 列表数据
	        },
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
			},
			investen: { // 投资机构
				listNum: 0, // 总数居
				loadingText: '查看更多',
				search: { // 搜索
					pageNum: 0, // 总页数
					searchCondition: {  // 分页属性
						page: '1'
					}
				},
				listData: '' // 列表数据
			},
			active: { // 资讯
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
		computed: {
		  ...mapGetters(['GET_HOME'])
		},
		watch: {
			GET_HOME: {
			  handler (a, b) {
				  this.searchHistoryData = a.HomeSearch.searchHistoryData
			  },
			  deep: true
			}
		},
		created() {
			if (uni.getStorageSync('searchHistoryData')) {
				this.searchHistoryData = JSON.parse(uni.getStorageSync('searchHistoryData'));
			}
		},
	    methods: {
			...mapMutations({
				setSearchText: 'setSearchText', // 搜索内容
				setIsSearch: 'setIsSearch', // 判断用户是否在搜索状态
				setSearchItemsIndex: 'setSearchItemsIndex', // 收索所在位置
				setSeachProject: 'setSeachProject',
				setSeachInvestor: 'setSeachInvestor',
				setSeachInvesten: 'setSeachInvesten',
				setSeachActive: 'setSeachActive',
				setSearchHistoryData: 'setSearchHistoryData' // 搜索的历史数据
			}),
			clickHistoryList (e) {
				this.searchText = e;
				if (this.searchText === '') {
					uni.showToast({
						title: '搜索条件不能为空！',
						icon: 'none',
						duration: 1000
					});
				} else {
					this.getMultiple(); // 用户搜索获取接口数据
					this.$store.commit('setSearchText', this.searchText); // 搜索内容
					this.$store.commit('setIsSearch', true); // 用户处于搜索状态
					this.setHistoryData();
				};
			},
			setHistoryData () {
				console.log('搜索的历史记录');
				if (uni.getStorageSync('searchHistoryData')) {
					this.searchHistoryData = JSON.parse(uni.getStorageSync('searchHistoryData'));
					this.searchHistoryData.push(this.searchText);
					this.$store.commit('setSearchHistoryData', Array.from(new Set(this.searchHistoryData)));
					uni.setStorageSync('searchHistoryData', JSON.stringify(Array.from(new Set(this.searchHistoryData))));// 搜索历史数据
				} else {
					this.searchHistoryData.push(this.searchText);
					this.$store.commit('setSearchHistoryData', Array.from(new Set(this.searchHistoryData)));
					uni.setStorageSync('searchHistoryData', JSON.stringify(Array.from(new Set(this.searchHistoryData))));// 搜索历史数据
				}
			},
			getMultiple () {
				console.log('搜索综合数据接口');
				this.getProjectList(this.project);
				this.getInvstorList(this.investor);
				this.getInvstenList(this.investen);
				this.getActive(this.active);
			},
			getProjectList(e) {
				console.log('搜索项目数据接口');
				if (uni.getStorageSync('landRegist')) {
				    let landRegistLG = JSON.parse(uni.getStorageSync('landRegist')); // 读取缓存的用户信息
				    console.log(landRegistLG.user.id);
					let params = {
						projName: this.searchText
					}; 
					uni.showLoading({ // 展示loading
						title: '加载中'
					});
					uni.request({
						url: this.api2 + '/index/select/proj?page=' + e.search.searchCondition.page, //接口地址。
						data: this.endParams(params),
						method: 'POST',
						header: {
							Authorization:"Bearer "+landRegistLG.token//将token放到请求头中
						},
						success: (response) => {
							console.log(response.data);
							e.listData = response.data.rows; // 第一页返回的数据
							e.listNum = response.data.total; // 总数居
							e.search.pageNum = this.pageNums(response.data.total) // 总页数
							console.log(response.data.total, e.search.pageNum);
							if (e.search.pageNum === 1) { // 总页数为1时，显示没有数据了
								e.loadingText = '已经没有数据了!';
							}
							uni.hideLoading(); // 隐藏 loading
							this.$store.commit('setSeachProject', e); // 更新setSeachProject
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
			getInvstorList(e) {
				console.log(e,'搜索投资人数据接口');
				if (uni.getStorageSync('landRegist')) {
				    let landRegistLG = JSON.parse(uni.getStorageSync('landRegist')); // 读取缓存的用户信息
				    console.log(landRegistLG.user.id);
					let params = {
						userName: this.searchText
					}; 
					uni.showLoading({ // 展示loading
						title: '加载中'
					});
					uni.request({
						url: this.api2 + '/index/select/user?page=' + e.search.searchCondition.page, //接口地址。
						data: this.endParams(params),
						method: 'POST',
						header: {
							Authorization:"Bearer "+landRegistLG.token//将token放到请求头中
						},
						success: (response) => {
							console.log(response.data);
							e.listData = response.data.rows; // 第一页返回的数据
							e.listNum = response.data.total; // 总数居
							e.search.pageNum = this.pageNums(response.data.total) // 总页数
							console.log(response.data.total, e.search.pageNum);
							if (e.search.pageNum === 1) { // 总页数为1时，显示没有数据了
								e.loadingText = '已经没有数据了!';
							}
							uni.hideLoading(); // 隐藏 loading
							this.$store.commit('setSeachInvestor', e); // 更新setSeachInvestor
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
			getInvstenList (e) {
				console.log(e, '搜索投资机构数据接口');
				if (uni.getStorageSync('landRegist')) {
				    let landRegistLG = JSON.parse(uni.getStorageSync('landRegist')); // 读取缓存的用户信息
				    console.log(landRegistLG.user.id);
					let params = {
						compName: this.searchText
					}; 
					uni.showLoading({ // 展示loading
						title: '加载中'
					});
					uni.request({
						url: this.api2 + '/index/select/capitalComp?page=' + e.search.searchCondition.page, //接口地址。
						data: this.endParams(params),
						method: 'POST',
						header: {
							Authorization:"Bearer "+landRegistLG.token//将token放到请求头中
						},
						success: (response) => {
							console.log(response.data);
							e.listData = response.data.rows; // 第一页返回的数据
							e.listNum = response.data.total; // 总数居
							e.search.pageNum = this.pageNums(response.data.total) // 总页数
							console.log(response.data.total, e.search.pageNum);
							if (e.search.pageNum === 1) { // 总页数为1时，显示没有数据了
								e.loadingText = '已经没有数据了!';
							}
							uni.hideLoading(); // 隐藏 loading
							this.$store.commit('setSeachInvesten', e); // 更新setSeachInvesten
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
			getActive (e) {
				console.log(e, '搜索资讯数据接口');
				if (uni.getStorageSync('landRegist')) {
				    let landRegistLG = JSON.parse(uni.getStorageSync('landRegist')); // 读取缓存的用户信息
				    console.log(landRegistLG.user.id);
					let params = {
						activityTitel: this.searchText
					}; 
					uni.showLoading({ // 展示loading
						title: '加载中'
					});
					uni.request({
						url: this.api2 + '/index/select/activity?page=' + e.search.searchCondition.page, //接口地址。
						data: this.endParams(params),
						method: 'POST',
						header: {
							Authorization:"Bearer "+landRegistLG.token//将token放到请求头中
						},
						success: (response) => {
							console.log(response.data);
							e.listData = response.data.rows; // 第一页返回的数据
							e.listNum = response.data.total; // 总数居
							e.search.pageNum = this.pageNums(response.data.total) // 总页数
							console.log(response.data.total, e.search.pageNum);
							if (e.search.pageNum === 1) { // 总页数为1时，显示没有数据了
								e.loadingText = '已经没有数据了!';
							}
							uni.hideLoading(); // 隐藏 loading
							this.$store.commit('setSeachActive', e); // 更新setSeachActive
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
			clickRemoveHistory () { // 清空历史数据
				this.searchHistoryData = [];
				this.$store.commit('setSearchHistoryData', this.searchHistoryData);
				uni.removeStorageSync('searchHistoryData');
			}
	    }
	};
</script>

<style>
	
.searchHistory-content{
  position: fixed;
  width: 100%;
  height: 94vh;
  padding-bottom: 5vh;
  overflow: scroll;
  -webkit-overflow-scrolling:touch;
  background: #fff;
}
  .searchHistory{
    position: relative;
    width: 100%;
  }
  .SH-cont{
    position: relative;
    width: 100%;
  }
  .top-SH{
    position: relative;
    width: 100%;
    padding: 4vw;
  }
  .top-SH>p{
    font-family: PingFang-SC-Medium;
    font-size: 4vw;
    color: #2E2E30;
    letter-spacing: 0;
    line-height: 4.5vw;
  }
  .cont-SH{
    position: relative;
    width: 100%;
    padding: 0vw 0 4vw 4vw;
  }
  .search-Box-Sh{
    position: relative;
    width: 100%;
  }
  .search-Items{
    position: relative;
    max-width: 96%;
    min-width: 15.8%;
    margin-right: 4vw;
    margin-bottom: 2vw;
    padding: 0 2vw;
    background: #F5F5F5;
  }
  .search-Items>p{
    background: #F5F5F5;
    font-family: PingFangSC-Regular;
    font-size: 3.2vw;
    color: #5D5D5D;
    letter-spacing: 0;
    text-align: center;
    line-height: 9vw;
    width: 100%;
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
  }
  .SH-clear{
    position: relative;
    width: 100%;
  }
  .SH-clear>p{
    font-family: PingFangSC-Regular;
    font-size: 3vw;
    color: #5D5D5D;
    letter-spacing: 0;
    text-align: center;
    line-height: 5vw;
  }
</style>
