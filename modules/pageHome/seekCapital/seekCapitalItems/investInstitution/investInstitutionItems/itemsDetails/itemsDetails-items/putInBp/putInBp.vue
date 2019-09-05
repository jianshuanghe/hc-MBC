<template>
	<div class="k">
		<div class="putInBp-content" v-if='listData.length > 0'>
			<div class="putInBp">
				<div class="itemsPutInBp">
					<checkbox-group @change="checkboxChange">
					  <label @click="labelBtn(item.id,index)"  v-for="(item,index) in listData" :key="index">
						<checkbox :value="item.id" :checked="item.checked" v-show="false"/>
						<view class="SUI-tent">
							<view class="left SUI-left-img">
								<view class="SUI-File">
									<image class="file" :src="scanLogo"></image>
								</view>
							</view>
							<view class="left SUI-cont-text">
								<view class="SUI-text-top">{{item.enclosureName}}</view>
								<view class="SUI-text-bot1">{{item.enclosureSize }}  {{ item.createTime | dateTime}}上传</view>
							</view>
							<view class="right SUI-right-img">
								<image class="rignt-arrow" :src='item.checked ? checked : check'></image>
							</view>
							<view class="clear"></view>
							<div class="line"></div>
						</view>
					  </label>
					</checkbox-group>
					
				</div>
				<div class="btnPutIn">
					<div class="btn1 left" @tap='clickCal()'>取消</div>
					<div class="btn left" @tap='clickPutBp()'>立即投递</div>
					<div class="clear"></div>
				</div>
			</div>
		</div>
		<empty v-else>抱歉，没有投递的BP~</empty>
	</div>
</template>

