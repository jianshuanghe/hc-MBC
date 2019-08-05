<template>
	<div class="serchBox-content">
		<div class="serchBox">
			<div class="left sB-box">
				<view class="search_box">
					<view class="search-NI-img left">
						<image :src='search'></image>
					</view>
					<view class="search-NI-text left">
						<input 
						type="text" 
						class="left inputSearch" 
						focus 
						placeholder="项目、机构、活动" 
						v-model='searchText'
						@confirm="onSubmit"
						@blur="onFocus"
						@focus="onFocus"
						@input="onFocus"/>
					</view>
					<div class="searchClose left">
						<image :src='searchClose' @tap="clickClear"></image>
					</div>
					<view class="clear"></view>
				</view>
			</div>
			<div class="right cal-box">
				<div class="cl-text" @tap='onCancel'>取消</div>
			</div>
			<div class="clear"></div>
		</div>
	</div>
</template>

<script>
	import search from '@/static/mbcImg/common/search.png';
	import searchClose from '@/static/mbcImg/common/searchClose.png';
	export default {
	    data () {
	      return {
	        value: '商机名称',
	        search: search,
			searchClose: searchClose,
			results: '',
            searchText: '',
            loadingShow: false, // loading
            businessData: [], // vuex中后台返回的数据
            searchCondition: {  // 分页属性
              page: '1',
              name: ''
            },
            pageNum: 0, // 数据总页数
            pageList: [], // 后台返回数据
            allLoaded: false,  // 是否可以上拉属性，false可以上拉，true为禁止上拉，就是不让往上划加载数据了
            scrollMode: 'auto'  // 移动端弹性滚动效果，touch为弹性滚动，auto是非弹性滚动
	      };
	    },
	    methods: {
			onFocus () {
				console.log('on focus');
			},
			onSubmit () {
				if (this.searchText === '') {
					uni.showToast({
						title: '搜索条件不能为空！',
						icon: 'none',
						duration: 1000
					});
				} else {
					uni.showToast({
						title: this.searchText,
						icon: 'none',
						duration: 1000
					});
				};
			},
			clickClear () {
				console.log('清空');
				this.searchText = '';
				this.searchCondition = {  // 分页属性
					page: '1',
					name: '',
				}
			},
			onCancel () {
				console.log('on cancel');
				this.searchText = '';
				uni.navigateBack({
					delta: 1,
					animationType: 'pop-out',
					animationDuration: 200
				});
			}
	    }
	};
</script>

<style>
	.serchBox-content{
		position: fixed;
		width: 100%;
		padding: 30upx 0 20upx 0;
		z-index: 100;
		top: 0;
		background:#FFFFFF;;
	}
	.serchBox{
		position: relative;
		margin-left: 36upx;
		width: 339px;
		height: 60upx;
	}
	.sB-box{
		position: relative;
		width: 596upx;
	}
	.cal-box{
		position: relative;
		width: 80upx;
	}
	.cl-text{
		position: relative;
		text-align: right;
		font-family: PingFang-SC-Medium;
		font-size: 32upx;
		color: #2E2E30;
		letter-spacing: 0;
		text-align: center;
		line-height: 60upx;
	}
	.search_box{
	  position: relative;
	  width: 596upx;
	  background: #F6F6F6;
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
	  width: 468upx;
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
	.searchClose{
		position: relative;
		width: 56upx;
	}
	.searchClose>image{
		width: 44upx;
		height: 44upx;
		margin-top: 8upx;
		margin-left: 6upx;
	}
</style>
