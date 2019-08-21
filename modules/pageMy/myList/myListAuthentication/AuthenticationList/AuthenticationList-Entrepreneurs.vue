<template>
	<view class="Entrepreneurs-list" @tap="gotoEntrepreneursCertification">
		<image src="/static/mbcImg/my/chuangyezhe.png"></image>
	</view>
</template>

<script>
	import { mapMutations,mapGetters } from 'vuex';
	export default {
		data() {
			return {
				Listdata: []
			};
		},
		computed: {
			...mapGetters(['GET_MY'])
		},
		watch: {
			GET_MY: {
				handler(a, b) {
					console.log(a, b);
				},
				deep: true
			}
		},
		created() {
			this.Listdata = this.GET_MY.MyList.header;
			console.log(this.Listdata, '模式选择');
		},
		methods: {
			gotoEntrepreneursCertification(e){
				if(this.Listdata.authState==-1){
					console.log('去' + e + '创业者认证');
					this.status++
					uni.navigateTo({
						url: '/modules/pageMy/myList/myListAuthentication/AuthenticationList/EntrepreneursCertification/EntrepreneursCertification',
					});
				}else if(this.Listdata.authState==0){
					console.log('去' + e + '创业者认证消息');
					console.log(this.Listdata.userType)
					uni.navigateTo({
						url: '/modules/pageMy/myList/myListAuthentication/AuthenticationList/Certification-status/Certification-status',
					});
				}else if(this.Listdata.authState==1){
					uni.showToast({
						title: '您已认证投资人，无法认证创业者',
						icon: 'none',
						duration: 1000
					});
					console.log('您已经认证投资人 无法认证创业者')
				}else if(this.Listdata.authState==2){
					uni.showToast({
						title: '您已认证投资人，无法认证创业者',
						icon: 'none',
						duration: 1000
					});
					console.log('您已经认证投资人 无法认证创业者')
				}
			}
		}
	};
</script>

<style>
	.Entrepreneurs-list{
		width: 100%;
		height: 294upx;
		border-radius: 16upx;
		padding-top: 40upx;
	}
	.Entrepreneurs-list image{
		display: block;
		width: 90%;
		height: 100%;
		margin: 0 auto;
	}
</style>
