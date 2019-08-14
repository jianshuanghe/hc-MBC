<template>
	<view class="myHistory">
		<!-- 未认证 -->
		<Historyone v-if="this.Listdata.authState==-1"></Historyone>
		<!-- 创业者 -->
		<Historytwo v-if="this.Listdata.authState==0"></Historytwo>
		<!-- 投资人 -->
		<HistoryThree v-if="this.Listdata.authState==1"></HistoryThree>
		<HistoryThree v-if="this.Listdata.authState==2"></HistoryThree>
	</view>
</template>

<script>
	import Historyone from './Historyone/Historyone.vue'
	import Historytwo from './Historytwo/Historytwo.vue'
	import HistoryThree from './HistoryThree/HistoryThree.vue'
	import { mapMutations,mapGetters } from 'vuex';
	export default {
		
		data() {
			return {
				Listdata:[]
			};
		},
		components: {
			Historyone,
			Historytwo,
			HistoryThree
			
		},
		computed: {
			...mapGetters(['GET_MY'])
		},
		watch: {
			GET_MY: {
				handler(a, b) {
					console.log(a, b, 'header----list');
				},
				deep: true
			}
		},
		created() {
			this.Listdata = this.GET_MY.MyList.header;
			console.log(this.Listdata, '454446454564645656465');
		},
	};
</script>

<style>
	.myHistory{
		width: 100%;
		height: 144upx;
		background: #FFFFFF;
	}
	
	
</style>
