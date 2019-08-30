<template>
	<view class="historyThree-BP" @tap="gotomyListreceive">
		<span>{{List.sendBpCount}}</span>
		<span>以收到</span>
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
		
		created() {
			// this.List=this.GET_MY.MyList.header;
			// console.log(this.List,'----------------------------------------------------------------------')
		},
		watch: {
			GET_MY: {
				handler(a, b) {
					// console.log(a, b, '--------------------------------------------------------------------');
					this.List=a.MyList.header
					console.log(this.List,'-----------')
				},
				deep: true
			}
		},
		methods: {
			gotomyListreceive(e) {   
				console.log(e)
			    uni.navigateTo({
			        url: '/modules/pageMy/myList/myListreceive/receive',
			    });
			}
		}
	};
</script>

<style>
	.historyThree-BP{
		width: 33%;
		min-height: 100%;
		background: #FFFFFF;
		text-align: center;
	}
	.historyThree-BP span:nth-of-type(1){
		font-size: 36upx;
		color: #2E2E30;
		font-weight: 700;
		padding-top: 2.5%;
		display: block;
	}.historyThree-BP span:nth-of-type(2){
		font-size: 26upx;
			color: #2E2E30;
			display: block;
	}
</style>
