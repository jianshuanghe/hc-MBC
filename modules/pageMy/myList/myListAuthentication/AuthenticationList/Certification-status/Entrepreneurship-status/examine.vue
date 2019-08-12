<template>
	<view class="examine">
		<!-- 创业者 认证成功 -->
		<Success v-if="num===1"></Success>
		<!-- 创业者 审核中 -->
		<progress1 v-if="num===2"></progress1>
		<!-- 创业者 审核失败 -->
		<failure v-if="num===3"></failure>
		<!-- 创业者 未认证 -->
		<Uncertified v-if="num===4"></Uncertified>
	</view>
</template>

<script>
	import Success from './examineList/examine-Success'
	import progress1 from './examineList/examine-progress1'
	import failure from './examineList/examine-failure'
	import Uncertified from './examineList/examine-Uncertified'
	export default {
		data() {
			return {
				num:4
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
	.examine{
		width: 100%;
	}
</style>
