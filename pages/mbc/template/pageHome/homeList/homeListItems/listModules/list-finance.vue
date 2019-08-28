
<template>
	<view v-if="listData.length > 0">
		<view class="listFinance">
			<view v-for="(items,index) in listData" :key="index" >
				<financeItems :msgData="items"></financeItems>
				<view class="line" v-if="listData.length - 1 > index"></view>
			</view>
		</view>
	</view>
	<empty v-else>抱歉，没有相关内容~</empty>
</template>

<script>
	import empty from "@/components/empty/empty.vue";
	import financeItems from "./finance/finance-Items.vue";
	import { mapGetters } from 'vuex';
	export default {
	    data () {
			return {
				listData: [] // 数据列表
				
			};
	    },
		components: {
			financeItems,
			empty
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
	    }
	};
</script>

<style>
</style>
