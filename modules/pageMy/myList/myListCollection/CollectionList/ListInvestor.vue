<template>
	<view class="ListInvestor">
		<scroll-view :scroll-top="scrollTop" scroll-y="true" class="scroll-Y" @scrolltoupper="upper" @scrolltolower="loadMore"
		@scroll="scroll">
		<view class="ListInvestorfist" v-for="(item,index) in CollectionList.rows" :key="index" @tap="gototouziren(item.id)" @longpress="deleat(item.id)">
			<view>
				<image :src="item.headImg"></image>
			</view>
			<view>
				<view>{{item.userName}}</view>
				<view class="ListInvestorLast">
					<span v-if="item.compName!==''">{{item.compName}}</span>
					<span v-if="item.compName==''">无</span>
					<span v-if="item.posiName!==''">{{item.posiName}}</span>
					<span v-if="item.posiName==''">无</span>
				</view>
				<view class="ListInvestortrees">
					<span v-for="(items,index) in item.fields" :key="index">{{items}}</span>
				</view>
			</view>
			<view>
				中国·{{item.pCodeStr}}
			</view>
		</view>
		<view class="meirenkanwo" v-if="CollectionList.rows!==undefined &&CollectionList.rows.length==0">
			<image :src="kong" mode=""></image>
			您还没有收藏投资人！
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
	import {
		mapMutations,
		mapGetters
	} from 'vuex';
	export default {
		data() {
			return {
				kong:this.Static + 'mbcImg/my/kong1.png',
				CollectionList: [],
				hiden:true,
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
						type:1,
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
			gototouziren(e){
				uni.navigateTo({
					url:'/modules/pageHome/seekCapital/seekCapitalItems/investor/inverstorItems/itemsDetails/itemsDetails?userId=' + e
				})
			},
			...mapMutations({
				setCollectionr: 'setCollection'
			}),
			getConcang(e) {
				if (uni.getStorageSync('landRegist')) {
					let landRegistLG = JSON.parse(uni.getStorageSync('landRegist')); // 读取缓存的用户信息
					console.log(landRegistLG.user.id);
					// let params = {}; // 请求总数居时 参数为空
					uni.showLoading({ // 展示loading
						title: '加载中'
					});
					uni.request({
						url: this.api2 + '/follow/userList?userId='+landRegistLG.user.id+'&page=' + this.searchCondition.page, //接口地址。
						// data: this.endParams(params),
						method: 'GET',
						header: {
							Authorization: "Bearer " + landRegistLG.token //将token放到请求头中
						},
						success: (response) => {
							uni.hideLoading();
							console.log(response.data);
							this.CollectionList = response.data;
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
						url: this.api2 + '/follow/userList?userId='+landRegistLG.user.id+'&page=' + e.search.searchCondition.page, //接口地址。
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
		line-height: 92upx;
		border-top: 2upx solid  #F5F5F5;
		color: #02C2A2;
	}
	.ListInvestor {
		width: 100%;
		min-height: 100%;
		padding-top: 88upx;
	}

	.ListInvestorfist {
		width: 90%;
		height: 200upx;
		border-bottom: 2upx solid #F5F5F5;
		margin: 0 auto;
		display: flex;
		position: relative;
	}

	.ListInvestorfist view:nth-of-type(1) {
		width: 80upx;
		height: 80upx;
		border-radius: 50%;
		margin-top: 30upx;
	}

	.ListInvestorfist view:nth-of-type(1) image {
		width: 100%;
		height: 100%;
		border-radius: 50%;
	}

	.ListInvestorfist view:nth-of-type(2) {
		width: 400upx;
		height: 160upx;
		margin-top: 30upx;
		margin-left: 30upx;
	}

	.ListInvestorfist view:nth-of-type(2) view:nth-of-type(1) {
		width: 200upx;
		height: 50upx;
		font-size: 32upx;
		color: #2E2E30;
		margin-top: 0;
	}

	.ListInvestorLast {
		width: 200upx;
		height: 20upx;
		font-size: 24upx;
		color: #5D5D5D;
		top: 60upx;
		left: 70upx;
		position: absolute;
		display: flex;
	}

	.ListInvestorLast span:nth-of-type(1) {
		display: block;
		padding: 0 10upx;
		height: 30upx;
		line-height: 30upx;
		border-right: 4upx solid #D2D2D2;
	}

	.ListInvestorLast span:nth-of-type(2) {
		display: block;
		padding: 0 10upx;
		height: 30upx;
		line-height: 30upx;
		/* margin-left: 20upx; */
	}

	.ListInvestortrees {
		width: 600upx;
		height: 20upx;
		font-size: 20upx;
		color: #9B9B9B;
		top: 110upx;
		left: 90upx;
		position: absolute;
		display: flex;
	}

	.ListInvestortrees span {
		display: block;
		/* width: 300upx; */
		height: 30upx;
		text-align: center;
		line-height: 30upx;
		background: #F5F5F5;
		border-radius: 4upx;
		margin-left: 20upx;
		padding: 5upx 10upx 5upx 10upx;
		/* margin: 20upx; */
	}

	.ListInvestorfist view:nth-of-type(3) {
		margin-top: 30upx;
		font-size: 20upx;
		color: #9B9B9B;
		position: absolute;
		right: 0;
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
