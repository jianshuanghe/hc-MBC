<template>
	<view class="homeBanner">
		<uni-swiper-dot :info="info" :current="current" field="content" :mode="mode">
			<swiper class="swiper-box" @change="change">
				<swiper-item v-for="(item ,index) in info" :key="index">
					<view class="swiper-item">
						<image :src="item.content" class="bannerImg"></image>
					</view>
				</swiper-item>
			</swiper>
		</uni-swiper-dot>

	</view>
</template>

<script>
import {uniSwiperDot} from "@dcloudio/uni-ui";
import banner1 from '@/static/mbcImg/home/banner1.png';
export default {
    components: {uniSwiperDot},
	data() {
        return {
            info: [{
                content: banner1
            }, {
                content: banner1
            }, {
                content: banner1
            }, {
                content: banner1
            }],
            current: 0,
            mode: 'default',
        }
    },
    methods: {
        change(e) {
            this.current = e.detail.current;
        }
    }
}
</script>

<style>
	.homeBanner{
		position: relative;
		width: 670upx;
		height: 330upx;
		margin-left: 40upx;
		margin-top: 20upx;
		border-radius: 10upx;
	}
	.uni-swiper-wrapper{
		border-radius: 10upx;
	}
	.swiper-box{
		height: 330upx !important;
		border-radius: 10upx;
	}
	.bannerImg{
		position: relative;
		width: 100%;
		height: 330upx;
		border-radius: 10upx;
	}
</style>
