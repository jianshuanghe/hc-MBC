<template>
	<view class="footprint-works">
		<view class="footprint-works-fist" v-for="(item,index) in List" :key="index">
			<view><image :src="item.projLogo"></image></view>
			<view>
				<span>{{item.projName}}</span>
				<span>{{item.fieldName}}</span>
			</view>
			<view>
				<span>￥{{item.finanMoney}}万</span>
				<span>融资轮次：{{item.levelName}}</span>
			</view>
		</view>
	</view>
</template>

<script>
	import { mapMutations, mapGetters } from 'vuex';
	export default {
		data() {
			return {
				List: [],
			};
		},
		computed: {
			...mapGetters(['GET_MY']),
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
						url: this.api2 + '/user/footprintList?userId=760&createTime=2019-05-30', //接口地址。
						// data: this.endParams(params),
						method: 'GET',
						header: {
							Authorization: "Bearer " + landRegistLG.token //将token放到请求头中
						},
						success: (response) => {
							console.log(response.data);
							this.List = response.data.rows;
							console.log(this.List)
							uni.hideLoading();
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
	.footprint-works{
		width: 100%;
		min-height: 100%;
	}
	.footprint-works-fist{
		width: 90%;
		height: 160upx;
		border-bottom: 2upx solid  #F5F5F5;
		margin: 0 auto;
		display: flex;
		position: relative;
	}
	.footprint-works-fist view:nth-of-type(1){
		width: 80upx;
		height: 80upx;
		margin-left: 0;
		padding-top: 40upx;
	}
	.footprint-works-fist view:nth-of-type(1) image{
		width: 100%;
		height: 100%;
	}
	.footprint-works-fist view:nth-of-type(2){
		position: absolute;
		width: 200upx;
		height: 80upx;
		left: 110upx;
		padding-top: 40upx;
		/* background: red; */
	}
	.footprint-works-fist span:nth-of-type(1){
		width: 300upx;
		font-size: 32upx;
		margin-top: -10upx;
		display: block;
	}
	.footprint-works-fist span:nth-of-type(2){
		/* position: absolute; */
		display: block;
		font-size: 24upx;
		color: #9B9B9B;
		margin-top: 0upx;
		border: 0;
	}
	.footprint-works-fist view:nth-of-type(3){
		position: absolute;
		width: 200upx;
		height:80upx ;
		padding-top: 40upx;
		text-align: right;
		right: 0upx;
	}
	.footprint-works-fist view:nth-of-type(3) span:nth-of-type(1){
		position: absolute;
		right: 0;
		font-size: 32upx;
		color: #FAB100;
	}
	.footprint-works-fist view:nth-of-type(3) span:nth-of-type(2){
		position: absolute;
		top: 90upx;
		right: 0;
		font-size: 24upx;
		color: #5D5D5D;
	}
</style>
