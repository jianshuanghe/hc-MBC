<template>
	<view class="history3Footprint" @tap="gotomyListfootprint">
		<span>{{List.footprintCount}}</span>
		<span>足迹</span>
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
					console.log(a, b, '--------------------------------------------------------------------');
					this.List=a.MyList.header
					console.log(this.List)
				},
				deep: true
			}
		},
		methods: {
			gotomyListfootprint(e) {   
				console.log(e)
			    uni.navigateTo({
			        url: '/modules/pageMy/myList/myListfootprint/footprint',
			    });
			}
		}
	};
</script>

<style>
	.history3Footprint{
		width: 250upx;
		height: 100%;
		text-align: center;
	}
	.history3Footprint span:nth-of-type(1){
		font-size: 36upx;
		color: #2E2E30;
		font-weight: 700;
		margin-top: 15upx;
		display: block;
	}.history3Footprint span:nth-of-type(2){
		font-size: 26upx;
			color: #2E2E30;
			display: block;
	}
</style>
