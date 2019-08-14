<template>
	<div class="costSave-content">
		<div class="CS-content">
			<div class="CS-Img-box">
				<image class="img1" 
				:src="img1" 
				lazy-load=ture
				></image>
			</div>
			<div class="CS-Img-box">
				<image class="img2" 
				:src="img2" 
				lazy-load=ture
				></image>
			</div>
			<div class="CS-Img-box">
				<image class="img3" 
				:src="img3" 
				lazy-load=ture
				></image>
			</div>
			<div class="CS-Img-box img4">
				<image class="img4" 
				:src="img4" 
				lazy-load=ture
				></image>
			</div>
			<div class="CS-Img-box img41">
				<image class="img41" 
				:src="img41" 
				lazy-load=ture
				></image>
			</div>
			<div class="CS-Img-box">
				<image class="img5" 
				:src="img5" 
				lazy-load=ture
				></image>
			</div>
			<div class="CS-Img-box">
				<image class="6" 
				:src="img6" 
				lazy-load=ture
				></image>
			</div>
		</div>
	</div>
</template>

<script>
	// 速融服务
	import items2 from '@/static/mbcImg/home/lookServices/items2.png';
	import items3 from '@/static/mbcImg/home/lookServices/items3.png';
	import items4 from '@/static/mbcImg/home/lookServices/items4.png';
	import items5 from '@/static/mbcImg/home/lookServices/items5-1.png';
	import items51 from '@/static/mbcImg/home/lookServices/items5-2.png';
	import items6 from '@/static/mbcImg/home/lookServices/items6.png';
	// BP打磨
	import items2S from '@/static/mbcImg/home/lookServices/2items2.png';
	import items3S from '@/static/mbcImg/home/lookServices/2items3.png';
	import items4S from '@/static/mbcImg/home/lookServices/2items4.png';
	import items5S from '@/static/mbcImg/home/lookServices/2items5.png';
	import items6S from '@/static/mbcImg/home/lookServices/2items6.png';
	
	
	export default {
	    data () {
			return {
				img1: items2, // 后台返回数据
				img2: items3, // 后台返回数据
				img3: items4, // 后台返回数据
				img4: items5, // 后台返回数据
				img41: items51 ,// 后台返回数据
				img5: items6 ,// 后台返回数据
				img1S: items2S, // 后台返回数据
				img2S: items3S, // 后台返回数据
				img3S: items4S, // 后台返回数据
				img4S: items5S, // 后台返回数据
				img5S: items6S // 后台返回数据
			};
	    },
		components: {
		},
		computed: {},
		watch: {},
		created() {
		},
	    methods: {
	    }
	};
</script>

<style>
	.costSave-content{
		position: relative;
		width: 750upx;
		margin-bottom: 70px;
	}
	.CS-content{
		position: relative;
		width: 750upx;
		margin: auto;
	}
	.CS-Img-box{
		position: relative;
		width: 100%;
		padding: 0 30upx;
		background: #fff;
	}
	.CS-Img-box>image{
		position: relative;
		width: 100%;
	}
	.img1{
		padding-top: 60upx;
	}
	.img2{
		padding-top: 25upx;
	}
	.img3{
		padding-top: 50upx;
		height: 800upx;
		margin-bottom: 60upx;
	}
	.img4{
		position: relative;
		height: 770upx;
	}
	.img41{
		position: relative;
		height: 770upx;
	}
	.img5{
		padding-top: 80upx;
	}
</style>
