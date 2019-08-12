<template>
	<view class="history2Footprint" @tap="gotomyListfootprint">
		<span>{{Listdata.footprintCount}}</span>
		<span>足迹</span>
	</view>
</template>

<script>
	import { mapMutations,mapGetters } from 'vuex';
	export default {
		data() {
			return {
				Listdata: []
			};
		},
		computed: {
			...mapGetters(['GET_MY'])
		},
		watch: {
			GET_MY: {
				handler(a, b) {
					console.log(a, b, 'header----list');
				},
				deep: true
			}
		},
		created() {
			this.Listdata = this.GET_MY.MyList.header;
			console.log(this.Listdata, 'this.Listdata');
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
	.history2Footprint{
		width: 187upx;
		height: 100%;
		text-align: center;
		float: left;
	}
	.history2Footprint span:nth-of-type(1){
		font-size: 36upx;
		color: #2E2E30;
		font-weight: 700;
		padding-top: 2.5%;
		display: block;
	}.history2Footprint span:nth-of-type(2){
		font-size: 26upx;
			color: #2E2E30;
			display: block;
	}
</style>
