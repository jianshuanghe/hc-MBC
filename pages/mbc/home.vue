<template>
	<view class="homeContent">
		<!-- 组件模块 -->
		<view class="homeTemplate">
			<!-- 首页 -->
			<view v-if="GET_HOME.tabItems === 1">
				<pageHome></pageHome>
			</view>
			<!-- 发现 -->
			<view v-if="GET_HOME.tabItems === 2">
				<pageFind></pageFind>
			</view>
			<!-- 消息 -->
			<view v-if="GET_HOME.tabItems === 3">
				<pageNews></pageNews>
			</view>
			<!-- 我的 -->
			<view v-if="GET_HOME.tabItems === 4">
				<pageMy></pageMy>
			</view>
			<!-- 发布 -->
			<view v-if="GET_HOME.tabItems === 5">
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
				areaPorC: {}
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
			this.$store.commit('setAuthShow', false); // 更新setAuthShow
		},
		methods: {
			...mapMutations({
				setAuthShow: 'setAuthShow'
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
				let city = []; // 全国市
				if (uni.getStorageSync('landRegist')) {
					let landRegistLG = JSON.parse(uni.getStorageSync('landRegist')); // 读取缓存的用户信息
					console.log(landRegistLG.user.id);
					let params = {}; // 请求总数居时 参数为空
					uni.showLoading({ // 展示loading
						title: '加载中'
					});
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
								};
								let cityItems = []; // 市
								items.child.map((item, index) => {
									let child = {
										name: item.name,
										value: item.id
									}
									cityItems.push(child)
								});
								province.push(provinceItems);
								city.push(cityItems);
							});
							this.areaPorC.province = province;
							this.areaPorC.city = city;
							uni.setStorageSync('areaPorC', JSON.stringify(this.areaPorC));// 缓存省市二级列表数据
							console.log(this.areaPorC, '省市区');
							uni.hideLoading(); // 隐藏 loading
						},
						fail: (error) => {
							uni.hideLoading(); // 隐藏 loading
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
