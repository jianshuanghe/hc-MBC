<template>
	<view class="seekCapitalList-content">
			<view class="scrollContent">
				<!-- 列表 -->
				<view >
					<lookProject></lookProject>
				</view>
			</view>
	</view>
</template>

<script>
	import lookProject from "./lookProject/lookProject.vue";
	import { mapMutations, mapGetters } from 'vuex';
	export default {
		data() {
			return {
			};
		},
		components: {
			lookProject
		},
		computed: {
		},
		watch: {
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
	.seekCapitalList-content{
		position: fixed;
		width: 750upx;
		padding: 0 15px;
		background: #fff;
		height: 94vh;
		padding-bottom: 100upx;
		top: 84upx;
	}
</style>
