
<template>
	<view v-if="listData.length > 0">
		<view class="listInvest">
			<view v-for="(items,index) in listData" :key="index" >
				<investItems :msgData="items"></investItems>
			</view>
		</view>
	</view>
	<empty v-else>没有数据哦！</empty>
</template>

<script>
	import empty from "@/components/empty/empty.vue";
	import investItems from "./invest/invest-Items.vue";
	import { mapGetters } from 'vuex';
	export default {
	    data () {
			return {
				listData: [] // 数据列表
			};
	    },
		components: {
			investItems,
			empty
		},
		computed: {
          ...mapGetters(['GET_HOME'])
        },
		watch: {
          GET_HOME: {
            handler (a, b) {
              this.listData = a.HomeList.invest.listData; // 主页在融项目列表数据
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
