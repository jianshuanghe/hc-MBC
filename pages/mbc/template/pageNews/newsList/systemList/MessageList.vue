<template>
	<view class="Message" >
		<view class="Message-Tips">
			<view>身份认证<span>12:08</span></view>
			<view>恭喜您创业者身份认证成功，接下来可以上传BP，更新项目信息等。</view>
		</view>
	</view>
</template>

<script>
	import { mapMutations, mapGetters } from 'vuex';
	export default {
		data () {
			return {
				xiaoxo: xiaoxo,
			};
		},
		methods:{
			guoqu(e){
				console.log(e, '数显数据函数的参数');
				if (uni.getStorageSync('landRegist')) {
				    let landRegistLG = JSON.parse(uni.getStorageSync('landRegist')); // 读取缓存的用户信息
				    console.log(landRegistLG.user.id);
					let params = {}; // 请求总数居时 参数为空
					uni.showLoading({ // 展示loading
						title: '加载中'
					});
					uni.request({
						url: this.api2 + '/proj/list?page=', //接口地址。
						data: this.endParams(params),
						method: 'POST',
						header: {
							Authorization:"Bearer "+landRegistLG.token//将token放到请求头中
						},
						success: (response) => {
							console.log(response.data);
							// e.listData = response.data.rows; // 第一页返回的数据
							// e.search.pageNum = this.pageNums(response.data.total) // 总页数
							// console.log(response.data.total, e.search.pageNum);
							// uni.hideLoading(); // 隐藏 loading
							// this.$store.commit('setFinance', e); // 更新setFinance
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
	.Message{
		width: 100%;
		height: 100%;
		background: #FFFFFF;
	}
	.Message-Tips{
		width: 100%;
		height: 208upx;
		border-bottom: 2upx solid  #F5F5F5;
		position: relative;
	}
	.Message-Tips view:nth-of-type(1){
		font-size: 30upx;
		color: #2E2E30;
		font-weight:700 ;
		padding-top: 40upx;
		padding-left: 30upx;
	}
	.Message-Tips view:nth-of-type(1) span{
		font-size: 24upx;
		color: #BDBDBD;
		position: absolute;
		right: 30upx;
		font-weight: 0;
	}
	.Message-Tips view:nth-of-type(2){
		width: 690upx;
		font-size: 26upx;
		color: #9B9B9B;
		padding-top: 10upx;
		padding-left: 30upx;
	}
</style>
