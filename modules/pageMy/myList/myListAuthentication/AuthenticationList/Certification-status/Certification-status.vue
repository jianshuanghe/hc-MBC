<template>
	<view class="Certification-status">
		<!-- 创业者 -->
		<Entrepreneurship></Entrepreneurship>
		<!-- 投资者 -->
		<Investment></Investment>
	</view>
</template>

<script>
	import Entrepreneurship from './Entrepreneurship-status/examine'
	import Investment from './Investment-status/Investment-status'
	export default {
		data() {
			return {

			};
		},
		components: {
			Entrepreneurship,
			Investment
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
		height:120%;
		/* overflow: hidden; */
		/* background: #F9F9F9; */
	}
</style>
