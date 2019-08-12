<template>
	<div class="costSave-content">
		<div class="CS-content">
			<div class="CS-Img-box">
				<image class="img" 
				:src="img" 
				lazy-load=ture
				></image>
			</div>
		</div>
	</div>
</template>

<script>
	import fastFinanceServices from '@/static/mbcImg/home/lookServices/fastFinanceServices.png';
	import bpPolish from '@/static/mbcImg/home/lookServices/bpPolish.png';
	
	export default {
	    data () {
			return {
				fastFinanceServices: fastFinanceServices,
				bpPolish: bpPolish,
				img: fastFinanceServices // 后台返回数据
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
		background: #fff;
	}
	.CS-content{
		position: relative;
		width: 750upx;
		margin: auto;
	}
	.CS-Img-box{
		position: relative;
		width: 100%;
	}
	.CS-Img-box>image{
		position: relative;
		width: 100%;
	}
</style>
