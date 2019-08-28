<template>
	<view class="history2Look" @tap="gotoLookme">
		<span>{{List.lookUserCount}}</span>
		<span>看过我</span>
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
			
			gotoLookme(e) {   
				console.log(e)
				console.log(this.list)
			    uni.navigateTo({
			        url: '/modules/pageMy/myList/myListlookme/Lookme',
			    });
			}
		}
	};
</script>

<style>
	.history2Look{
		width: 187upx;
		height: 100%;
		text-align: center;
		float: left;
	}
	.history2Look span:nth-of-type(1){
		font-size: 36upx;
		color: #2E2E30;
		font-weight: 700;
		padding-top: 2.5%;
		display: block;
	}.history2Look span:nth-of-type(2){
		font-size: 26upx;
			color: #2E2E30;
			display: block;
	}
</style>
