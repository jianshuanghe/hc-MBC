<template>
	<view class="Certification-status">
		<!-- 创业者 -->
		<Entrepreneurship v-if="Listdata.authState==0"></Entrepreneurship>
		<!-- 投资者 -->
		<Investment></Investment>
	</view>
</template>

<script>
	import Entrepreneurship from './Entrepreneurship-status/examine'
	import Investment from './Investment-status/Investment-status'
	import { mapMutations,mapGetters } from 'vuex';
	export default {
		components: {
			Entrepreneurship,
			Investment
		},
		data() {
			return {
				Listdata: []
			};
		},
		computed: {
			...mapGetters(['GET_MY'])
		},
		watch: {
			GET_MY: {
				handler(a, b) {
					console.log(a, b);
				},
				deep: true
			}
		},
		created() {
			this.Listdata = this.GET_MY.MyList.header;
			console.log(this.Listdata, '你好');
		},
	};
</script>

<style>
	.examine{
		width: 100%;
		height:120%;
		/* overflow: hidden; */
		/* background: #F9F9F9; */
	}
</style>
