<template>
	<view class="ListArticle">
		<view class="ListArticlefist" v-for="(item,index) in CollectionList" :key="index">
			<view>
				<view>{{item.title}}</view>
				<span class="ListArticlefist-times">{{item.createTime}}</span>
			</view>
			<view><image :src="item.headImg"></image></view>
		</view>
	</view>
</template>

<script>
	import yong from '@/static/mbcImg/my/yong.png'
	import {
		mapMutations,
		mapGetters
	} from 'vuex';
	export default {
		data() {
			return {
				yong: yong,
				CollectionList: [],
				page: 1,
			};
		},
		computed: {
			...mapGetters(['GET_MY']),
			ipaddrArray:function() {
				return this.picArr.split(';')
			}
		},
		created() {
			console.log('在组件中并不能使用页面生命周期函数');
			this.getConcang();
	
		},
		mounted() {},
		methods: {
			...mapMutations({
				setCollectionr: 'setCollection'
			}),
			getConcang() {
				if (uni.getStorageSync('landRegist')) {
					let landRegistLG = JSON.parse(uni.getStorageSync('landRegist')); // 读取缓存的用户信息
					console.log(landRegistLG.user.id);
					// let params = {}; // 请求总数居时 参数为空
					uni.showLoading({ // 展示loading
						title: '加载中'
					});
					uni.request({
						url: this.api2 + '/follow/newsList?userId=760&page=' + this.page, //接口地址。
						// data: this.endParams(params),
						method: 'GET',
						header: {
							Authorization: "Bearer " + landRegistLG.token //将token放到请求头中
						},
						success: (response) => {
							uni.hideLoading();
							console.log(response.data);
							this.CollectionList = response.data.rows;
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
	.ListArticle{
		padding-top: 88upx;
		width: 100%;
		min-height: 100%;
	}
	.ListArticlefist{
		width: 90%;
		height: 200upx;
		border-bottom: 2upx solid #F5F5F5;
		margin: 0 auto;
		display: flex;
		justify-content: space-between;
	}
	.ListArticlefist view:nth-of-type(1){
		width: 65%;
		height: 80%;
		margin-top: 20upx;
	}
	.ListArticlefist view:nth-of-type(1) view:nth-of-type(1){
		font-size: 30upx;
		width: 100%;
		height: 84upx;
		font-weight: 700;
		color: #2E2E30;
	}
	.ListArticlefist-times{
		font-size: 24upx;
		color: #9B9B9B;
		margin-top: 20upx;
		position: absolute;
	}
	.ListArticlefist view:nth-of-type(2){
		width: 30%;
		height: 80%;
		margin-top: 20upx;
		border-radius: 4upx;
		background: pink;
	}
	.ListArticlefist view:nth-of-type(2) image{
		width: 100%;
		height: 100%;
		border-radius: 4upx;
	}
</style>
