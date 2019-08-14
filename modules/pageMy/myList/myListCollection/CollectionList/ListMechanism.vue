<template>
	<view class="ListMechanism">
		<view class="ListMechanismfist" v-for="(items,index) in List.rows" :key="index">
			<view>
				<image :src="items.headImg"></image>
			</view>
			<view>
				<view>{{items.title}}</view>
				<view class="ListMechanismtrees">
					<span v-for=" items in ipaddrArray" :key="items">{{items}}</span>
				</view>
				<view class="ListMechanismtwo">最近投资：{{items.inves}}</view>
			</view>
		</view>
		<view class="meirenkanwo" v-if="List.rows!==undefined &&List.rows.length==0">
			<image :src="kong" mode=""></image>
			您还没有收藏投资机构！
		</view>
	</view>
</template>

<script>
	import {
		mapMutations,
		mapGetters
	} from 'vuex';
	import kong from '@/static/mbcImg/my/kong.png'
	export default {
		data() {
			return {
				kong:kong,
				List: [],
				page: 1,
				picArr:[],
			};
		},
		computed: {
			...mapGetters(['GET_MY']),
			ipaddrArray: function() {
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
						url: this.api2 + '/follow/capiList?userId='+landRegistLG.user.id+'&page=' + this.page, //接口地址。
						// data: this.endParams(params),
						method: 'GET',
						header: {
							Authorization: "Bearer " + landRegistLG.token //将token放到请求头中
						},
						success: (response) => {
							console.log(response.data);
							this.List = response.data;
							console.log(this.List)
							uni.hideLoading();
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
	.ListMechanism {
		width: 100%;
		min-height: 100%;
		padding-top: 88upx;
	}

	.ListMechanismfist {
		width: 90%;
		height: 200upx;
		border-bottom: 2upx solid #F5F5F5;
		margin: 0 auto;
		display: flex;
		position: relative;
	}

	.ListMechanismfist view:nth-of-type(1) {
		width: 80upx;
		height: 80upx;
		border-radius: 50%;
		margin-top: 30upx;
	}

	.ListMechanismfist view:nth-of-type(1) image {
		width: 100%;
		height: 100%;
		border-radius: 50%;
	}

	.ListMechanismfist view:nth-of-type(2) {
		width: 400upx;
		height: 160upx;
		margin-top: 30upx;
		margin-left: 30upx;
	}

	.ListMechanismfist view:nth-of-type(2) view:nth-of-type(1) {
		width: 200upx;
		height: 50upx;
		font-size: 32upx;
		color: #2E2E30;
		margin-top: 0;
	}

	.ListMechanismtrees {
		width: 400upx;
		height: 20upx;
		font-size: 20upx;
		color: #9B9B9B;
		top: 60upx;
		left: 60upx;
		position: absolute;
		display: flex;
	}

	.ListMechanismtrees span {
		display: block;
		padding: 5upx 10upx 5upx 10upx;
		height: 30upx;
		text-align: center;
		line-height: 30upx;
		background: #F5F5F5;
		border-radius: 4upx;
		margin-left: 20upx;
	}

	.ListMechanismtwo {
		width: 300upx;
		height: 30upx;
		font-size: 24upx;
		color: #5D5D5D;
		margin-top: 60upx;
	}
	.meirenkanwo{
		width: 320upx;
		height: 280upx;
		display: block;
		margin: 120upx auto auto auto;
		font-size: 28upx;
		text-align: center;
		color: #9B9B9B;
	}
	.meirenkanwo image{
		width: 95%;
		height: 85%;
	}
</style>
