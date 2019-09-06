<template>
	<div class="tips-content" @touchmove.prevent>
		<div class="tips-mask"></div>
		<div class="tips-box">
			<div class="tips-box-content">
				<div class="title">提示</div>
				<div class=""><slot></slot></div>
			</div>
		</div>
	</div>
</template>

<script>
	// import close from '@/static/mbcImg/common/close.png'
	import { mapMutations, mapGetters } from 'vuex';
	export default {
		data() {
			return {
				close: this.Static + 'mbcImg/common/searchClose.png'
			};
		},
		components: {
		},
		
		computed: {
		  ...mapGetters(['ENTRUSSHOW', 'ENTRUST'])
		},
		created() {
			console.log('在组件中并不能使用页面生命周期函数');
		},
		mounted() {
		},
		methods: {
			...mapMutations({
			}),
			handletouchmove (e) {
				console.log(e, '------------e------------')
				e.stopPropagation()
			}
		}
	};
</script>

<style>
	.tips-content{
		position: fixed;
		z-index: 200;
		top: 0;
		height: 100vh;
		width: 100vw;
	}
	.tips-mask{
		position: fixed;
		background: #2E2E30;
		opacity: 0.6;
		height: 100vh;
		width: 100vw;
		top: 0;
		z-index: 200;
	}
	.tips-box{
		position: fixed;
		height: 100vh;
		width: 100vw;
		top: 0;
		z-index: 201;
	}
	.img{
		position: absolute;
		right: 10upx;
		top: 10upx;
		height: 40upx;
		width: 40upx;
	}
	.tips-box-content{
		/*设置元素绝对定位*/
		    position:absolute;
		/*top 50%*/
		    top: 50%;
		/*left 50%*/
		    left: 50%;
		/*css3   transform 实现*/
		    transform: translate(-50%, -50%);
			width: 590upx;
			height: 360upx;
			background: #FFFFFF;
			box-shadow: 0 2px 6px 0 rgba(46,46,48,0.20);
			border-radius: 2px;
	}
	.title{
		font-family: PingFangSC-Regular;
		font-size: 40upx;
		color: #2E2E30;
		text-align: center;
		line-height: 110upx;
		margin-top: 15upx;
	}
	
</style>
