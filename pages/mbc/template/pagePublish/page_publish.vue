<template>
	<view class="publishContent">
		<view class="des">
			<!-- title -->
			<publishTitle></publishTitle>
			<!-- content -->
			<!-- pc登录上传 -->
			<uploadBP v-if='false'></uploadBP>
			<!-- infor -->
			<view class="inforContent">
				<!-- 基本信息 -->
				<basicInfor></basicInfor>
				<!-- 公司信息 -->
				<companyInfor></companyInfor>
			</view>
		</view>
	</view>
</template>
<script>
	import publishTitle from "./publishList/publishTitle.vue";
	import uploadBP from "./publishList/uploadBP/uploadBP.vue";
	import basicInfor from "./publishList/Infor/basicInfor.vue";
	import companyInfor from "./publishList/Infor/companyInfor.vue";
export default {
	data() {
		return {};
	},
	
	components: {
		publishTitle,
		uploadBP,
		basicInfor,
		companyInfor
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
	}
};
</script>

<style>
.item {
	font-size: 28upx;
	line-height: 60upx;
	height: 60upx;
	border-bottom: 2upx solid #f1f1f1;
	padding-left: 30upx;
	padding-right: 30upx;
	color: #888;
	text-align: left;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
}
</style>
