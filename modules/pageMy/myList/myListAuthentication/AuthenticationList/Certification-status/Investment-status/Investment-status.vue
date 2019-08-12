<template>
	<view class="Investment-status">
		<!-- 投资人 认证成功 -->
		<Success v-if="num===1"></Success>
		<!-- 投资人 审核中 -->
		<progress1 v-if="num===2"></progress1>
		<!-- 投资人 审核失败 -->
		<failure v-if="num===3"></failure>
		<!-- 投资人 未审核 -->
		<Uncertified v-if="num===4"></Uncertified>
	</view>
</template>

<script>
	import Success from './InvestmentList/InvestmentList-Success'
	import progress1 from './InvestmentList/InvestmentList-progress1'
	import failure from './InvestmentList/InvestmentList-failure'
	import Uncertified from './InvestmentList/InvestmentList-Uncertified'
	
	export default {
		data() {
			return {
				num:1
			};
		},
		components: {
			Success,
			progress1,
			failure,
			Uncertified
		},
		computed: {},
		created() {},
		mounted() {},
		methods: {
			
		}
	};
</script>

<style>
	.Investment-status{
		width: 100%;
		margin-top: 40upx;
	}
</style>
