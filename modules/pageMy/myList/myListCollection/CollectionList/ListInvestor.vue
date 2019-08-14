<template>
	<view class="ListInvestor">
		<view class="ListInvestorfist" v-for="(item,index) in CollectionList.rows" :key="index">
			<view>
				<image :src="item.headImg"></image>
			</view>
			<view>
				<view>{{item.userName}}</view>
				<view class="ListInvestorLast">
					<span>{{item.compName}}</span>
					<span>{{item.posiName}}</span>
				</view>
				<view class="ListInvestortrees">
					<span v-for=" items in ipaddrArray" :key="items">{{items}}</span>
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
	</view>
</template>

<script>
	import yong from '@/static/mbcImg/my/yong.png'
	import kong from '@/static/mbcImg/my/kong.png'
	import {
		mapMutations,
		mapGetters
	} from 'vuex';
	export default {
		data() {
			return {
				yong: yong,
				kong:kong,
				CollectionList: [],
				page: 1,
				picArr: []
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
						url: this.api2 + '/follow/userList?userId='+landRegistLG.user.id+'&page=' + this.page, //接口地址。
						// data: this.endParams(params),
						method: 'GET',
						header: {
							Authorization: "Bearer " + landRegistLG.token //将token放到请求头中
						},
						success: (response) => {
							uni.hideLoading();
							console.log(response.data);
							this.CollectionList = response.data;
							this.picArr = response.data.rows[0].fields
							console.log(this.picArr)
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
		width: 120upx;
		height: 30upx;
		text-align: center;
		line-height: 30upx;
		border-right: 4upx solid #D2D2D2;
	}

	.ListInvestorLast span {
		display: block;
		width: 100upx;
		height: 30upx;
		text-align: center;
		line-height: 30upx;
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
		height: 85%;
	}
</style>
