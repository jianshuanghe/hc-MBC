<template>
	<view class="serciveDetails-conetnt">
		<detailTop></detailTop>
		<detailsContent></detailsContent>
		<constSubmit></constSubmit>
	</view>
</template>

<script>
	import detailTop from "./detailsItems/detailTop.vue";
	import detailsContent from "./detailsItems/detailsContent.vue";
	import constSubmit from "./detailsItems/constSubmit.vue";
	export default {
	    data () {
			return {
				dataList: [] // 后台返回数据
			};
	    },
		components: {
			detailTop,
			detailsContent,
			constSubmit
		},
		computed: {},
		watch: {},
		created() {
		},
	    methods: {
	    }
	};
</script>

<style>
	.serciveDetails-conetnt{
		position: relative;
		width: 100%;
	}
</style>
