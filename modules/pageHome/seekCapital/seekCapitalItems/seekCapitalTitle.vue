<template>
	<view class="publishTitle">
		<view class="center-publishTitle">
			<view class="news-TBox left" @tap="clickSeekCapitalTitle(1)">
			  <view :class="clickItemsIndex === 1 ? 'Tbox-items Tb-checked' : 'Tbox-items'">
				<p class="home-left-p">投资人</p>
				<view class="hengLine" v-if="clickItemsIndex === 1"></view>
			  </view>
			</view>
			<view class="news-TBox left" @tap="clickSeekCapitalTitle(2)">
			  <view  :class="clickItemsIndex === 2 ? 'Tbox-items Tb-checked' : 'Tbox-items'">
				<p class="home-right-p">投资机构</p>
				<view class="hengLine"  v-if="clickItemsIndex === 2"></view>
			  </view>
			</view>
			<view class="clear"></view>
		</view>
		<view class="line"></view>
	</view>
</template>

<script>
	import { mapMutations, mapGetters } from 'vuex';
	export default {
	    data () {
			return {
				clickItemsIndex: 1,
				fieldsDataList:'',
				levesDataList:'',
				areaDataList:'',
				AREADATAS: [],
				FIELDDATAS: [],
				LEVELDATAS: [],
				investorSearch: { // 筛选结果 --- 投资人参数
					sortType: 'ID', // 排序 ID 综合 INFO_COUNT 最热 CREATE_TIME 最新
					area: '', //  省份codelist
					leves: '', //  轮数idlist
					fields: '' // 领域 idlist
				},
				investInsSearch: { // 筛选结果 --- 投资项目参数
					sortType: 'ID', // 排序 ID 综合 INFO_COUNT 最热 CREATE_TIME 最新
					area: '', //  省份codelist
					leves: '', //  轮数idlist
					fields: '' // 领域 idlist
				},
			};
	    },
		computed: {
			...mapGetters(['SEEKCAPITALTITLE', 'INVESTORSEARCH', 'INVERSTINSSEARCH', 'AREADATA', 'FIELDDATA', 'LEVELDATA'])
		},
		watch: {
			 INVESTORSEARCH: {
				handler (a, b) {
					console.log(a, '获取VUX投资人的参数')
					this.investorSearch = a; // 接口投资人参数
				},
				deep: true
			},
			INVERSTINSSEARCH: {
				handler (a, b) {
					console.log(a, '获取VUX投资项目参数')
					this.investInsSearch = a; // 接口投资项目参数
				},
				deep: true
			},
			SEEKCAPITALTITLE: {
				handler (a, b) {
					console.log(a, '获取VUX切换的title');
					this.clickItemsIndex = a; // 切换的title
					this.$store.commit('setScreenShow', false); // 更新setScreenShow
					this.$store.commit('setMultipleShow', false); // 更新setMultipleShow
					if (a === 1) {
						this.fieldsDataList = this.investorSearch.fields.split(','); // 用户选中的领域
						this.FIELDDATA.map((items, index) => {
							this.fieldsDataList.map((item, index) => {
								if (items === item) {
									items.checked = true;
								}
							})
							this.FIELDDATAS.push(items);
						})
						this.$store.commit('setFieldData', this.FIELDDATAS); // 更新setFieldData
						// -----------------------------------------------------------------------------------------------------------------------------
						this.levesDataList = this.investorSearch.leves.split(','); // 用户选中的融资阶段
						console.log(this.levesDataList, '1--------------this.levesDataList');
						this.LEVELDATA.map((items, index) => {
							this.levesDataListt.map((item, index) => {
								if (items === item) {
									items.checked = true;
								}
							})
							this.LEVELDATAS.push(items);
						})
						console.log(this.LEVELDATA, '1--------------this.LEVELDATA');
						this.$store.commit('setLevelData', this.LEVELDATAS); // 更新setLevelData
						// -------------------------------------------------------------------------------------------------------------------------------
						this.areaDataList = this.investorSearch.area.split(','); // 用户选中的地区
						this.AREADATA.province.map((items, index) => {
							this.areaDataList.map((item, index) => {
								if (items === item) {
									items.checked = true;
								}
							})
							this.AREADATAS.push(items);
						})
						this.$store.commit('setAreaData', this.LEVELDATAS); // 更新setAreaData
					} else if (a === 2) {
						this.fieldsDataList = this.investorSearch.fields.split(','); // 用户选中的领域
						this.FIELDDATA.map((items, index) => {
							this.fieldsDataList.map((item, index) => {
								if (items === item) {
									items.checked = true;
								}
							})
							this.FIELDDATAS.push(items);
						})
						this.$store.commit('setFieldData', this.FIELDDATAS); // 更新setFieldData
								// -----------------------------------------------------------------------------------------------------------------------------
						this.levesDataList = this.investorSearch.leves.split(','); // 用户选中的融资阶段
						console.log(this.levesDataList, '2--------------this.levesDataList');
						this.LEVELDATA.map((items, index) => {
							this.levesDataListt.map((item, index) => {
								if (items === item) {
									items.checked = true;
								}
							})
							this.LEVELDATAS.push(items);
						})
						console.log(this.LEVELDATAS, '2--------------this.LEVELDATA');
						this.$store.commit('setLevelData', this.LEVELDATAS); // 更新setLevelData
								// -------------------------------------------------------------------------------------------------------------------------------
						this.areaDataList = this.investorSearch.area.split(','); // 用户选中的地区
						this.AREADATA.province.map((items, index) => {
							this.areaDataList.map((item, index) => {
								if (items === item) {
									items.checked = true;
								}
							})
							this.AREADATAS.push(items);
						})
						this.$store.commit('setAreaData', this.LEVELDATAS); // 更新setAreaData
					}
				},
				deep: true
			}
		},
		created() {
		},
		mounted(){
		},
	    methods: {
			...mapMutations({
				setSeekCapitalTitleIndex: 'setSeekCapitalTitleIndex',
				setAreaData: 'setAreaData', // 公共组件省市区
				setFieldData: 'setFieldData', // 公共组件领域
				setLevelData: 'setLevelData', // 公共组件融资阶段
			}),
			clickSeekCapitalTitle (e) {
				this.clickItemsIndex = e;
				console.log(e, '投资人BP和投资机构');
				this.$store.commit('setSeekCapitalTitleIndex', this.clickItemsIndex); // 更新setSeekCapitalTitleIndex
			}
	    }
	};
</script>

<style>
	.publishTitle{
		position: fixed;
		width: 100%;
		z-index: 100;
		top: 0;
		background: #fff;
		height: 88upx;
	}
  .newsTitle{
    position: relative;
    width: 100%;
  }
  .center-publishTitle{
    position: relative;
    width: 50%;
	margin: auto;

  }
  .news-TBox{
    position: relative;
    width: 50%;
  }
  .Tbox-items{
    position: relative;
    width: 100%;
  }
  .home-left-p{
	ont-family: PingFangSC-Regular;
	font-size: 28upx;
	color: #5D5D5D;
	line-height: 60upx;
	margin-top: 16upx;
	text-align: center;
  }
  .home-right-p{
    ont-family: PingFangSC-Regular;
	font-size: 28upx;
	color: #5D5D5D;
	line-height: 60upx;
	margin-top: 16upx;
	text-align: center;
  }
  .hengLine{
    position: relative;
    background: #02C2A2;
	height: 4upx;
	width: 40upx;
	border-radius: 100upx;
    margin: 0 auto;
	margin-bottom: 8upx;
  }
  .Tb-checked>p{
    font-family: PingFangSC-Medium;
	color: #02C2A2 !important;
  }
</style>
