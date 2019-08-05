
<template>
	<view class="listInvest">
		<view v-for="(items,index) in listData" :key="index" >
			<investItems :msgData="items"></investItems>
		</view>
	</view>
</template>

<script>
	import investItems from "./invest/invest-Items.vue";
	import { mapGetters } from 'vuex';
	export default {
	    data () {
			return {
				listData: [] // 数据列表
			};
	    },
		components: {
			investItems
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
