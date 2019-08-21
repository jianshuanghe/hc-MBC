<template>
	<view class="home-Tt">
		<view class="Tt-content">
			<view class="uni-swiper-msg">
				<view class="uni-swiper-msg-icon Tt-img">
					<image :src="tt"></image>
				</view>
				<swiper vertical="true" autoplay="true" circular="true" interval="1000">
					<swiper-item v-for="(item, index) in msg" :key="index" @tap="clickGoToWeb(item)">
						<navigator>
							{{item.title}}
						</navigator>
					</swiper-item>
				</swiper>
			</view>
		</view>
	</view>
</template>

<script>
	import tt from '@/static/mbcImg/home/tt.png';
	import uniNoticeBar from "@/components/uni-notice-bar/uni-notice-bar.vue"
	export default {
	    data () {
	      return {
	        tt: tt,
			msg : [
				'uni-app行业峰会频频亮相，开发者反响热烈',
				'DCloud完成B2轮融资，uni-app震撼发布',
				'36氪热文榜推荐、CSDN公号推荐 DCloud CEO文章'
			]
	      };
	    },
		components: {uniNoticeBar},
		created() {
			this.getMsgList();
		},
	    methods: {
	      clickGoToWeb () {
	        console.log('点击触发融头条组件');
	      },
		  getMsgList(){
		  	console.log('获取融头条数据');
		  	if (uni.getStorageSync('landRegist')) {
		  	    let landRegistLG = JSON.parse(uni.getStorageSync('landRegist')); // 读取缓存的用户信息
		  	    console.log(landRegistLG.user.id);
		  		let params = {}; // 请求总数居时 参数为空
		  		uni.showLoading({ // 展示loading
		  			title: '加载中'
		  		});
		  		uni.request({
		  			url: this.api2 + '/index/msgList', //接口地址。
		  			data: this.endParams(params),
		  			header: {
		  				Authorization:"Bearer "+landRegistLG.token//将token放到请求头中
		  			},
		  			success: (response) => {
		  				console.log(response.data);
						this.msg = response.data.content
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
		  },
	    }
	};
</script>

<style>
	.home-Tt{
		position: relative;
		width: 670upx;
		margin-left: 40upx;
		margin-top: 6upx;
		margin-bottom: 20upx;
	}
	.Tt-content{
		position: relative;
		width: 100%;
		height: 50upx;
		overflow: hidden;
	}
	.Tt-img-box{
		position: relative;
		width: 100upx;
	}
	.Tt-img{
		position: relative;
		width: 100upx;
	}
	.Tt-img>image{
		position: relative;
		width: 84upx;
		height: 32upx;
		top: 4upx;
	}
	.Tt-text-box{
		position: relative;
		width: 500upx;
	}
	.Tt-text{
		font-family: PingFangSC-Regular;
		font-size: 24upx;
		color: #2E2E30;
		line-height: 30upx;
		letter-spacing: 0;
	}
</style>
