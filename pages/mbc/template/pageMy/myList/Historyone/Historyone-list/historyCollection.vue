<template>
	<view class="historyCollection" @tap="gotoCollection">
		<view>{{List.followCount}}</view>
		<view>收藏</view>
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
		},
		mounted() {
			
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
				let landRegistLG = JSON.parse(uni.getStorageSync('landRegist')); // 读取缓存的用户信息
				console.log(landRegistLG.user.id);
				uni.navigateTo({
					url: '/modules/pageMy/myList/myListCollection/Collection',
				});
			}
		}
	};
</script>

<style>
	.historyCollection {
		width: 375upx;
		height: 100%;
		/* background: red; */
		text-align: center;
	}

	.historyCollection view:nth-of-type(1) {
		font-size: 36upx;
		color: #2E2E30;
		font-weight: 700;
		padding-top: 2.5%;
		display: block;
	}

	.historyCollection view:nth-of-type(2) {
		font-size: 26upx;
		color: #2E2E30;
		display: block;
	}
</style>
