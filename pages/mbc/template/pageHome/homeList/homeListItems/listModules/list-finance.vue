
<template>
	<view class="listFinance">
		<financeItems></financeItems>
	</view>
</template>

<script>
	import financeItems from "./finance/finance-Items.vue";
	export default {
	    data () {
			return {};
	    },
		components: {
			financeItems
		},
	    methods: {
			goToPutIn () {
				console.log('点击触发发布项目');
			},
			goToSeek () {
				console.log('点击触发寻找资本');
			}
	    }
	};
</script>

<style>
</style>
