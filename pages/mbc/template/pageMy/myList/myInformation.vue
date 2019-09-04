<template>
	<view class="myInformation" @tap="gotomyListdata">
		<view class="Informationname">
			<view>
				<view><span>{{List.userName}}</span></view>
				<view>
					<!-- 未认证 -->
					<image :src="Uncertified" :class="{'xian':hideen}"></image>
					<!-- 创业者 -->
					<image :src="Entrepreneurs" :class="{'chuang':chuang}"></image>
					<!-- 投资人 -->
					<image :src="Investor" :class="{'tou':tou}"></image>
					<!-- <image :src="Investor" v-if="List.userType===2"></image> -->
				</view>
			</view>
			<view>
				点击修改个人资料
				<image :src="right"></image>
			</view>
		</view>
		<view class="Informationportrait">
			<image :src="List.headImg || images"></image>
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
				Investor: this.Static + 'mbcImg/my/Investor.png',
				Uncertified: this.Static + 'mbcImg/my/Uncertified.png',
				Entrepreneurs: this.Static + 'mbcImg/my/Entrepreneurs.png',
				images: this.Static + 'mbcImg/my/images.png',
				right: this.Static + 'mbcImg/my/right.png',
				green: this.Static + 'mbcImg/my/green.png',
				List: [],
				hideen: true,
				tou: true,
				chuang: true,
			};
		},
		computed: {
			...mapGetters(['GET_MY'])
		},
		created() {
			// this.getHeader();
		},
		watch: {
			GET_MY: {
				handler(a, b) {
					console.log(a, b)
					this.List = a.MyList.Mation;
					if (this.List.authState == -1) {
						this.hideen = false;
					} else if (this.List.authState == 0) {
						this.hideen = false;
					} else if (this.List.authState == 1) {
						if (this.List.userType == 1) {
							this.tou = false
						}
						if (this.List.userType == 2) {
							this.tou = false
						}
						if (this.List.userType == 0) {
							this.chuang = false
						}
					} else if (this.List.authState == 1) {
						this.hideen = false;
					} else if (this.List.authState == 2) {
						this.hideen = false;
					}
				},
				deep: true
			},

		},
		methods: {
			gotomyListdata(e) {
				console.log('去' + e + '个人资料');
				uni.navigateTo({
					url: '/modules/pageMy/myList/myListdata/myList-data',
				});
			},
			// getHeader() {
			// 	if (uni.getStorageSync('landRegist')) {
			// 		let landRegistLG = JSON.parse(uni.getStorageSync('landRegist')); // 读取缓存的用户信息
			// 		console.log(landRegistLG.user.id);
			// 		// let params = {}; // 请求总数居时 参数为空
			// 		uni.showLoading({ // 展示loading
			// 			title: '加载中'
			// 		});
			// 		uni.request({
			// 			url: this.api2 + '/user/' + landRegistLG.user.id, //接口地址。
			// 			// data: this.endParams(params),
			// 			method: 'GET',
			// 			header: {
			// 				Authorization: "Bearer " + landRegistLG.token //将token放到请求头中
			// 			},
			// 			success: (response) => {
			// 				uni.hideLoading();
			// 				console.log(response.data);
			// 				this.List = response.data.content
			// 				console.log(this.List,'asdasdasdasdasdsssssss')
			// 				
			// 			},
			// 			fail: (error) => {
			// 				uni.hideLoading(); // 隐藏 loading
			// 				uni.showToast({
			// 					title: '网络繁忙，请稍后',
			// 					icon: 'none',
			// 					duration: 1000
			// 				});
			// 				console.log(error, '网络繁忙，请稍后');
			// 			}
			// 		});
			// 	}
			// },
		}
	};
</script>

<style>
	.xian {
		display: none;
	}

	.tou {
		display: none;
	}

	.chuang {
		display: none;
	}

	.myInformation {
		width: 100%;
		height: 280upx;
		background: #FFFFFF;
		display: flex;
		border-bottom: 2upx solid #F5F5F5;
	}

	.Informationname {
		width: 420upx;
		height: 100upx;
		/* background: red; */
		padding-top: 92upx;
		padding-left: 48upx;

	}

	.Informationname view:nth-of-type(1) {
		display: flex;
	}

	.Informationname view:nth-of-type(1) view:nth-of-type(1) {
		font-size: 40upx;
		width: 60%;
		height: 80upx;
		
	}
	.Informationname view:nth-of-type(1) view:nth-of-type(1)>span{
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		display: block;
		width: 100%;
		height: 100%;
	}

	.Informationname view:nth-of-type(1) view:nth-of-type(2) {
		width: 160upx;
		height: 50upx;
		border-radius: 20upx;
		padding-top: 10upx;
		padding-left: 20upx;
	}

	.Informationname view:nth-of-type(1) view:nth-of-type(2) image {
		width: 100%;
		height: 100%;
	}

	.Informationname view:nth-of-type(2) {
		font-size: 26upx;
		color: #3C3D3F;
	}

	.Informationname view:nth-of-type(2) image {
		width: 18upx;
		height: 18upx;
		padding-left: 5upx;
	}

	.Informationportrait {
		width: 120upx;
		height: 120upx;
		/* background: #000000; */
		padding-top: 12.1%;
		padding-left: 12%;
		border-radius: 50%;
	}

	.Informationportrait image {
		width: 100%;
		height: 100%;
		border-radius: 50%;
	}
</style>
