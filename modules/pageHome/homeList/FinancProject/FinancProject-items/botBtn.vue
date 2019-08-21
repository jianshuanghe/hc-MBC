<template>
	<view class="constSubmit-content">
		<view class="constSubmit">
			<view class="left const-box">
				<view class="TD-box left">
					<view class="img-box" @tap="setClickRecord('love', items, msgData)">
						<image class="img"  :src="items.love ? loved : love"></image>
					</view>
					<view :class="items.love ? 'text1' : 'text'">收藏</view>
				</view>
				<view class="WL-box left">
					<view class="img-box">
						<image class="img" :src="text"></image>
					</view>
					<view class="text">BP</view>
				</view>
				<view class="clear"></view>
			</view>
			<view class="left submit-box" @tap="goToEntrust(msgData.id)">
				委托联系
			</view>
			<view class="clear"></view>
		</view>
	</view>
</template>

<script>
	import love from '@/static/mbcImg/home/seekCapital/like.png';
	import loved from '@/static/mbcImg/home/seekCapital/liked.png';
	import text from '@/static/mbcImg/home/seekCapital/text.png';
	import texted from '@/static/mbcImg/home/seekCapital/texted.png';
	
	export default {
	    data () {
			return {
				love: love,
				loved: loved,
				text: text,
				texted: texted,
				items: { // 用户缓存用户行为的子项
					id: '', // id
					doc: false, // 留言
					find: false, // 查看
					like: false, // 点赞
					love: false // 收藏
				},
				clickRecordsArr: [] // 用户点击行为数组记录
			};
	    },
		props: {
			msgData: {
				type: Object
			}
		},
		created() {
			console.log(this.msgData, '子组件获取的数据');
			this.getClickRecord();
		},
		mounted() {
			console.log(this.msgData, '子组件获取的数据2');
			this.getClickRecord();
		},
	    methods: {
			getClickRecord () {
				console.log('获取缓存中的用户点击行为数组记录');
				if (uni.getStorageSync('clickRecordsArr')) {
					this.clickRecordsArr = JSON.parse(uni.getStorageSync('clickRecordsArr')); // 获取缓存中的用户点击行为数组记录
					this.clickRecordsArr.map((item, index) => {
						console.log(item.id, this.msgData.id, 'id')
						if (String(item.id) === this.msgData.id) { // 取出缓存中存在的状态
						   console.log(item.id, '取出缓存中存在的状态');
						   this.items = item;
						   console.log(this.items);
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
				if (uni.getStorageSync('clickRecordsArr')) {
					this.clickRecordsArr = JSON.parse(uni.getStorageSync('clickRecordsArr')); // 获取缓存中的用户点击行为数组记录
					this.clickRecordsArr.map((item, index) => {
						console.log(item.id, e.id, '重置id')
						console.log(this.items, 'e')
						if (String(item.id) === String(e.id)) { // 取出缓存中存在的状态
							this.clickRecordsArr[index] = e; // 重置数据
							uni.setStorageSync('clickRecordsArr', JSON.stringify(this.clickRecordsArr));// 缓存用户点击行为数组记录
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
						"type":"0", // 0 项目 1投资人 2 投资机构 3 投资文章
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
						"type":"0", // 0 项目 1投资人 2 投资机构 3 投资文章
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
			goToEntrust (e) {
				console.log(e, 'to委托联系');
				uni.navigateTo({
					url: '/modules/pageHome/homeList/entrust/entrust?id=' + 1
				});
			}
	    }
	};
</script>

<style>
	.constSubmit-content{
		position: fixed;
		bottom: 0;
		width: 750upx;
		height: 100upx;
		background: #FFFFFF;
		box-shadow: 0 -2upx 0 0 #F5F5F5;
	}
	.constSubmit{
		position: relative;
		width: 100%;
	}
	.const-box{
		position: relative;
		width: 40%;
	}
	.TD-box{
		position: relative;
		width: 50%;
		text-align: center;
	}
	.WL-box{
		position: relative;
		width: 50%;
		text-align: center;
	}
	.img-box{
		position: relative;
		width: 40upx;
		margin: auto;
		top: 16upx;
	}
	.img-box>image{
		position: relative;
		width: 40upx;
		height: 36upx;
		margin: auto;
	}
	.const-box .text{
		font-family: PingFangSC-Regular;
		font-size: 20upx;
		color: #9B9B9B;
		text-align: center;
		line-height: 36upx;
	}
	.text1{
		font-family: PingFangSC-Regular;
		font-size: 20upx;
		color: #02C2A2;
		text-align: center;
		line-height: 36upx;
	}
	.submit-box{
		position: relative;
		width: 60%;
		font-family: PingFangSC-Regular;
		font-size: 32upx;
		color: #FFFFFF;
		text-align: center;
		letter-spacing: 0;
		background-image: linear-gradient(-134deg,  #57D6CF 0%, #15D49F 100%);
		line-height: 100upx;
	}
</style>
