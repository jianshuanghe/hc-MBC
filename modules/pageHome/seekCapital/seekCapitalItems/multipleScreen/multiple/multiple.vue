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
							<view class="left MIL-item" @tap="clickItems(1)">
								<view :class=" clickItemsIndex === 1 ? 'MIL-item-text MILClicked' : 'MIL-item-text'">全部</view>
								<image :src="checkedItems" v-if="clickItemsIndex === 1" class="clickImg"></image>
							</view>
							<view class="left MIL-item">
								<view class="MIL-item-text">全部</view>
							</view>
							<view class="left MIL-item">
								<view class="MIL-item-text">全部</view>
							</view>
							<view class="left MIL-item">
								<view class="MIL-item-text">全部</view>
							</view>
							<view class="left MIL-item">
								<view class="MIL-item-text">全部</view>
							</view>
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
							<view class="left MIL-item" @tap="clickItems(1)">
								<view :class=" clickItemsIndex === 1 ? 'MIL-item-text MILClicked' : 'MIL-item-text'">全部</view>
								<image :src="checkedItems" v-if="clickItemsIndex === 1" class="clickImg"></image>
							</view>
							<view class="left MIL-item">
								<view class="MIL-item-text">全部</view>
							</view>
							<view class="left MIL-item">
								<view class="MIL-item-text">全部</view>
							</view>
							<view class="left MIL-item">
								<view class="MIL-item-text">全部</view>
							</view>
							<view class="left MIL-item">
								<view class="MIL-item-text">全部</view>
							</view>
							<view class="clear"></view>
							<view class="lineMIL"></view>
						</view>
					</view>
					<!-- 模块 -->
					<view class="multiple-list">
						<view class="multiple-item-title">
							地区
							<view class="right right-MIL" @tap="clickToAll(2)">
								全部 <image class="img-r" :src='isAll[2].arrow'></image>
							</view>
						</view>
						<view class="multiple-item-list">
							<view class="left MIL-item" @tap="clickItems(items.id)" v-for="(items,index) in AREADATA.province" :key="index" >
								<view :class=" clickItemsIndex === items.id ? 'MIL-item-text MILClicked' : 'MIL-item-text'">{{items.name}}</view>
								<image :src="checkedItems" v-if="clickItemsIndex === items.id" class="clickImg"></image>
							</view>
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
	import close from '@/static/mbcImg/home/seekCapital/close.png';
	import rightArrow from '@/static/mbcImg/home/seekCapital/rightArrow.png';
	import downArrow from '@/static/mbcImg/home/seekCapital/downArrow.png';
	import checkedItems from '@/static/mbcImg/home/seekCapital/checkedItems.png';
	import { mapMutations, mapGetters } from 'vuex';
	export default {
	    data () {
			return {
				close: close,
				arrow: rightArrow,
				downArrow: downArrow,
				rightArrow: rightArrow,
				isAll: [
					{
						arrow: rightArrow,
						allShow: false
					},
					{
						arrow: rightArrow,
						allShow: false
					},
					{
						arrow: rightArrow,
						allShow: false
					}
				],
				checkedItems: checkedItems,
				clickItemsIndex: 0,
				areaDate: '' // 地区
			};
	    },
		computed: {
			...mapGetters(['GET_HOME', 'AREADATA'])
		},
		watch: {
		  GET_HOME: {
		    handler (a, b) {
		      console.log(a, b)
		    },
		    deep: true
		  }
		},
		mounted(){
			console.log(this.AREADATA, 'AREADAT地区数据')
		},
	    methods: {
			...mapMutations({
				setMultipleShow: 'setMultipleShow' // 筛选展示
			}),
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
			clickItems (e) {
				console.log(e, '触发点击筛选items');
				this.clickItemsIndex = e;
			},
			clickClose(){
				console.log('触发关闭按钮');
				this.$store.commit('setMultipleShow', false); // 更新setMultipleShow
			},
			clickReset(){
				console.log('触发重置按钮');
				this.$store.commit('setMultipleShow', false); // 更新setMultipleShow
			},
			clickSure(){
				console.log('触发确认按钮');
				this.$store.commit('setMultipleShow', false); // 更新setMultipleShow
			}
	    }
	};
</script>

<style>
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
		min-height: 2000upx;
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
		float: right;
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
		margin: 24upx 0upx 0upx 30upx;
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
</style>
