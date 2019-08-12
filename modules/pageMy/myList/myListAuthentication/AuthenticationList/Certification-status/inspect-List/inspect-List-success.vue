<template>
	<view class="inspect-List-success">
		<view class="inspect-List-success-header">
			<view>
				<image :src="Image6"></image>
			</view>
			<view>审核已通过</view>
		</view>
		<view class="inspect-List-success-conter">
			<view>王亚蒙</view>
			<view>职位:运营</view>
			<view>邮箱:123@.com</view>
			<view>机构名称:慧聪集团</view>
			<view>
				<image :src="Image6"></image>
			</view>
		</view>
		<view class="inspect-List-success-fotter">
			<view>
				<image :src="Image4"></image>
			</view>
			<view>
				<view>审核通过</view>
				<view>2019.05.23 10:23:34</view>
				<view>审核中</view>
				<view>2019.05.23 10:23:34</view>
				<view>发起认证</view>
				<view>2019.05.23 10:23:34</view>
			</view>
		</view>
	</view>
</template>

<script>
	import Image6 from '@/static/mbcImg/my/Image 6.png'
	import Image4 from '@/static/mbcImg/my/Image4.png'
	export default {
		data() {
			return {
				Image6: Image6,
				Image4: Image4,
			};
		},
		components: {

		},
		computed: {},
		created() {},
		mounted() {},
		methods: {
			
		}
	};
</script>

<style>
	.inspect-List-success {
		width: 100%;
		/* max-height: 100%; */
	}

	.inspect-List-success-header {
		width: 100%;
		height: 60upx;
		background: #CBF3EC;
		display: flex;
	}

	.inspect-List-success-header view:nth-of-type(1) {
		width: 34upx;
		height: 34upx;
		padding-left: 32upx;
		padding-top: 15upx;
	}

	.inspect-List-success-header view:nth-of-type(1) image {
		width: 100%;
		height: 100%;
	}

	.inspect-List-success-header view:nth-of-type(2) {
		padding-left: 10upx;
		font-size: 30upx;
		color: #02C2A2;
		padding-top: 5upx;
	}

	.inspect-List-success-conter {
		width: 100%;
		height: 580upx;
		background: #FFFFFF;
	}

	.inspect-List-success-conter view:nth-of-type(1) {
		font-size: 36upx;
		color: #2E2E30;
		padding-top: 60upx;
		padding-left: 48upx;
	}

	.inspect-List-success-conter view:nth-of-type(2) {
		font-size: 28upx;
		color: #5D5D5D;
		padding-top: 30upx;
		padding-left: 48upx;
	}

	.inspect-List-success-conter view:nth-of-type(3) {
		font-size: 28upx;
		color: #5D5D5D;
		padding-left: 48upx;
	}

	.inspect-List-success-conter view:nth-of-type(4) {
		font-size: 28upx;
		color: #5D5D5D;
		padding-left: 48upx;
	}

	.inspect-List-success-conter view:nth-of-type(5) {
		width: 320upx;
		height: 179upx;
		padding-top: 30upx;
		color: #5D5D5D;
		padding-left: 48upx;
	}

	.inspect-List-success-conter view:nth-of-type(5) image {
		width: 100%;
		height: 100%;
	}

	.inspect-List-success-fotter {
		width: 100%;
		height: 660upx;
		background: #FFFFFF;
		margin-top: 30upx;
		display: flex;
	}

	.inspect-List-success-fotter view:nth-of-type(1) {
		width: 25upx;
		height: 268upx;
		/* background: red; */
		padding-top: 55upx;
		padding-left: 48upx;
	}

	.inspect-List-success-fotter view:nth-of-type(1) image {
		width: 100%;
		height: 100%;
	}

	.inspect-List-success-fotter view:nth-of-type(2) {
		width: 300upx;
		height: 350upx;
		padding-top: 40upx;
		padding-left: 20upx;
	}

	.inspect-List-success-fotter view:nth-of-type(2) view:nth-of-type(1) {
		width: 200upx;
		height: 30upx;
		padding-top: 0;
		padding-left: 0;
		font-size: 30upx;
		color: #2E2E30;
	}

	.inspect-List-success-fotter view:nth-of-type(2) view:nth-of-type(2) {
		width: 100%;
		height: 30upx;
		padding-top: 20upx;
		padding-left: 0;
		font-size: 20upx;
		color: #9B9B9B;
	}.inspect-List-success-fotter view:nth-of-type(2) view:nth-of-type(3) {
		width: 200upx;
		height: 30upx;
		padding-top: 40upx;
		padding-left: 0;
		font-size: 30upx;
		color: #9B9B9B;
	}

	.inspect-List-success-fotter view:nth-of-type(2) view:nth-of-type(4) {
		width: 100%;
		height: 30upx;
		padding-top: 20upx;
		padding-left: 0;
		font-size: 20upx;
		color: #9B9B9B;
	}.inspect-List-success-fotter view:nth-of-type(2) view:nth-of-type(5) {
		width: 200upx;
		height: 30upx;
		padding-top: 40upx;
		padding-left: 0;
		font-size: 30upx;
		color: #9B9B9B;
	}

	.inspect-List-success-fotter view:nth-of-type(2) view:nth-of-type(6) {
		width: 100%;
		height: 30upx;
		padding-top: 20upx;
		padding-left: 0;
		font-size: 20upx;
		color: #9B9B9B;
	}
</style>
