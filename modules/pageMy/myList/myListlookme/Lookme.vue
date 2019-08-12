<template>
	<view class="Lookme">
		<view class="Lookmefist" v-for="(item,index) in CollectionList">
			<view>
				<image :src="item.headImg"></image>
			</view>
			<view>
				<view>{{item.userName}}</view>
				<view class="LookmeLast">
					<span>{{item.compName}}</span>
					<span>{{item.compPosi}}</span>
				</view>
			</view>
			<view>
				{{item.createTime}}
			</view>
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
						url: this.api2 + '/user/lookUserList?userId=760', //接口地址。
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
	.Lookme {
		width: 100%;
		min-height: 100%;
		background: #FFFFFF;
	}
	
	.Lookmefist {
		width: 90%;
		height: 140upx;
		border-bottom: 2upx solid #F5F5F5;
		margin: 0 auto;
		display: flex;
		position: relative;
	}
	
	.Lookmefist view:nth-of-type(1) {
		width: 80upx;
		height: 80upx;
		border-radius: 50%;
		margin-top: 30upx;
	}
	
	.Lookmefist view:nth-of-type(1) image {
		width: 100%;
		height: 100%;
		border-radius: 50%;
	}
	
	.Lookmefist view:nth-of-type(2) {
		width: 400upx;
		height: 160upx;
		margin-top: 30upx;
		margin-left: 30upx;
	}
	
	.Lookmefist view:nth-of-type(2) view:nth-of-type(1) {
		width: 200upx;
		height: 50upx;
		font-size: 32upx;
		color: #2E2E30;
		margin-top: 0;
	}
	.LookmeLast{
		width: 200upx;
		height: 20upx;
		font-size: 24upx;
		color: #5D5D5D;
		top: 60upx;
		left:70upx;
		position: absolute;
		display: flex;
	}
	.LookmeLast span:nth-of-type(1){
		display: block;
		width: 120upx;
		height: 30upx;
		text-align: center;
		line-height: 30upx;
		border-right: 4upx solid #D2D2D2;
	}
	.LookmeLast span{
		display: block;
		width: 100upx;
		height: 30upx;
		text-align: center;
		line-height: 30upx;
	}
	.Lookmefist view:nth-of-type(3){
		margin-top: 30upx;
		font-size: 20upx;
		color: #9B9B9B;
		position: absolute;
		right: 0;
	}
</style>
