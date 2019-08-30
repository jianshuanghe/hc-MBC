<template>
	<div class="projectTop-content">
		<div class="projectTop">
			<div class="projectTop-top">
				<div class="left img-projectTop">
					<image class="img" :src="msgData.projLogo"></image>
				</div>
				<div class="left text-projectTop">
					<div class="title">{{msgData.projName}}</div>
					<div class="ins">{{msgData.projSlogan}}</div>
					<div class="ins">{{msgData.fieldCode}} | {{msgData.pcode}}</div>
				</div>
				<div class="clear"></div>
			</div>
			<div class="projectTop-bot">
				<div class="line"></div>
				<div class="bot-box">
					<div class="items left" v-for="(items,index) in msgData.projLabels" :key="index">{{items.labelName}}</div>
					<div class="clear"></div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
	    data () {
			return {
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
		width: 750upx;
		background: #fff;
		padding: 30upx;
	}
	.projectTop{
		position: relative;
		width: 100%;
		background: rgba(255,255,255,0.90);
		border: 1px solid rgba(226,226,226,0.50);
		box-shadow: 0 1px 8px 0 #EBEBEB;
		border-radius: 4px;
		padding: 40upx;
	}
	.projectTop-top{
		position: relative;
		width: 96%;
		margin-left: 2%;
		margin-bottom: 20upx;
	}
	.img-projectTop{
		position: relative;
		width: 25%;
	}
	.img-projectTop>image{
		position: relative;
		width: 90upx;
		height: 90upx;
		border-radius: 10upx;
		margin: 0 auto;
		top: 40upx;
	}
	.text-projectTop{
		position: relative;
		width: 75%;
	}
	.title{
		font-family: PingFang-SC-Bold;
		font-size: 40upx;
		color: #2E2E30;
		letter-spacing: 0;
		line-height: 80upx;
	}
	.ins{
		position: relative;
		width: 100%;
		font-family: PingFangSC-Regular;
		font-size: 24upx;
		color: #9B9B9B;
		line-height: 40upx;
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
		font-size: 20upx;
		background: #FFF7E5;
		color: #FE9D08;
		letter-spacing: 0;
		line-height: 30upx;
		border-radius: 2px;
		padding: 4upx 6upx;
		margin-right: 10upx;
	}
</style>
