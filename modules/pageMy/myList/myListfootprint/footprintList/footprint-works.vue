<template>
	<view class="footprint-works">
		<scroll-view :scroll-top="scrollTop" scroll-y="true" class="scroll-Y" @scrolltoupper="upper" @scrolltolower="loadMore"
		@scroll="scroll">
			<view class="footprint-works-fist" v-for="(item,index) in List" :key="index" @tap="gotoxiangmuxiang(item.projId)">
				<view><image :src="item.projLogo"></image></view>
				<view>
					<span>{{item.projName}}</span>
					<span>{{item.fieldName}}</span>
				</view>
				<view>
					<span>￥{{item.finanMoney}}万</span>
					<span>融资轮次：{{item.levelName}}</span>
				</view>
			</view>
		</scroll-view>
		<view class="meirenkanwo" v-if="List!==undefined &&List.length==0">
			<image :src="kong" mode=""></image>
			您还没有足迹！
		</view>
	</view>
</template>

<script>
	import { mapMutations, mapGetters } from 'vuex';
	export default {
		data() {
			return {
				kong:this.Static + 'mbcImg/my/kong.png',
				List: [],
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
			...mapGetters(['GET_MY']),
		},
		created() {
			console.log('在组件中并不能使用页面生命周期函数');
			this.getConcang(this.active);
		},
		mounted() {},
		methods: {
			gotoxiangmuxiang(e){
				uni.navigateTo({
					url:'/modules/pageHome/homeList/FinancProject/FinancProject?id=' + e
				})
			},
			...mapMutations({
				setCollectionr: 'setCollection'
			}),
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
			getConcang(e) {
				if (uni.getStorageSync('landRegist')) {
					let landRegistLG = JSON.parse(uni.getStorageSync('landRegist')); // 读取缓存的用户信息
					console.log(landRegistLG.user.id);
					// let params = {}; // 请求总数居时 参数为空
					uni.showLoading({ // 展示loading
						title: '加载中'
					});
					uni.request({
						url: this.api2 + '/user/footprintList?userId='+landRegistLG.user.id+'&page='+this.searchCondition.page, //接口地址。
						// data: this.endParams(params),
						method: 'GET',
						header: {
							Authorization: "Bearer " + landRegistLG.token //将token放到请求头中
						},
						success: (response) => {
							console.log(response.data);
							this.List = response.data.rows;
							console.log(this.List)
							uni.hideLoading();
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
						url: this.api2 + '/user/footprintList?userId='+landRegistLG.user.id+'&page=' + e.search.searchCondition.page, //接口地址。
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
		}
	};
</script>

<style>
	.footprint-works{
		width: 100%;
		min-height: 100%;
	}
	.footprint-works-fist{
		width: 90%;
		height: 160upx;
		border-bottom: 2upx solid  #F5F5F5;
		margin: 0 auto;
		display: flex;
		position: relative;
	}
	.footprint-works-fist view:nth-of-type(1){
		width: 80upx;
		height: 80upx;
		margin-left: 0;
		padding-top: 40upx;
	}
	.footprint-works-fist view:nth-of-type(1) image{
		width: 100%;
		height: 100%;
	}
	.footprint-works-fist view:nth-of-type(2){
		position: absolute;
		width: 200upx;
		height: 80upx;
		left: 110upx;
		padding-top: 40upx;
		/* background: red; */
	}
	.footprint-works-fist span:nth-of-type(1){
		width: 300upx;
		font-size: 32upx;
		margin-top: -10upx;
		display: block;
	}
	.footprint-works-fist span:nth-of-type(2){
		/* position: absolute; */
		display: block;
		font-size: 24upx;
		color: #9B9B9B;
		margin-top: 0upx;
		border: 0;
	}
	.footprint-works-fist view:nth-of-type(3){
		position: absolute;
		width: 400upx;
		height:80upx ;
		padding-top: 40upx;
		text-align: right;
		right: 0upx;
	}
	.footprint-works-fist view:nth-of-type(3) span:nth-of-type(1){
		position: absolute;
		right: 0;
		font-size: 32upx;
		color: #FAB100;
	}
	.footprint-works-fist view:nth-of-type(3) span:nth-of-type(2){
		position: absolute;
		top: 90upx;
		right: 0;
		font-size: 24upx;
		color: #5D5D5D;
	}
	.meirenkanwo {
		width: 284upx;
		height: 280upx;
		display: block;
		margin: 120upx auto auto auto;
		font-size: 28upx;
		text-align: center;
		color: #9B9B9B;
	}
	
	.meirenkanwo image {
		width: 100%;
		height: 85%;
	}
</style>
