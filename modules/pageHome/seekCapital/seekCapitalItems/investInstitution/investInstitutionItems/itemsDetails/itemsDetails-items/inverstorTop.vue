<template>
	<view class="inverstorTop-content">
		<view class="inverstorTop">
			<view class="left iT-img">
				<image :src="msgData.capitalComp.compLogo"></image>
			</view>
			<view class="left iT-text">
				<div class="company-box">{{msgData.capitalComp.compName  || ''}}</div>
			</view>
			<div class="Authentication-type" @tap='goToAuth()' v-if='isAuth === false'>
				<image :src="authen" class="AuType"></image>
				成员认证
			</div>
			<view class="clear"></view>
		</view>
	</view>
</template>

<script>
	export default {
	    data () {
			return {
				authen: this.Static + 'mbcImg/home/seekCapital/authen.png',
				isAuth: false, // 是否认证
			};
	    },
		props: {
			msgData: {
				type: Object
			}
		},
		mounted() {
			this.getUserType();
		},
	    methods: {
			goToFinanceDetail (e){
				console.log('去' + e + '详情页面');
				uni.navigateTo({
					url: '/modules/pageHome/homeList/homeList'
				});
			},
			getUserType () {
				console.log('判断用户是否认证');
				if (uni.getStorageSync('UserData')) {
					let UserData = JSON.parse(uni.getStorageSync('UserData')); // 读取缓存的用户信息
					this.authState = UserData.authState; // -1 未认证 0 待审核 1审核通过 2 审核失败
					this.userType = UserData.userType; // 用户类型  -1 未认证 0 创业者 1 个人投资人 2 机构投资人
					if (Number(this.userType) === 0) { // 1 个人投资人 2 机构投资人
						if (Number(this.authState) !== 1) { // 没有认证.或者认证没通过
							this.isAuth = false;
							return
						} else {
							console.log('认证创业者');
							this.isAuth = true;
						}
					} else {
						this.isAuth = false;
						return
					}
				}
			},
			goToAuth () {
				this.landRegistra(); // 判断登录状态
				if (uni.getStorageSync('landRegist')) {
					console.log('点击触发去认证');
					uni.navigateTo({
						url: '/modules/pageMy/myList/myListAuthentication/Authentication'
					});
				}
			},
			goToSeek () {
				console.log('点击触发寻找资本');
			}
	    }
	}
</script>

<style>
	.inverstorTop-content{
		position: relative;
		width: 750upx;
		background: #fff;
		margin-bottom: 20upx;
	}
	.inverstorTop{
		position: relative;
		width: 100%;
		padding: 30upx;
	}
	.iT-img{
		position: relative;
		width: 20%;
	}
	.iT-img>image{
		position: relative;
		width: 120upx;
		height: 120upx;
		border-radius: 10upx;
		top: 10upx;
	}
	.iT-text{
		position: relative;
		width: 80%;
	}
	.iT-type{
		position: relative;
		width: 100%;
		font-family: PingFang-SC-Bold;
		font-size: 40upx;
		color: #2E2E30;
		letter-spacing: 0;
		line-height: 60upx;
	}
	.iT-company{
		font-family: PingFangSC-Regular;
		font-size: 24upx;
		color: #9B9B9B;
		line-height: 40upx;
	}
	.iT-city{
		font-family: PingFangSC-Regular;
		font-size: 24upx;
		color: #9B9B9B;
		line-height: 40upx;
	}
	.company-box{
		position: relative;
		width: 100%;
		font-family: PingFang-SC-Bold;
		font-size: 40upx;
		color: #2E2E30;
		letter-spacing: 0;
		line-height: 140upx;
		font-weight: bold;
	}
	.Authentication-type{
		position: absolute;
		top: 70upx;
		background-image: linear-gradient(-134deg, #15D49F 0%, #57D6CF 100%);
		box-shadow: 0 2px 4px 0 rgba(2,194,162,0.40);
		border-radius: 100px 0 0 100px;
		width: 160upx;
		height: 60upx;
		right: 60upx;
		text-align: right;
		padding-right: 10upx;
		font-family: PingFangSC-Regular;
		font-size: 24upx;
		color: #FFFFFF;
		line-height: 60upx;
	}
	.AuType{
		position: absolute;
		width: 28upx;
		height: 24upx;
		top: 20upx;
		left: 20upx;
	}
</style>
