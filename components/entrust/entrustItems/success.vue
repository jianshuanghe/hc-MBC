<template>
	<view class="entrust-content">
		<view class="entrust-box">
			<view class="success-box">
				<view class="img">
					<image class="img-box" :src="success || this.dImg"></image>
				</view>
				<view class="En-title">申请提交成功</view>
				<view class="En-ins">您提交的信息正在处理，请耐心等待</view>
				<view class="l" v-if='entrust.type === 1'>
					<view class="En-more" @tap='clickLookMore()' v-if="entrust.params.applyeType === 0"> 查看其它投资人</view>
					<view class="En-more" @tap='clickLookMore()' v-if="entrust.params.applyeType === 1"> 查看其它投资机构</view>
					<view class="En-more" @tap='clickLookMore()' v-if="entrust.params.applyeType === 2"> 查看其他项目</view>
				</view>
				<view class="k" v-else>
					<view class="En-more" @tap='clickLookMore()'>查看其他服务</view>
				</view>
			</view>
			<view class="input-box">
				<view class="En-my-other">
					<view class="En-in-title">您的信息</view>
					<view class="En-in-name">
						姓名
						<text class="right">{{entrust.params.name}}</text>
					</view>
					<view class="En-in-name">
						手机号
						<text class="right">{{entrust.params.phone}}</text>
					</view>
				</view>
				<view class="line" v-if='entrust.type === 1'></view>
				<view class="En-my-other" v-if='entrust.type === 1'>
					<view class="En-in-title">委托联系信息</view>
					<view class="En-in-name">
						类别
						<text class="right">{{entrust.params.applyeType | applyeType}}</text>
					</view>
					<view class="En-in-name">
						名称
						<text class="right">{{entrust.params.projectName}}</text>
					</view>
					<!-- <view class="En-in-name">
						名称
						<image class="right" :src="iiImg"></image>
					</view> -->
				</view>
			</view>
			<view class="time">提交时间:  {{entrust.params.time | dateTime}}</view>
		</view>
	</view>
</template>

<script>
	import { mapMutations, mapGetters } from 'vuex';
	import date from '@/static/mbcJs/dateTime.js';
	export default {
	    data () {
			return {
				success: this.Static + 'mbcImg/home/entrust/success.png',
				yuan: this.Static + 'mbcImg/home/seekCapital/yuan.png',
				BannerItemsType: '', // 来源类型
				entrust: {}
			};
	    },
		props: {
			msgData: {
				type: Object
			}
		},
		computed: {
		  ...mapGetters(['ENTRUST'])
		},
		filters: {
		  /* 格式化时间戳 */
		  dateTime (val) {
		    return date.dateTime('.', val);
		  },
		  /* 格式化applyeType */
		  applyeType (val) {
			  console.log(val)
		    if (val === 0) {
				return '投资人';
			} else if (val === 1) {
				return '投资机构';
			} else if (val === 2) {
				return '项目';
			}
		  }
		},
		created() {
			this.entrust = this.ENTRUST;
			console.log(this.ENTRUST, 'ENTRUST');
		},
		beforeDestroy () {
			console.log('页面销毁之前缓存数据');
			this.$store.commit('setIsUploadFileIsFileSuccess', false); // 更新setIsUploadFileIsFileSuccess
			this.$store.commit('setAuthShow', false); // 更新setAuthShow
			uni.removeStorageSync('BannerItemsType'); // 清除来源
			uni.removeStorageSync('isListSource'); // 清除来源
		},
	    methods: {
			...mapMutations({
				setEnTrustShow: 'setEnTrustShow',
				clickItemsIndex: 'clickItemsIndex',
				setSeekCapitalTitleIndex: 'setSeekCapitalTitleIndex'
			}),
			clickSeekCapitalTitle (e) {
				this.clickItemsIndex = e;
				uni.setStorageSync('clickItemsIndex', e);
				console.log(e, '投资人BP和投资机构');
				this.$store.commit('setSeekCapitalTitleIndex', this.clickItemsIndex); // 更新setSeekCapitalTitleIndex
			},
			clickLookMore() {
				console.log('触发查看更多');
				this.$store.commit('setEnTrustShow', false); // 更新setEnTrustShow
				this.$store.commit('setEntrustSuccess', false); // 更新setEntrustSuccess
				if(uni.getStorageSync('BannerItemsType')) { // 来源banner
					this.BannerItemsType = uni.getStorageSync('BannerItemsType');
					if (this.BannerItemsType === 'server') { // 服务
						uni.redirectTo({
							url: '/modules/pageHome/homeModules/lookServices/lookServices'
						});
						uni.removeStorageSync('BannerItemsType'); // 清除来源
					}
				} else if (uni.getStorageSync('isListSource')) {
					if (uni.getStorageSync('isListSource') === 1) {
						console.log('来源于列表');
						uni.removeStorageSync('isListSource'); // 清除来源
						uni.navigateBack({
							delta: 1,
							animationType: 'pop-out',
							animationDuration: 200
						});
					}
				} else {
					if (this.entrust.params.applyeType === 0) {
						console.log('投资人');
						this.clickSeekCapitalTitle(1);
						uni.redirectTo({
							url: '/modules/pageHome/seekCapital/seekCapital'
						});
					} else if (this.entrust.params.applyeType === 1) {
						console.log('投资机构');
						this.clickSeekCapitalTitle(2);
						uni.redirectTo({
							url: '/modules/pageHome/seekCapital/seekCapital'
						});
					} else if (this.entrust.params.applyeType === 2) {
						console.log('项目')
						uni.redirectTo({
							url: '/modules/pageHome/homeModules/lookProject/lookProject'
						});
					}
				}
			}
	    }
	};
