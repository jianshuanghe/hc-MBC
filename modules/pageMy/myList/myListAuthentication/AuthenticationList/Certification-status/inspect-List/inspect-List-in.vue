<template>
	<view class="inspect-List-in">
		<view class="inspect-List-in-header">
			<view>
				<image :src="Image2" mode=""></image>
			</view>
			<view>正在全力审核，请耐心等待...</view>
		</view>
		<view class="inspect-List-in-conter">
			<view>{{Listdata.userName}}</view>
			<view v-if="Listdata.userPosition!==''">职位:{{Listdata.userPosition}}</view>
			<view>邮箱:{{Listdata.userEmail}}</view>
			<view v-if="Listdata.compName!==''">公司名称:{{Listdata.compName}}</view>
			<view v-if="Listdata.mechIdStr!==''">机构名称:{{Listdata.mechIdStr}}</view>
			<view class="conter-img">
				<img :src="Listdata.img"></img>
			</view>
		</view>
		<view class="inspect-List-in-fotter">
			<view>
				<image :src="Image3" mode=""></image>
			</view>
			<view>
				<view>审核中</view>
				<view>{{Listdata.userAuthInfos[0].createTime|formatDate}}</view>
				<view>发起认证</view>
				<view>{{Listdata.userAuthInfos[0].createTime|formatDate}}</view>
			</view>
		</view>
	</view>
</template>

<script>
	import { mapMutations,mapGetters } from 'vuex';
	export default {
		data() {
			return {
				Listdata: [],
				Image2:this.Static + 'mbcImg/my/Image2.png',
				Image3:this.Static + 'mbcImg/my/Image3.png',
			};
		},
		computed: {
			...mapGetters(['GET_MY'])
		},
		filters: {
			formatDate: function(value) {
				let date = new Date(value);
				let y = date.getFullYear();
				let MM = date.getMonth() + 1;
				MM = MM < 10 ? ('0' + MM) : MM;
				let d = date.getDate();
				d = d < 10 ? ('0' + d) : d;
				let h = date.getHours();
				h = h < 10 ? ('0' + h) : h;
				let m = date.getMinutes();
				m = m < 10 ? ('0' + m) : m;
				let s = date.getSeconds();
				s = s < 10 ? ('0' + s) : s;
				return y +'.'+ MM +'.'+ d +' '+ h +':'+ m +':'+ s ;
			},
		},
		watch: {
			GET_MY: {
				handler(a, b) {
					console.log(a, b, 'header----list');
				},
				deep: true
			}
		},
		created() {
			this.Listdata = this.GET_MY.MyList.Authentication;
			console.log(this.Listdata, '4');
		},
		methods: {
			
		}
	};
</script>

<style>
	.inspect-List-in {
		width: 100%;
		/* max-height: 100%; */
	}

	.inspect-List-in-header {
		width: 100%;
		height: 60upx;
		background: #FEEEC7;
		display: flex;
	}

	.inspect-List-in-header view:nth-of-type(1) {
		width: 34upx;
		height: 34upx;
		padding-left: 32upx;
		padding-top: 15upx;
	}

	.inspect-List-in-header view:nth-of-type(1) image {
		width: 100%;
		height: 100%;
	}

	.inspect-List-in-header view:nth-of-type(2) {
		padding-left: 10upx;
		font-size: 30upx;
		color: #FAB100;
		padding-top: 5upx;
	}

	.inspect-List-in-conter {
		width: 100%;
		height: 580upx;
		background: #FFFFFF;
	}

	.inspect-List-in-conter>view:nth-of-type(1) {
		font-size: 36upx;
		color: #2E2E30;
		padding-top: 60upx;
		padding-left: 48upx;
	}

	.inspect-List-in-conter>view:nth-of-type(2) {
		font-size: 28upx;
		color: #5D5D5D;
		padding-top: 30upx;
		padding-left: 48upx;
	}

	.inspect-List-in-conter>view:nth-of-type(3) {
		font-size: 28upx;
		color: #5D5D5D;
		padding-left: 48upx;
	}

	.inspect-List-in-conter>view:nth-of-type(4) {
		font-size: 28upx;
		color: #5D5D5D;
		padding-left: 48upx;
	}
	.conter-img{
		width: 320upx;
		height: 180upx;
		padding-top: 30upx;
		color: #5D5D5D;
		padding-left: 48upx;
	}
	.conter-img>img {
		width: 100%;
		height: 100%;
	}

	.inspect-List-in-fotter {
		width: 100%;
		height: 660upx;
		background: #FFFFFF;
		margin-top: 30upx;
		display: flex;
	}

	.inspect-List-in-fotter view:nth-of-type(1) {
		width: 25upx;
		height: 134upx;
		/* background: red; */
		padding-top: 64upx;
		padding-left: 48upx;
	}

	.inspect-List-in-fotter view:nth-of-type(1) image {
		width: 100%;
		height: 100%;
	}

	.inspect-List-in-fotter view:nth-of-type(2) {
		width: 300upx;
		height: 350upx;
		padding-top: 40upx;
		padding-left: 20upx;
	}

	.inspect-List-in-fotter view:nth-of-type(2) view:nth-of-type(1) {
		width: 200upx;
		height: 30upx;
		padding-top: 0;
		padding-left: 0;
		font-size: 30upx;
		color: #2E2E30;
	}

	.inspect-List-in-fotter view:nth-of-type(2) view:nth-of-type(2) {
		width: 100%;
		height: 30upx;
		padding-top: 20upx;
		padding-left: 0;
		font-size: 20upx;
		color: #9B9B9B;
	}.inspect-List-in-fotter view:nth-of-type(2) view:nth-of-type(3) {
		width: 200upx;
		height: 30upx;
		padding-top: 40upx;
		padding-left: 0;
		font-size: 30upx;
		color: #9B9B9B;;
	}

	.inspect-List-in-fotter view:nth-of-type(2) view:nth-of-type(4) {
		width: 100%;
		height: 30upx;
		padding-top: 20upx;
		padding-left: 0;
		font-size: 20upx;
		color: #9B9B9B;
	}
</style>
