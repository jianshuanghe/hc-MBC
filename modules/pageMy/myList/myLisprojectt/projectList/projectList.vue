<template>
	<view class="projectList-my">
		<scroll-view :scroll-top="scrollTop" scroll-y="true" class="scroll-Y" @scrolltoupper="upper" @scrolltolower="loadMore"
		@scroll="scroll">
		<view class="projectList-my-nei" v-for="(item,index) in active.listData" :key="index">
			<view class="projectList-my-one" @tap="gotoprojectdetails(item.id)" >
				<view><image :src="item.projLogo" mode=""></image></view>
				<view>
					<span>{{item.projName}}</span>
					<span>{{item.finanLevelCode}}</span>
					<span>资料完整度:{{item.projData}}</span>
				</view>
				<view>
					<view>编辑项目</view>
				</view>
			</view>
		</view>
		</scroll-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				arr:[],
				scrollTop: 0,
				old: {
					scrollTop: 0
				},
				loadingText: '加载更多...',
				active: { // 消息
					loadingText: '加载更多...',
					search: { // 搜索
						pageNum: 0, // 总页数
						searchCondition: {  // 分页属性
							page: '1'
						}
					},
					listData: '' // 列表数据
				},
				searchCondition: {  // 分页属性
				  page: '1',
				  name: ''
				},
			};
		},
		
		computed: {
		},
		created() {
			//详情列表
			this.xiangqing(this.active);
		},
		mounted() {
		},
		methods: {
			upper: function(e) {
				console.log(e)
			},
			loadMore: function() {
				console.log('触发加载更多。。。');
				let pageNum = this.active.search.pageNum;
				let page = Number(this.active.search.searchCondition.page);
				console.log(page, '当前页数1');
				console.log(pageNum, '总页数1');
				console.log(this.active, '头责任的加载更多，原始数据');
				if (page < pageNum) { // 当前页数小于总页数时上啦加载数据
					setTimeout(() => {
						this.getMoreList(this.active);
					}, 500)
				} else {
					this.loadingText = '已经没有数据了';
					this.active.loadingText = this.loadingText;
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
			xiangqing(e){
				console.log(123123132123131331313131131)
				if (uni.getStorageSync('landRegist')) {
					let landRegistLG = JSON.parse(uni.getStorageSync('landRegist')); // 读取缓存的用户信息
					console.log(landRegistLG.user.id);
					let params = {
						userId:760
					}; // 请求总数居时 参数为空
					uni.showLoading({ // 展示loading
						title: '加载中'
					});
					uni.request({
						url: this.api2 + '/proj/list?page='+ this.searchCondition.page, //接口地址。
						data: this.endParams(params),
						method: 'POST',
						header: {
							Authorization: "Bearer " + landRegistLG.token //将token放到请求头中
						},
						success: (response) => {
							uni.hideLoading();
							console.log(response.data);
							e.listData = response.data.rows; // 第一页返回的数据
							e.search.pageNum = this.pageNums(response.data.total) // 总页数
							// console.log(response.data.total, e.search.pageNum);
							if (e.search.pageNum === 1) { // 总页数为1时，显示没有数据了
								this.loadingText = '已经没有数据了';
								e.loadingText = '已经没有数据了!';
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
			},
			getMoreList(e){
				console.log(e, '数显数据函数的参数More');
				e.search.searchCondition.page = String(parseInt(e.search.searchCondition.page) + 1);
				if (uni.getStorageSync('landRegist')) {
				    let landRegistLG = JSON.parse(uni.getStorageSync('landRegist')); // 读取缓存的用户信息
				    console.log(landRegistLG.user.id);
					let params = {
						activityTitel:"",
						activityState:"2"
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
							uni.hideLoading(); // 隐藏 loading
							this.$store.commit('setActive', e); // 更新setActive
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
			gotoprojectdetails(e){
				console.log(e+'项目详情')
				uni.navigateTo({
				    url: '/modules/pageMy/myList/myLisprojectt/projectList/project-details/project-details?id='+e,
				});
			}
		}
	};
</script>

<style>
	.projectList-my{
		width: 100%;
		background: #FFFFFF;
		margin-top: 20upx;
	}
	.projectList-my-nei{
		width: 100%;
		height: 190upx;
	}
	.projectList-my-one{
		width: 90%;
		height: 100%;
		margin: 0 auto;
		border-bottom: 2upx solid #F5F5F5;
		display: flex;
	}
	.projectList-my-one view:nth-of-type(1){
		width: 84upx;
		height: 84upx;
		margin-top: 32upx;
		border-radius: 50%;
	}
	.projectList-my-one view:nth-of-type(1) image{
		width: 100%;
		height: 100%;
		border-radius: 50%;
	}
	.projectList-my-one view:nth-of-type(2){
		width: 60%;
		height: 70%;
		margin-top: 25upx;
		margin-left: 32upx;
	}
	.projectList-my-one view:nth-of-type(2) span:nth-of-type(1){
		font-size: 32upx;
		color: #2E2E30;
		font-weight: 700;
		display: block;
		margin-top: 0;
	}.projectList-my-one view:nth-of-type(2) span:nth-of-type(2){
		font-size: 24upx;
		color: #9B9B9B;
		display: block;
	}.projectList-my-one view:nth-of-type(2) span:nth-of-type(3){
		font-size: 24upx;
		color: #FF4D6A;
		display: block;
	}
	.projectList-my-one view:nth-of-type(3){
		width: 30%;
		height: 100%;
		position:relative;
	}
	.projectList-my-one view:nth-of-type(3) view:nth-of-type(1){
		width: 160upx;
		height: 60upx;
		border: 2upx solid #E2E2E2;
		border-radius: 30upx;
		position: absolute;
		text-align: center;
		line-height: 60upx;
		font-size: 28upx;
		color: #2E2E30;
		top: 0;
		left: 0;
		bottom: 0;
		right: 0;
		margin: auto;
	}
</style>
