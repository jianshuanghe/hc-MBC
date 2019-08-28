<template>
	<view class="comprehensive-content">
		<view class=""  v-if="GET_HOME.HomeSearch.project.listData.length > 0 || GET_HOME.HomeSearch.investor.listData.length > 0 || GET_HOME.HomeSearch.investen.listData.length > 0 || GET_HOME.HomeSearch.active.listData.length > 0">
			<!-- 项目 -->
			<project v-if="GET_HOME.HomeSearch.project.listData.length > 0"></project>
			<!-- 投资人 -->
			<investor v-if="GET_HOME.HomeSearch.investor.listData.length > 0"></investor>
			<!-- 投资机构 -->
			<investment v-if="GET_HOME.HomeSearch.investen.listData.length > 0"></investment>
			<!-- 资讯 -->
			<information v-if="GET_HOME.HomeSearch.active.listData.length > 0" ></information>
		</view>
		<empty v-else>抱歉，没有找到相关内容~</empty>
	</view>
</template>

<script>
	import empty from "@/components/empty/empty.vue";
	import project from "./project.vue";
	import investor from "./investor.vue";
	import investment from "./investment.vue";
	import information from "./information.vue";
	import { mapGetters } from 'vuex';
	export default {
		data() {
			return {
			};
		},
		components: {
			project,
			investor,
			investment,
			information,
			empty
		},
		computed: {
		  ...mapGetters(['GET_HOME'])
		},
		watch: {
			GET_HOME: {
				handler (a, b) {
				},
				deep: true
			}
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
