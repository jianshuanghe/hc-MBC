
<template>
	<view class="listInvest">
		<view v-for="(items,index) in listData" :key="index" >
			<investInstitutionItems :msgData="items"></investInstitutionItems>
		</view>
	</view>
</template>

<script>
	import investInstitutionItems from "./investInstitutionItems/investInstitution-items.vue";
	import { mapGetters } from 'vuex';
	export default {
	    data () {
			return {
				listData: [] // 数据列表
			};
	    },
		components: {
			investInstitutionItems
		},
		computed: {
          ...mapGetters(['GET_HOME'])
        },
		watch: {
          GET_HOME: {
            handler (a, b) {
              this.listData = a.seekCapital.invest.listData; // 投资人列表
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
