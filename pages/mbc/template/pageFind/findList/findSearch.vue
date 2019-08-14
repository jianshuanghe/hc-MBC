<template>
	<view class="homeSerach">
		<view class="search_box-No">
			<view class="search-NI-img left">
				<image :src='search'></image>
			</view>
			<view class="search-NI-text left" @tap="clickSearch">
				<input type="text" class="left inputSearch" disabled=true placeholder="请输入您的关键词，如：项目、机构、活动等" />
			</view>
			<view class="clear"></view>
		</view>
	</view>
</template>

<script>
	import search from '@/static/mbcImg/common/search.png';
    export default {
        data () {
          return {
            value: '商机名称',
            search: search
          };
        },
        methods: {
          clickSearch () {
            console.log('点击触发搜索组件');
			uni.navigateTo({
				url: '/modules/pageHome/searchDetile/searchDetile'
			});
          }
        }
    };
</script>

<style>
.homeSerach{
	position: fixed;
    width: 100%;
    padding: 30upx 0 20upx 0;
    z-index: 100;
    top: 0;
    background: #Fff;
}
.search_box-No{
  position: relative;
  margin-left: 36upx;
  width: 678upx;
  background: #F4F5F6;
  border-radius: 30upx;
  height: 60upx;
}
.search-NI-img{
  position: relative;
  width: 60upx;
}
.search-NI-img>image{
  width: 36upx;
  height: 36upx;
  margin-top: 12upx;
  margin-left: 20upx;
}
.search-NI-text{
  position: relative;
  width: 580upx;
  margin-left: 10upx;
  height: 60upx;
  line-height: 60upx;
}
.search-NI-text>p{
  position: relative;
  width: 100%;
  ont-family: PingFangSC-Regular;
  font-size: 24upx;
  color: #BDBDBD;
}
.inputSearch{
  line-height: 60upx;
  height: 60upx;
  /* margin-top: 0.8vw; */
  width: 98%;
  border: none;
  outline: none;
}
</style>
