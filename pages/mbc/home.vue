<template>
	<view class="homeContent">
		<!-- 组件模块 -->
		<view class="homeTemplate">
			<!-- 首页 -->
			<view :class="GET_HOME.tabItems === 1 ? 'show' : 'hide'">
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
				tabItems: 1
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
		},
		methods: {
			...mapMutations({
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
			}
		}
		
	}
</script>

<style>
</style>
