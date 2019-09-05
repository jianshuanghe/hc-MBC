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
	
	
	export default {
	    data () {
			return {
				// 速融服务
				img1: this.Static + 'mbcImg/home/lookServices/items2.png', // 后台返回数据
				img2: this.Static + 'mbcImg/home/lookServices/items3.png', // 后台返回数据
				img3: this.Static + 'mbcImg/home/lookServices/items4.png', // 后台返回数据
				img4: this.Static + 'mbcImg/home/lookServices/items5-1.png', // 后台返回数据
				img41: this.Static + 'mbcImg/home/lookServices/items5-2.png',// 后台返回数据
				img5: this.Static + 'mbcImg/home/lookServices/items6.png' ,// 后台返回数据
				// BP打磨
				img1S: this.Static + 'mbcImg/home/lookServices/2items2.png', // 后台返回数据
				img2S: this.Static + 'mbcImg/home/lookServices/2items3.png', // 后台返回数据
				img3S: this.Static + 'mbcImg/home/lookServices/2items4.png', // 后台返回数据
				img4S: this.Static + 'mbcImg/home/lookServices/2items5.png', // 后台返回数据
				img5S: this.Static + 'mbcImg/home/lookServices/2items6.png' // 后台返回数据
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
		height: 400upx;
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
