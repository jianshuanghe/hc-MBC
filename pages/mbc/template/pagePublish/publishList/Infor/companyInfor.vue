<template>
	<view class="companyInfor-content">
		<div class="company-content-box">
			<div class="basicInfor-box">
				<!-- 公司全称 -->
				<div class="BI-items">
					<div class="left BI-items-left">
						<div class="mustFill">
							<image :src='xing'></image>
						</div>
						<div class="BI-text-left">公司全称</div>
					</div>
					<div class="right BI-items-right">
						<div class="BI-text-right">
							<wInput
								v-model="text"
								placeholder="请输入"
							></wInput>
						</div>
					</div>
					<div class="clear"></div>
					<div class="line"></div>
				</div>
				<!-- 官网(选填) -->
				<div class="BI-items">
					<div class="left BI-items-left">
						<!-- <div class="mustFill">
							<image :src='xing'></image>
						</div> -->
						<div class="BI-text-left">官网(选填)</div>
					</div>
					<div class="right BI-items-right">
						<div class="BI-text-right">
							<wInput
								v-model="text"
								placeholder="请输入"
							></wInput>
						</div>
					</div>
					<div class="clear"></div>
					<div class="line"></div>
				</div>
			</div>
		</div>
	</view>
</template>

<script>
	import wInput from './../../../../../../components/watch-login/watch-input1.vue';
	import xing from '@/static/mbcImg/common/xing.png';
	export default {
	    components: {
	      wInput
	    },
	    data () {
	      return {
				text: '',
				logo: '', // 项目logo
				xing: xing
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
		height: 260upx;
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
