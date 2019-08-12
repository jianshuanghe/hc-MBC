<template>
	<view class="multipleScreen-content">
		<!-- top -->
		<view class="multipleScreen">
			<view class="multipleScreen-box">
				<view :class="clickIndex === 1 ? 'left multiple tabInddex' : 'left multiple'" @tap='clickMultipleScreen(1)'>
					综合
					<image class="img-multiple" :src='arrow'></image>
				</view>
				<view class="right screen" @tap='clickMultipleScreen(2)'>
					<view class="line-Y-screen"></view>
					筛选
					<image class="img-screen" :src='screenUp'></image>
				</view>
				<view class="clear"></view>
			</view>
		</view>
		<!-- bot -->
		<view class="multipleScreen-list">
			<!-- 综合 -->
			<screenBox v-show='MULTIPLESCREEN.screenShow'></screenBox>
			<!-- 筛选 -->
			<multipleBox v-show='MULTIPLESCREEN.multipleShow'></multipleBox>
		</view>
	</view>
</template>

<script>
	import screenUp from '@/static/mbcImg/home/seekCapital/screenUp.png';
	import screenDown from '@/static/mbcImg/home/seekCapital/screenDown.png';
	import downArrow from '@/static/mbcImg/home/seekCapital/down-arrow.png';
	import upArrow from '@/static/mbcImg/home/seekCapital/up-arrow.png';
	import screenBox from "./screen/screen.vue";
	import multipleBox from "./multiple/multiple.vue";
	import { mapMutations, mapGetters } from 'vuex';
	export default {
	    data () {
			return {
				screenUp: screenUp,
				screenDown: screenDown,
				screen: screenUp,
				upArrow: upArrow, // 展示时图标--展开
				downArrow: downArrow, // 展示时图标---收起
				arrow: downArrow, // 默认图标
				clickIndex: 3 // 判断用户点击类型
			};
	    },
		components: {
			screenBox,
			multipleBox
		},
		computed: {
			...mapGetters(['MULTIPLESCREEN'])
		},
		watch: {
		  MULTIPLESCREEN: {
		    handler (a, b) {
				if(a.screenShow === false) {
					this.arrow = this.downArrow;
					if (this.clickIndex === 1) {
						this.clickIndex = 3;
					}
				} else if (a.multipleShow === false) {
					this.screen = this.screenUp;
					if (this.clickIndex === 2) {
						this.clickIndex = 3;
					}
				}
		    },
		    deep: true
		  }
		},
		mounted(){
		},
	    methods: {
			...mapMutations({
				setScreenShow: 'setScreenShow', // 综合展示
				setMultipleShow: 'setMultipleShow' // 筛选展示
			}),
			clickMultipleScreen (e) {
				if(e === 1) {
					this.screen = this.screenUp;
					console.log('触发展示综合按钮');
					if(this.clickIndex === 1) { // 重复点击
						this.clickIndex = 3;
						this.arrow = this.downArrow;
						this.$store.commit('setScreenShow', false); // 更新setScreenShow		
					} else {
						this.clickIndex = e;
						this.arrow = this.upArrow;
						this.$store.commit('setScreenShow', true); // 更新setScreenShow
						this.$store.commit('setMultipleShow', false); // 更新setMultipleShow
					}
				} else if (e === 2) {
					this.arrow = this.downArrow; // 收起
					console.log('触发展示筛选按钮');
					if(this.clickIndex === 2) { // 重复点击
						this.clickIndex = 3;
						this.screen = this.screenUp;
						this.$store.commit('setMultipleShow', false); // 更新setMultipleShow
					} else {
						this.clickIndex = e;
						this.screen = this.screenDown;
						this.$store.commit('setMultipleShow', true); // 更新setMultipleShow
						this.$store.commit('setScreenShow', false); // 更新setScreenShow
					}
				}
				
			}
	    }
	};
</script>

<style>
	.multipleScreen-content{
		position: fixed;
		width: 100%;
		margin-top: 90upx;
		background: #fff;
		z-index: 101;
		width: 100%;
	}
	.multipleScreen-list{
		position: relative;
		width: 100%;
	}
	.multipleScreen{
		padding: 0 30upx;
	}
	.multipleScreen-box{
		position: relative;
		width: 100%;
	}
	.multiple{
		position: relative;
		width: 30%;
		font-family: PingFangSC-Regular;
		font-size: 26upx;
		color: #2E2E30;
		line-height: 80upx;
	}
	.img-multiple{
		position: absolute;
		width: 28upx;
		height: 28upx;
		top: 28upx;
		left: 30%;
	}
	.screen{
		position: relative;
		width: 14%;
		font-family: PingFangSC-Regular;
		font-size: 26upx;
		color: #2E2E30;
		line-height: 80upx;
	}
	.line-Y-screen{
		position: absolute;
		width: 2upx;
		height: 40upx;
		background: #F5F5F5;
		right: 120upx;
		top: 20upx;
	}
	.img-screen{
		position: relative;
		width: 36upx;
		height: 36upx;
		top: 12upx;
		left: 8upx;
	}
	.tabInddex{
		color: #02C2A2 !important;
	}
</style>
