<template>
	<div class="entrust">
		<inputBox v-if='!ENTRUST.success'></inputBox>
		<success v-if="ENTRUST.success"></success>
	</div>
</template>

<script>
	import inputBox from "./entrustItems/input.vue";
	import success from "./entrustItems/success.vue";
	import { mapMutations, mapGetters } from 'vuex';
	export default {
		data() {
			return {};
		},
		components: {
			inputBox,
			success
		},
		
		computed: {
		  ...mapGetters(['ENTRUSSHOW', 'ENTRUST'])
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
	.entrust{
		position: fixed;
		top: 0;
		z-index: 106;
	}
</style>
