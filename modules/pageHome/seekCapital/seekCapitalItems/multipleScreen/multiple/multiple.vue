<template>
	<view class="multiple-content">
		<view class="maskBox" @tap="clickClose()"></view>
		<view class="multiple-box right">
			<view class="multiple-cot">
				<view class="multiple-list-box">
					<!-- 模块 -->
					<view class="multiple-list">
						<view class="multiple-item-title">
							阶段
							<view class="right right-MIL" @tap="clickToAll(0)">
								全部 <image class="img-r" :src='isAll[0].arrow'></image>
							</view>
						</view>
						<view class="multiple-item-list">
							<checkbox-group @change="checkboxChange">
							  <label @click="labelBtn(item.value,index)"  v-for="(item,index) in LEVELDATA" :key="index" v-if="(index > 8 && isAll[0].allShow === false) ? false : true" >
							    <checkbox :value="item.value" :checked="item.checked" v-show="false"/>
								<view class="left MIL-item">
									<view :class="[item.checked ? 'MILClicked' : '', 'MIL-item-text']">{{item.name}}</view>
									<image :src="checkedItems" :class="{clickImgShow: item.checked}" class="clickImg"></image>
								</view>
							  </label>
							</checkbox-group>
							<view class="clear"></view>
							<view class="lineMIL"></view>
						</view>
					</view>
					<!-- 模块 -->
					<view class="multiple-list">
						<view class="multiple-item-title">
							领域
							<view class="right right-MIL" @tap="clickToAll(1)">
								全部 <image class="img-r" :src='isAll[1].arrow'></image>
							</view>
						</view>
						<view class="multiple-item-list">
							<checkbox-group @change="checkboxChange1">
							  <label @click="labelBtn1(item.value,index)"  v-for="(item,index) in FIELDDATA" :key="index" v-if="(index > 8 && isAll[1].allShow === false) ? false : true" >
							    <checkbox :value="item.value" :checked="item.checked" v-show="false"/>
								<view class="left MIL-item">
									<view :class="[item.checked ? 'MILClicked' : '', 'MIL-item-text']">{{item.name}}</view>
									<image :src="checkedItems" :class="{clickImgShow: item.checked}" class="clickImg"></image>
								</view>
							  </label>
							</checkbox-group>
							<view class="clear"></view>
							<view class="lineMIL"></view>
						</view>
					</view>
					<!-- 模块 -->
					<view class="multiple-list mG-btn">
						<view class="multiple-item-title">
							地区
							<view class="right right-MIL" @tap="clickToAll(2)">
								全部 <image class="img-r" :src='isAll[2].arrow'></image>
							</view>
						</view>
						<view class="multiple-item-list">
							<checkbox-group @change="checkboxChange2">
							  <label @click="labelBtn2(item.value,index)"  v-for="(item,index) in AREADATA.province" :key="index" v-if="(index > 8 && isAll[2].allShow === false) ? false : true" >
							    <checkbox :value="item.value" :checked="item.checked" v-show="false"/>
								<view class="left MIL-item">
									<view :class="[item.checked ? 'MILClicked' : '', 'MIL-item-text']">{{item.name}}</view>
									<image :src="checkedItems" :class="{clickImgShow: item.checked}" class="clickImg"></image>
								</view>
							  </label>
							</checkbox-group>
							<view class="clear"></view>
							<view class="lineMIL"></view>
						</view>
					</view>
				</view>
				<view class="multiple-bot">
					<view class="left MILClose" @tap="clickClose()">
						<image class="img" :src='close'></image>
					</view>
					<view class="left MILReset" @tap="clickReset()">
						重置
					</view>
					<view class="left MILSure" @tap="clickSure()">
						确认
					</view>
					<view class="clear"></view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import { mapMutations, mapGetters } from 'vuex';
	export default {
	    data () {
			return {
				close: this.Static + 'mbcImg/home/seekCapital/close.png',
				arrow: this.Static + 'mbcImg/home/seekCapital/rightArrow.png',
				downArrow: this.Static + 'mbcImg/home/seekCapital/downArrow.png',
				rightArrow: this.Static + 'mbcImg/home/seekCapital/rightArrow.png',
				isAll: [
					{
						arrow: this.Static + 'mbcImg/home/seekCapital/rightArrow.png',
						allShow: false
					},
					{
						arrow: this.Static + 'mbcImg/home/seekCapital/rightArrow.png',
						allShow: false
					},
					{
						arrow: this.Static + 'mbcImg/home/seekCapital/rightArrow.png',
						allShow: false
					}
				],
				checkedItems: this.Static + 'mbcImg/home/seekCapital/checkedItems.png',
				labelName:'',
				fieldsDataList:'',
				levesDataList:'',
				areaDataList:'',
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
				clickItemsTitle: 1 // 当前title,所在的位置，1代表的投资人，2代表时投资项目
			};
	    },
		computed: {
			...mapGetters(['SEEKCAPITALTITLE', 'INVESTORSEARCH', 'INVERSTINSSEARCH', 'AREADATA', 'FIELDDATA', 'LEVELDATA'])
		},
		watch: {},
		created() {
			this.investorSearch = this.INVESTORSEARCH;
			console.log(this.investorSearch, 'this.investorSearch');
			this.investInsSearch = this.INVERSTINSSEARCH;
			console.log(this.investInsSearch, 'this.investInsSearch');
			this.clickItemsTitle = this.SEEKCAPITALTITLE;
			console.log(this.clickItemsTitle, 'this.clickItemsTitle');
		},
		mounted(){
			console.log(this.FIELDDATA, 'AREADAT地区数据')
		},
	    methods: {
			...mapMutations({
				setMultipleShow: 'setMultipleShow', // 筛选展示
				setAreaData: 'setAreaData', // 公共组件省市区
				setFieldData: 'setFieldData', // 公共组件领域
				setLevelData: 'setLevelData', // 公共组件融资阶段
			}),
			// 领域
			labelBtn(name,index){
				console.log(name,index,"nameindex")
				let LEVELDATA = this.LEVELDATA;
				if (name === '0001') { // 阶段全部
					console.log('选择的全部');
					LEVELDATA.map((items, index) => {
						if (items.value !== '0001') {
							LEVELDATA[index].checked = false
						} else {
							LEVELDATA[index].checked = true
						}
						this.$store.commit('setLevelData', LEVELDATA); // 更新setLevelData
					})
				} else { // 选择非全部
					if(this.levesDataList.join(',').indexOf(name) >-1){
						this.levesDataList.map((items, key) => {
							if (items !== '0001') { // 除了全部那项，前他保持选择状态
								LEVELDATA[index].checked = true;
							} else {
								LEVELDATA[0].checked = false; // 如果已经选择了全部，则全部哪项取消
							}
						})
						
					}else{
						LEVELDATA[index].checked = false
					}
					this.$store.commit('setLevelData', LEVELDATA); // 更新setLevelData
				}
			},
			checkboxChange: function (e) {
			  this.levesDataList = e.detail.value; // 获取选中的值
			  console.log(this.levesDataList,"levesDataList");
			},
			// 阶段
			labelBtn1(name,index){
			  console.log(name,index,"nameindex")
			  let FIELDDATA = this.FIELDDATA;
			  if (name === '0001') { // 阶段全部
				console.log('选择的全部');
				FIELDDATA.map((items, index) => {
					if (items.value !== '0001') {
						FIELDDATA[index].checked = false
					} else {
						FIELDDATA[index].checked = true
					}
					this.$store.commit('setFieldData', FIELDDATA); // 更新setFieldData
				})
			  } else { // 选择非全部
				if(this.fieldsDataList.join(',').indexOf(name) >-1){
					this.fieldsDataList.map((items, key) => {
						if (items !== '0001') { // 除了全部那项，前他保持选择状态
							FIELDDATA[index].checked = true;
						} else {
							FIELDDATA[0].checked = false; // 如果已经选择了全部，则全部哪项取消
						}
					})
					
				}else{
					FIELDDATA[index].checked = false
				}
				this.$store.commit('setFieldData', FIELDDATA); // 更新setFieldData
			  }
			},
			checkboxChange1: function (e) {
			  this.fieldsDataList = e.detail.value; // 获取选中的值
			  console.log(this.fieldsDataList,"fieldsDataList");
			},
			// 地区
			labelBtn2(name,index){
			  console.log(name,index,"nameindex");
			  let AREADATA = this.AREADATA;
			  if (name === '0001') { // 阶段全部
				console.log('选择的全部');
				AREADATA.province.map((items, index) => {
					if (items.value !== '0001') {
						AREADATA.province[index].checked = false
					} else {
						AREADATA.province[index].checked = true
					}
					this.$store.commit('setAreaData', AREADATA); // 更新setAreaData
				})
			  } else { // 选择非全部
				if(this.areaDataList.join(',').indexOf(name) >-1){
					this.areaDataList.map((items, key) => {
						if (items !== '0001') { // 除了全部那项，前他保持选择状态
							AREADATA.province[index].checked = true;
						} else {
							AREADATA.province[0].checked = false; // 如果已经选择了全部，则全部哪项取消
						}
					})
					
				}else{
					AREADATA.province[index].checked = false
				}
				this.$store.commit('setAreaData', AREADATA); // 更新setAreaData
			  }
			},
			checkboxChange2: function (e) {
			  this.areaDataList = e.detail.value; // 获取选中的值
			  console.log(this.areaDataList,"areaDataList");
			},
			clickToAll(e) {
				this.isAll.map((items, index) => {
					if (index === e) {
						if (items.arrow === this.downArrow) {
							items.arrow = this.rightArrow;
							items.allShow = false
						} else {
							items.arrow = this.downArrow;
							items.allShow = true
						}
					}
				})
			},
			clickItems0 (e) {
				console.log(e, '触发点击筛选items');
				this.arr0[e] = !this.arr0[e];
				console.log(this.arr0);
				this.$store.commit('setArr0', this.arr0); // 更新setArr0
			},
			clickItems1 (e) {
				console.log(e, '触发点击筛选items');
				this.arr1[e] = !this.arr1[e];
				this.$store.commit('setArr1', this.arr1); // 更新setArr1
			},
			clickItems2 (e) {
				console.log(e, '触发点击筛选items');
				this.arr2[e] = !this.arr2[e];
				this.$store.commit('setArr2', this.arr2); // 更新setArr2
			},
			clickClose(){
				console.log('触发关闭按钮');
				this.$store.commit('setMultipleShow', false); // 更新setMultipleShow
			},
			clickReset(){
				console.log('触发重置按钮');
				this.resetData();
			},
			resetData () {
				console.log('触发重置按钮');
				// ----------------------------阶段-----------------------------
				let LEVELDATA = this.LEVELDATA;
				LEVELDATA.map((items, index) => {
					items.checked = false;
				});
				this.$store.commit('setLevelData', LEVELDATA); // 更新setLevelData
				this.levesDataList = [];
				// ----------------------------领域-----------------------------
				let FIELDDATA = this.FIELDDATA;
				FIELDDATA.map((items, index) => {
					items.checked = false;
				});
				this.$store.commit('setFieldData', FIELDDATA); // 更新setFieldData
				this.fieldsDataList = [];
				// ----------------------------区域-----------------------------
				let AREADATA = this.AREADATA;
				AREADATA.province.map((items, index) => {
					items.checked = false;
				})
				this.$store.commit('setAreaData', AREADATA); // 更新setAreaData
				this.areaDataList = [];
				uni.showToast({
					title: '已重置！',
					icon: 'none',
					duration: 1000
				});
			},
			clickSure(){
				console.log('触发确认按钮');
				if (this.clickItemsTitle === 1) {
					let fieldsData = []; // 领域
					this.FIELDDATA.map((items,index) => {
						if (items.checked === true && items.value !== '0001') {
							fieldsData.push(items.value);
						}
					});
					this.investorSearch.fields = fieldsData.join(',');
					let levesData = []; // 阶段
					this.LEVELDATA.map((items,index) => {
						if (items.checked === true && items.value !== '0001') {
							levesData.push(items.value);
						}
					});
					this.investorSearch.leves = levesData.join(',');
					let areaData = []; // 地区
					this.AREADATA.province.map((items,index) => {
						if (items.checked === true && items.value !== '0001') {
							areaData.push(items.value);
						}
					});
					this.investorSearch.area = areaData.join(',');
					this.$store.commit('setInvestorSearch', this.investorSearch); // 更新setInvestorSearch
				} else if (this.clickItemsTitle === 2) {
					let fieldsData = []; // 领域
					this.FIELDDATA.map((items,index) => {
						if (items.checked === true && items.value !== '0001') {
							fieldsData.push(items.value);
						}
					});
					this.investInsSearch.fields = fieldsData.join(',');
					let levesData = []; // 阶段
					this.LEVELDATA.map((items,index) => {
						if (items.checked === true && items.value !== '0001') {
							levesData.push(items.value);
						}
					});
					this.investInsSearch.leves = levesData.join(',');
					let areaData = []; // 地区
					this.AREADATA.province.map((items,index) => {
						if (items.checked === true && items.value !== '0001') {
							areaData.push(items.value);
						}
					});
					this.investInsSearch.area = areaData.join(',');
					this.$store.commit('setInvestInsSearch', this.investInsSearch); // 更新setInvestInsSearch
				}
				this.$store.commit('setMultipleShow', false); // 更新setMultipleShow
			}
	    }
	};
