<template>
	<view class="projectTop-content">
		<view class="projectTop">
			<view class="projectTop-top" v-if="msgData.projName">
				
				<view class="left text-projectTop">
					<view class="title">{{msgData.projName || ''}}</view>
					<view class="ins">{{msgData.projSlogan || ''}}</view>
					<view class="inss">{{msgData.fieldCode || ''}} | {{msgData.pcode || ''}}</view>
				</view>
				<view class="projectTop-top-new" v-if="msgData.projCapis.length!==0">
					上轮获投情况
					<view class="">{{msgData.projCapis[0].levelCode || ''}}</view>
					<view v-if="msgData.projCapis[0].capiMoney!==''">{{msgData.projCapis[0].capiMoney || ''}}万元</view>
					<view v-if="msgData.projCapis[0].capiMoney==''">金额未披露</view>
				</view>
				<view class="left img-projectTop">
					<image class="img" :src="msgData.projLogo || ''"></image>
				</view>
				<view class="clear"></view>
			</view>
			<view class="projectTop-bot">
				<view class="line"></view>
				<view class="bot-box">
					<view class="items left" v-for="(items,index) in msgData.projLabels" :key="index">{{items.labelName || ''}}</view>
					<view class="clear"></view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import { mapGetters } from 'vuex';
	export default {
	    data () {
			return {
				arr:[],
				listData:[]
			};
	    },
		props: {
			msgData: {
				type: Object
			}
		},
		
		created() {
			console.log(this.msgData, '子组件获取的数据this.msgData');
		},
	    methods: {
			
	    }
	};
</script>

<style>
	.projectTop-content{
		position: relative;
		background: #fff;
		padding: 30upx;
	}
	.projectTop{
		position: relative;
		background: rgba(255,255,255,0.90);
		border: 1px solid rgba(226,226,226,0.50);
		box-shadow: 0 1px 8px 0 #EBEBEB;
		border-radius: 4px;
		padding: 40upx;
		/* height: 304upx; */
	}
	.projectTop-top{
		position: relative;
		width: 96%;
		margin-left: 2%;
		margin-bottom: 20upx;
	}
	.img-projectTop{
		position: absolute;
		width: 25%;
		right: 0;
		top: 0;
	}
	.img-projectTop>image{
		position: absolute;
		width: 90upx;
		height: 90upx;
		border-radius: 10upx;
		margin: 0 auto;
		top: 0upx;
		right:0upx ;
	}
	.text-projectTop{
		position: relative;
		width: 75%;
		margin-top: -30rpx;

	}
	.title{
		font-family: PingFang-SC-Bold;
		font-size: 40upx;
		color: #2E2E30;
		letter-spacing: 0;
		line-height: 80upx;
		font-weight: bold;
	}
	.ins{
		position: relative;
		width: 100%;
		font-family: PingFangSC-Regular;
		font-size: 24upx;
		color: #9B9B9B;
		line-height: 30upx;
		margin-bottom: 10upx;
		margin-top: -15upx;
	}
	.inss{
		position: relative;
		width: 100%;
		font-family: PingFangSC-Regular;
		font-size: 24upx;
		color: #9B9B9B;
		line-height: 40upx;
		margin-top: 10upx;
		overflow: hidden; //超出的文本隐藏
		text-overflow: ellipsis; //溢出用省略号显示
		white-space: nowrap; //溢出不换行
	}
	.projectTop-bot{
		position: relative;
		width: 96%;
		margin-left: 2%;
	}
	.bot-box{
		position: relative;
		width: 100%;
		top: 16upx;
	}
	.items{
		position: relative;
		font-family: FZLTHJW--GB1-0;
		font-size: 18upx;
		background: #FFF7E5;
		color: #FE9D08;
		letter-spacing: 0;
		line-height: 30upx;
		border-radius: 2px;
		padding: 4upx 6upx;
		margin-right: 10upx;
		margin-top: 10upx;
	}
	.projectTop-top-new{
		width: 300upx;
		/* height: 100upx; */
		font-size: 24upx;
		color: #9B9B9B;
		margin-left: -4upx;
		position: relative;
		margin-bottom: 50upx;
		margin-top: 0upx;
	}
	.projectTop-top-new>view:nth-of-type(1){
		position: absolute;
		margin-top: 0upx;
		margin-left: 5upx;
		height: 30upx;
		width: 100upx;
		font-size: 24upx;
		color: black;
		line-height: 30upx;
	}
	.projectTop-top-new>view:nth-of-type(2){
		position: absolute;
		margin-top: 0upx;
		margin-left: 120upx;
		height: 25upx;
		width: 200upx;
		font-size: 24upx;
		color: black;
		line-height: 25upx;
		border-left: 2upx solid #9B9B9B;
		padding-left: 20upx;
	}
</style>
