
<template>
	<view class="listFinance">
		<view v-for="(items,index) in listData" :key="index" >
			<financeItems :msgData="items"></financeItems>
			<view class="line" v-if="listData.length - 1 > index"></view>
		</view>
	</view>
</template>

<script>
	import financeItems from "./finance/finance-Items.vue";
	import { mapGetters } from 'vuex';
	export default {
	    data () {
			return {
				listData: [] // 数据列表
				
			};
	    },
		components: {
			financeItems
		},
		computed: {
          ...mapGetters(['GET_HOME'])
        },
		watch: {
          GET_HOME: {
            handler (a, b) {
			console.log(a,b)
              this.listData = a.HomeList.finance.listData; // 主页在融项目列表数据
            },
            deep: true
          }
        },
	    methods: {
			goToPutIn () {
				console.log('点击触发发布项目');
			},
			goToSeek () {
				console.log('点击触发寻找资本');
			}
	    }
	};
</script>

<style>
</style>
