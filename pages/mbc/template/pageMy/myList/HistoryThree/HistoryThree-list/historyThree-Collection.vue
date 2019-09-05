<template>
	<view class="history3Collection" @tap="gotoCollection">
		<span>{{List.followCount}}</span>
		<span>收藏</span>
	</view>
</template>

<script>
	import { mapMutations,mapGetters } from 'vuex';
	export default {
		data() {
			return {
				List: []
			};
		},
		computed: {
			...mapGetters(['GET_MY'])
		},
		
		created() {
			
		},
		watch: {
			GET_MY: {
				handler(a, b) {
					console.log(a, b, '--------------------------------------------------------------------');
					this.List=a.MyList.header
					console.log(this.List)
				},
				deep: true
			}
		},
		methods: {
			getHeader() {
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
							console.log(response.data);
							this.List = response.data.content
							console.log(this.List,'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
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
			gotoCollection(e) {   
				console.log(e)
			    uni.navigateTo({
			        url: '/modules/pageMy/myList/myListCollection/Collection',
			    });
			}
		}
	};
</script>

<style>
	.history3Collection{
		width: 250upx;
		height: 100%;
		/* background: red; */
		text-align: center;
	}
	.history3Collection span:nth-of-type(1){
		font-size: 36upx;
		color: #2E2E30;
		font-weight: 700;
		margin-top: 15upx;
		display: block;
	}.history3Collection span:nth-of-type(2){
		font-size: 26upx;
			color: #2E2E30;
			display: block;
	}
</style>
