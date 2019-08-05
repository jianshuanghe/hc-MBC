<template>
	<view class="newsContent">
		<!-- 联系人组件 -->
		<newsContacts></newsContacts>
		<!-- 系统通知 -->
		<system></system>
	</view>
</template>
<script>
	import newsContacts from "./newsList/news-Contacts.vue"
	import system from "./newsList/news-system.vue"
	
export default {
	data () {
		return {
		};
	},
	components: {
		newsContacts,
		system
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
.des {
	text-align: center;
	padding: 30upx;
	margin-top: 100upx;
	font-size: 30upx;
	color: #888888;
}
button {
	width: 330upx;
	float: left;
	margin-left: 30upx;
	margin-top: 30upx;
	padding: 10upx 20upx;
	font-size: 32upx;
}
</style>
