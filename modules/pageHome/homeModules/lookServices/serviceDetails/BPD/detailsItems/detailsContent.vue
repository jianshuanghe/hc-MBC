<template>
	<div class="costSave-content">
		<div class="CS-content">
			<div class="CS-Img-box">
				<image class="img1" 
				:src="img2" 
				lazy-load=ture
				></image>
			</div>
			<div class="CS-Img-box">
				<image class="img2" 
				:src="img3" 
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
				img2: this.Static + 'mbcImg/home/lookServices/3items2.png', // 后台返回数据
				img3: this.Static + 'mbcImg/home/lookServices/3items3.png' // 后台返回数据
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
		height: 410upx;
	}
	.img2{
		padding-top: 25upx;
		height: 410upx;
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
