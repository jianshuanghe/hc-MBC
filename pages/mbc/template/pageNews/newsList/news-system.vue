<template>
	<view class="news-system" @tap="goToMessageList">
		<view class="system-img">
			<image :src='xiaoxo'></image>
		</view>
		<view class="system-notice">
			<view>系统通知<span v-for="(items,index) in num" v-if="index<1" :key="index">{{items.createTime|formatDate}}</span></view>
			<view v-for="(item,index) in num" v-if="index<1" :key="index">{{item.content}}
				<view v-if="List.noticeCount !== 0">{{List.noticeCount}}</view>
			</view>
		</view>
	</view>
</template>

<script>
	import { mapMutations,mapGetters } from 'vuex';
	export default {
		data() {
			return {
				xiaoxo: this.Static + 'mbcImg/news/xiaoxo.png',
				Listdata:[],
				List:[],
				num:[]
				
			};
		},
		watch: {
			GET_MY: {
				handler(a, b) {
					console.log(a, b);
					this.List=a.MyList.header
					console.log(this.List)
				},
				deep: true
			},
			GET_NEWS: {
				handler(a, b) {
					console.log(a, b,'12312318498165449816149841644');
					this.num=a.newsList.rows
				},
				deep: true
			},
		},
		computed: {
			...mapGetters(['GET_MY','GET_NEWS'])
		},
		created() {
			this.getHeader();
			this.List = this.GET_MY.MyList.header;
			console.log(this.List, 'chuan');
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
		methods: {
			goToMessageList(e) {
				// console.log(this.Inarr)
				if (uni.getStorageSync('landRegist')) {
					let landRegistLG = JSON.parse(uni.getStorageSync('landRegist')); // 读取缓存的用户信息
					console.log(landRegistLG.user.id);
					// let params = {}; // 请求总数居时 参数为空
					uni.showLoading({ // 展示loading
						title: '加载中'
					});
					uni.request({
						url: this.api2 + '/noticeInfo/isRead?userId='+landRegistLG.user.id, //接口地址。
						// data: this.endParams(params),
						method: 'GET',
						header: {
							Authorization: "Bearer " + landRegistLG.token //将token放到请求头中
						},
						success: (response) => {
							console.log(response.data);
							uni.hideLoading();
							this.getHeader();
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
				let that = this;
				var navnum = JSON.stringify(that.Innum);
				uni.navigateTo({
					url: '/modules/pageNews/newsList/newsList?index=' + navnum,
				});
			},
			getHeader(){
				if (uni.getStorageSync('landRegist')) {
					let landRegistLG = JSON.parse(uni.getStorageSync('landRegist')); // 读取缓存的用户信息
					console.log(landRegistLG.user.id);
					// let params = {}; // 请求总数居时 参数为空
					uni.showLoading({ // 展示loading
						title: '加载中'
					});
					uni.request({
						url: this.api2 + '/user/' + landRegistLG.user.id, //接口地址。
						// data: this.endParams(params),
						method: 'GET',
						header: {
							Authorization: "Bearer " + landRegistLG.token //将token放到请求头中
						},
						success: (response) => {
							console.log(response.data);
							this.Listdata=response.data.content
							this.$store.commit('setheader', this.Listdata);
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
	}
</script>

<style>
	.news-system {
		width: 100%;
		height: 150upx;
		background: #FFFFFF;
		display: flex;
	}

	.newsContent {
		width: 100%;
		height: 100%;
	}

	.system-img {
		width: 90upx;
		height: 90upx;
		padding-top: 30upx;
		padding-left: 30upx;
	}

	.system-img image {
		width: 100%;
		height: 100%;
	}

	.system-notice {
		width: 80%;
		height: 90upx;
		padding-top: 30upx;
		padding-left: 30upx;
		position: relative;
	}

	.system-notice view:nth-of-type(1) {
		font-size: 32upx;
		color: #2E2E30;
		font-weight: 700;
	}

	.system-notice view:nth-of-type(1) span {
		font-size: 24upx;
		color: #BDBDBD;
		position: absolute;
		right: 24upx;
	}

	.system-notice view:nth-of-type(2) {
		font-size: 24upx;
		color: #BDBDBD;
		width: 500upx;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.system-notice view:nth-of-type(2) view {
		width: 36upx;
		height: 36upx;
		background: #FF3A2E;
		font-size: 26upx;
		color: #FFFFFF;
		position: absolute;
		right: 24upx;
		top: 82upx;
		border-radius: 50%;
		text-align: center;
		line-height: 36upx;
	}
</style>
