<template>
	<view class="Lookme">
		<view class="Lookmefist" v-for="(item,index) in CollectionList" @tap="gotoxiang(item.userId)">
			<view>
				<image :src="item.headImg"></image>
			</view>
			<view>
				<view class="Lookone"><span>{{item.userName}}</span></view>
				<view class="LookmeLast">
					<span v-if="item.compName !== ''">{{item.compName}}</span>
					<span v-if="item.compName == ''">无</span>
					<span v-if="item.compPosi !== ''">{{item.compPosi}}</span>
					<span v-if="item.compPosi == ''">无</span>
				</view>
			</view>
			<view>
				{{item.createTime|formatDate}}
			</view>
		</view>
		<view class="meirenkanwo" v-if="CollectionList!==undefined &&CollectionList.length==0">
			<image :src="kong" mode=""></image>
			还没有人看过您！
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
				yong: this.Static + 'mbcImg/my/yong.png',
				kong: this.Static + 'mbcImg/my/kong.png',
				CollectionList: [],
			};
		},
		computed: {
			...mapGetters(['GET_MY'])
		},
		created() {
			console.log('在组件中并不能使用页面生命周期函数');
			this.getConcang();

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
				return y + '-' + MM + '-' + d;
			}
		},
		mounted() {},
		methods: {
			...mapMutations({
				setCollectionr: 'setCollection'
			}),
			gotoxiang(e){
				uni.navigateTo({
					url:'/modules/pageHome/seekCapital/seekCapitalItems/investor/inverstorItems/itemsDetails/itemsDetails?userId='+e
				})
			},
			getConcang() {
				if (uni.getStorageSync('landRegist')) {
					let landRegistLG = JSON.parse(uni.getStorageSync('landRegist')); // 读取缓存的用户信息
					console.log(landRegistLG.user.id);
					// let params = {}; // 请求总数居时 参数为空
					uni.showLoading({ // 展示loading
						title: '加载中'
					});
					uni.request({
						url: this.api2 + '/user/lookUserList?userId=' + landRegistLG.user.id, //接口地址。
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
		padding: 2upx;
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
		width: 410upx;
		height: 50upx;
		margin-top: 30upx;
		margin-left: 30upx;
	}

	.Lookmefist view:nth-of-type(2) view:nth-of-type(1) {
		width: 250upx;
		height: 50upx;
		font-size: 32upx;
		color: #2E2E30;
		margin-top: 0;
		margin-left: 10upx;
	}

	.Lookone>span {
		display: block;
		width: 100%;
		height: 100%;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		font-weight: bold;
	}

	.LookmeLast {
		width: 250upx;
		height: 20upx;
		font-size: 24upx;
		color: #5D5D5D;
		top: 60upx;
		left: 70upx;
		position: absolute;
		display: flex;
	}

	.LookmeLast span:nth-of-type(1) {
		display: block;
		/* width: 120upx; */
		padding: 0 20upx;
		height: 30upx;
		text-align: center;
		line-height: 30upx;
		border-right: 4upx solid #D2D2D2;
	}

	.LookmeLast span:nth-of-type(2) {
		display: block;
		padding: 0 20upx;
		text-align: center;
		/* margin-left: 20upx; */
		line-height: 30upx;
	}

	.Lookmefist view:nth-of-type(3) {
		margin-top: 30upx;
		font-size: 20upx;
		color: #9B9B9B;
		position: absolute;
		right: 0;
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
