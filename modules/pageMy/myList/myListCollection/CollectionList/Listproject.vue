<template>
	<view class="Listproject">
		<scroll-view :scroll-top="scrollTop" scroll-y="true" class="scroll-Y" @scrolltoupper="upper" @scrolltolower="loadMore"
		@scroll="scroll">
		<view class="Listprojectfist" v-for="(item,index) in CollectionList.rows" :key="index" @tap="gotoxiangmuxiang(item.id)" @longpress="deleat(item.id)">
			<view><image :src="item.headImg"></image></view>
			<view>
				<span>{{item.title}}</span>
				<span>{{item.content}}</span>
			</view>
			<view>
				<span>￥{{item.money}}万</span>
				<span>融资轮次：{{item.levelCode}}</span>
			</view>
		</view>
		<view class="meirenkanwo" v-if="CollectionList.rows!==undefined &&CollectionList.rows.length==0">
			<image :src="kong" mode=""></image>
			您还没有项目！
		</view>
		</scroll-view>
		<view class="maske" :class="{'zhe':hiden}">
			<view class="maske-box">
				<view>提示</view>
				<view @tap="out">x</view>
				<view>是否删除?</view>
				<view @tap="queding">确定</view>
			</view>
		</view>
	</view>
</template>

<script>
	import { mapMutations, mapGetters } from 'vuex';
	export default {
		data() {
			return {
				kong:this.Static + 'mbcImg/my/kong1.png',
				hiden:true,
				id:'',
				CollectionList:[],
				// page:1,
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
			...mapGetters(['GET_MY'])
		},
		created() {
			console.log('在组件中并不能使用页面生命周期函数');
			this.getConcang(this.active);
		},
		mounted() {},
		methods: {
			deleat(e){
				this.hiden=false
				this.id=e
				console.log(this.id)
			},
			out(){
				this.hiden=true
			},
			queding(){
				if (uni.getStorageSync('landRegist')) {
					let landRegistLG = JSON.parse(uni.getStorageSync('landRegist')); // 读取缓存的用户信息
					console.log(landRegistLG.user.id);
					let params = {
						type:0,
						modelId:this.id,
						userId:landRegistLG.user.id
					}; // 请求总数居时 参数为空
					uni.showLoading({ // 展示loading
						title: '加载中'
					});
					uni.request({
						url: this.api2 + '/follow/del', //接口地址。
						data: this.endParams(params),
						method: 'POST',
						header: {
							Authorization: "Bearer " + landRegistLG.token //将token放到请求头中
						},
						success: (response) => {
							console.log(response.data);
							uni.hideLoading();
							this.getConcang(this.active);
							this.hiden=true
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
			gotoxiangmuxiang(e){
				uni.navigateTo({
					url:'/modules/pageHome/homeList/FinancProject/FinancProject?id=' + e
				})
			},
			...mapMutations({
				setCollectionr: 'setCollection'
			}),
			getConcang(e){
				if (uni.getStorageSync('landRegist')) {
					let landRegistLG = JSON.parse(uni.getStorageSync('landRegist')); // 读取缓存的用户信息
					console.log(landRegistLG.user.id);
					// let params = {}; // 请求总数居时 参数为空
					uni.showLoading({ // 展示loading
						title: '加载中'
					});
					uni.request({
						url: this.api2 + '/follow/proList?userId=' +landRegistLG.user.id +'&page=' + this.searchCondition.page, //接口地址。
						// data: this.endParams(params),
						method: 'GET',
						header: {
							Authorization: "Bearer " + landRegistLG.token //将token放到请求头中
						},
						success: (response) => {
							console.log(response.data);
							this.CollectionList=response.data;
							console.log(this.CollectionList)
							var shuju=response.data.rows
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
						url: this.api2 + '/follow/proList?userId=' +landRegistLG.user.id +'&page=' + e.search.searchCondition.page, //接口地址。
						data: this.endParams(params),
						method: 'POST',
						header: {
							Authorization:"Bearer "+landRegistLG.token//将token放到请求头中
						},
						success: (response) => {
							console.log(response.data);
							e.listData = e.listData.concat(response.data.rows);
							uni.hideLoading(); // 隐藏 loading
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
	.zhe {
		display: none;
	}
	.maske{
		position: fixed;
		top: 0upx;
		width: 100%;
		height: 100%;
		background: #000000;
		background-color: rgba(000, 000, 0, 0.2);
		z-index: 10;
	}
	.maske-box{
		width: 75%;
		height: 25%;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		position: absolute;
		margin: auto;
		background: #FFFFFF;
		border-radius: 10upx;
	}
	.maske-box>view:nth-of-type(1){
		width: 100upx;
		font-size: 40upx;
		margin: 0 auto;
		margin-top: 40upx;
		text-align: center;
	}
	.maske-box>view:nth-of-type(2){
		font-size: 40upx;
		position: absolute;
		right: 20upx;
		top: 0upx;
	}
	.maske-box>view:nth-of-type(3){
		width: 200upx;
		height: 50upx;
		font-size: 32upx;
		color:#5D5D5D;
		margin: 40upx auto;
		text-align: center;
	}
	.maske-box>view:nth-of-type(4){
		width: 100%;
		height: 40upx;
		font-size: 32upx;
		text-align: center;
		line-height: 60upx;
		border-top: 2upx solid  #F5F5F5;
		color: #02C2A2;
	}
	.Listproject{
		padding-top: 88upx;
		width: 100%;
		min-height: 100%;
	}
	.Listprojectfist{
		width: 90%;
		height: 160upx;
		border-bottom: 2upx solid  #F5F5F5;
		margin: 0 auto;
		display: flex;
		position: relative;
	}
	.Listprojectfist view:nth-of-type(1){
		width: 80upx;
		height: 80upx;
		margin-left: 0;
		padding-top: 40upx;
	}
	.Listprojectfist view:nth-of-type(1) image{
		width: 100%;
		height: 100%;
	}
	.Listprojectfist view:nth-of-type(2){
		position: absolute;
		width: 300upx;
		height: 80upx;
		left: 110upx;
		padding-top: 40upx;
		/* background: red; */
	}
	.Listprojectfist span:nth-of-type(1){
		font-size: 32upx;
		margin-top: -10upx;
		display: block;
	}
	.Listprojectfist span:nth-of-type(2){
		/* position: absolute; */
		display: block;
		font-size: 24upx;
		color: #9B9B9B;
		margin-top: 0upx;
		border: 0;
	}
	.Listprojectfist view:nth-of-type(3){
		position: absolute;
		width: 250upx;
		height:80upx ;
		padding-top: 40upx;
		text-align: right;
		right: 0;
	}
	.Listprojectfist view:nth-of-type(3) span:nth-of-type(1){
		font-size: 32upx;
		color: #FAB100;
	}
	.Listprojectfist view:nth-of-type(3) span:nth-of-type(2){
		font-size: 24upx;
		color: #5D5D5D;
	}
	.meirenkanwo{
		width: 284upx;
		height: 280upx;
		display: block;
		margin: 120upx auto auto auto;
		font-size: 28upx;
		text-align: center;
		color: #9B9B9B;
	}
	.meirenkanwo image{
		width: 100%;
		height: 80%;
	}
</style>
