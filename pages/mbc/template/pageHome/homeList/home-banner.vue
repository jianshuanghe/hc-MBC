<template>
	<view class="homeBanner">
		<uni-swiper-dot :info="info" :current="current" field="content" :mode="mode" :dotsStyles='dotsStyles'>
			<swiper class="swiper-box" @change="change" autoplay="true" interval=5000>
				<swiper-item v-for="(item ,index) in info" :key="index">
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
