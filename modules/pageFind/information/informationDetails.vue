<template>
	<view class="activeDetails-content">
		<view class="content-content">
			<view class="activeDetails">
				<view class="AD-content">
					<view class="AD-title">{{dataList.activity.activityTitel || ''}}</view>
					<view class="AD-items">{{dataList.activity.createTime | dateTime}}</view>
					<!-- 活动详情 -->
					<view class="AD-details-text">
						{{dataList.activity.activityAbstract || ''}}
					</view>
					<view class="AD-details-img">
						<image :src="dataList.activity.activityImg || this.dImg"></image>
					</view>
					<view class="AD-details-text" v-html='dataList.activity.activityContent'></view>
					<div class="loveBg-box">
						<div class="loveBg">
							<view class="img-box" @tap="setClickRecord('love', items, dataList.activity)">
								<image class="img"  :src="items.love ? loved : love"></image>
							</view>
						</div>
						<view :class="items.love ? 'img-box-text1' : 'img-box-text'">收藏</view>
					</div>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import date from '@/static/mbcJs/dateTime.js';
	export default {
	    data () {
			return {
				dataList: {} ,// 后台返回数据
				love: this.Static + 'mbcImg/home/lovem.png',
				loved: this.Static + 'mbcImg/home/lovemed.png',
				items: { // 用户缓存用户行为的子项
					id: '', // id
					love: false // 收藏
				}
			};
	    },
		components: {
		},
		filters: {
		  /* 格式化时间戳 */
		  dateTime (val) {
		    return date.dateTime('.', val);
		  },
		  /* 格式图片 */
		  dataImg (val) {
			  return 'https://' + val;
		  }
		  
		},
		computed: {},
		watch: {},
		onLoad(option) {
			console.log(option)
			this.getList(option.id);
			this.getClickRecord(option.id);
		},
	    methods: {
			getList (e) {
				if (uni.getStorageSync('landRegist')) {
				    let landRegistLG = JSON.parse(uni.getStorageSync('landRegist')); // 读取缓存的用户信息
				    console.log(landRegistLG.user.id);
					let params = {}; // 请求总数居时 参数为空
					uni.showLoading({ // 展示loading
						title: '加载中'
					});
					uni.request({
						url: this.api2 + '/activity/detail?activityId=' + e, //接口地址。
						data: this.endParams(params),
						header: {
							Authorization:"Bearer "+landRegistLG.token//将token放到请求头中
						},
						success: (response) => {
							console.log(response.data.content);
							this.dataList = response.data.content;
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
			},
			getClickRecord (e) {
				console.log('获取缓存中的用户点击行为数组记录');
				if (uni.getStorageSync('clickRecordsInFor')) {
					this.clickRecordsInFor = JSON.parse(uni.getStorageSync('clickRecordsInFor')); // 获取缓存中的用户点击行为数组记录
					this.clickRecordsInFor.map((item, index) => {
						console.log(item.id, e, 'id')
						if (String(item.id) === String(e)) { // 取出缓存中存在的状态
						   console.log(item.id, '取出缓存中存在的状态');
						   this.items = item;
						   console.log(this.items, '--------------------------999---------------------------');
						}
					});
				}
			},
			setClickRecord (e, items, evn) {
				console.log(e, items, evn, '记录用户行为');
				if (e === 'love') { // 收藏
					if (this.items.love === false) {
						this.items.love = true; // 点击之后状态变化
						this.upDataIsLoved(evn); // 收藏
						this.resetClickRecord(items);
					} else {
						this.items.love = false; // 点击之后状态变化
						this.upDataIsLove(evn); // 收藏
						this.resetClickRecord(items);
					}
				};
			},
			resetClickRecord (e) {
				console.log(e, '重置缓存中用户行为数据');
				if (uni.getStorageSync('clickRecordsInFor')) {
					this.clickRecordsInFor = JSON.parse(uni.getStorageSync('clickRecordsInFor')); // 获取缓存中的用户点击行为数组记录
					this.clickRecordsInFor.map((item, index) => {
						console.log(item.id, e.id, '重置id')
						console.log(this.items, 'e')
						if (String(item.id) === String(e.id)) { // 取出缓存中存在的状态
							this.clickRecordsInFor[index] = e; // 重置数据
							uni.setStorageSync('clickRecordsInFor', JSON.stringify(this.clickRecordsInFor));// 缓存用户点击行为数组记录
						}
					});
				}
			},
			upDataIsLoved(e) { // 收藏
				console.log('跟新用户行为数据');
				if (uni.getStorageSync('landRegist')) {
					let landRegistLG = JSON.parse(uni.getStorageSync('landRegist')); // 读取缓存的用户信息
					console.log(landRegistLG.user.id);
					let params = {
						"type":"3", // 0 项目 1投资人 2 投资机构 3 投资文章
						"modelId": e.id, // //根据类型传递ID
						"userId": landRegistLG.user.id
					}; // 请求总数居时 参数为空
					uni.request({
						url: this.api2 + '/follow/add', //接口地址。
						data: this.endParams(params),
						method: 'POST',
						header: {
							Authorization:"Bearer "+landRegistLG.token//将token放到请求头中
						},
						success: (response) => {
							console.log(response.data);
						},
						fail: (error) => {
							console.log(error, '网络繁忙，请稍后');
						}
					});
				}
			},
			upDataIsLove(e) { // 取消收藏
				console.log('跟新用户行为数据');
				if (uni.getStorageSync('landRegist')) {
					let landRegistLG = JSON.parse(uni.getStorageSync('landRegist')); // 读取缓存的用户信息
					console.log(landRegistLG.user.id);
					let params = {
						"type":"3", // 0 项目 1投资人 2 投资机构 3 投资文章
						"modelId": e.id, // //根据类型传递ID
						"userId": landRegistLG.user.id
					}; // 请求总数居时 参数为空
					uni.request({
						url: this.api2 + '/follow/del', //接口地址。
						data: this.endParams(params),
						method: 'POST',
						header: {
							Authorization:"Bearer "+landRegistLG.token//将token放到请求头中
						},
						success: (response) => {
							console.log(response.data);
						},
						fail: (error) => {
							console.log(error, '网络繁忙，请稍后');
						}
					});
				}
			},
	    }
	};
</script>

<style>
	.activeDetails-content{
		position: relative;
		width: 750upx;
	}
	.loveBg-box{
		position: relative;
		width: 100%;
		margin: 40upx 0;
	}
	.loveBg{
		position: relative;
		width: 162upx;
		height: 162upx;
		background: #FFFFFF;
		box-shadow: 0 2px 8px 0 #EBEBEB;
		border-radius: 50%;
		margin: auto;
	}
	.img-box{
		position: relative;
		width: 46upx;
		height: 46upx;
	}
	.img-box .img{
		position: relative;
		width: 46upx;
		height: 46upx;
		margin: 58upx;
	}
	.img-box-text{
		font-family: PingFangSC-Regular;
		font-size: 24upx;
		color: #9B9B9B;
		text-align: center;
		line-height: 36upx;
		margin-top: 10upx;
	}
	.img-box-text1{
		font-family: PingFangSC-Regular;
		font-size: 24upx;
		color: #02C2A2;
		text-align: center;
		line-height: 36upx;
		margin-top: 10upx;
	}
	.content-content{
		position: relative;
		width: 750upx;
	}
	.activeDetails{
		position: relative;
		width: 100%;
	}
	.AD-content{
		position: relative;
		padding: 30upx;
		background: #fff;
	}
	.AD-title{
		position: relative;
		width: 100%;
		font-family: PingFang-SC-Bold;
		font-size: 40upx;
		color: #2E2E30;
		line-height: 50upx;
		margin: 20upx 0;
	}
	.AD-items{
		position: relative;
		width: 100%;
		font-family: PingFangSC-Regular;
		font-size: 28upx;
		color: #5D5D5D;
		line-height: 110upx;
	}
	
	.AD-details-title{
		font-family: PingFangSC-Semibold;
		font-size: 34upx;
		color: #2E2E30;
		letter-spacing: 0;
		line-height: 100upx;
	}
	.AD-details-text{
		position: relative;
		width: 100%;
		font-family: PingFang-SC-Medium;
		font-size: 28upx;
		color: #5D5D5D;
		letter-spacing: 0;
		line-height: 40upx;
		margin: 40upx 0;
	}
	.AD-details-img>image{
		position: relative;
		width: 100%;
		height: 384upx;
	}
</style>
