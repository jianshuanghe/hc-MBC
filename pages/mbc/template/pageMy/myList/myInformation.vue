<template>
	<view class="myInformation" @tap="gotomyListdata">
		<view class="Informationname">
			<view>
				<view>{{Mylist.userName}}</view>
				<view>
					<image :src="Uncertified" v-if="this.Mylist.userType==-1"></image>
					<image :src="Entrepreneurs" v-if="this.Mylist.userType==0"></image>
					<image :src="Investor" v-if="this.Mylist.userType===1"></image>
				</view>
			</view>
			<view>
				点击修改个人资料
				<image :src="right"></image>
			</view>
		</view>
		<view class="Informationportrait">
			<image :src="Mylist.headImg" v-if="this.Mylist.headImg!=''"></image>
			<image :src="images" v-if="this.Mylist.headImg==''"></image>
		</view>
	</view>
</template>

<script>
	import Uncertified from '@/static/mbcImg/my/Uncertified.png'
	import Entrepreneurs from '@/static/mbcImg/my/Entrepreneurs.png'
	import Investor from '@/static/mbcImg/my/Investor.png'
	import right from '@/static/mbcImg/my/right.png'
	import green from '@/static/mbcImg/my/green.png'
	import images from '@/static/mbcImg/my/images.png'
	export default {
		props:['Mylist'],
		data() {
			return {
				Investor: Investor,
				Uncertified: Uncertified,
				Entrepreneurs: Entrepreneurs,
				images:images,
				right: right,
				green: green,
				hide:false
			};
		},
		computed: {},
		created() {
			
		},
		mounted() {

		},
		methods: {
			gotomyListdata(e) {
				console.log('去' + e + '个人资料');
				uni.navigateTo({
					url: '/modules/pageMy/myList/myListdata/myList-data',
				});
			}
		}
	};
</script>

<style>
	/* .hide{
		display:none;
	} */
	.myInformation {
		width: 100%;
		height: 280upx;
		background: #FFFFFF;
		display: flex;
		border-bottom: 2upx solid #F5F5F5;
		;
	}

	.Informationname {
		width: 320upx;
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
		font-weight: 700;
		width: 200upx;
	}

	.Informationname view:nth-of-type(1) view:nth-of-type(2) {
		width: 160upx;
		height: 50upx;
		border-radius: 20upx;
		padding-top: 10upx;
		padding-right: 20upx;
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
		padding-left: 30%;
		border-radius: 50%;
	}

	.Informationportrait image {
		width: 100%;
		height: 100%;
		border-radius:50% ;
	}
</style>
