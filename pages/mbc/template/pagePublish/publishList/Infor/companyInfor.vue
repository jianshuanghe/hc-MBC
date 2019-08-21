<template>
	<view class="companyInfor-content">
		<view class="company-content-box">
			<view class="basicInfor-box">
				<!-- 公司全称 -->
				<view class="BI-items">
					<view class="left BI-items-left">
						<view class="mustFill">
							<image :src='xing'></image>
						</view>
						<view class="BI-text-left">公司全称</view>
					</view>
					<view class="right BI-items-right">
						<view class="BI-text-right">
							<wInput
								v-model="text"
								placeholder="请输入"
							></wInput>
						</view>
					</view>
					<view class="clear"></view>
					<view class="line"></view>
				</view>
				<!-- 官网(选填) -->
				<view class="BI-items">
					<view class="left BI-items-left">
						<!-- <view class="mustFill">
							<image :src='xing'></image>
						</view> -->
						<view class="BI-text-left">官网(选填)</view>
					</view>
					<view class="right BI-items-right">
						<view class="BI-text-right">
							<wInput
								v-model="text"
								placeholder="请输入"
							></wInput>
						</view>
					</view>
					<view class="clear"></view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import wInput from './../../../../../../components/watch-login/watch-input1.vue';
	export default {
	    components: {
	      wInput
	    },
	    data () {
	      return {
				text: '',
				logo: '', // 项目logo
				xing: this.Static + 'mbcImg/common/xing.png'
		  };
	    },
	    created () {
		},
	    mounted () {
	    },
	    methods: {
	    }
	  };
</script>

<style>
	.companyInfor-content{
		position: relative;
		width: 100%;
	}
	.company-content-box{
		position: relative;
		padding: 14upx 30upx;
		background: #fff;
		height: 234upx;
	}
	.basicInfor-box{
		position: relative;
		width: 100%;
	}
	.BI-items{
		position: relative;
		width: 100%;
	}
	.BI-items-left{
		position: relative;
		width: 36%;
	}
	.BI-text-left{
		position: relative;
		font-family: PingFang-SC-Medium;
		font-size: 28upx;
		color: #2E2E30;
		letter-spacing: 0;
		padding: 0px;
		margin-top: 44upx;
		margin-bottom: 44upx;
		line-height: 36upx;
		margin-left: 24upx
	}
	.BI-items-right{
		position: relative;
		width: 64%;
	}
	.BI-text-right{
		position: relative;
		width: 100%;
		margin-top: 44upx;
		margin-bottom: 44upx
	}
	.mustFill{
		position: absolute;
		left: 0;
	}
	.mustFill>image{
		position: relative;
		width: 14upx;
		height: 14upx;
	}
	.uni-input-wrapper{
		text-align: right;
	}
	.uni-input-placeholder{
		color: #D2D2D2 !important;
	}
</style>
