<template>
	<view class="home-Tt">
		<view class="Tt-content">
			<view class="left Tt-img-box">
				<view class="Tt-img">
					<image :src='tt'></image>
				</view>
			</view>
			<view class="left Tt-text-box">
				<view class="Tt-text">
					<text class="">1如何秀完成2000万B轮融资，投资本为慧聪云信大…</text>
				</view>
				<view class="Tt-text">
					<text class="">2如何秀完成2000万B轮融资，投资本为慧聪云信大…</text>
				</view>
			</view>
			<view class="clear"></view>
		</view>
	</view>
</template>

<script>
	import tt from '@/static/mbcImg/home/tt.png';
	export default {
	    data () {
	      return {
	        tt: tt,
	      };
	    },
	    methods: {
	      clickSearch () {
	        console.log('点击触发搜索组件');
	        // this.$router.push({
	        //   path: '/searchDetile',
	        //   query: {}
	        // });
	      }
	    }
	};
</script>

<style>
	.home-Tt{
		position: relative;
		width: 670upx;
		margin-left: 40upx;
		margin-top: 26upx;
		margin-bottom: 14upx;
	}
	.Tt-content{
		position: relative;
		width: 100%;
		height: 40upx;
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
		height: 30upx;
	}
	.Tt-text-box{
		position: relative;
		width: 500upx;
	}
	.Tt-text{
		position: relative;
		width: 600upx;
		line-height: 40upx;
		text-overflow:ellipsis; // 表示文本超出用省略号代替
		white-space:nowrap; // 表示文本不换行；
		overflow:hidden; // 表示超出隐藏
		-webkit-animation: 1s Tt-text linear infinite normal;
		animation: 1s Tt-text linear infinite normal;
		position: relative;
	}
	@-webkit-keyframes Tt-text {
            0% {
                -webkit-transform: translate3d(0, 0, 0);
                transform: translate3d(0, 0, 0);
            }
            100% {
                -webkit-transform: translate3d(0, -40upx, 0);
                transform: translate3d(0, -40upx, 0);
            }
        }
        @keyframes Tt-text {
            0% {
                -webkit-transform: translate3d(0, 0, 0);
                transform: translate3d(0, 0, 0);
            }
            100% {
                -webkit-transform: translate3d(0, -40upx, 0);
                transform: translate3d(0, -40upx, 0);
            }
        }
	.Tt-text>text{
		font-family: PingFangSC-Regular;
		font-size: 24upx;
		color: #2E2E30;
		letter-spacing: 0;
	}
</style>
