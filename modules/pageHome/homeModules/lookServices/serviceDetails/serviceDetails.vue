<template>
	<view class="serciveDetails-conetnt">
		<detailTop></detailTop>
		<costSave></costSave>
	</view>
</template>

<script>
	import detailTop from "./detailsItems/detailTop.vue";
	import costSave from "./detailsItems/costSave.vue";
	export default {
	    data () {
			return {
				dataList: [] // 后台返回数据
			};
	    },
		components: {
			detailTop,
			costSave
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
