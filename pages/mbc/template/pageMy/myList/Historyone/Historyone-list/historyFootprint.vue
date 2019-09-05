<template>
	<view class="historyFootprint" @tap="gotomyListfootprint">
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
		},
		created() {
			
		},
		computed: {
			...mapGetters(['GET_MY'])
		},
		mounted() {},
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
	.historyFootprint {
		width: 375upx;
		height: 100%;
		text-align: center;
	}

	.historyFootprint span:nth-of-type(1) {
		font-size: 36upx;
		color: #2E2E30;
		font-weight: 700;
		margin-top: 15upx;
		display: block;
	}

	.historyFootprint span:nth-of-type(2) {
		font-size: 26upx;
		color: #2E2E30;
		display: block;
	}
</style>
