<template>
	<view class="multipleScreen-content">
		<view class="line"></view>
		<!-- top -->
		<view class="multipleScreen">
			<view class="multipleScreen-box">
				<view :class="clickIndex === 1 ? 'left multiple tabInddex' : 'left multiple'" @tap='clickMultipleScreen(1)'>
					{{fileText}}
					<image class="img-multiple" :src='arrow'></image>
				</view>
				<view class="right screen" @tap='clickMultipleScreen(2)'>
					<view class="line-Y-screen"></view>
					筛选
					<image class="img-screen" :src='screenUp'></image>
				</view>
				<view class="clear"></view>
			</view>
		</view>
		<!-- bot -->
		<view class="multipleScreen-list">
			<!-- 综合 -->
			<screenBox :class="MULTIPLESCREEN.screenShow ? 'show' : 'hide'"></screenBox>
			<!-- 筛选 -->
			<multipleBox  :class="MULTIPLESCREEN.multipleShow ? 'show' : 'hide'"></multipleBox>
		</view>
	</view>
</template>

<script>
	import screenUp from '@/static/mbcImg/home/seekCapital/screenUp.png';
	import screenDown from '@/static/mbcImg/home/seekCapital/screenDown.png';
	import downArrow from '@/static/mbcImg/home/seekCapital/down-arrow.png';
	import upArrow from '@/static/mbcImg/home/seekCapital/up-arrow.png';
	import screenBox from "./screen/screen.vue";
	import multipleBox from "./multiple/multiple.vue";
	import { mapMutations, mapGetters } from 'vuex';
	export default {
	    data () {
			return {
				investorSearch: {},
				investInsSearch: {},
				fileText: '综合',
				areaData: { // 地区
					area: [], // 全国省市区
					province: [], // 全国省
					provinceAndCity: [] // 全国省市
				},
				arr0: [], // 定义样式
				arr1: [], // 定义样式
				arr2: [], // 定义样式
				screenUp: screenUp,
				screenDown: screenDown,
				screen: screenUp,
				upArrow: upArrow, // 展示时图标--展开
				downArrow: downArrow, // 展示时图标---收起
				arrow: downArrow, // 默认图标
				clickIndex: 3 // 判断用户点击类型
			};
	    },
		components: {
			screenBox,
			multipleBox
		},
		computed: {
			...mapGetters(['MULTIPLESCREEN', 'LOOKPROJECTSEARCH'])
		},
		watch: {
			MULTIPLESCREEN: {
				handler (a, b) {
					if(a.screenShow === false) {
						this.arrow = this.downArrow;
						if (this.clickIndex === 1) {
							this.clickIndex = 3;
						}
					} else if (a.multipleShow === false) {
						this.screen = this.screenUp;
						if (this.clickIndex === 2) {
							this.clickIndex = 3;
						}
					}
				},
				deep: true
			},
			LOOKPROJECTSEARCH: {
				handler (a, b) {
					console.log(a, '获取VUX投资人的参数');
					this.showFileText(a);
				},
				deep: true
			}
		},
		created() {
			this.getArea();
			this.getField();
			this.getLevel();
		},
		mounted(){
		},
	    methods: {
			...mapMutations({
				setScreenShow: 'setScreenShow', // 综合展示
				setMultipleShow: 'setMultipleShow', // 筛选展示
				setAreaData: 'setAreaData', // 公共组件省市区
				setFieldData: 'setFieldData', // 公共组件领域
				setLevelData: 'setLevelData', // 公共组件融资阶段
			}),
			showFileText (a) {
				let text = this.fileText; // 过滤器显示文字
				if (a.sortType === 'ID') {
					text = '综合';
				} else if (a.sortType === 'CREATE_TIME') {
					text = '最新';
				} else if (a.sortType === 'INFO_COUNT') {
					text = '最热';
				}
				setTimeout(() => {
					this.fileText = text;
				}, 300);
			},
			clickMultipleScreen (e) {
				if(e === 1) {
					this.screen = this.screenUp;
					console.log(e,'触发展示综合按钮1');
					if(this.clickIndex === 1) { // 重复点击
						this.clickIndex = 3;
						this.arrow = this.downArrow;
						this.$store.commit('setScreenShow', false); // 更新setScreenShow		
					} else {
						this.clickIndex = e;
						this.arrow = this.upArrow;
						this.$store.commit('setScreenShow', true); // 更新setScreenShow
						this.$store.commit('setMultipleShow', false); // 更新setMultipleShow
					}
				} else if (e === 2) {
					this.arrow = this.downArrow; // 收起
					console.log(e, '触发展示筛选按钮2');
					this.clickIndex = e;
					this.screen = this.screenDown;
					this.$store.commit('setMultipleShow', true); // 更新setMultipleShow
					this.$store.commit('setScreenShow', false); // 更新setScreenShow
				}
				
			},
			getArea () { // 公共组件省市区
				let area = []; // 全国省市区
				let province = []; // 全国省
				let provinceAndCity = []; // 全国省市
				if (uni.getStorageSync('landRegist')) {
					let landRegistLG = JSON.parse(uni.getStorageSync('landRegist')); // 读取缓存的用户信息
					console.log(landRegistLG.user.id);
					let params = {}; // 请求总数居时 参数为空
					uni.request({
						url: this.api2 + '/field/cityJson', //接口地址。
						data: this.endParams(params),
						header: {
							Authorization:"Bearer "+landRegistLG.token//将token放到请求头中
						},
						success: (response) => {
							area = response.data; // 全国省市区
							area.map((items, index) => {
								let provinceItems = {
									name: items.name,
									value: items.id,
									checked: false
								};
								let city = []; // 市
								items.child.map((item, index) => {
									let child = {
										name: item.name,
										id: item.id
									}
									city.push(child)
								});
								let provinceAndCityItems = {
									name: items.name,
									id: items.id,
									child: city
								};
								province.push(provinceItems);
								provinceAndCity.push(provinceAndCityItems);
							});
							this.areaData.area = area;
							this.areaData.province = province;
							this.areaData.provinceAndCity = provinceAndCity;
							this.$store.commit('setAreaData', this.areaData); // 更新setAreaData
						},
						fail: (error) => {
							uni.showToast({
								title: '网络繁忙，请稍后',
								icon: 'none',
								duration: 1000
							});
							console.log(error, '网络繁忙，请稍后');
						}
					});
				}
			},
			getField () { // 公共组件领域
				let fieldData = [];
				if (uni.getStorageSync('landRegist')) {
					let landRegistLG = JSON.parse(uni.getStorageSync('landRegist')); // 读取缓存的用户信息
					console.log(landRegistLG.user.id);
					let params = {}; // 请求总数居时 参数为空
					uni.request({
						url: this.api2 + '/field/fieldList', //接口地址。
						data: this.endParams(params),
						header: {
							Authorization:"Bearer "+landRegistLG.token//将token放到请求头中
						},
						success: (response) => {
							console.log(response.data.content); // 领域
							let field = response.data.content;
							field.map((items, index) => {
								let fieldItems = {
									name: items.name,
									value: items.id,
									checked: false
								};
								fieldData.push(fieldItems);
							})
							this.$store.commit('setFieldData', fieldData); // 更新setFieldData
						},
						fail: (error) => {
							uni.showToast({
								title: '网络繁忙，请稍后',
								icon: 'none',
								duration: 1000
							});
							console.log(error, '网络繁忙，请稍后');
						}
					});
				}
			},
			getLevel () { // 公共组件融资阶段
			let levelData = [];
				if (uni.getStorageSync('landRegist')) {
					let landRegistLG = JSON.parse(uni.getStorageSync('landRegist')); // 读取缓存的用户信息
					console.log(landRegistLG.user.id);
					let params = {}; // 请求总数居时 参数为空
					uni.request({
						url: this.api2 + '/field/levelList', //接口地址。
						data: this.endParams(params),
						header: {
							Authorization:"Bearer "+landRegistLG.token//将token放到请求头中
						},
						success: (response) => {
							console.log(response.data.content); // 融资阶段
							let level = response.data.content;
							level.map((items, index) => {
								let levelItems = {
									name: items.name,
									value: items.id,
									checked: false
								};
								levelData.push(levelItems);
							})
							this.$store.commit('setLevelData',levelData); // 更新setLevelData
						},
						fail: (error) => {
							uni.showToast({
								title: '网络繁忙，请稍后',
								icon: 'none',
								duration: 1000
							});
							console.log(error, '网络繁忙，请稍后');
						}
					});
				}
			}
	    }
	};
</script>

<style>
	.multipleScreen-content{
		position: fixed;
		width: 100%;
		background: #fff;
		z-index: 101;
		width: 100%;
	}
	.multipleScreen-list{
		position: relative;
		width: 100%;
	}
	.multipleScreen{
		padding: 0 30upx;
	}
	.multipleScreen-box{
		position: relative;
		width: 100%;
	}
	.multiple{
		position: relative;
		width: 30%;
		font-family: PingFangSC-Regular;
		font-size: 26upx;
		color: #2E2E30;
		line-height: 80upx;
	}
	.img-multiple{
		position: absolute;
		width: 28upx;
		height: 28upx;
		top: 28upx;
		left: 30%;
	}
	.screen{
		position: relative;
		width: 14%;
		font-family: PingFangSC-Regular;
		font-size: 26upx;
		color: #2E2E30;
		line-height: 80upx;
	}
	.line-Y-screen{
		position: absolute;
		width: 2upx;
		height: 40upx;
		background: #F5F5F5;
		right: 120upx;
		top: 20upx;
	}
	.img-screen{
		position: relative;
		width: 36upx;
		height: 36upx;
		top: 12upx;
		left: 8upx;
	}
	.tabInddex{
		color: #02C2A2 !important;
	}
</style>
