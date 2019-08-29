<template>
	<view class="edit-bianji">
		<view class="datas-List-vitae-name">
			<view class="datas-List-vitae-name-box">
				<view><input type="text" placeholder="输入标签内容" maxlength="15" placeholder-style="color:#D2D2D2" v-model="compName" /></view>
			</view>
		</view>
		<view class="edit-bianji-one">
			注：保持文字15个字以内
		</view>
		<view class="Investor-Submission">
			<view @tap="Submission">
				<view>
					提交
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import { mapMutations, mapGetters } from 'vuex';
	export default {
		data() {
			return {
				compName:'',
				id:''
			};
		},
		components: {
			
		},
		computed: {
			...mapGetters(['GET_MY'])
		},
		onLoad:function(options){
			this.id = options.id
			console.log(this.id)
		},
		methods: {
			...mapMutations({
				setEdit: 'setEdit'
			}),
			Submission(){
				this.$store.commit('setEdit', this.compName);
				uni.navigateBack({
				})
			}
		},
		mounted() {},
	};
</script>

<style>
	.edit-bianji{
		width: 100%;
		height: 100%;
		background: #FFFFFF;
	}
	.datas-List-vitae-name {
		width: 100%;
		height: 122upx;
		background: #FFFFFF;
	}
	
	.datas-List-vitae-name-box {
		width: 90%;
		height: 100%;
		border-bottom: 2upx solid #F5F5F5;
		margin: 0 auto;
		display: flex;
		position: relative;
	}
	.datas-List-vitae-name-box view:nth-of-type(1) {
		width: 100%;
		height: 35upx;
		position: absolute;
		right: 0;
		top: 40upx;
		font-size: 30upx;
		text-align: left;
	}
	.edit-bianji-one{
		width: 90%;
		height: 30upx;
		font-size: 24upx;
		color: #02C2A2;
		margin: 20upx auto;
	}
	.Investor-Submission {
		width: 100%;
		height: 122upx;
		background: #FFFFFF;
		margin-top: 100upx;
	}
	
	.Investor-Submission view:nth-of-type(1) view {
		width: 690upx;
		height: 90upx;
		background: #02C2A2;
		border-radius: 2px;
		margin-top: 20upx;
		text-align: center;
		line-height: 90upx;
		font-size: 28upx;
		color: #FFFFFF;
	}
	
	.Investor-Submission view:nth-of-type(1) {
		margin: 0 auto;
	}
</style>
