<template>
	<view class="Collection">
		<view class="CollectionNavigation">
			<view v-for="(item,index) in list" :key="index" :class="num==index?'changeColor':''" @click="gotoGood(index)">{{item}}</view>
		</view>
		<!-- 收藏 项目 -->
		<Listproject v-if="num===0"></Listproject>
		<!-- 收藏 投资人 -->
		<ListInvestor v-if="num===1"></ListInvestor>
		<!-- 收藏 投资机构 -->
		<ListMechanism v-if="num===2"></ListMechanism>
		<!-- 收藏 文章 -->
		<ListArticle v-if="num===3"></ListArticle>
	</view>
</template>

<script>
	import Listproject from './CollectionList/Listproject'
	import ListInvestor from './CollectionList/ListInvestor'
	import ListMechanism from './CollectionList/ListMechanism'
	import ListArticle from './CollectionList/ListArticle'
	export default {
		data() {
			return {
				list: ["项目", "投资人", "投资机构", "文章"],
				num: 0
			};
		},
		components: {
			Listproject,
			ListInvestor,
			ListMechanism,
			ListArticle
		},
		computed: {},
		created() {},
		mounted() {},
		methods: {
			gotoGood(index) {
				this.num = index;
				// console.log(index)
			}
		}
	};
</script>

<style>
	.Collection {
		width: 100%;
		min-height: 100%;
		background: #FFFFFF;
		position: relative;
	}

	.CollectionNavigation {
		position: fixed;
		top: 0;
		width: 100%;
		height: 88upx;
		box-shadow: 0 2upx 0 0 #F5F5F5;
		display: flex;
		justify-content: space-between;
		background: #FFFFFF;
		z-index: 10;
	}

	.CollectionNavigation view {
		width: 25%;
		height: 100%;
		font-size: 28upx;
		letter-spacing: 0;
		text-align: center;
		line-height: 88upx;
		position: relative;
	}

	.changeColor {
		/* color: #02C2A2; */
		font-weight: bold;
		font-size: 32upx;
	}

	.changeColor:before {
		content: '';
		position: absolute;
		left: 40%;
		top: 70upx;
		bottom: auto;
		right: auto;
		height: 7upx;
		width: 20%;
		background-color: #02C2A2;
	}
</style>
