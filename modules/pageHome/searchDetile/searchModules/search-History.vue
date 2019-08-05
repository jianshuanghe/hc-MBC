<template>
	<view class="searchHistory-content">
		<view class="searchHistory">
		  <view class="SH-cont">
			<view class="top-SH">
			  <p class="">热门推荐</p>
			</view>
			<view class="cont-SH">
			  <view class="search-Box-Sh">
				<view class="search-Items left">
				  <p class="" @click="clickHistoryList">搜索名称1</p>
				</view>
				<view class="clear"></view>
			  </view>
			</view>
		  </view>
		</view>
		<view class="searchHistory">
		  <view class="SH-cont">
			<view class="top-SH">
			  <p class="">搜索历史</p>
			</view>
			<view class="cont-SH">
			  <view class="search-Box-Sh">
				<view class="search-Items left">
				  <p class="" @click="clickHistoryList">搜索名称1</p>
				</view>
				<view class="clear"></view>
			  </view>
			</view>
		  </view>
		  <view class="SH-clear" @click="clickRemoveHistory">
			<p class="">清除历史记录 </p>
		  </view>
		</view>
    </view>
</template>

<script>
</script>

<style>
	
.searchHistory-content{
  position: fixed;
  width: 100%;
  height: 94vh;
  padding-bottom: 5vh;
  overflow: scroll;
  -webkit-overflow-scrolling:touch;
  background: #fff;
}
  .searchHistory{
    position: relative;
    width: 100%;
  }
  .SH-cont{
    position: relative;
    width: 100%;
  }
  .top-SH{
    position: relative;
    width: 100%;
    padding: 4vw;
  }
  .top-SH>p{
    font-family: PingFang-SC-Medium;
    font-size: 4vw;
    color: #2E2E30;
    letter-spacing: 0;
    line-height: 4.5vw;
  }
  .cont-SH{
    position: relative;
    width: 100%;
    padding: 0vw 0 4vw 4vw;
  }
  .search-Box-Sh{
    position: relative;
    width: 100%;
  }
  .search-Items{
    position: relative;
    max-width: 96%;
    min-width: 15.8%;
    margin-right: 4vw;
    margin-bottom: 2vw;
    padding: 0 2vw;
    background: #F5F5F5;
  }
  .search-Items>p{
    background: #F5F5F5;
    font-family: PingFangSC-Regular;
    font-size: 3.2vw;
    color: #5D5D5D;
    letter-spacing: 0;
    text-align: center;
    line-height: 9vw;
    width: 100%;
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
  }
  .SH-clear{
    position: relative;
    width: 100%;
  }
  .SH-clear>p{
    font-family: PingFangSC-Regular;
    font-size: 3vw;
    color: #5D5D5D;
    letter-spacing: 0;
    text-align: center;
    line-height: 5vw;
  }
</style>
