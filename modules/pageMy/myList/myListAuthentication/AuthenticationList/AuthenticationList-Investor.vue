<template>
	<view class="Investor-list" @tap="gotoInvestorCertification">
		<image :src="tou"></image>
	</view>
</template>

<script>
	import { mapMutations,mapGetters } from 'vuex';
	export default {
		data() {
			return {
				Listdata: [],
				tou:this.Static + 'mbcImg/my/touzizhe.png',
			};
		},
		computed: {
			...mapGetters(['GET_MY'])
		},
		// watch: {
		// 	GET_MY: {
		// 		handler(a, b) {
		// 			console.log(a, b);
		// 			// this.Listdata = a.MyList.header;
		// 			console.log(this.Listdata, '投资选择');
		// 		},
		// 		deep: true
		// 	}
		// },
		watch: {
			GET_MY: {
				handler(a, b) {
					console.log(a, b)
					this.Listdata = a.MyList.header;
					
				},
				deep: true
			},
		
		},
		created() {
			this.Listdata = this.GET_MY.MyList.header;
			
		},
		methods: {
			gotoInvestorCertification(e){
				if(this.Listdata.userType=='-1'){
					console.log('去' + e + '投资人认证');
					uni.navigateTo({
						url: '/modules/pageMy/myList/myListAuthentication/AuthenticationList/InvestorCertification/InvestorCertification',
					});
				}else if(this.Listdata.userType=='1'){
					console.log('去' + e + '投资人详情');
					uni.navigateTo({
						url: '/modules/pageMy/myList/myListAuthentication/AuthenticationList/Certification-status/Certification-status',
					});
				}else if(this.Listdata.userType=='2'){
					console.log('去' + e + '投资人详情');
					uni.navigateTo({
						url: '/modules/pageMy/myList/myListAuthentication/AuthenticationList/Certification-status/Certification-status',
					});
				}else if(this.Listdata.authState=='2'){
					console.log('去' + e + '投资人认证');
					this.status++
					uni.navigateTo({
						url: '/modules/pageMy/myList/myListAuthentication/AuthenticationList/InvestorCertification/InvestorCertification',
					});
				}else if(this.Listdata.userType=='0'){
					console.log('您已认证创业者 无法认证投资人')
					uni.showToast({
						title: '您已认证创业者，无法认证投资人',
						icon: 'none',
						duration: 1000
					});
				}
			}
		}
	};
</script>

<style>
	.Investor-list{
		width: 100%;
		height: 294upx;
		border-radius: 16upx;
		padding-top: 40upx;
	}
	.Investor-list image{
		display: block;
		width: 90%;
		height: 100%;
		margin: 0 auto;
	}
</style>
