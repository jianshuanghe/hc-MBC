<template>
	<view class="news-system" @tap="goToMessageList">
		<view class="system-img">
			<image :src='xiaoxo'></image>
		</view>
		<view class="system-notice">
			<view>系统通知<span>12:08</span></view>
			<view v-for="(item,index) in Innum.rows" v-if="index<1">{{item.content}}
				<view v-if="Listdata.noticeCount!=0">{{Listdata.noticeCount}}</view>
			</view>
		</view>
	</view>
</template>

<script>
	import xiaoxo from '@/static/mbcImg/news/xiaoxo.png';
	import { mapMutations,mapGetters } from 'vuex';
	export default {
		props: ['Innum'],
		data() {
			return {
				xiaoxo: xiaoxo,
				Listdata:[]
			};
		},
		computed: {
			
		},
		created() {
			this.getHeader();
		},
		methods: {
			goToMessageList(e) {
				// console.log(this.Inarr)
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
						url: this.api2 + '/user/760', //接口地址。
						// data: this.endParams(params),
						method: 'GET',
						header: {
							Authorization: "Bearer " + landRegistLG.token //将token放到请求头中
						},
						success: (response) => {
							console.log(response.data);
							this.Listdata=response.data.content
							console.log(this.Listdata,'this.Listdata----')
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
