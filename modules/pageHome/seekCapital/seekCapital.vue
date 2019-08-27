<template>
	<view class="seekCapital-content">
		<!-- title -->
		<seekCapitalTitle></seekCapitalTitle>
		<!-- 筛选 -->
		<multipleScreen></multipleScreen>
		<!-- list -->
		<seekCapitalList></seekCapitalList>
		<!-- publish -->
		<publishProject></publishProject>
	</view>
</template>

<script>
	import seekCapitalTitle from "./seekCapitalItems/seekCapitalTitle.vue";
	import seekCapitalList from "./seekCapitalItems/seekCapitalList.vue";
	import multipleScreen from "./seekCapitalItems/multipleScreen/multipleScreen.vue";
	import publishProject from "./seekCapitalItems/publishProject.vue";
	export default {
		data() {
			return {};
		},
		
		components: {
			seekCapitalTitle,
			seekCapitalList,
			multipleScreen,
			publishProject
		},
		computed: {
			// ...mapGetters(['GET_HOME'])
		},
		watch: {
		  // GET_HOME: {
		  //   handler (a, b) {
		  //     this.clickItemsIndex = a.HomeList.titleIndex; // 切换的title
			 //  console.log(this.clickItemsIndex, '切换的数据');
		  //   },
		  //   deep: true
		  // }
		},
		computed: {
		},
		created() {
			console.log('在组件中并不能使用页面生命周期函数');
		},
		mounted() {
		},
		methods: {
		},
	}
</script>

<style>
</style>
