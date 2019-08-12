<template>
	<view class="homeContent">
		<!-- 组件模块 -->
		<view class="homeTemplate">
			<!-- 首页 -->
			<view :class="GET_HOME.tabItems === 1 ? 'show' : 'hide'">
				<pageHome></pageHome>
			</view>
			<!-- 发现 -->
			<view :class="GET_HOME.tabItems === 2 ? 'show' : 'hide'">
				<pageFind></pageFind>
			</view>
			<!-- 消息 -->
			<view :class="GET_HOME.tabItems === 3 ? 'show' : 'hide'">
				<pageNews></pageNews>
			</view>
			<!-- 我的 -->
			<view :class="GET_HOME.tabItems === 4 ? 'show' : 'hide'">
				<pageMy></pageMy>
			</view>
			<!-- 发布 -->
			<view :class="GET_HOME.tabItems === 5 ? 'show' : 'hide'">
				<pagePublish></pagePublish>
			</view>
		</view>
		<!-- tab切换组件 -->
		<view class="homeTabBar">
			<tabBar></tabBar>
		</view>
	</view>
</template>

<script>
	import pageFind from "./template/pageFind/page_find.vue";
	import pageHome from "./template/pageHome/page_home.vue";
	import pageMy from "./template/pageMy/page_my.vue";
	import pageNews from "./template/pageNews/page_news.vue";
	import pagePublish from "./template/pagePublish/page_publish.vue";
	import tabBar from "./../../components/homeTabBar/tab_bar.vue";
	import { mapMutations, mapGetters } from 'vuex';
	export default {
		data() {
			return {
				tabItems: 1,
				areaData: { // 地区
					area: [], // 全国省市区
					province: [], // 全国省
					provinceAndCity: [] // 全国省市
				}
			}
		},
		components: {
			pageFind,
			pageHome,
			pageMy,
			pageNews,
			pagePublish,
			tabBar
		},
		computed: {
          ...mapGetters(['GET_HOME'])
        },
		watch: {
          GET_HOME: {
            handler (a, b) {
              this.tabItems = a.tabItems; // 侦听切换类型消息
              console.log(a.tabItems, '用户切换');
			  this.upTitle(this.tabItems);
            },
            deep: true
          }
        },
		onLoad() {
			console.log(this.GET_HOME, '加载主页');
			if(uni.getStorageSync('clickItems')) {
				this.clickItems = uni.getStorageSync('clickItems'); // 取缓存中tabbar数据
				this.upTitle(this.clickItems);
			};
			this.getArea();
		},
		methods: {
			...mapMutations({
				setAreaData: 'setAreaData' // 公共组件省市区
			}),
			upTitle(e) {
				console.log('跟新主页的title');
				if (e == 1) {
					uni.setNavigationBarTitle({
						title: '陌拜资本'
					});
				} else if (e == 2) {
					uni.setNavigationBarTitle({
						title: '发现'
					});  
				} else if (e == 3) {
					uni.setNavigationBarTitle({
						title: '消息'
					});  
				} else if (e == 4) {
					uni.setNavigationBarTitle({
						title: '我的'
					});  
				} else if (e == 5) {
					uni.setNavigationBarTitle({
						title: '发布'
					});  
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
									id: items.id
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
			}
		}
		
	}
</script>

<style>
</style>