<script>
	import check from '@/static/mbcImg/common/check.png';
	import checked from '@/static/mbcImg/common/checked.png';
	import date from '@/static/mbcJs/dateTime.js';
	import empty from "@/components/empty/empty.vue";
	import { mapMutations, mapGetters } from 'vuex';
	export default {
	    data () {
	      return {
			scanLogo: this.Static + 'mbcImg/publish/scanLogo.png',
	        check: check,
			checked: checked,
			cheackImg: check,
			listData: [] ,// 列表数据
			putInBpList:[], // 选择的bp
			fileInfo: [] // 文件ID 项目ID 列表
	      };
	    },
		computed: {
			...mapGetters(['GET_PUBLISH', 'GET_HOME'])
		},
		props: {
			msg: {
				type: Object
			}
		},
		components: {
			empty
		},
		filters: {
		  /* 格式化时间戳 */
		  dateTime (val) {
		    return date.dateTime('y.m.d h minute', val);
		  }
		},
		created() {
			console.log('在组件中并不能使用页面生命周期函数');
			this.getputInBpList(this.putInBp);
		},
	    methods: {
			...mapMutations({
				setPutBpShow: 'setPutBpShow'
			}),
			checkboxChange: function (e) {
			  this.putInBpList = e.detail.value; // 获取选中的值
			  console.log(this.putInBpList,"putInBpList");
			},
			// 阶段
			labelBtn(name,index){
			  console.log(name,index,"nameindex")
			  console.log(name,index,"nameindex")
			  if(this.putInBpList.join(',').indexOf(name) >-1){
				  // console.log(this.editarr, '----------------this.editarr')
			    this.listData[index].checked = true;
			  }else{
			    this.listData[index].checked = false
				console.log(this.listData)
			  };
			},
			clickCal () {
				console.log('触发取消按钮')
				this.$store.commit('setPutBpShow', false); // 更新setPutBpShow
			},
			clickPutBp() {
				this.putInBpList.map((items, index) => { // 遍历用户选择的BP
					let info = {
						fileId: Number(items) // 文件ID 
					}
					this.listData.map((item, inde) => { // 便利总数居
						if (String(items) === String(item.id)) {
							info.projId = Number(item.projId) // 项目ID
						}
					})
					this.fileInfo.push(info);
				});
				console.log('触发投递BP按钮');
				if (uni.getStorageSync('landRegist')) {
				    let landRegistLG = JSON.parse(uni.getStorageSync('landRegist')); // 读取缓存的用户信息
				    console.log(landRegistLG.user.id);
					let params = {
						modelId: Number(this.GET_HOME.putInBp.modelId),
						userId: landRegistLG.user.id,
						userType: '1',
						fileInfo: [...new Set(this.fileInfo)]
					}; // 请求总数居时 参数为空
					if (params.fileInfo.length === 0) {
						uni.showToast({
							title: '请勾选需要投递的BP',
							icon: 'none',
							duration: 500
						});
						return;
					}
					uni.showLoading({ // 展示loading
						title: '加载中'
					});
					uni.request({
						url: this.api2 + '/bp/send', //接口地址。
						data: this.endParams(params),
						method: 'POST',
						header: {
							Authorization:"Bearer "+landRegistLG.token//将token放到请求头中
						},
						success: (response) => {
							console.log(response.data.content);
							uni.hideLoading(); // 隐藏 loading
							this.fileInfo = [];
							if (Number(response.data.code) === 200) {
								uni.showToast({
									title: '发送成功',
									icon: 'none',
									duration: 1000
								});
								this.$store.commit('setPutBpShow', false); // 更新setPutBpShow
							} else {
								uni.showToast({
									title: '网络繁忙，请稍后',
									icon: 'none',
									duration: 1000
								});
							};
						},
						fail: (error) => {
							this.fileInfo = [];
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
			getputInBpList(){
				console.log('数显数据函数的参数');
				if (uni.getStorageSync('landRegist')) {
				    let landRegistLG = JSON.parse(uni.getStorageSync('landRegist')); // 读取缓存的用户信息
				    console.log(landRegistLG.user.id);
					let params = {}; // 请求总数居时 参数为空
					uni.showLoading({ // 展示loading
						title: '加载中'
					});
					uni.request({
						url: this.api2 + '/bp/selectBp?userType=1&modelId=' + this.GET_HOME.putInBp.modelId + '&userId=' + landRegistLG.user.id, //接口地址。
						data: this.endParams(params),
						header: {
							Authorization:"Bearer "+landRegistLG.token//将token放到请求头中
						},
						success: (response) => {
							console.log(response.data.content);
							let dataM = response.data.content;
							dataM.map((items,index) => {
								items.checked = false;
							})
							this.listData = dataM;
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
	.scroll-Y {
		height: 88vh;
		// #ifdef MP-WEIXIN || MP-TOUTIAO || MP-BAIDU || MP-ALIPAY
			padding-bottom: 400upx;
		// #endif
	}
	
	.scroll-view_H {
		white-space: nowrap;
		width: 100%;
	}
	
	.scroll-view-item {
		height: 88vh;
		line-height: 300upx;
		text-align: center;
		font-size: 36upx;
	}
	
	.scroll-view-item_H {
		display: inline-block;
		width: 100%;
		height: 300upx;
		line-height: 300upx;
		text-align: center;
		font-size: 36upx;
	}
	.loading-more {
		align-items: center;
		justify-content: center;
		padding-top: 20upx;
		padding-bottom: 40upx;
		text-align: center;
	}
	.loading-more-text {
		font-size: 28upx;
		color: #999;
	}
	.putInBp-content{
		position: fixed;
		width: 750upx;
		top: 0;
		z-index: 106;
		height: 100vh;
		background: #fff;
	}
	.putInBp{
		position: relative;
		width: 750upx;
		padding: 30upx;
	}
	.itemsPutInBp{
		position: relative;
		width: 100%;
	}
	.SUI-tent{
		position: relative;
		width: 670upx;
		margin-top: 14upx;
		margin-bottom: 14upx;
	}
	.SUI-left-img{
		position: relative;
		width: 110upx;
	}
	.SUI-File{
		position: relative;
		width: 92upx;
		height: 90upx;
	}
	.SUI-File>image{
		position: relative;
		width: 92upx;
		height: 90upx;
		margin-top: 0upx;
	}
	.SUI-cont-text{
		position: relative;
		width: 488upx;
	}
	.SUI-text-top{
		font-family: PingFang-SC-Bold;
		font-size: 32upx;
		color: #2E2E30;
		letter-spacing: 0;
		line-height: 40upx;	
	}
	.SUI-text-bot{
		font-family: PingFangSC-Regular;
		font-size: 24upx;
		color: #9B9B9B;
		letter-spacing: 0;
		line-height: 32upx;
	}
	.SUI-text-bot1{
		font-family: PingFangSC-Regular;
		font-size: 24upx;
		color: #9B9B9B;
		letter-spacing: 0;
		line-height: 50upx;
		margin-bottom: 20upx;
	}
	.SUI-right-img{
		position: relative;
		width: 20upx;
	}
	.SUI-right-img>image{
		position: relative;
		width: 28upx;
		height: 28upx;
		margin-top: 40upx;
	}
	.SL-btn{
		position: absolute;
		width: 690upx;
		margin-left: 30upx;
		background: #02C2A2;
		border-radius: 2px;
		top: 400upx;
	}
	.SL-btn-text{
		font-family: PingFangSC-Regular;
		font-size: 28upx;
		color: #FFFFFF;
		letter-spacing: 0;
		text-align: center;
		line-height: 90upx;
	}
	.btnPutIn{
		background: #FFFFFF;
		box-shadow: 0 -1px 0 0 #F5F5F5;
		position: fixed;
		height: 120upx;
		width: 750upx;
		padding: 15upx 30upx;
		left: 0;
		bottom: 0;
	}
	.btn{
		position: relative;
		width: 50%;
		background: #02C2A2;
		border-radius: 2px;
		font-family: PingFangSC-Regular;
		font-size: 28upx;
		text-align: center;
		color: #FFFFFF;
		letter-spacing: 0;
		line-height: 90upx;
	}
	.btn1{
		position: relative;
		width: 50%;
		background: #fbf9f9;
		border-radius: 2px;
		font-family: PingFangSC-Regular;
		font-size: 28upx;
		color: #9B9B9B;
		letter-spacing: 0;
		line-height: 90upx;
		text-align: center;
	}
</style>
