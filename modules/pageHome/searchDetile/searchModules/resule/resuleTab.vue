<template>
	<view class="resuleTab-content">
		<view class="resuleTab">
			<view class="resuleTab-box">
				<view class="left RT-box" @tap="clikeResuleTab(items.id)" v-for="(items, index) in tabList" :key='items.id'>
					<view :class="clickItemsIndex === items.id ? 'RT-box-top active-tap' : 'RT-box-top'">{{items.text}}</view>
					<view class="RT-box-bot" v-if='clickItemsIndex === items.id'></view>
				</view>
				<view class="clear"></view>
			</view>
		</view>
		<view class="line"></view>
	</view>
</template>

<script>
	import { mapMutations, mapGetters } from 'vuex';
	export default {
		data() {
			return {
				clickItemsIndex: 1 ,// 默认展示综合
				tabList: [
					{
						text: '综合',
						id: 1
					},
					{
						text: '项目',
						id: 2
					},
					{
						text: '投资人',
						id: 3
					},
					{
						text: '投资机构',
						id: 4
					},
					{
						text: '资讯',
						id: 5
					}
				]
			};
		},
		components: {},
		computed: {
		  ...mapGetters(['GET_HOME'])
		},
		watch: {
			GET_HOME: {
				handler (a, b) {
					this.clickItemsIndex = a.HomeSearch.clickItemsIndex;
				},
				deep: true
			}
		},
		created() {
			console.log('在组件中并不能使用页面生命周期函数');
		},
		mounted() {
		},
		methods: {
			...mapMutations({
				setSearchItemsIndex: 'setSearchItemsIndex'
			}),
			clikeResuleTab (e) {
				console.log(e, '切换搜索结果tab');
				this.clickItemsIndex = e;
				this.$store.commit('setSearchItemsIndex', e); // 更新setSearchItemsIndex
			}
		}
	};
</script>

<style>
	.resuleTab-content{
		position: fixed;
		width: 750upx;
		margin-top: 118upx;
		background: #FFFFFF;
		z-index: 101;
	}
	.resuleTab{
		position: relative;
		width: 100%;
		margin-bottom: 10upx;
	}
	.resuleTab-box{
		position: relative;
		width: 100%;
	}
	.RT-box{
		position: relative;
		width: 20%;
	}
	.active-tap{
		font-size: 34upx !important;
		color: #02C2A2 !important;
	}
	.RT-box-top{
		font-family: PingFang-SC-Bold;
		font-size: 28upx;
		color: #2E2E30;
		letter-spacing: 0;
		text-align: center;
		line-height: 40upx;
		margin-bottom: 6upx;
	}
	.RT-box-bot{
		margin-top: 10upx;
		background: #02C2A2;
		border-radius: 100px;
		position: relative;
		width: 40upx;
		height: 4upx;
		margin: auto;
	}
</style>
