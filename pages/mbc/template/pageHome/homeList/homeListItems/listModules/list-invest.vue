
<template>
	<view class="listInvest">
		<investItems></investItems>
	</view>
</template>

<script>
	import investItems from "./invest/invest-Items.vue";
	export default {
	    data () {
			return {};
	    },
		components: {
			investItems
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
