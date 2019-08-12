<template>
	<view class="InvestorCertification">
		<!-- 投资人 姓名 -->
		<!-- <name></name> -->
		<!-- 投资人 微信号 -->
		<!-- <wx></wx> -->
		<!-- 投资人 邮箱 -->
		<!-- <mailbox></mailbox> -->
		<!-- 投资人 城市 -->
		<!-- <City></City> -->
		<!-- 投资人 身份 -->
		<!-- <identity></identity> -->
		<!-- 投资人 关注领域 -->
		<!-- <field></field> -->
		<!-- 投资人 关注轮次 -->
		<!-- <Rotation></Rotation> -->
		<!-- 投资人 名片原件 -->
		<!-- <card></card> -->
		<!-- 投资人 提示 -->
		<!-- <Tips></Tips> -->
		<!-- 投资人 提交 -->
		<!-- <Submission></Submission> -->
		<information></information>
	</view>
</template>

<script>
	import wx from './InvestorList/Investor-wx'
	import name from './InvestorList/Investor-name'
	import mailbox from './InvestorList/Investor-mailbox'
	import City from './InvestorList/Investor-City'
	import identity from './InvestorList/Investor-identity'
	import field from './InvestorList/Investor-field'
	import Rotation from './InvestorList/Investor-Rotation'
	import card from './InvestorList/Investor-card'
	import Tips from './InvestorList/Investor-Tips'
	import Submission from './InvestorList/Investor-Submission'
	import information from './InvestorList/InvestorList-information'
	export default {
		data() {
			return {
				
			};
		},
		components: {
			// name,
			// wx,
			// mailbox,
			// City,
			// identity,
			// field,
			// Rotation,
			// card,
			// Tips,
			// Submission
			information
		},
		computed: {},
		created() {},
		mounted() {},
		methods: {
			
		}
	};
</script>

<style>
	.InvestorCertification{
		width: 100%;
		min-height: 100%;
	}
</style>
