<template>
	<view class="datas-List-me">
		<scroll-view :scroll-top="scrollTop" scroll-y="true" class="scroll-Y" @scrolltoupper="upper" @scrolltolower="loadMore"
		@scroll="scroll">
			<view>
				<textarea placeholder="请编辑您的个人资料" maxlength="300" @input="descInput" v-model="list.userContent" />
				<span class="numberV">{{remnane}}/300</span>
			</view>
			<view @tap="mydata">保存</view>
		</scroll-view>
	</view>
</template>

<script>
	import { mapMutations, mapGetters } from 'vuex';
	export default {
		data() {
			return {
				txtVal: 1,
				desc:"",
				remnane:0,
				list: [], // 盛放list数据
				List:[]
			};
		},
		components: {
			
		},
		computed: {
			...mapGetters(['GET_MY'])
		},
		created() {
			this.list = this.GET_MY.MyList.Collection;
			this.List=this.GET_MY.MyList.Collection.userContent
			this.remnane = this.List.length
			console.log(this.List.length)
			// this.desc=this.list.userContent
		},
		mounted() {},
		methods: {
			...mapMutations({
				setCollection: 'setCollection'
			}),
			mydata(){
				if (uni.getStorageSync('landRegist')) {
						let landRegistLG = JSON.parse(uni.getStorageSync('landRegist')); // 读取缓存的用户信息
						console.log(landRegistLG.user.id);
						let params = {
							userId:landRegistLG.user.id,
							userContent:this.list.userContent
						}; // 请求总数居时 参数为空
						uni.showLoading({ // 展示loading
							title: '加载中'
						});
						console.log(params)
						uni.request({
							url: this.api2 + '/user/'+landRegistLG.user.id, //接口地址。
							data: this.endParams(params),
							method: 'POST',
							header: {
								Authorization: "Bearer " + landRegistLG.token //将token放到请求头中
							},
							success: (response) => {
								uni.hideLoading();
								console.log(response.data);
								this.$store.commit('setCollection', this.list);
								uni.navigateBack({
								})
								// this.List=response.data
								// console.log(this.List,'asdasd')
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
			descInput(){
				var txtVal = this.list.userContent.length;
				this.remnane = 1 + txtVal;
			},

		}
	};
</script>

<style>
	.datas-List-me{
		width: 100%;
		height: 100%;
		background: #FFFFFF;
		padding: 2upx;
	}
	.datas-List-me view:nth-of-type(1){
		width: 90%;
		height: 370upx;
		margin: 30upx auto 30upx auto;
		position: relative;
	}
	.datas-List-me view:nth-of-type(1) textarea{
		width: 100%;
		height: 100%;
		background: #F9F9F9;
		padding: 20upx;
		padding-bottom: 50upx;
	}
	.numberV{
		font-size: 28upx;
		color: #D2D2D2;
		position: absolute;
		bottom: 0;
		right: 40upx;
	}
	.datas-List-me view:nth-of-type(2){
		width: 90%;
		height: 90upx;
		background: #02C2A2;
		margin: 100upx auto 100upx auto;
		text-align: center;
		line-height: 90upx;
		font-size: 32upx;
		color: #FFFFFF;
	}
</style>
