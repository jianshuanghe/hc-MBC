<template>
	<div class="entrust">
		<inputBox></inputBox>
		<success v-if="false"></success>
	</div>
</template>

<script>
	import inputBox from "./entrustItems/input.vue";
	import success from "./entrustItems/success.vue";
	export default {
		data() {
			return {};
		},
		components: {
			inputBox,
			success
		},
		computed: {
		},
		created() {
			console.log('在组件中并不能使用页面生命周期函数');
		},
		mounted() {
		},
		methods: {
		}
	};
</script>

<style>
	
</style>
