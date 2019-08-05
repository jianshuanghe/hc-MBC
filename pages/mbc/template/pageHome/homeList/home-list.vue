<template>
	<view class="listTitle-home">
		<!-- 标题 -->
		<listTitle></listTitle>
		<!-- 列表 精品在融项目 -->
		<view :class="GET_HOME.HomeList.titleIndex === 1 ? 'show' : 'hide'">
			<listFinance></listFinance>
		</view>
		<!-- 列表 活跃投资机构 -->
		<view :class="GET_HOME.HomeList.titleIndex === 2 ? 'show' : 'hide'">
			<listInvest></listInvest>
		</view>
		
	</view>
</template>

<script>
	import listTitle from "./homeListItems/list-title.vue";
	import listFinance from "./homeListItems/listModules/list-finance.vue";
	import listInvest from "./homeListItems/listModules/list-invest.vue";
	import { mapMutations, mapGetters } from 'vuex';
	export default {
	    data () {
			return {
				clickItemsIndex: 1
			};
	    },
		components: {
			listTitle,
			listFinance,
			listInvest
		},
		computed: {
			...mapGetters(['GET_HOME'])
		},
		watch: {
		  GET_HOME: {
		    handler (a, b) {
		      this.clickItemsIndex = a.HomeList.titleIndex; // 切换的title
			  console.log(this.clickItemsIndex, '切换的数据');
		    },
		    deep: true
		  }
		},
		created() {
			console.log(this.clickItemsIndex, 'this.clickItemsIndex切换的title');
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
	.listTitle-home{
		position: relative;
		width: 750upx;
		margin-top: 20upx;
		padding: 10upx 30upx 10upx 30upx;
		background: #fff;
		margin-bottom: 2upx;
	}
	.newsTitle-box{
    position: relative;
    width: 100%;
  }
  .newsTitle{
    position: relative;
    width: 100%;
  }
  .center-news{
    position: relative;
    width: 55%;
    margin-left: 20%;

  }
  .news-TBox{
    position: relative;
    width: 50%;
  }
  .Tbox-items{
    position: relative;
    width: 100%;
  }
  .Tbox-items>p{
    font-family: PingFangSC-Regular;
    font-size: 3.733vw;
    color: #2E2E30;
    letter-spacing: 0;
    text-align: center;
    line-height: 7vw;
  }
  .hengLine{
    position: relative;
    width: 5vw;
    height: 1px;
    background: #15D49F;
    margin: 0 auto;
  }
  .Tb-checked>p{
    color: #02C2A2 !important;
  }
</style>
