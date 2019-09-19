<template>
	<view class="home-Tt">
		<view class="Tt-content">
			<view class="uni-swiper-msg">
				<view class="uni-swiper-msg-icon Tt-img">
					<image :src="tt"></image>
				</view>
				<swiper vertical="true" autoplay="true" circular="true" interval="2000">
					<swiper-item v-for="(item, index) in msg" :key="index" @tap='goToMeltTt(2)'>
						<view class="textTT" @tap='goToMeltTt(2)'>{{item.title || '暂时没有'}}</view>
					</swiper-item>
				</swiper>
			</view>
		</view>
	</view>
</template>

<script>
	import uniNoticeBar from "@/components/uni-notice-bar/uni-notice-bar.vue"
	export default {
	    data () {
	      return {
	        tt: this.Static + 'mbcImg/home/tt.png',
			msg : [
				
			]
	      };
	    },
		components: {uniNoticeBar},
		created() {
			this.getMsgList();
		},
	    methods: {
		  goToMeltTt (e) {
		  	this.clickItems = e;
		  	this.$store.commit('setHome', this.clickItems);
		  	this.$store.commit('setFindTabItems', 1); // 更新setFindTabItems
		  	uni.setStorageSync('clickItems', e);
		  },
		  getMsgList(){
		  	console.log('获取融头条数据');
			let params = {}; // 请求总数居时 参数为空
			uni.showLoading({ // 展示loading
				title: '加载中'
			});
			uni.request({
				url: this.api2 + '/index/msgList', //接口地址。
				data: params,
				header: {},
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
		width: 82upx;
		height: 28upx;
		top: 2upx;
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
	.textTT{
		position: relative;
		width: 100%;
		font-size: 24upx;
		color: #2E2E30;
		line-height: 44upx;
	}
</style>