</script>

<style>
	uni-checkbox-group uni-label {
		padding-right: 0px !important;
	}
	.multiple-content{
		position: relative;
		width: 100%;
		position: fixed;
		height: 2000upx;
		z-index: 102;
		top: 0;
		overflow: scroll;
	}
	.maskBox{
		width: 100%;
		position: fixed;
		background: rgba(46,46,48,0.20);
		min-height: 100vh;
		z-index: 102;
		top: 0;
	}
	.multiple-box{
		position: relative;
		width: 652upx;
		background: #fff;
		min-height: 2000upx;
		z-index: 103;
	}
	.multiple-cot{
		position: relative;
		width: 100%;
	}
	.multiple-list{
		position: relative;
		width: 100%;
	}
	.multiple-item-title{
		position: relative;
		width: 592upx;
		padding: 0 30upx;
		font-family: PingFang-SC-Bold;
		font-size: 32upx;
		color: #2E2E30;
		letter-spacing: 0;
		line-height: 112upx;
	}
	.right-MIL{
		position: relative;
		width: 20%;
		font-family: PingFangSC-Regular;
		font-size: 24upx;
		color: #9B9B9B;
		text-align: right;
		line-height: 112upx;
	}
	.img-r{
		position: relative;
		width: 20upx;
		height: 20upx;
		margin-left: 8upx;
	}
	.multiple-item-list{
		position: relative;
		width: 624upx;
		margin-left: 28upx;
	}
	.MIL-item{
		position: relative;
		width: 208upx;
	}
	.MIL-item>image{
		position: absolute;
		width: 36upx;
		height: 40upx;
		right: 30upx;
		top: 30upx;
	}
	.MIL-item-text{
		position: relative;
		width: 178upx;
		margin-right: 30upx;
		border-radius: 4upx;
		line-height: 70upx;
		font-family: PingFang-SC-Medium;
		font-size: 26upx;
		letter-spacing: 0;
		background: #F9F9F9;
		border-radius: 4upx;
		text-align: center;
		margin-bottom: 20upx;
	}
	.MILClicked{
		color: #02C2A2 !important;
		background: #c9f9f1 !important;
	}
	.clickImg{
		position: absolute;
		width: 36upx;
		height: 40upx;
		right: 30upx;
		top: 30upx;
		display: none;
	}
	.clickImgShow{
		position: absolute;
		width: 36upx;
		height: 40upx;
		right: 30upx;
		top: 30upx;
		display: block;
	}
	.multiple-bot{
		position: fixed;
		bottom: 0;
		width: 652upx;
		font-family: PingFangSC-Regular;
		font-size: 24upx;
		color: #2E2E30;
		letter-spacing: 0;
		line-height: 90upx;
		background: #FFFFFF;
		box-shadow: 0 -1px 0 0 #F5F5F5;
	}
	.MILClose{
		position: relative;
		width: 10%;
	}
	.MILClose .img{
		width: 32upx;
		height: 32upx;
		margin: 30upx 0upx 0upx 30upx;
	}
	.MILReset{
		position: relative;
		width: 45%;
		color: #2E2E30;
		background: #fff;
		text-align: center;
		line-height: 90upx;
	}
	.MILSure{
		position: relative;
		width: 45%;
		color: #FFFFFF;
		background: #02C2A2;
		text-align: center;
		line-height: 90upx;
	}
	.lineMIL{
		position: relative;
		width: 594upx;
		height: 1px;
		background: #F5F5F5;
		margin-top: 20upx;
	}
	.mG-btn{
		margin-bottom: 1000upx;
	}
	.selectBox{
	  background: #EB5248!important;
	  color: #fff!important;
	}
	.checkbox{
	  padding: 5px 10px;
	  border: 1px solid #EB5248;
	  margin: 10px;
	  border-radius: 7upx;
	  color: #000;
	}
</style>
