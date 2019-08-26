<template>
	<view class="inspect-List-fail">
		<view class="inspect-List-fail-header">
			<view>
				<img :src="Image7"></img>
			</view>
			<view>审核失败</view>
		</view>
		<view class="inspect-List-fail-conter">
			<view>{{Listdata.userName}}</view>
			<view v-if="Listdata.userPosition!==''">职位:{{Listdata.userPosition}}</view>
			<view>邮箱:{{Listdata.userEmail}}</view>
			<view v-if="Listdata.compName!==''">机构名称:{{Listdata.compName}}</view>
			<view>
				<image :src="Listdata.img"></image>
			</view>
		</view>
		<view class="fail-yuanying">
			失败原因:{{Listdata.userAuthInfos[0].authContent}}
		</view>
		<view class="inspect-List-fail-fotter">
			<view>
				<image :src="Image4"></image>
			</view>
			<view>
				<view>审核失败</view>
				<view>{{Listdata.userAuthInfos[0].createTime|formatDate}}</view>
				<view>审核中</view>
				<view>2019.05.23 10:23:34</view>
				<view>发起认证</view>
				<view>2019.05.23 10:23:34</view>
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
				Image7:this.Static + 'mbcImg/my/Image 7.png',
				Image4:this.Static + 'mbcImg/my/Image4.png',
				num:[],
				time:[]
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
				return y + '.' + MM + '.' + d + '.' + h + '.' + m + '.' + s;
			}
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
			console.log(this.Listdata)
		},
		methods: {
			
		}
	};
</script>

<style>
	.inspect-List-fail {
		width: 100%;
		/* max-height: 100%; */
	}

	.inspect-List-fail-header {
		width: 100%;
		height: 60upx;
		background: #FFBFC9;
		display: flex;
	}

	.inspect-List-fail-header view:nth-of-type(1) {
		width: 34upx;
		height: 34upx;
		padding-left: 32upx;
		padding-top: 15upx;
	}

	.inspect-List-fail-header view:nth-of-type(1) img {
		width: 100%;
		height: 100%;
	}

	.inspect-List-fail-header view:nth-of-type(2) {
		padding-left: 10upx;
		font-size: 30upx;
		color: #FF4D6A;
		padding-top: 5upx;
	}

	.inspect-List-fail-conter {
		width: 100%;
		height: 580upx;
		background: #FFFFFF;
	}

	.inspect-List-fail-conter view:nth-of-type(1) {
		font-size: 36upx;
		color: #2E2E30;
		padding-top: 60upx;
		padding-left: 48upx;
	}

	.inspect-List-fail-conter view:nth-of-type(2) {
		font-size: 28upx;
		color: #5D5D5D;
		padding-top: 30upx;
		padding-left: 48upx;
	}

	.inspect-List-fail-conter view:nth-of-type(3) {
		font-size: 28upx;
		color: #5D5D5D;
		padding-left: 48upx;
	}

	.inspect-List-fail-conter view:nth-of-type(4) {
		font-size: 28upx;
		color: #5D5D5D;
		padding-left: 48upx;
	}

	.inspect-List-fail-conter view:nth-of-type(5) {
		width: 320upx;
		height: 179upx;
		padding-top: 30upx;
		color: #5D5D5D;
		padding-left: 48upx;
	}

	.inspect-List-fail-conter view:nth-of-type(5) image {
		width: 100%;
		height: 100%;
	}

	.inspect-List-fail-fotter {
		width: 100%;
		height: 660upx;
		background: #FFFFFF;
		
		display: flex;
	}

	.inspect-List-fail-fotter view:nth-of-type(1) {
		width: 25upx;
		height: 268upx;
		/* background: red; */
		padding-top: 55upx;
		padding-left: 48upx;
	}

	.inspect-List-fail-fotter view:nth-of-type(1) image {
		width: 100%;
		height: 100%;
	}

	.inspect-List-fail-fotter view:nth-of-type(2) {
		width: 300upx;
		height: 350upx;
		padding-top: 40upx;
		padding-left: 20upx;
	}

	.inspect-List-fail-fotter view:nth-of-type(2) view:nth-of-type(1) {
		width: 200upx;
		height: 30upx;
		padding-top: 0;
		padding-left: 0;
		font-size: 30upx;
		color: #2E2E30;
	}

	.inspect-List-fail-fotter view:nth-of-type(2) view:nth-of-type(2) {
		width: 100%;
		height: 30upx;
		padding-top: 20upx;
		padding-left: 0;
		font-size: 20upx;
		color: #9B9B9B;
	}.inspect-List-fail-fotter view:nth-of-type(2) view:nth-of-type(3) {
		width: 200upx;
		height: 30upx;
		padding-top: 40upx;
		padding-left: 0;
		font-size: 30upx;
		color: #9B9B9B;
	}

	.inspect-List-fail-fotter view:nth-of-type(2) view:nth-of-type(4) {
		width: 100%;
		height: 30upx;
		padding-top: 20upx;
		padding-left: 0;
		font-size: 20upx;
		color: #9B9B9B;
	}.inspect-List-fail-fotter view:nth-of-type(2) view:nth-of-type(5) {
		width: 200upx;
		height: 30upx;
		padding-top: 40upx;
		padding-left: 0;
		font-size: 30upx;
		color: #9B9B9B;
	}

	.inspect-List-fail-fotter view:nth-of-type(2) view:nth-of-type(6) {
		width: 100%;
		height: 30upx;
		padding-top: 20upx;
		padding-left: 0;
		font-size: 20upx;
		color: #9B9B9B;
	}
	.fail-yuanying{
		width: 100%;
		height: 50upx;
		font-size: 28upx;
		color: #FF6C84;
		margin-top: 30upx;
		background: #FFFFFF;
		padding-left:50upx ;
		padding-top: 40upx;
	}
</style>
