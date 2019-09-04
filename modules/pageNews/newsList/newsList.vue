<template>
	<view class="newsList">
		<newsTips></newsTips>
	</view>
</template>

<script>
	import newsTips from "../newsList/newsTips/newsTips.vue"
	export default {
		data() {
			return {
				datas:[]
			};
		},
		components: {
			newsTips
		},
		computed: {},
		created() {
			console.log('在组件中并不能使用页面生命周期函数');
			
		},
		mounted() {
			
		},
		methods: {
			
		},
 
	};
</script>

<style>
	.newList {
		width: 100%;
		height: 100%;
		background: #FFFFFF;
	}
</style>
