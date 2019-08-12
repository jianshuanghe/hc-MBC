<template>
	<view class="AuthenticationList">
		<!-- 认证 创业者 -->
		<Entrepreneurs></Entrepreneurs>
		<!-- 认证 投资者 -->
		<Investor></Investor>
	</view>
</template>

<script>
	import Entrepreneurs from './AuthenticationList/AuthenticationList-Entrepreneurs'
	import Investor from './AuthenticationList/AuthenticationList-Investor'
	export default {
		data() {
			return {
				
			};
		},
		components: {
			Entrepreneurs,
			Investor
		},
		computed: {},
		created() {},
		mounted() {},
		methods: {
			
		}
	};
</script>

<style>
	.AuthenticationList{
		width: 100%;
		min-height: 100%;
		background: #FFFFFF;
	}
</style>
