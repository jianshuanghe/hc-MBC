<template>
	<div class="k">
		<view class="Message" v-if="active.listData.length > 0">
			<scroll-view :scroll-top="scrollTop" scroll-y="true" class="scroll-Y" @scrolltoupper="upper" @scrolltolower="loadMore"
			@scroll="scroll">
				<view class="Message-Tips" v-for="(item,index) in active.listData" :key="index" @longpress="deleat(item.id)">
					<view>{{item.title}}<span>{{item.createTime|formatDate}}</span></view>
					<view>{{item.content}}</view>
				</view>
				<view class="maske" :class="{'zhe':hiden}">
					<view class="maske-box">
						<view>提示</view>
						<view @tap="out">x</view>
						<view>是否删除?</view>
						<view @tap="queding">确定</view>
					</view>
				</view>
			</scroll-view>
		</view>
		<empty v-else>抱歉，没有消息！</empty>
	</div>
</template>

<script>
	import { mapMutations, mapGetters } from 'vuex';
	import empty from "@/components/empty/empty.vue";
	export default {
		data () {
			return {
				hiden:true,
				Listdata:[],
				arr:[],
				id:'',
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
		created() {
			// 重新定义消息的参数 目的是方便消息列表上啦刷新S
			let active = { // 消息
				loadingText: '加载更多...',
				search: { // 搜索
					pageNum: 0, // 总页数
					searchCondition: {  // 分页属性
						page: '1'
					}
				},
				listData: '' // 列表数据
			}
			this.$store.commit('setNewsDate', active);
			// 重新定义消息的参数 目的是方便消息列表上啦刷新E
			this.news(this.active);
		},
		components: {
			empty
		},
		computed: {
		  ...mapGetters(['GET_NEWS'])
		},
		watch: {
		  GET_NEWS: {
		    handler (a, b) {
		      this.active = a.newsData; // 侦听消息
		    },
		    deep: true
		  }
		},
		methods:{
			...mapMutations({
				setNewsDate: 'setNewsDate'
			}),
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
					uni.showLoading({ // 展示loading
						title: '加载中'
					});
					uni.request({
						url: this.api2 + '/noticeInfo/delByIds?ids='+this.id, //接口地址。
						// data: this.endParams(params),
						method: 'GET',
						header: {
							Authorization: "Bearer " + landRegistLG.token //将token放到请求头中
						},
						success: (response) => {
							console.log(response.data);
							uni.hideLoading();
							let arr = this.active;
							for( let i in arr.listData) {
								if (this.id === arr.listData[i].id) {
									arr.listData.splice(i, 1)
								}
							}
							this.$store.commit('setNewsDate', arr);
							this.hiden=true;
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
			news(e){
				if (uni.getStorageSync('landRegist')) {
					let landRegistLG = JSON.parse(uni.getStorageSync('landRegist')); // 读取缓存的用户信息
					console.log(landRegistLG.user.id);
					// let params = {}; // 请求总数居时 参数为空
					uni.showLoading({ // 展示loading
						title: '加载中'
					});
					uni.request({
						url: this.api2 + '/noticeInfo/list?userId='+landRegistLG.user.id +'&page=' + this.searchCondition.page, //接口地址。
						// data: this.endParams(params),
						method: 'GET',
						header: {
							Authorization: "Bearer " + landRegistLG.token //将token放到请求头中
						},
						success: (response) => {
							uni.hideLoading();
							console.log(response.data);
							// this.Listdata=response.data.rows
							e.listData = response.data.rows; // 第一页返回的数据
							e.search.pageNum = this.pageNums(response.data.total) // 总页数
							console.log(response.data.total, e.search.pageNum);
							if (e.search.pageNum === 1) { // 总页数为1时，显示没有数据了
								this.loadingText = '已经没有数据了';
								e.loadingText = '已经没有数据了!';
							};
							this.$store.commit('setNewsDate', e);
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
						url: this.api2 + '/noticeInfo/list?userId='+landRegistLG.user.id +'&page=' + e.search.searchCondition.page, //接口地址。
						data: this.endParams(params),
						method: 'POST',
						header: {
							Authorization:"Bearer "+landRegistLG.token//将token放到请求头中
						},
						success: (response) => {
							console.log(response.data);
							e.listData = e.listData.concat(response.data.rows);
							uni.hideLoading(); // 隐藏 loading
							this.$store.commit('setNewsDate', e);
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
		},
		filters: {
			formatDate: function(value) {
				let date = new Date(value);
				let y = date.getFullYear();
				let MM = date.getMonth() + 1;
				MM = MM < 10 ? ('0' + MM) : MM;
				let d = date.getDate();
				d = d < 10 ? ('0' + d) : d;
				let h = date.getHours();
				h = h < 10 ? ('0' + h) : h;
				let m = date.getMinutes();
				m = m < 10 ? ('0' + m) : m;
				let s = date.getSeconds();
				s = s < 10 ? ('0' + s) : s;
				return h + ':' + m ;
			},
		},
	}
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
		height: 26%;
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
		line-height: 40upx;
		border-top: 2upx solid  #F5F5F5;
		color: #02C2A2;
	}
	.Message{
		width: 100%;
		height: 100%;
		background: #FFFFFF;
	}
	.Message-Tips{
		width: 100%;
		min-height: 208upx;
		border-bottom: 2upx solid  #F5F5F5;
		/* position: relative; */
		padding-bottom: 20upx;
	}
	.Message-Tips view:nth-of-type(1){
		font-size: 30upx;
		color: #2E2E30;
		font-weight:700 ;
		padding-top: 40upx;
		padding-left: 30upx;
	}
	.Message-Tips view:nth-of-type(1) span{
		font-size: 24upx;
		color: #BDBDBD;
		position: absolute;
		right: 30upx;
		font-weight: 0;
	}
	.Message-Tips view:nth-of-type(2){
		width: 690upx;
		min-height: 50upx;
		font-size: 26upx;
		color: #9B9B9B;
		padding-top: 10upx;
		padding-left: 30upx;
	}
</style>