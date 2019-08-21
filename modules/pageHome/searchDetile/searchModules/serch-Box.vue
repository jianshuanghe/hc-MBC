<template>
	<view class="serchBox-content">
		<view class="serchBox">
			<view class="left sB-box">
				<view class="search_box">
					<view class="search-NI-img left">
						<image :src='search'></image>
					</view>
					<view class="search-NI-text left">
						<input 
						type="text" 
						class="left inputSearch" 
						focus 
						placeholder="项目、机构、活动" 
						v-model='searchText'
						@confirm="onSubmit"
						@blur="onFocus"
						@focus="onFocus"
						@input="onFocus"/>
					</view>
					<view class="searchClose left">
						<image :src='searchClose' @tap="clickClear"></image>
					</view>
					<view class="clear"></view>
				</view>
			</view>
			<view class="right cal-box">
				<view class="cl-text" @tap='onCancel'>取消</view>
			</view>
			<view class="clear"></view>
		</view>
	</view>
</template>

<script>
	import { mapMutations, mapGetters } from 'vuex';
	export default {
	    data () {
	      return {
	        value: '商机名称',
	        search: this.Static + 'mbcImg/common/search.png', 
			searchClose: this.Static + 'mbcImg/common/searchClose.png',
			results: '',
            searchText: '',
			searchHistoryData: [],
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
				this.searchText = a.HomeSearch.searchText;
				console.log(this.searchText);
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
			onFocus () {
				console.log('on focus');
			},
			onSubmit () {
				if (this.searchText === '') {
					uni.showToast({
						title: '搜索条件不能为空！',
						icon: 'none',
						duration: 1000
					});
				} else {
					this.getMultiple(); // 用户搜索获取接口数据
					console.log(this.searchText, '--------------------搜索内容----------------');
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
			clickClear () {
				console.log('清空');
				this.clearData();
				this.searchCondition = {  // 分页属性
					page: '1',
					name: '',
				}
			},
			onCancel () {
				console.log('on cancel');
				this.clearData();
				uni.navigateBack({
					delta: 1,
					animationType: 'pop-out',
					animationDuration: 200
				});
			},
			clearData () { // 清空数据
				this.searchText = '';
				this.$store.commit('setSearchText', this.searchText); // 搜索内容
				this.$store.commit('setSearchItemsIndex', 1); // 更新setSearchItemsIndex
				this.$store.commit('setIsSearch', false); // 用户不处于搜索状态
				let project = { // 项目
					listNum: 0, // 总数居
					loadingText: '查看更多',
					search: { // 搜索
						pageNum: 0, // 总页数
						searchCondition: {  // 分页属性
							page: '1'
						}
					},
					listData: '' // 列表数据
				};
				let investor = { // 投资人
					listNum: 0, // 总数居
					loadingText: '查看更多',
					search: { // 搜索
						pageNum: 0, // 总页数
						searchCondition: {  // 分页属性
							page: '1'
						}
					},
					listData: '' // 列表数据
				};
				let investen = { // 投资机构
					listNum: 0, // 总数居
					loadingText: '查看更多',
					search: { // 搜索
						pageNum: 0, // 总页数
						searchCondition: {  // 分页属性
							page: '1'
						}
					},
					listData: '' // 列表数据
				};
				let active = { // 资讯
					listNum: 0, // 总数居
					loadingText: '查看更多',
					search: { // 搜索
						pageNum: 0, // 总页数
						searchCondition: {  // 分页属性
							page: '1'
						}
					},
					listData: '' // 列表数据
				};
				this.$store.commit('setSeachProject', project); // 更新setSeachProject
				this.$store.commit('setSeachInvestor', investor); // 更新setSeachInvestor
				this.$store.commit('setSeachInvesten', investen); // 更新setSeachInvesten
				this.$store.commit('setSeachActive', active); // 更新setSeachActive
			}
	    }
	};
</script>

<style>
	.serchBox-content{
		position: fixed;
		width: 100%;
		padding: 30upx 0 20upx 0;
		z-index: 100;
		top: 0;
		background:#FFFFFF;;
	}
	.serchBox{
		position: relative;
		margin-left: 36upx;
		width: 339px;
		height: 60upx;
	}
	.sB-box{
		position: relative;
		width: 596upx;
	}
	.cal-box{
		position: relative;
		width: 80upx;
	}
	.cl-text{
		position: relative;
		text-align: right;
		font-family: PingFang-SC-Medium;
		font-size: 32upx;
		color: #2E2E30;
		letter-spacing: 0;
		text-align: center;
		line-height: 60upx;
	}
	.search_box{
	  position: relative;
	  width: 596upx;
	  background: #F6F6F6;
	  border-radius: 30upx;
	  height: 60upx;
	}
	.search-NI-img{
	  position: relative;
	  width: 60upx;
	}
	.search-NI-img>image{
	  width: 36upx;
	  height: 36upx;
	  margin-top: 12upx;
	  margin-left: 20upx;
	}
	.search-NI-text{
	  position: relative;
	  width: 468upx;
	  margin-left: 10upx;
	  height: 60upx;
	  line-height: 60upx;
	}
	.search-NI-text>p{
	  position: relative;
	  width: 100%;
	  ont-family: PingFangSC-Regular;
	  font-size: 24upx;
	  color: #BDBDBD;
	}
	.inputSearch{
	  line-height: 60upx;
	  height: 60upx;
	  /* margin-top: 0.8vw; */
	  width: 98%;
	  border: none;
	  outline: none;
	}
	.searchClose{
		position: relative;
		width: 56upx;
	}
	.searchClose>image{
		width: 44upx;
		height: 44upx;
		margin-top: 8upx;
		margin-left: 6upx;
	}
</style>
