<template>
	<view class="homeBanner">
		<uni-swiper-dot :info="info" :current="current" field="content" :mode="mode" :dotsStyles='dotsStyles'>
			<swiper class="swiper-box" @change="change" autoplay="true" interval=5000>
				<swiper-item v-for="(item ,index) in info" :key="index" @tap="clickBanner(item.url)">
					<view class="swiper-item">
						<image :src="item.img" class="bannerImg"></image>
					</view>
				</swiper-item>
			</swiper>
		</uni-swiper-dot>

	</view>
</template>

<script>
import {uniSwiperDot} from "@dcloudio/uni-ui";
export default {
    components: {uniSwiperDot},
	data() {
        return {
            info: [],
            current: 0,
            mode: 'default',
			dotsStyles: {
				width: 8,
				height: 1,
				backgroundColor: '#6b6969',
				selectedBackgroundColor: ' #FFFFFF',
				selectedBorder: 0,
				border: 0
			}
        }
    },
	created() {
		this.getImgsList();
	},
    methods: {
        change(e) {
            this.current = e.detail.current;
        },
		clickBanner(e) {
			console.log(e, '点击banner');
			let type = e.split('_')[0];
			let id = Number(e.split('_')[1]);
			console.log(type, id);
			if (type === 'server') { // 服务类
				this.goToServiceDetails(id);
			}
		},
		goToServiceDetails (e) {
			console.log(e, '去服务详情页面，bp打磨，速溶服务等');
			let url = '';
			if ( e === 0) {
				console.log('BP诊断');
				url = '/modules/pageHome/homeModules/lookServices/serviceDetails/BPD/serviceDetails?serverId=' + e;
			} else if (e === 1) {
				console.log('BP打磨');
				url = '/modules/pageHome/homeModules/lookServices/serviceDetails/Bp/serviceDetails?serverId=' + e;
			} else if (e === 2) {
				console.log('速溶服务');
				url = '/modules/pageHome/homeModules/lookServices/serviceDetails/quickMelt/serviceDetails?serverId=' + e;
			}
			uni.navigateTo({
				url: url
			});
		},
		getImgsList(){
			console.log('获取轮播图数据');
			if (uni.getStorageSync('landRegist')) {
			    let landRegistLG = JSON.parse(uni.getStorageSync('landRegist')); // 读取缓存的用户信息
			    console.log(landRegistLG.user.id);
				let params = {}; // 请求总数居时 参数为空
				uni.showLoading({ // 展示loading
					title: '加载中'
				});
				uni.request({
					url: this.api2 + '/index/imgs', //接口地址。
					data: this.endParams(params),
					header: {
						Authorization:"Bearer "+landRegistLG.token//将token放到请求头中
					},
					success: (response) => {
						console.log(response.data);
						this.info = response.data.content
						uni.hideLoading(); // 隐藏 loading
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
	.homeBanner{
		position: relative;
		width: 670upx;
		height: 330upx;
		margin-left: 40upx;
		margin-top: 20upx;
		border-radius: 10upx;
		padding-top: 92upx;
	}
	.uni-swiper-wrapper{
		border-radius: 10upx;
	}
	.swiper-box{
		height: 330upx !important;
		border-radius: 10upx;
	}
	.bannerImg{
		position: relative;
		width: 100%;
		height: 330upx;
		border-radius: 10upx;
	}
	.uni-swiper-msg{
		padding: 0 !important;
	}
</style>
