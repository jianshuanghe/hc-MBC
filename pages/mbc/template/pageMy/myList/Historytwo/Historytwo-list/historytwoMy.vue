<template>
	<view class="history2My" @tap="gotomyproject">
		<span>{{List.projCount}}</span>
		<span>我的项目</span>
	</view>
</template>

<script>
	import { mapMutations,mapGetters } from 'vuex';
	export default {
		data() {
			return {
				List: []
			};
		},
		computed: {
			...mapGetters(['GET_MY'])
		},
		mounted(){

		},
		watch: {
			GET_MY: {
				handler(a, b) {
					this.List=a.MyList.header
					console.log(this.List)
				},
				deep: true
			}
		},
		methods: {
			
			gotomyproject() {
			    uni.navigateTo({
			        url: '/modules/pageMy/myList/myLisprojectt/myproject',
			    });
			}
		}
	};
</script>

<style>
	.history2My{
		width: 187upx;
		height: 100%;
		text-align: center;
		float: left;
	}
	.history2My span:nth-of-type(1){
		font-size: 36upx;
		color: #2E2E30;
		font-weight: 700;
		margin-top: 15upx;
		display: block;
	}.history2My span:nth-of-type(2){
		font-size: 26upx;
			color: #2E2E30;
			display: block;
	}
</style>
