<template>
	<view class="datas-List-me">
		<view>
			<textarea placeholder="请编辑您的个人资料" maxlength="300" @input="descInput" v-model="desc" />
			<span class="numberV">{{remnane}}/300</span>
		</view>
		<view>保存</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				txtVal: 1,
				desc:"",
				remnane:0
			};
		},
		components: {
			
		},
		computed: {},
		created() {},
		mounted() {},
		methods: {
			descInput(){
				var txtVal = this.desc.length;
				this.remnane = 1 + txtVal;
			}

		}
	};
</script>

<style>
	.datas-List-me{
		width: 100%;
		height: 100%;
		background: #FFFFFF;
		padding: 2upx;
	}
	.datas-List-me view:nth-of-type(1){
		width: 90%;
		height: 370upx;
		margin: 30upx auto 30upx auto;
		position: relative;
	}
	.datas-List-me view:nth-of-type(1) textarea{
		width: 100%;
		height: 100%;
		background: #F9F9F9;
		padding: 20upx;
		padding-bottom: 50upx;
	}
	.numberV{
		font-size: 28upx;
		color: #D2D2D2;
		position: absolute;
		bottom: 0;
		right: 40upx;
	}
	.datas-List-me view:nth-of-type(2){
		width: 90%;
		height: 90upx;
		background: #02C2A2;
		margin: 100upx auto 100upx auto;
		text-align: center;
		line-height: 90upx;
		font-size: 32upx;
		color: #FFFFFF;
	}
</style>
