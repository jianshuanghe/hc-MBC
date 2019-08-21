<template>
	<view class="Investment-data">
		<view class="data-header">
			<view>个人介绍</view>
			<view class="data-header-one" v-if="List.userContent!==''">
				{{List.userContent}}
			</view>
			<view @tap="gotodatasListme" v-if="List.userContent=='' " class="data-header-two">
				填写个人介绍
			</view>
			<view class="data-header-three" v-if="List.userContent!==''" @tap="gotodatasListme">编辑</view>
		</view>
		<view class="data-conter">
			<view>任职履历</view>
			<view class="renzhilvli" v-for="(item,index) in Listdata" :key="index">
				<view>
					<image :src="item.compLogo" v-if="item.compLogo!==''"></image>
					<image :src="images" v-if="item.compLogo==''"></image>
				</view>
				<view>
					<span>{{item.compName}}</span>
					<span>{{item.position}}</span>
					<span v-if="item.isIncu==1">在职</span>
					<span v-if="item.isIncu==0">离职</span>
				</view>
				<view class="data-conter-three" @tap="gotodatasListbianji(item.id)">编辑</view>
			</view>
			<view @tap="gotodatasListvitae" class="data-conter-one">
				填写任职履历
			</view>
		</view>
		<view class="data-footer">
			<view>投资案例</view>
			<view class="touzianli" v-for="(item,index) in Listdata" :key="index">
				<view>
					<image :src="item.compLogo" v-if="item.compLogo!==''"></image>
					<image :src="images" v-if="item.compLogo==''"></image>
				</view>
				<view class="lunshu">
					<span>{{item.compName}}</span>
					<span>简介啊实打实大师大所大所大所大所大所多啊实打实大师大所大所大所大所大所多啊实打实大师大所大所大所大所大所多</span>
					<span class="lunshu-shu">
						<image :src="Ima1"></image><span>2019.3.2</span> <span>C轮</span>
					</span>
				</view>
				<view class="data-footer-three">编辑</view>
			</view>
			<view @tap="gotodatasListcase" class="data-footer-one">
				填写投资案例
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
				List: [],
				Listdata: [],
				Listcase: [],
				footer: [],
				green: this.Static + 'mbcImg/my/green.png',
				Ima1: this.Static + 'mbcImg/my/Ima1.png',
				images: this.Static + 'mbcImg/my/images.png',
				id: []
			};
		},
		components: {

		},
		computed: {
			...mapGetters(['GET_MY'])
		},
		watch: {
			GET_MY: {
				handler(a, b) {
					// console.log(a,b)
					this.List = a.MyList.Collection;
					this.Listdata = a.MyList.Lvli;
				},
				deep: true
			},

		},
		created() {
			//个人信息
			this.dataheader();
			//任职履历
			this.dataconter();
		},
		mounted() {},
		methods: {
			...mapMutations({
				setCollection: 'setCollection',
				setLvli: 'setLvli'
			}),
			dataheader() { //个人信息
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
							uni.hideLoading();
							// console.log(response.data);
							this.List = response.data.content
							this.$store.commit('setCollection', this.List);
							console.log(this.List, 'asdasd')
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
			dataconter() { //任职履历
				if (uni.getStorageSync('landRegist')) {
					let landRegistLG = JSON.parse(uni.getStorageSync('landRegist')); // 读取缓存的用户信息
					console.log(landRegistLG.user.id);
					// let params = {}; // 请求总数居时 参数为空
					uni.showLoading({ // 展示loading
						title: '加载中'
					});
					uni.request({
						url: this.api2 + '/user/subsInfo/' + landRegistLG.user.id, //接口地址。
						// data: this.endParams(params),
						method: 'GET',
						header: {
							Authorization: "Bearer " + landRegistLG.token //将token放到请求头中
						},
						success: (response) => {
							uni.hideLoading();
							console.log(response.data);
							this.Listdata = response.data.content.userExpes
							// console.log(this.Listdata, '333')
							this.$store.commit('setLvli', this.Listdata);
							this.Listcase = response.data.content
							// console.log(this.Listcase)
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
			gotodatasListbianji(e) {
				console.log(e + '任职履历编辑页面')
				uni.navigateTo({
					url: '../../../Investment-status/InvestmentList/InvestmentList-data/datas-List/datas-List-bianji?id=' + e,
				});
			},
			gotodatasListme(e) {
				console.log(e + '个人介绍')
				uni.navigateTo({
					url: '../../../Investment-status/InvestmentList/InvestmentList-data/datas-List/datas-List-me',
				});
			},
			gotodatasListvitae(e) {
				console.log(e + '任职履历')
				uni.navigateTo({
					url: '../../../Investment-status/InvestmentList/InvestmentList-data/datas-List/datas-List-vitae',
				});
			},
			gotodatasListcase(e) {
				console.log(e + '投资案例')
				uni.navigateTo({
					url: '../../../Investment-status/InvestmentList/InvestmentList-data/datas-List/datas-List-case',
				});
			}
		}
	};
</script>

<style>
	.Investment-data {
		width: 100%;
	}

	.data-header {
		width: 100%;
		min-height: 300upx;
		background: #FFFFFF;
	}

	.data-header view:nth-of-type(1) {
		font-size: 34upx;
		color: #2E2E30;
		padding-top: 40upx;
		padding-left: 30upx;
	}

	.data-header-one {
		width: 90%;
		margin: 0 auto;
		padding: 20upx;
	}

	.data-header-two {
		margin: 40upx auto 0 auto;
		width: 300upx;
		height: 80upx;
		border: 2upx solid #02C2A2;
		line-height: 80upx;
		text-align: center;
		font-size: 28upx;
		color: #02C2A2;
	}

	.data-header-three {
		font-size: 26upx;
		color: #02C2A2;
		position: absolute;
		right: 40upx;
		top: 52upx;
		font-weight: 700;
	}

	.data-conter {
		width: 100%;
		min-height: 300upx;
		background: #FFFFFF;
		margin-top: 20upx;
		padding: 2upx;
		position: relative;
		padding-bottom: 20upx;
	}

	.data-conter view:nth-of-type(1) {
		font-size: 34upx;
		color: #2E2E30;
		padding-top: 40upx;
		padding-left: 30upx;
	}

	.renzhilvli {
		width: 90%;
		min-height: 100upx;
		margin: 40upx auto auto auto;
		padding-bottom: 30upx;
		border-bottom: 2upx solid #F5F5F5;
		display: flex;
		position: relative;
	}

	.renzhilvli view:nth-of-type(1) {
		width: 100upx;
		height: 100upx;
		position: absolute;
		border-radius: 50%;
		left: -40upx;
		margin-top: -40upx;
	}

	.renzhilvli view:nth-of-type(1) image {
		width: 100%;
		height: 100%;
		border-radius: 50%;
	}

	.renzhilvli view:nth-of-type(2) {
		width: 80%;
		margin-left: 120upx;
		display: flex;
		position: relative;
	}

	.renzhilvli view:nth-of-type(2) span:nth-of-type(1) {
		font-size: 32upx;
		color: #2E2E30;
	}

	.renzhilvli view:nth-of-type(2) span:nth-of-type(2) {
		display: block;
		font-size: 24upx;
		color: #9B9B9B;
		/* padding: 10upx; */
		border-left: 2upx solid #9B9B9B;
		height: 24upx;
		line-height: 24upx;
		margin-left: 10upx;
		margin-top: 15upx;
		padding-left: 10upx;
	}

	.renzhilvli view:nth-of-type(2) span:nth-of-type(3) {
		display: block;
		font-size: 24upx;
		color: #5D5D5D;
		position: absolute;
		left: 0;
		top: 60upx;
	}

	.data-conter-one {
		margin: 40upx auto 0 auto;
		width: 300upx;
		height: 80upx;
		border: 2upx solid #02C2A2;
		line-height: 80upx;
		text-align: center;
		font-size: 28upx;
		color: #02C2A2;
	}

	.data-footer {
		width: 100%;
		min-height: 300upx;
		background: #FFFFFF;
		margin-top: 20upx;
		padding-bottom: 20upx;
		position: relative;
	}

	.data-footer view:nth-of-type(1) {
		font-size: 34upx;
		color: #2E2E30;
		padding-top: 40upx;
		padding-left: 30upx;
	}

	.data-footer-one {
		margin: 40upx auto 0 auto;
		width: 300upx;
		height: 80upx;
		border: 2upx solid #02C2A2;
		line-height: 80upx;
		text-align: center;
		font-size: 28upx;
		color: #02C2A2;
	}

	.touzianli {
		width: 90%;
		min-height: 150upx;
		margin: 40upx auto auto auto;
		display: flex;
		border-bottom: 2upx solid #F5F5F5;
	}

	.touzianli view:nth-of-type(1) {
		width: 100upx;
		height: 100upx;
		position: absolute;
		left: 0;
		margin-top: -40upx;
	}

	.touzianli view:nth-of-type(1) image {
		width: 100%;
		height: 100%;
	}

	.lunshu {
		width: 70%;
		min-height: 50upx;
		margin-left: 120upx;
	}

	.lunshu span:nth-of-type(1) {
		font-size: 32upx;
		color: #2E2E30;
	}

	.lunshu span:nth-of-type(2) {
		width: 95%;
		display: block;
		font-size: 24upx;
		color: #9B9B9B;
		height: 24upx;
		line-height: 24upx;
		margin-top: 15upx;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.lunshu-shu {
		font-size: 24upx;
		color: #5D5D5D;
		margin-top: 20upx;
		display: flex;

	}

	.lunshu-shu image {
		width: 18upx;
		height: 18upx;
	}

	.lunshu-shu span:nth-of-type(1) {
		font-size: 20upx;
		color: #9B9B9B;
		margin-top: -10upx;
		margin-left: 20upx;
	}

	.lunshu-shu span:nth-of-type(2) {
		font-size: 20upx;
		color: #2E2E30;
		margin-left: 20upx;
		margin-top: -5upx;
	}

	.data-footer-three {
		font-size: 26upx;
		color: #02C2A2;
		width: 100upx;
		font-weight: 700;
	}

	.data-conter-three {
		font-size: 26upx;
		color: #02C2A2;
		position: absolute;
		right: 40upx;
		top: 0upx;
		font-weight: 700;
	}
</style>
