<template>
	<view class="Message">
		<view class="Message-Tips" v-for="(item,index) in Newdata.rows" :key="index">
			<view>{{item.title}}<span>12:08</span></view>
			<view>{{item.content}}</view>
		</view>
	</view>
</template>

<script>
	import { mapMutations, mapGetters } from 'vuex';
	export default {
		props:['Newdata'],
		data () {
			return {
				
			};
		},
		methods:{
			
		}
		
	}
</script>

<style>
	.Message{
		width: 100%;
		height: 100%;
		background: #FFFFFF;
	}
	.Message-Tips{
		width: 100%;
		height: 208upx;
		border-bottom: 2upx solid  #F5F5F5;
		position: relative;
	}
	.Message-Tips view:nth-of-type(1){
		font-size: 30upx;
		color: #2E2E30;
		font-weight:700 ;
		padding-top: 40upx;
		padding-left: 30upx;
	}
	.Message-Tips view:nth-of-type(1) span{
		font-size: 24upx;
		color: #BDBDBD;
		position: absolute;
		right: 30upx;
		font-weight: 0;
	}
	.Message-Tips view:nth-of-type(2){
		width: 690upx;
		font-size: 26upx;
		color: #9B9B9B;
		padding-top: 10upx;
		padding-left: 30upx;
	}
</style>
