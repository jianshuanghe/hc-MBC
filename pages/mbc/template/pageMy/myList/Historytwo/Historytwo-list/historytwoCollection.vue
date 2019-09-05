<template>
	<view class="history2Collection" @tap="gotoCollection">
		<span>{{List.followCount}}</span>
		<span>收藏</span>
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
			gotoCollection(e) {   
				console.log(e)
			    uni.navigateTo({
			        url: '/modules/pageMy/myList/myListCollection/Collection',
			    });
			}
		}
	};
</script>

<style>
	.history2Collection{
		width: 187upx;
		height: 100%;
		text-align: center;
		float: left;
	}
	.history2Collection span:nth-of-type(1){
		font-size: 36upx;
		color: #2E2E30;
		font-weight: 700;
		margin-top: 15upx;
		display: block;
	}.history2Collection span:nth-of-type(2){
		font-size: 26upx;
		color: #2E2E30;
		display: block;
	}
</style>
