<template>
	<view class="findList-content">
		<view class="findList">
			<!-- 融头条 -->
			<meltTt v-if='GET_FIND.tabItems === 1'></meltTt>
			<!-- 活动列表 -->
			<active v-if="GET_FIND.tabItems === 2"></active>
			<!-- 资讯列表 -->
			<information v-if="GET_FIND.tabItems === 3"></information>
		</view>
	</view>
</template>

<script>
	import meltTt from "./meltTt/meltTt.vue";
	import active from "./active/active.vue";
	import information from "./information/information.vue";
	import { mapGetters } from 'vuex';
	export default {
		data() {
			return {};
		},
		components: {
			meltTt,
			active,
			information
		},
		computed: {
			...mapGetters(['GET_FIND'])
		},
		created() {
		},
		mounted() {
		},
		methods: {
		}
	};
</script>

<style>
	.findList-content{
		position: relative;
		width: 750upx;
		top: 168upx;
	}
</style>
