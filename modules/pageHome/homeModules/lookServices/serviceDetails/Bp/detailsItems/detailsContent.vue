<template>
	<div class="costSave-content">
		<div class="CS-content">
			<div class="CS-Img-box">
				<image class="img1" 
				:src="img1S" 
				lazy-load=ture
				></image>
			</div>
			<div class="CS-Img-box">
				<image class="img2" 
				:src="img2S" 
				lazy-load=ture
				></image>
			</div>
			<div class="CS-Img-box">
				<image class="img3" 
				:src="img3S" 
				lazy-load=ture
				></image>
			</div>
			<div class="CS-Img-box img4">
				<image class="img4" 
				:src="img4S" 
				lazy-load=ture
				></image>
			</div>
			<div class="CS-Img-box">
				<image class="img5" 
				:src="img5S" 
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
		background: #fff;
		padding: 0 30upx;
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
		height: 560upx;
	}
	.img3{
		padding-top: 50upx;
		height: 1000upx;
		margin-bottom: 60upx;
	}
	.img4{
		position: relative;
		height: 620upx;
	}
	.img41{
		position: relative;
		height: 770upx;
	}
	.img5{
		padding-top: 80upx;
	}
</style>
