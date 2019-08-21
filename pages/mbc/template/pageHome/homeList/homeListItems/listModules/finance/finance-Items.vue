<template>
	<view class="financeItems-content" >
		<view class="FI-content">
			<view class="FI-box-cont" @tap="goToFinanceDetail(msgData)">
				<view class="FI-top">
					<view class="left FI-t-left">
						<image :src="msgData.projLogo"></image>
					</view>
					<view class="left FI-t-cont">
						<view class="FI-t-title">
							<text class="title">{{msgData.projName}}</text>
							<text class="inst">营销平台</text>
						</view>
						<view class="FI-t-ins">{{msgData.projSlogan}}</view>
					</view>
					<view class="right FI-t-right">
						<view class="FI-t-money">
							￥<text class="money">{{msgData.finanMoney}}</text>万
						</view>
						<view class="FI-t-ins2">融资轮次: {{msgData.finanLevelCode}}</view>
					</view>
					<view class="clear"></view>
				</view>
				<view class="FI-modules">
					<text class="modules-items-FI left">顺为资本完成天使轮融资2000万</text>
				</view>
				<view class="FI-insCd">
					<view class="FI-C-text">我需要寻找投资相关的服务我需要寻找投资相我需要寻找投资相关的服务我需要寻找投资相我需要寻找资…</view>
				</view>
				<view class="FI-cont" v-if="msgData.imgs.length === 1">
					<view class="ImageBox1">
						<image :src="msgData.imgs[0].imgName"></image>
					</view>
				</view>
				<view class="FI-cont-imgMoreTwo" v-if="msgData.imgs.length === 2" >
					<view class="imageBox left" v-for="(items,index) in msgData.imgs" :key="index">
						<image :src="items.imgName" v-if="index < 3"></image>
					</view>
					<view class="clear"></view>
				</view>
				<view class="FI-cont-imgMore" v-if="msgData.imgs.length > 2" >
					<view class="imageBox left" v-for="(items,index) in msgData.imgs" :key="index" v-if="index < 3">
						<image :src="items.imgName"></image>
					</view>
					<view class="clear"></view>
				</view>
			</view>
			<view class="FI-bot">
				<view class="FI-address left">
					<view class="icon-img left">
						<image :src="address"></image>
					</view>
					<view class="icon-text1 left">
						<p class="">{{msgData.pcode}}</p>
					</view>
					<view class="clear"></view>
				</view>
				<view class="FI-data left">
					<view class="left lists">
						<view class="list-item" @tap="setClickRecord('find', items, msgData)">
							<view class="icon-img left">
								<image :src="items.find ? finded : find"></image>
							</view>
							<view class="icon-text left">
								<p class="">{{msgData.infoCount}}</p>
							</view>
							<view class="clear"></view>
						</view>
					</view>
					<!-- <view class="left lists">
						<view class="list-item">
							<view class="icon-img left">
								<image :src="doc"></image>
							</view>
							<view class="icon-text left">
								<p class="">{{msgData.infoCount}}</p>
							</view>
							<view class="clear"></view>
						</view>
					</view> -->
					<view class="left lists">
						<view class="list-item" @tap="setClickRecord('like', items, msgData)">
							<view class="icon-img left">
								<image :src="items.like ? liked : like"></image>
							</view>
							<view class="icon-text left">
								<p class="">{{msgData.likeCount}}</p>
							</view>
							<view class="clear"></view>
						</view>
					</view>
					<view class="left lists">
						<view class="list-item" @tap="setClickRecord('love', items, msgData)">
							<view class="icon-img left">
								<image :src="items.love ? loved : love"></image>
							</view>
							<view class="icon-text left">
								<p class="">{{msgData.followCount}}</p>
							</view>
							<view class="clear"></view>
						</view>
					</view>
				</view>
				<view class="clear"></view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
	    data () {
			return {
				fiImg: this.Static + 'mbcImg/home/banner1.png',
				address: this.Static + 'mbcImg/home/address.png', // 地址
				find: this.Static + 'mbcImg/home/find.png', // 查看
				finded: this.Static + 'mbcImg/home/finded.png', // 查看
				doc: this.Static + 'mbcImg/home/doc.png', // 留言
				doced: this.Static + 'mbcImg/home/doced.png', // 留言
				like: this.Static + 'mbcImg/home/like.png', // 喜欢
				liked: this.Static + 'mbcImg/home/liked.png', // 喜欢
				love: this.Static + 'mbcImg/home/love.png', // 收藏
				loved: this.Static + 'mbcImg/home/loved.png', // 收藏
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
			
		},
	    methods: {
			getClickRecord () {
				console.log('获取缓存中的用户点击行为数组记录');
				if (uni.getStorageSync('clickRecordsArr')) {
					this.clickRecordsArr = JSON.parse(uni.getStorageSync('clickRecordsArr')); // 获取缓存中的用户点击行为数组记录
					this.clickRecordsArr.map((item, index) => {
						if (item.id === this.msgData.id) { // 取出缓存中存在的状态
						   console.log(item.id, '取出缓存中存在的状态');
						   this.items = item;
						}
					});
				}
			},
			setClickRecord (e, items, evn) {
				console.log(e, items, evn, '记录用户行为');
				if (e === 'find') { // 查看
					this.items.find = true; // 点击之后状态变化
					this.msgData.infoCount = Number(this.msgData.infoCount) + 1;
					this.goToFinanceDetail(evn);
					this.resetClickRecord(items);
				} else if (e === 'like') { // 喜欢
					if (this.items.like === false) {
						this.items.like = true; // 点击之后状态变化
						this.msgData.likeCount = Number(this.msgData.likeCount) + 1;
						this.upDataIsLike(evn);
						this.resetClickRecord(items);
					};
				} else if (e === 'love') { // 收藏
					if (this.items.love === false) {
						this.items.love = true; // 点击之后状态变化
						this.msgData.followCount = Number(this.msgData.followCount) + 1;
						this.upDataIsLoved(evn); // 收藏
						this.resetClickRecord(items);
					} else if (this.items.love === true) {
						this.items.love = false; // 点击之后状态变化
						this.msgData.followCount = Number(this.msgData.followCount) - 1;
						this.upDataIsLove(evn); // 取消收藏
						this.resetClickRecord(items);
					}
				};
			},
			resetClickRecord (e) {
				console.log(e, '重置缓存中用户行为数据');
				if (uni.getStorageSync('clickRecordsArr')) {
					this.clickRecordsArr = JSON.parse(uni.getStorageSync('clickRecordsArr')); // 获取缓存中的用户点击行为数组记录
					this.clickRecordsArr.map((item, index) => {
						if (item.id === e.id) { // 取出缓存中存在的状态
							this.clickRecordsArr[index] = e; // 重置数据
							uni.setStorageSync('clickRecordsArr', JSON.stringify(this.clickRecordsArr));// 缓存用户点击行为数组记录
						}
					});
				}
			},
			upDataIsLike (e) {
				console.log('跟新用户行为数据');
				if (uni.getStorageSync('landRegist')) {
					let landRegistLG = JSON.parse(uni.getStorageSync('landRegist')); // 读取缓存的用户信息
					console.log(landRegistLG.user.id);
					let params = {}; // 请求总数居时 参数为空
					uni.request({
						url: this.api2 + '/proj/projLike?projId=' + e.id + '&userId=' + landRegistLG.user.id, //接口地址。
						data: this.endParams(params),
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
			goToFinanceDetail (e){
				console.log('去' + e.id + '在融项目详情页面');
				this.items.find = true; // 点击之后状态变化
				this.msgData.infoCount = Number(this.msgData.infoCount) + 1;
				this.resetClickRecord(this.items);
				uni.navigateTo({
					url: '/modules/pageHome/homeList/FinancProject/FinancProject?id=' + e.id
				});
			},
			clickLike () {
				console.log('点赞');
				this.like = liked;
			},
			clickLove () {
				console.log('收藏');
				this.love = loved;
			}
	    }
	};
</script>

<style>
	.financeItems-content{
		position: relative;
		width: 690upx;
		margin-top: 26upx;
		background: #fff;
	}
	.FI-content{
		position: relative;
		width: 100%;
	}
	.FI-top{
		position: relative;
		width: 100%;
	}
	.FI-t-left{
		position: relative;
		width: 80upx;
		height: 80upx;
		margin-right: 10upx;
	}
	.FI-t-left>image{
		position: relative;
		width: 80upx;
		height: 80upx;
	}
	.FI-t-cont{
		position: relative;
		width: 400upx;
	}
	.FI-t-title{
		position: relative;
		width: 100%;
	}
	.title{
		font-family: PingFangSC-Medium;
		font-size: 32upx;
		color: #2E2E30;
		letter-spacing: 0;
		line-height: 32upx;
	}
	.inst{
		background: #DDFFF9;
		border-radius: 2upx;
		font-family: PingFangSC-Regular;
		font-size: 24upx;
		color: #00AF92;
		letter-spacing: 0;
		line-height: 24upx;
		padding: 4upx 8upx;
		margin-left: 6upx;
	}
	.FI-t-ins{
		font-family: PingFangSC-Regular;
		font-size: 24upx;
		color: #9B9B9B;
		line-height: 24upx;
	}
	.FI-t-right{
		position: relative;
	}
	.FI-t-money{
		position: relative;
		font-family: PingFangSC-Semibold;
		font-size: 24upx;
		color: #FAB100;
		line-height: 24upx;
		text-align: right;
	}
	.money{
		font-family: PingFangSC-Semibold;
		font-size: 40upx;
		color: #FAB100;
		line-height: 36upx;
	}
	.FI-t-ins2{
		font-family: PingFangSC-Regular;
		font-size: 24upx;
		color: #9B9B9B;
		line-height: 48upx;
		text-align: right;
	}
	.FI-cont{
		position: relative;
		width: 100%;
	}
	.FI-cont .ImageBox1{
		position: relative;
		width: 100%;
		height: 340upx;
	},
	.FI-cont .ImageBox1>image{
		max-width: 100%;
		max-height: 100%;
		display: table-cell;
		vertical-align: middle;
		margin: 0;
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		-webkit-transform: translate(-50%, -50%);
	},
	.FI-cont-imgMore{
		position: relative;
		width: 720upx;
	}
	.FI-cont-imgMore .imageBox{
		position: relative;
		width: 210upx;
		margin-right: 14upx;
		height: 340upx;
	},
	.FI-cont-imgMore .imageBox>image{
		max-width: 100%;
		max-height: 100%;
		display: table-cell;
		vertical-align: middle;
		margin: 0;
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		-webkit-transform: translate(-50%, -50%);
	},
	.FI-cont-imgMoreTwo{
		position: relative;
		width: 720upx;
	}
	.FI-cont-imgMoreTwo .imageBox{
		position: relative;
		width: 330upx;
		margin-right: 14upx;
		height: 340upx;
	},
	.FI-cont-imgMoreTwo .imageBox>image{
		max-width: 100%;
		max-height: 100%;
		display: table-cell;
		vertical-align: middle;
		margin: 0;
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		-webkit-transform: translate(-50%, -50%);
	},
	.FI-modules{
		position: relative;
		width: 100%;
		margin: 20upx 0 20upx 0;
		height: 32upx;
	}
	.modules-items-FI{
		background: #FFF7E5;
		border-radius: 4upx;
		font-family: PingFangSC-Regular;
		font-size: 24upx;
		color: #FE9D08;
		letter-spacing: 0;
		line-height: 24upx;
		padding: 4upx 8upx;
	}
	.FI-insCd{
		position: relative;
		width: 100%;
		margin: 20upx 0 20upx 0;
		height: 72upx;
	}
	.FI-C-text{
		font-family: PingFangSC-Regular;
		font-size: 24upx;
		color: #5D5D5D;
		line-height: 16px;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
		overflow: hidden;
	}
	.FI-bot{
		position: relative;
		width: 100%;
		margin-bottom: 30upx;
		margin-top: 20upx;
	}
	.FI-address{
		position: relative;
		width: 150upx;
	}
	.FI-address .icon-img{
		position: relative;
		width: 18%;
	}
	.FI-address .icon-img>image{
		position: relative;
		width: 30upx;
		height: 32upx;
		margin-top: 4upx;
		text-align: left;
		float: left;
	}
	.FI-address .icon-text>p{
		position: relative;
		font-family: PingFangSC-Regular;
		font-size: 22upx;
		color: #2E2E30;
		text-align: left;
		line-height: 40upx;
	}
	.FI-data{
		position: relative;
		/* width: 540upx; */
		width: 408upx;
		float: right;
	}
	.lists{
		position: relative;
		width: 135upx;
	  }
	.list-item{
		position: relative;
		/* width: 100%; */
		float: right;
	}
	.icon-img{
		position: relative;
		width: 60%;
	}
	.icon-img>image{
		position: relative;
		width: 36upx;
		height: 36upx;
		float: right;
	}
	.icon-text{
		position: relative;
		max-width: 40%;
		width: 20upx;
	}
	.icon-text>p{
		position: relative;
		width: 100%;
		font-size: 22upx;
		color: #9B9B9B;
		line-height: 36upx;
		text-align: right;
	}
	.icon-text1{
		position: relative;
		width: 40%;
	}
	.icon-text1>p{
		position: relative;
		width: 100%;
		font-size: 22upx;
		color: #9B9B9B;
		line-height: 40upx;
		text-align: right;
	}
</style>
