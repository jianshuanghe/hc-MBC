<template>
	<view class="publishContent">
		<view class="des">
			<!-- title -->
			<publishTitle></publishTitle>
			<!-- content -->
			<!-- pc登录上传 -->
			<uploadBP v-if='GET_PUBLISH.titleIndex === 1'></uploadBP>
			<!-- infor -->
			<view class="inforContent"  v-if='GET_PUBLISH.titleIndex === 2'>
				<!-- 基本信息 -->
				<basicInfor ></basicInfor>
				<!-- 公司信息 -->
				<companyInfor></companyInfor>
				<btn></btn>
			</view>
		</view>
	</view>
</template>
<script>
	import publishTitle from "./publishList/publishTitle.vue";
	import uploadBP from "./publishList/uploadBP/uploadBP.vue";
	import basicInfor from "./publishList/Infor/basicInfor.vue";
	import companyInfor from "./publishList/Infor/companyInfor.vue";
	import btn from "./publishList/Infor/btn.vue";
	import { mapMutations, mapGetters } from 'vuex';
export default {
	data() {
		return {
			areaData: {}
		};
	},
	components: {
		publishTitle,
		uploadBP,
		basicInfor,
		companyInfor,
		btn
	},
	computed: {
		...mapGetters(['GET_PUBLISH'])
	},
	created() {
		if(uni.getStorageSync('isUpLoadFile')) {
			let isUpLoadFile = JSON.parse(uni.getStorageSync('isUpLoadFile')); // 
			this.$store.commit('setIsUploadFileSuccess', isUpLoadFile.isSuccess); // 更新setIsUploadFileSuccess
			this.$store.commit('setIsUploadFileContent', isUpLoadFile.content); // 更新setIsUploadFileContent
		};
	},
	mounted() {
	},
	methods: {
		...mapMutations({
			setIsUploadFileSuccess: 'setIsUploadFileSuccess',
			setIsUploadFileContent: 'setIsUploadFileContent'
		})
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
