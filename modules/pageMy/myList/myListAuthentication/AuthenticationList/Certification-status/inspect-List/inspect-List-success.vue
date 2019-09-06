<template>
	<view class="inspect-List-success">
		<view class="inspect-List-success-header">
			<view class="image-opcity">
				<img :src="success" mode=""></img>
			</view>
			<view>审核已通过</view>
		</view>
		<view class="inspect-List-success-conter">
			<view>{{Listdata.userName}}</view>
			<view v-if="Listdata.userPosition!==''">职位:{{Listdata.userPosition}}</view>
			<view>邮箱:{{Listdata.userEmail}}</view>
			<view v-if="Listdata.compName!==''" :class="{'hidens':hidens}">公司名称:{{Listdata.compName}}</view>
			<view v-if="Listdata.mechIdStr!==''" :class="{'hiden':hiden}">机构名称:{{Listdata.mechIdStr}}</view>
			<view class="conter-img">
				<img :src="Listdata.img" @tap="previewImage(Listdata.img, 0)"></img>
			</view>
		</view>
		<view class="inspect-List-success-fotter">
			<view>
				<image :src="Image4" ></image>
			</view>
			<view>
				<view>审核通过</view>
				<view>{{Listdata.userAuthInfos[0].createTime|formatDate}}</view>
				<view>审核中</view>
				<view>{{Listdata.userAuthInfos[1].createTime|formatDate}}</view>
				<view>发起认证</view>
				<view>{{Listdata.userAuthInfos[1].createTime|formatDate}}</view>
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
				success:this.Static+'mbcImg/my/Image 6.png',
				Image4:this.Static + 'mbcImg/my/Image4.png',
				hiden:false,
				hidens:false,
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
				return y + '.' + MM + '.' + d + ' ' + h + ':' + m + ':' + s;
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
			console.log(this.Listdata, '4544464564645656465');
			if(this.Listdata.userType=='0'){
				this.hiden=true
			}
			if(this.Listdata.userType=='1'||this.Listdata.userType=='2'){
				this.hidens=true
			}
		},
		methods: {
			previewImage (e, key) {
				console.log(e, '附件地址');
				let imgList = [];
				imgList.push(e)
				uni.previewImage({
					current: imgList[key],
					indicator: "number",
					loop: "true",
					urls:imgList
				})
			},
		}
	};
</script>

<style>
	.hiden{
		display: none;
	}
	.hidens{
		display: none;
	}
	.inspect-List-success {
		width: 100%;
		/* max-height: 100%; */
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

	.inspect-List-success-header {
		width: 100%;
		height: 60upx;
		background: #CBF3EC;
		display: flex;
	}

	.image-opcity {
		width: 34upx;
		height: 34upx;
		padding-left: 32upx;
		padding-top: 15upx;
		opacity: 1 !important;
	}

	.image-opcity img:nth-of-type(1) {
		width: 100%;
		height: 100%;
		opacity: 1 !important;
	}

	.inspect-List-success-header view:nth-of-type(2) {
		padding-left: 10upx;
		font-size: 30upx;
		color: #02C2A2;
		padding-top: 5upx;
	}

	.inspect-List-success-conter {
		width: 100%;
		height: 580upx;
		background: #FFFFFF;
	}

	.inspect-List-success-conter view:nth-of-type(1) {
		font-size: 36upx;
		color: #2E2E30;
		padding-top: 60upx;
		padding-left: 48upx;
		font-weight: bold;
	}

	.inspect-List-success-conter view:nth-of-type(2) {
		font-size: 28upx;
		color: #5D5D5D;
		padding-top: 30upx;
		padding-left: 48upx;
	}

	.inspect-List-success-conter view:nth-of-type(3) {
		font-size: 28upx;
		color: #5D5D5D;
		padding-left: 48upx;
	}

	.inspect-List-success-conter view:nth-of-type(4) {
		font-size: 28upx;
		color: #5D5D5D;
		padding-left: 48upx;
	}
	.inspect-List-success-conter view:nth-of-type(5) {
		font-size: 28upx;
		color: #5D5D5D;
		padding-left: 48upx;
	}
	.inspect-List-success-fotter {
		width: 100%;
		height: 660upx;
		background: #FFFFFF;
		margin-top: 30upx;
		display: flex;
	}

	.inspect-List-success-fotter view:nth-of-type(1) {
		width: 25upx;
		height: 268upx;
		/* background: red; */
		padding-top: 55upx;
		padding-left: 48upx;
	}

	.inspect-List-success-fotter view:nth-of-type(1) image {
		width: 100%;
		height: 100%;
	}

	.inspect-List-success-fotter view:nth-of-type(2) {
		width: 300upx;
		height: 350upx;
		padding-top: 40upx;
		padding-left: 20upx;
	}

	.inspect-List-success-fotter view:nth-of-type(2) view:nth-of-type(1) {
		width: 200upx;
		height: 30upx;
		padding-top: 0;
		padding-left: 0;
		font-size: 30upx;
		color: #2E2E30;
	}

	.inspect-List-success-fotter view:nth-of-type(2) view:nth-of-type(2) {
		width: 100%;
		height: 30upx;
		padding-top: 20upx;
		padding-left: 0;
		font-size: 20upx;
		color: #9B9B9B;
	}.inspect-List-success-fotter view:nth-of-type(2) view:nth-of-type(3) {
		width: 200upx;
		height: 30upx;
		padding-top: 40upx;
		padding-left: 0;
		font-size: 30upx;
		color: #9B9B9B;
	}

	.inspect-List-success-fotter view:nth-of-type(2) view:nth-of-type(4) {
		width: 100%;
		height: 30upx;
		padding-top: 20upx;
		padding-left: 0;
		font-size: 20upx;
		color: #9B9B9B;
	}.inspect-List-success-fotter view:nth-of-type(2) view:nth-of-type(5) {
		width: 200upx;
		height: 30upx;
		padding-top: 40upx;
		padding-left: 0;
		font-size: 30upx;
		color: #9B9B9B;
	}

	.inspect-List-success-fotter view:nth-of-type(2) view:nth-of-type(6) {
		width: 100%;
		height: 30upx;
		padding-top: 20upx;
		padding-left: 0;
		font-size: 20upx;
		color: #9B9B9B;
	}
</style>