</script>

<style>
	.entrust-content{
		position: relative;
		width: 690upx;
		padding: 30upx;
		background: #FFf;
		height: 100vh;
	}
	.entrust-box{
		position: relative;
		width: 100%;
	}
	.success-box{
		position: relative;
		width: 100%;
	}
	.img{
		position: relative;
		width: 104upx;
		height: 104upx;
		margin: auto;
		margin-top: 100upx;
	}
	.img>image{
		position: relative;
		width: 100%;
		height: 100%;
		border-radius: 50%;
	}
	.En-title{
		font-family: PingFang-SC-Medium;
		font-size: 36upx;
		color: #2E2E30;
		letter-spacing: 0;
		text-align: center;
		line-height: 88upx;
		margin-top: 44upx;
	}
	.En-ins{
		position: relative;
		width: 100%;
		font-family: PingFang-SC-Medium;
		font-size: 28upx;
		color: #9B9B9B;
		letter-spacing: 0;
		line-height: 20upx;
		margin-bottom: 50upx;
		text-align: center;
	}
	.En-more{
		background: #02C2A2;
		border-radius: 2px;
		position: relative;
		width: 300upx;
		margin: auto;
		font-family: PingFangSC-Regular;
		font-size: 28upx;
		color: #FFFFFF;
		letter-spacing: 0;
		line-height: 90upx;
		text-align: center;
	}
	.input-box{
		background: #FAFAFA;
		padding: 30upx;
		margin-top: 110upx;
	}
	.En-my-other{
		position: relative;
		width: 100%;
	}
	.En-in-title{
		font-family: PingFang-SC-Bold;
		font-size: 28upx;
		color: #2E2E30;
		letter-spacing: 0;
		line-height: 50upx;
	}
	.En-in-name{
		font-family: PingFang-SC-Medium;
		font-size: 28upx;
		color: #2E2E30;
		letter-spacing: 0;
		line-height: 60upx;
	}
	.En-in-name>text{
		color: #5D5D5D;
		letter-spacing: 0;
		text-align: right;
	}
	.En-in-name>image{
		position: relative;
		width: 54upx;
		height: 54upx;
	}
	.time{
		font-family: PingFangSC-Regular;
		font-size: 24upx;
		color: #9B9B9B;
		line-height: 100upx;
	}
	.line{
		margin: 30upx 0;
	}
</style>
