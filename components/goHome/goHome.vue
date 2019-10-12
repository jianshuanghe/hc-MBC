<template>
	<div class="goHome-content" @tap='goToHome(1)'>
		<div class="gH-box">
			<img :src="goHome" alt="" class="gH-img">
		</div>
	</div>
</template>

<script>
	// import inputBox from "./entrustItems/input.vue";
	import goHome from "@/static/mbcImg/common/goHome.png";
	export default {
		data() {
			return {
				goHome: goHome
			};
		},
		components: {
		},
		
		computed: {
		},
		created() {
			console.log('在组件中并不能使用页面生命周期函数');
		},
		mounted() {
		},
		methods: {
			goToHome (e) {
				console.log('去主页！');
				uni.setStorageSync('clickItems', e);
				uni.reLaunch({
				    url: '/pages/mbc/home'
				});
			}
		}
	};
</script>

<style>
	.goHome-content{
		position: fixed;
		width: 100upx;
		height: 100upx;
		top: 70vh;
		right: 10upx;
		z-index: 120;
	}
	.gH-box{
		position: relative;
		width: 100%;
	}
	.gH-img{
		position: relative;
		width: 100upx;
		height: 100upx;
	}
</style>
