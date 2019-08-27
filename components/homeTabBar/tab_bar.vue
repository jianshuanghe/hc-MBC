<template>
	<view class="tabBar-content">
		<view class="tabBarBox">
			<view class="tb-content">
				<view class="left tb-box" @tap="tabBarItems(1)">
					<view class="tb-img">
						<image :src='home'></image>
					</view>
					<view class="tb-text">
						<text :class="clickItems === 1 ? 'class-a' : ''">首页</text>
					</view>
				</view>
				<view class="left tb-box" @tap="tabBarItems(2)">
					<view class="tb-img">
						<image :src='find'></image>
					</view>
					<view class="tb-text">
						<text :class="clickItems === 2 ? 'class-a' : ''">发现</text>
					</view>
				</view>
				<view class="left tb-box" @tap="tabBarItems(5)">
					<view class="tb-img-pub">
						<image :src='published'></image>
					</view>
				</view>
				<view class="left tb-box" @tap="tabBarItems(3)">
					<view class="tb-img">
						<image :src='news'></image>
					</view>
					<view class="tb-text">
						<text :class="clickItems === 3 ? 'class-a' : ''">消息</text>
					</view>
				</view>
				<view class="left tb-box" @tap="tabBarItems(4)">
					<view class="tb-img">
						<image :src='my'></image>
					</view>
					<view class="tb-text">
						<text :class="clickItems === 4 ? 'class-a' : ''">我的</text>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import home from '@/static/mbcImg/tabBar/home.png';
	import homed from '@/static/mbcImg/tabBar/homed.png';
	import find from '@/static/mbcImg/tabBar/find.png';
	import finded from '@/static/mbcImg/tabBar/finded.png';
	import published from '@/static/mbcImg/tabBar/published.png';
	import news from '@/static/mbcImg/tabBar/news.png';
	import newsed from '@/static/mbcImg/tabBar/newsed.png';
	import my from '@/static/mbcImg/tabBar/my.png';
	import myed from '@/static/mbcImg/tabBar/myed.png';
	import { mapMutations, mapGetters } from 'vuex';
	export default {
		data() {
			return {
				clickItems: 1, // 用户初次进来默认用户为首页
				tabbarItems: 1, // 记录用户切换的按钮
				home: homed, // 首页
				find: find, // 发现
				published: published, // 发布
				news: news, // 消息
				my: my // 我的
			}
		},
		components: {
		},
		
		computed: {
			...mapGetters(['GET_HOME'])
		},
		
		watch: {
		  GET_HOME: {
		    handler (a, b) {
		      this.clickItems = a.tabItems; // 切换tabbar
			  this.tabBarItems(this.clickItems);
		    },
		    deep: true
		  }
		},
		created() {
			console.log(home, '加载主页');
			if(uni.getStorageSync('clickItems')) {
				this.clickItems = uni.getStorageSync('clickItems'); // 取缓存中tabbar数据
				this.tabBarItems(this.clickItems);
			}
		},
		mounted() {
			console.log(home, '加载主页');
		},
		methods: {
			...mapMutations({
				setHome: 'setHome'
			}),
			tabBarItems (e) {
				console.log(e, '触发tabbar按钮');
				this.clickItems = e;
				this.$store.commit('setHome', this.clickItems);
				uni.setStorageSync('clickItems', e);
				if (e === 1) {
				  this.home = homed;
				  this.find = find;
				  this.news = news;
				  this.my = my;
				} else if (e === 2) {
				  this.home = home;
				  this.find = finded;
				  this.news = news;
				  this.my = my;
				} else if (e === 3) {
				  this.home = home;
				  this.find = find;
				  this.news = newsed;
				  this.my = my;
				} else if (e === 4) {
				  this.home = home;
				  this.find = find;
				  this.news = news;
				  this.my = myed;
				} else if (e === 5) {
				  this.home = home;
				  this.find = find;
				  this.news = news;
				  this.my = my;
				};
			}
		}
		
	}
</script>

<style>
	.tabBar-content{
		position: fixed;
		bottom: 0;
		width: 750upx;
		height: 100upx;
		background: #FFFFFF;
		box-shadow: 0 -2upx 0 0 #F5F5F5;
	}
	.tabBarBox{
		position: relative;
		width: 750upx;
		height: 100upx;
		padding: 5upx 5upx 5upx 5upx;
	}
	.tb-content{
		position: relative;
		width: 740upx;
		height: 100upx;
	}
	.tb-box{
		position: relative;
		width: 20%;
	}
	.tb-img{
		position: relative;
		width: 100%;
		text-align: center;
	}
	.tb-img>image{
		position: relative;
		width: 44upx;
		height: 44upx;
		margin: auto;
		top: 8upx;
	}
	.tb-img-pub{
		position: relative;
		width: 100%;
		text-align: center;
	}
	.tb-img-pub>image{
		position: relative;
		width: 74upx;
		height: 74upx;
		margin: auto;
		top: 4upx;
	}
	.tb-text{
		position: relative;
		width: 100%;
		line-height: 20upx;
		text-align: center;
	}
	.tb-text>text{
		position: relative;
		width: 100%;
		font-family: PingFangSC-Regular;
		font-size: 24upx;
		color: #2E2E30;
	}
	.class-a{
		color: #02C2A2 !important;
	}
</style>
