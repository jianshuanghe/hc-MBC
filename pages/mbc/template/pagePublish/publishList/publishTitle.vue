<template>
	<view class="publishTitle" id="publishTitle">
		<view class="center-publishTitle">
			<view class="news-TBox left" @tap="clickPublishTitle(1)">
			  <view :class="clickItemsIndex === 1 ? 'Tbox-items Tb-checked' : 'Tbox-items'">
				<p class="home-left-p">1、上传BP</p>
				<view class="hengLine" v-if="clickItemsIndex === 1"></view>
			  </view>
			</view>
			<view class="news-TBox left" @tap="clickPublishTitle(2)">
			  <view  :class="clickItemsIndex === 2 ? 'Tbox-items Tb-checked' : 'Tbox-items'">
				<p class="home-right-p">2、基本信息</p>
				<view class="hengLine"  v-if="clickItemsIndex === 2"></view>
			  </view>
			</view>
			<view class="clear"></view>
		</view>
		<view class="line"></view>
	</view>
</template>

<script>
	import { mapMutations, mapGetters } from 'vuex';
	export default {
	    data () {
			return {
				clickItemsIndex: 1
			};
	    },
		mounted(){
		},
		computed: {
			...mapGetters(['GET_PUBLISH'])
		},
		watch: {
			GET_PUBLISH: {
			  handler (a, b) {
				this.clickItemsIndex = a.titleIndex;
			  },
			  deep: true
			}
		},
		created() {
			if(uni.getStorageSync('clickItemsIndexPublish')) {
				this.clickItemsIndex = uni.getStorageSync('clickItemsIndexPublish'); // 取缓存中tabbar数据
				this.clickPublishTitle(this.clickItemsIndex);
			}
		},
	    methods: {
			...mapMutations({
				setPublishTitleIndex: 'setPublishTitleIndex'
			}),
			clickPublishTitle (e) {
				if (e === 2) {
					if(uni.getStorageSync('isUpLoadFile')) {
						let isUpLoadFile = JSON.parse(uni.getStorageSync('isUpLoadFile')); // 
						if (isUpLoadFile.isSuccess === true) {
							this.clickItemsIndex = e;
							uni.setStorageSync('clickItemsIndexPublish', e);
							console.log(e, '切换上传BP和基本信息');
							this.$store.commit('setPublishTitleIndex', this.clickItemsIndex); // 更新setPublishTitleIndex
						} else {
							uni.showToast({
								title: '请上传BP',
								icon: 'none',
								duration: 1000
							});
						}
					} else {
						uni.showToast({
							title: '请上传BP',
							icon: 'none',
							duration: 1000
						});
					}
				} else if (e === 1) {
					this.clickItemsIndex = e;
					uni.setStorageSync('clickItemsIndexPublish', e);
					console.log(e, '切换上传BP和基本信息');
					this.$store.commit('setPublishTitleIndex', this.clickItemsIndex); // 更新setPublishTitleIndex

				}
			}
	    }
	};
</script>

<style>
	.publishTitle{
		position: fixed;
		width: 100%;
		z-index: 100;
		top: 0;
		background: #fff;
		height: 88upx;
	}
  .newsTitle{
    position: relative;
    width: 100%;
  }
  .center-publishTitle{
    position: relative;
    width: 50%;
	margin: auto;

  }
  .news-TBox{
    position: relative;
    width: 50%;
  }
  .Tbox-items{
    position: relative;
    width: 100%;
  }
  .home-left-p{
	ont-family: PingFangSC-Regular;
	font-size: 28upx;
	color: #5D5D5D;
	line-height: 60upx;
	margin-top: 16upx;
	text-align: center;
  }
  .home-right-p{
    ont-family: PingFangSC-Regular;
	font-size: 28upx;
	color: #5D5D5D;
	line-height: 60upx;
	margin-top: 16upx;
	text-align: center;
  }
  .hengLine{
    position: relative;
    background: #02C2A2;
	height: 4upx;
	width: 40upx;
	border-radius: 100upx;
    margin: 0 auto;
	margin-bottom: 8upx;
  }
  .Tb-checked>p{
    font-family: PingFangSC-Medium;
	color: #02C2A2 !important;
  }
</style>
