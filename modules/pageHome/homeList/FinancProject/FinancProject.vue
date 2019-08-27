<template>
	<div class="itemsDetails-content">
		<!-- top -->
		<projectTop :msgData="dataList"></projectTop>
		<!-- 项目简介 -->
		<projectProfile :msgData="dataList"></projectProfile>
		<!-- 融资需求 -->
		<financNeeds :msgData="dataList"></financNeeds>
		<!-- 融资历史 -->
		<financHistory :msgData="dataList"></financHistory>
		<!-- 团队成员 -->
		<teamMembers :msgData="dataList"></teamMembers>
		<!-- 公司信息 -->
		<companyInformation :msgData="dataList"></companyInformation>
		<!-- 项目数据 -->
		<projectData :msgData="dataList"></projectData>
		<!-- 底部提交 -->
		<botBtn :msgData="project"></botBtn>
	</div>
</template>

<script>
	import projectTop from "./FinancProject-items/projectTop.vue";
	import projectProfile from "./FinancProject-items/projectProfile.vue";
	import financNeeds from "./FinancProject-items/financNeeds.vue";
	import financHistory from "./FinancProject-items/financHistory.vue";
	import teamMembers from "./FinancProject-items/teamMembers.vue";
	import companyInformation from "./FinancProject-items/companyInformation.vue";
	import projectData from "./FinancProject-items/projectData.vue";
	import botBtn from "./FinancProject-items/botBtn.vue";
	export default {
		data() {
			return {
				dataList: {},
				project:{
					id: 0
				}
			};
		},
		
		components: {
			projectTop,
			projectProfile,
			financNeeds,
			financHistory,
			teamMembers,
			companyInformation,
			projectData,
			botBtn
		},
		computed: {
		},
		watch: {
		},
		computed: {
		},
		onLoad(option) {
			this.project.id = option.id;
			this.getList(option.id);
			this.getUserApply(option.id);
		},
		mounted() {
			
		},
		methods: {
			getList (e) {
				if (uni.getStorageSync('landRegist')) {
				    let landRegistLG = JSON.parse(uni.getStorageSync('landRegist')); // 读取缓存的用户信息
				    console.log(landRegistLG.user.id);
					let params = {}; // 请求总数居时 参数为空
					uni.showLoading({ // 展示loading
						title: '加载中'
					});
					uni.request({
						url: this.api2 + '/proj/' + e + '?userId=' + landRegistLG.user.id, //接口地址。
						data: this.endParams(params),
						header: {
							Authorization:"Bearer "+landRegistLG.token//将token放到请求头中
						},
						success: (response) => {
							console.log(response.data.content);
							this.dataList = response.data.content;
							this.project.projectName = this.dataList.projName;
							this.project.modelId = this.dataList.id;
							// this.project.enclosurePath = this.dataList.projFile.enclosurePath; // BP文件路径
							this.project.enclosurePath = 'https://style.iambuyer.com/doc/2019_PDF.pdf'; // 测试使用
							uni.hideLoading(); // 隐藏 loading
						},
						fail: (error) => {
							uni.hideLoading(); // 隐藏 loading
							uni.showToast({
								title: '网络繁忙，请稍后',
								icon: 'none',
								duration: 1000
							});
							console.log(error, '网络繁忙，请稍后');
						}
					});
				}
			},
			getUserApply(e){
				if (uni.getStorageSync('landRegist')) {
				    let landRegistLG = JSON.parse(uni.getStorageSync('landRegist')); // 读取缓存的用户信息
				    console.log(landRegistLG.user.id);
					let params = {}; // 请求总数居时 参数为空
					uni.showLoading({ // 展示loading
						title: '加载中'
					});
					uni.request({
						url: this.api2 + '/contact/is/apply?applyeType=2' + '&modelId=' + e + '&userId=' + landRegistLG.user.id, //接口地址。
						data: this.endParams(params),
						header: {
							Authorization:"Bearer "+landRegistLG.token//将token放到请求头中
						},
						success: (response) => {
							console.log(response.data);
							this.project.content = response.data.content;
							uni.hideLoading(); // 隐藏 loading
						},
						fail: (error) => {
							uni.hideLoading(); // 隐藏 loading
							uni.showToast({
								title: '网络繁忙，请稍后',
								icon: 'none',
								duration: 1000
							});
							console.log(error, '网络繁忙，请稍后');
						}
					});
				}
			},
		}
	};
</script>

<style>
</style>
