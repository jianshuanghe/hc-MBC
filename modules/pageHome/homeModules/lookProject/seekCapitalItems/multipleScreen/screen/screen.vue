<template>
	<view class="screen-content">
		<view class="line"></view>
		<view class="screen-box">
			<view class="screen-item" @tap='clickScreen(items.code)'  v-for="(items,index) in dataList" :key="index" >
				<view class="left screen-item-text">{{items.text}}</view>
				<image class="right screen-item-cleck" :src='check' v-if='clickItemsCode === items.code'></image>
				<view class="clear"></view>
				<view class="line"></view>
			</view>
		</view>
	</view>
</template>

<script>
	import { mapMutations, mapGetters } from 'vuex';
	export default {
	    data () {
			return {
				check: this.Static + 'mbcImg/home/seekCapital/check.png',
				dataList: [
					{
						text: '综合',
						code: '1'
					},
					{
						text: '最新',
						code: '0'
					},
					{
						text: '最热',
						code: '2'
					}
				],
				list: { // 投资人
					loadingText: '加载更多...',
					search: { // 搜索
						pageNum: 0, // 总页数
						searchCondition: {  // 分页属性
							page: '1'
						}
					},
					listData: '' // 列表数据
				},
				search: { // 筛选结果 --- 投资人参数
					order: '1', //0 时间排序 1 综合排序 2热度
					area: '', //  省份codelist
					leves: '', //  轮数idlist
					fields: '' // 领域 idlist
				},
				clickItemsCode: '', // 用户选中的code参数
				clickItemsTitle: 1 // 当前title,所在的位置，1代表的投资人，2代表时投资项目
			};
		},
		computed: {
			...mapGetters(['LOOKPROJECTSEARCH'])
		},
		watch: {
			LOOKPROJECTSEARCH: {
				handler (a, b) {
					console.log(a, '获取VUX的参数')
					this.search = a; // 接口参数
				},
				deep: true
			}
		},
		mounted(){
		},
		methods: {
			...mapMutations({
				setLookProjectDataList: 'setLookProjectDataList',
				setLookProjectDataSearch: 'setLookProjectDataSearch'
			}),
			clickScreen (e) {
				console.log(e, this.SEEKCAPITALTITLE, '触发点击综合选项items.code');
				this.clickItemsCode = e;
				this.search.order = this.clickItemsCode;
				this.$store.commit('setLookProjectDataSearch', this.search); // 更新setLookProjectDataSearch
				this.$store.commit('setLookProjectDataList', this.list); // 更新setInvestorSearch
				setTimeout(() => {
				  this.$store.commit('setScreenShow', false); // 更新setScreenShow
				}, 300);
			}
		}
	};
</script>

<style>
	.screen-content{
		position: relative;
		width: 100%;
		position: fixed;
		background: rgba(46,46,48,0.20);
		height: 2000upx;
		z-index: 102;
	}
	.screen-box{
		position: relative;
		width: 100%;
		padding: 0 30upx;
		margin-top: 0upx;
		background: #fff;
		z-index: 101;
		width: 100%;
	}
	.screen-item{
		position: relative;
		width: 100%;
	}
	.screen-item-text{
		position: relative;
		width: 60%;
		font-family: PingFangSC-Regular;
		font-size: 28upx;
		color: #2E2E30;
		line-height: 100upx;
	}
	.screen-item-cleck{
		position: absolute;
		width: 30upx;
		height: 30upx;
		top: 44upx;
		right: 60upx;
	}
</style>
