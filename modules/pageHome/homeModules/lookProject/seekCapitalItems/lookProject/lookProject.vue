
<template>
	<view class="listInvest" v-if="list.listData">
		<view v-if="list.listData.length > 0">
			<scroll-view :scroll-top="scrollTop" scroll-y="true" class="scroll-Y" @scrolltoupper="upper" @scrolltolower="loadMore"
			@scroll="scroll">
				<view v-for="(items,index) in list.listData" :key="index" >
					<lookProjectItems :msgData="items"></lookProjectItems>
					<view class="line" v-if="list.listData.length - 1 > index"></view>
				</view>
				<view class="loading-more">
					<text class="loading-more-text">{{loadingText}}</text>
				</view>
			</scroll-view>
		</view>
		<empty v-else>抱歉，没有找到相关内容~</empty>
	</view>
</template>

<script>
	import lookProjectItems from "./lookProjectItems/finance-Items.vue";
	import empty from "@/components/empty/empty.vue";
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
				list: { // 投资人
					loadingText: '加载更多...',
					search: { // 搜索
						pageNum: 0, // 总页数
						searchCondition: {  // 分页属性
							page: '1'
						}
					},
					listData: '' // 列表数据
				},
				search: { // 筛选结果 --- 投资人参数
					order: '1', //0 时间排序 1 综合排序 2热度
					area: '', //  省份codelist
					leves: '', //  轮数idlist
					fields: '' // 领域 idlist
				},
				searchCondition: {  // 分页属性
				  page: '1',
				  name: ''
				},
				pageNum: 0, // 数据总页数
				pageList: [] ,// 后台返回数据
				items: { // 用户缓存用户行为的子项
				  id: 0, // id
				  doc: false, // 留言
				  find: false, // 查看
				  like: false, // 点赞
				  love: false // 收藏
				},
				clickRecordsArr: [] // 用户点击行为数组记录
			};
	    },
		components: {
			lookProjectItems,
			empty
		},
		computed: {
          ...mapGetters(['GET_HOME', 'LOOKPROJECTSEARCH', 'LOOKPROJECTSEARCHTYPE', 'AREADATA', 'FIELDDATA', 'LEVELDATA'])
        },
		watch: {
			GET_HOME: {
			  handler (a, b) {
			    this.list = a.homeModules.lookProject.list; // 获取vuex中的找项目
			  },
			  deep: true
			},
			LOOKPROJECTSEARCH: {
				handler (a, b) {
					console.log(a, '获取VUX的参数')
					this.search = a; // 接口参数
					this.getLookProjectList(this.list);
				},
				deep: true
			},
			LOOKPROJECTSEARCHTYPE: {
				handler (a, b) {
					this.resetFile();
				},
				deep: true
			}
        },
		created() {
			console.log('在组件中并不能使用页面生命周期函数');
			this.getLookProjectList(this.list);
			this.getClickRecordsArr(); // 获取缓冲的用户行为数据
		},
	    methods: {
			...mapMutations({
				setLookProjectDataList: 'setLookProjectDataList',
				setAreaData: 'setAreaData', // 公共组件省市区
				setFieldData: 'setFieldData', // 公共组件领域
				setLevelData: 'setLevelData', // 公共组件融资阶段
			}),
			getClickRecordsArr () { // 获取缓冲的用户行为数据
				if (uni.getStorageSync('clickRecordsArr')) {
			      this.clickRecordsArr = JSON.parse(uni.getStorageSync('clickRecordsArr')); // 获取缓存中的用户点击行为数组记录
				}
			},
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
				let pageNum = this.list.search.pageNum;
				let page = Number(this.list.search.searchCondition.page);
				console.log(page, '当前页数1');
				console.log(pageNum, '总页数1');
				console.log(this.list, '头责任的加载更多，原始数据');
				if (page < pageNum) { // 当前页数小于总页数时上啦加载数据
					setTimeout(() => {
						this.getLookProjectMoreList(this.list);
					}, 500)
				} else {
					this.loadingText = '已经没有数据了';
					this.list.loadingText = this.loadingText;
					this.$store.commit('setLookProjectDataList', this.list); // 更新setFinance
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
			getLookProjectList(e){
				console.log(e, '数显数据函数的参数');
				if (uni.getStorageSync('landRegist')) {
				    let landRegistLG = JSON.parse(uni.getStorageSync('landRegist')); // 读取缓存的用户信息
				    console.log(landRegistLG.user.id);
					let P = this.search; // 参数
					let params = {
						"fieldCode": P.fields,
						"finanLevelCode": P.leves,
						"pcode": P.area,
						"order": P.order,
						//desc 倒序  asc 正序
						"sort":"desc"
					}; // 请求总数居时 参数为空
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
							if (e.search.pageNum === 1) { // 总页数为1时，显示没有数据了
								this.loadingText = '已经没有数据了';
								e.loadingText = '已经没有数据了!';
							}
							uni.hideLoading(); // 隐藏 loading
							this.$store.commit('setLookProjectDataList', e); // 更新setInvest
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
			getLookProjectMoreList(e){
				console.log(e, '数显数据函数的参数More');
				e.search.searchCondition.page = String(parseInt(e.search.searchCondition.page) + 1);
				if (uni.getStorageSync('landRegist')) {
				    let landRegistLG = JSON.parse(uni.getStorageSync('landRegist')); // 读取缓存的用户信息
				    console.log(landRegistLG.user.id);
					let P = this.search; // 参数
					let params = {
						"fieldCode": P.fields,
						"finanLevelCode": P.leves,
						"pcode": P.area,
						"order": P.order,
						//desc 倒序  asc 正序
						"sort":"desc"
					}; // 请求总数居时 参数为空
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
							this.$store.commit('setLookProjectDataList', e); // 更新setInvest
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
		height: 94vh;
	}
	
	.scroll-view_H {
		white-space: nowrap;
		width: 100%;
	}
	
	.scroll-view-item {
		height: 94vh;
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
