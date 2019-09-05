<template>
	<view class="listTitle" id="listTitle">
		<view class="center-listTitle">
			<view class="news-TBox left" @tap="clickListTitle(1)">
			  <view :class="clickItemsIndex === 1 ? 'Tbox-items Tb-checked' : 'Tbox-items'">
				<p class="home-left-p">精品在融项目</p>
				<view class="hengLine" v-if="clickItemsIndex === 1"></view>
			  </view>
			</view>
			<view class="news-TBox left" @tap="clickListTitle(2)">
			  <view  :class="clickItemsIndex === 2 ? 'Tbox-items Tb-checked' : 'Tbox-items'">
				<p class="home-right-p">活跃投资人</p>
				<view class="hengLine"  v-if="clickItemsIndex === 2"></view>
			  </view>
			</view>
			<view class="clear"></view>
		</view>
	</view>
</template>

<script>
	import { mapMutations, mapGetters } from 'vuex';
	export default {
	    data () {
			return {
				clickItemsIndex: 1
			};
	    },
		computed: {
			...mapGetters(['GET_HOME'])
		},
		watch: {
		  GET_HOME: {
		    handler (a, b) {
		      this.clickItemsIndex = a.HomeList.titleIndex; // 切换的title
		    },
		    deep: true
		  }
		},
		mounted(){
		},
	    methods: {
			...mapMutations({
				setHomeListTitleIndex: 'setHomeListTitleIndex'
			}),
			clickListTitle (e) {
				this.clickItemsIndex = e;
				console.log(e, '切换精品在融项目和活跃投资机构类型');
				this.$store.commit('setHomeListTitleIndex', this.clickItemsIndex); // 更新setHomeListTitleIndex
			}
	    }
	};
</script>

<style>
	.newsTitle-box{
    position: relative;
    width: 100%;
  }
  .newsTitle{
    position: relative;
    width: 100%;
  }
  .center-listTitle{
    position: relative;
    width: 70%;
    margin-left: 0%;

  }
  .news-TBox{
    position: relative;
    width: 40%;
  }
  .Tbox-items{
    position: relative;
    width: 100%;
  }
  .home-left-p{
	ont-family: PingFangSC-Regular;
	font-size: 28upx;
	color: #5D5D5D;
	line-height: 66upx;
	text-align: left;
  }
  .home-right-p{
    ont-family: PingFangSC-Regular;
	font-size: 28upx;
	color: #5D5D5D;
	line-height: 66upx;
	text-align: right;
  }
  .hengLine{
    position: relative;
    background: #02C2A2;
	height: 6upx;
	width: 64upx;
	border-radius: 100upx;
    margin: 0 auto;
  }
  .Tb-checked>p{
    font-family: PingFangSC-Medium;
	font-size: 34upx !important;
	color: #2E2E30 !important;
	line-height: 66upx !important;
	font-weight: bold;
  }
</style>
