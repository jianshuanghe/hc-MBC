<template>
	<view class="project-details">
		<view class="project-details-header">
			<view class="project-details-header-one">
				<view>
					<image :src="arr.projLogo"></image>
				</view>
				<view>
					<span>{{arr.projName}}</span>
					<span>{{arr.projContent}}</span>
					<view>
						<span>{{arr.fieldCode}}</span>
						<span>{{arr.pcode}}</span>
					</view>
					<view class="bianji">编辑</view>
				</view>
			</view>
			<view class="project-details-header-two" v-if="this.Labelarr.length!==0">
				<span v-for="(items,index) in Labelarr" :key="index">{{items.labelName}}</span>
				<view>编辑</view>
			</view>
			<view class="project-details-header-twos" v-if="this.Labelarr.length==0">
				<span>暂未添加标签</span>
				<view>编辑</view>
			</view>
		</view>
		<view class="project-details-BP">
			<view class="project-details-BP-one">
				<view>BP/商业计划书</view>
				<view>重新上传</view>
			</view>
			<view class="project-details-BP-two">
				<view>
					<image :src="pdf" mode=""></image>
				</view>
				<view>
					<span>{{arr.projFile.enclosureName}}</span>
					<span>558.KB &nbsp;&nbsp; {{arr.projFile.createTime | formatDate}}上传</span>
				</view>
			</view>
		</view>
		<view class="jianxi"></view>
		<view class="project-details-data">
			<view>项目简介</view>
			<view @tap="gotodatasListme">
				填写项目简介
			</view>
		</view>
		<view class="jianxi"></view>
		<view class="project-details-data">
			<view>融资需求</view>
			<view @tap="gotodatasListme">
				填写融资需求
			</view>
		</view>
		<view class="jianxi"></view>
		<view class="history">
			<view>融资历史</view>
			<view class="history-cheng">
				
			</view>
			<view @tap="gotodatahistory" class="button-an">
				填写融资历史
			</view>
		</view>
		<view class="jianxi"></view>
		<view class="team">
			<view>团队成员</view>
			<view class="team-cheng" v-for="(ite,index) in arr.projUsers" :key="index">
				<view><image :src="ite.projUserImg" mode=""></image></view>
				<view>
					<span>{{ite.projUserName}}</span><span>{{ite.projUserPosition}}</span>
					<span>{{ite.projUserContent}}</span>
				</view>
				<view @tap="teambianji(ite.id)">编辑</view>
			</view>
			<view @tap="gotodatasteam" class="button-an">
				填写团队成员
			</view>
		</view>
		<view class="jianxi"></view>
		<view class="project-details-company">
			<view>公司信息</view>
			<view class="project-details-company-two">公司全称</view>
			<view class="project-details-company-thre">{{arr.compName}}</view>
			<view class="project-details-company-one" v-if="arr.compAddr !==''">
				<view>公司地址</view>
				<view>{{arr.compAddr}}</view>
			</view>
			<view class="gongsi" @tap="projectXQgsname">编辑</view>
			<view @tap="projectXQgsname" class="button-an" v-if="arr.compName&arr.compAddr =='' ">
				填写公司信息
			</view>
		</view>
		<view class="jianxi"></view>
		<view class="project-details-link">
			<view>项目数据</view>
			<view>相关链接</view>
			<view class="add">
				<span @tap="addlianjie">添加链接</span>
			</view>
		</view>
		<view class="Mask" :class="{'zhe':hiden}" @tap="cancel">
			<view class="Mask-box" v-on:click.stop='child'>
				<view class="Mask-box-header">
					<view @tap="cancel">取消</view>
					<view>添加链接</view>
					<view @tap="Preservation">保存</view>
				</view>
				<view class="Mask-box-content">
					<view>
						<span>链接名称</span>
						<input type="text" placeholder="请输入" v-model="linkname" />
					</view>
					<view>
						<span>链接地址</span>
						<input type="text" placeholder="请输入" v-model="linkaddress" />
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import green from '@/static/mbcImg/my/green.png'
	import pdf from '@/static/mbcImg/my/pdf.png'
	import {
		mapMutations,
		mapGetters
	} from 'vuex';
	export default {
		data() {
			return {
				green: green,
				num: 0,
				hiden: true,
				linkname: '',
				linkaddress: '',
				list: [],
				arr:[],
				Labelarr:[],
				id: '',
				pdf:pdf
				
			};
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
				return y + '.' + MM + '.' + d + '.' + h + '.' + m;
			}
		},
		watch: {
			GET_MY: {
				handler(a, b) {
					// console.log(a,b)
					this.arr = a.MyList.Company;
				},
				deep: true
			},
		
		},
		computed: {},
		created() {
			//项目列表
			this.shujuxiang();
			//获取标签
			this.Label();
		},
		onLoad: function(options) {
			this.id = options.id
			console.log(this.id)
		},
		methods: {
			...mapMutations({
				setCompany: 'setCompany'
			}),
			addlianjie() {
				this.hiden = false
			},
			cancel() {
				this.hiden = true
			},
			projectXQgsname(){
				console.log('公司信息')
				uni.navigateTo({
					url:'/modules/pageMy/myList/myLisprojectt/projectList/project-details/project-XQ/project-XQ-gsname?id='+this.id
				})
			},
			gotodatasteam(){
				console.log('团队成员')
				uni.navigateTo({
					url:'/modules/pageMy/myList/myLisprojectt/projectList/project-details/project-XQ/project-XQ-team?id='+this.id
				})
			},
			gotodatahistory(){
				console.log('融资历史')
				uni.navigateTo({
					url:'/modules/pageMy/myList/myLisprojectt/projectList/project-details/project-XQ/project-XQ-history'
				})
			},
			teambianji(e){
				console.log(e)
				uni.navigateTo({
					url:'/modules/pageMy/myList/myLisprojectt/projectList/project-details/project-XQ/project-XQ-team-bianji?id='+e
				})
			},
			child() { //阻止事件冒泡
			},
			shujuxiang() {//项目列表
				if (uni.getStorageSync('landRegist')) {
					let landRegistLG = JSON.parse(uni.getStorageSync('landRegist')); // 读取缓存的用户信息
					console.log(landRegistLG.user.id);
					// let params = {}; // 请求总数居时 参数为空
					uni.showLoading({ // 展示loading
						title: '加载中'
					});
					uni.request({
						url: this.api2 + '/proj/' + this.id, //接口地址。
						// data: this.endParams(params),
						method: 'GET',
						header: {
							Authorization: "Bearer " + landRegistLG.token //将token放到请求头中
						},
						success: (response) => {
							uni.hideLoading();
							console.log(response.data);
							this.arr=response.data.content
							this.$store.commit('setCompany', this.arr);
							console.log(this.arr)
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
			Label(){//标签
				if (uni.getStorageSync('landRegist')) {
					let landRegistLG = JSON.parse(uni.getStorageSync('landRegist')); // 读取缓存的用户信息
					console.log(landRegistLG.user.id);
					// let params = {}; // 请求总数居时 参数为空
					uni.showLoading({ // 展示loading
						title: '加载中'
					});
					uni.request({
						url: this.api2 + '/proj/label/getProjLabel?projId=' + this.id, //接口地址。
						// data: this.endParams(params),
						method: 'GET',
						header: {
							Authorization: "Bearer " + landRegistLG.token //将token放到请求头中
						},
						success: (response) => {
							uni.hideLoading();
							console.log(response.data);
							this.Labelarr=response.data
							console.log(this.Labelarr)
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
			Preservation() {
				if (this.linkname == '') {
					uni.showToast({
						title: '请填写链接名称',
						icon: 'none',
						duration: 1000
					});
					return false;
				} else if (this.linkaddress == '') {
					uni.showToast({
						title: '请填写链接地址',
						icon: 'none',
						duration: 1000
					});
					return false;
				} else if (!/http[s]{0,1}:\/\/([\w.]+\/?)\S*/.test(this.linkaddress)) {
					uni.showToast({
						title: '输入地址有误,请重新填写',
						icon: 'none',
						duration: 1000
					});
					return false;
				} else {
					this.list.push(this.linkname)
					console.log(this.list)
				}
			}
		}
	};
</script>

<style>
	.project-details {
		width: 100%;
		min-height: 100%;
		background: #FFFFFF;
		padding: 2upx;
	}

	.project-details-header {
		width: 90%;
		height: 304upx;
		margin: 40upx auto auto auto;
		background: rgba(255, 255, 255, 0.90);
		border: 2upx solid rgba(226, 226, 226, 0.50);
		box-shadow: 0 2upx 16upx 0 #EBEBEB;
		border-radius: 8upx;
	}

	.project-details-header-one {
		margin: 0 auto;
		width: 90%;
		height: 70%;
		border-bottom: 2upx solid #F5F5F5;
		padding: 2upx;
		display: flex;
	}

	.project-details-header-one view:nth-of-type(1) {
		width: 75upx;
		height: 84upx;
		margin-left: 22upx;
		margin-top: 62upx;
		border-radius: 50%;
	}

	.project-details-header-one view:nth-of-type(1) image {
		width: 100%;
		height: 100%;
		border-radius: 50%;
	}

	.project-details-header-one view:nth-of-type(2) {
		width: 50%;
		height: 150upx;
		margin-top: 30upx;
		margin-left: 50upx;
		position: relative;
	}

	.project-details-header-one view:nth-of-type(2) span:nth-of-type(1) {
		display: block;
		font-size: 40upx;
		color: #2E2E30;
	}

	.project-details-header-one view:nth-of-type(2) span:nth-of-type(2) {
		display: block;
		font-size: 24upx;
		color: #9B9B9B;
		width: 100%;
		overflow:hidden; //超出的文本隐藏
		text-overflow:ellipsis; //溢出用省略号显示
		white-space:nowrap; //溢出不换行
	}

	.project-details-header-one view:nth-of-type(2) view:nth-of-type(1) {
		display: flex;
		width: 400upx;
		height: 25upx;
		margin-top: 10upx;
		margin-left: 0;
	}

	.project-details-header-one view:nth-of-type(2) view:nth-of-type(1) span:nth-of-type(1) {
		margin-left: -20upx;
		font-size: 24upx;
		color: #9B9B9B;
		display: block;
		min-width: 100upx;
		text-align: center;
		/* padding-right:10upx ; */
		line-height: 25upx;
		/* padding-left: 0upx; */
		border: 0;
	}

	.project-details-header-one view:nth-of-type(2) view:nth-of-type(1) span {
		margin-left: 10upx;
		font-size: 24upx;
		color: #9B9B9B;
		border-left: 2upx solid #9B9B9B;
		display: block;
		line-height: 25upx;
		padding-left: 10upx;
		margin-left: 10upx;
	}

	.bianji {
		font-size: 26upx;
		color: #02C2A2;
		position: absolute;
		right: -360upx;
		top: -65upx;
		font-weight: 700;
	}

	.project-details-header-two {
		width: 90%;
		height: 60upx;
		margin: 15upx auto;
		position: relative;
		/* background: red; */
	}

	.project-details-header-two span {
		padding: 8upx 12upx 8upx 12upx;
		font-size: 20upx;
		color: #02C2A2;
		background: rgba(2, 194, 162, 0.10);
		border-radius: 2px;
		margin-left: 20upx;
		margin-top: 30upx;
		/* min-width: 100upx; */
	}

	.project-details-header-two span:nth-of-type(1) {
		margin-left: 0upx;
	}

	.project-details-header-two view:nth-of-type(1) {
		font-size: 26upx;
		color: #02C2A2;
		position: absolute;
		right: 0upx;
		top: 0upx;
		font-weight: 700;
	}

	.project-details-header-twos {
		width: 90%;
		height: 60upx;
		margin: 15upx auto;
		position: relative;
		/* background: red; */
	}

	.project-details-header-twos span {
		padding: 8upx 12upx 8upx 12upx;
		font-size: 20upx;
		color: #FF4D6A;
		background: #FFEAED;
		border-radius: 2px;
		margin-top: 30upx;
		/* min-width: 100upx; */
	}

	.project-details-header-twos view:nth-of-type(1) {
		font-size: 26upx;
		color: #02C2A2;
		position: absolute;
		right: 0upx;
		top: 0upx;
		font-weight: 700;
	}

	.project-details-BP {
		width: 90%;
		height: 260upx;
		margin: 60upx auto auto auto;
	}

	.project-details-BP-one {
		width: 100%;
		height: 60upx;
		display: flex;
		line-height: 60upx;
		position: relative;
	}

	.project-details-BP-one view:nth-of-type(1) {
		font-size: 34upx;
		color: #2E2E30;
	}

	.project-details-BP-one view:nth-of-type(2) {
		font-size: 26upx;
		color: #02C2A2;
		right: 0;
		top: 10upx;
		position: absolute;
	}

	.project-details-BP-two {
		width: 100%;
		height: 240upx;
		padding: 2upx;
		display: flex;
	}

	.project-details-BP-two view:nth-of-type(1) {
		width: 90upx;
		height: 90upx;
		margin-top: 30upx;
	}

	.project-details-BP-two view:nth-of-type(1) image {
		width: 100%;
		height: 100%;
		border-radius: 50%;
	}

	.project-details-BP-two view:nth-of-type(2) {
		width: 83%;
		margin-left: 30upx;
		height: 120upx;
		margin-top: 30upx;
	}

	.project-details-BP-two view:nth-of-type(2) span:nth-of-type(1) {
		font-size: 30upx;
		color: #2E2E30;
		display: block;
		line-height: 40upx;
	}

	.project-details-BP-two view:nth-of-type(2) span:nth-of-type(2) {
		font-size: 24upx;
		color: #9B9B9B;
		display: block;
	}

	.jianxi {
		width: 100%;
		height: 30upx;
		background: #F9F9F9;
	}

	.project-details-data {
		width: 100%;
		height: 300upx;
		background: #FFFFFF;
	}

	.project-details-data view:nth-of-type(1) {
		font-size: 34upx;
		color: #2E2E30;
		padding-top: 40upx;
		padding-left: 30upx;
		font-weight: 700;
	}

	.project-details-data view:nth-of-type(2) {
		margin: 40upx auto 0 auto;
		width: 300upx;
		height: 80upx;
		border: 2upx solid #02C2A2;
		/* margin: 0 auto; */
		line-height: 80upx;
		text-align: center;
		font-size: 28upx;
		color: #02C2A2;
	}

	.project-details-company {
		width: 100%;
		min-height: 300upx;
		position: relative;
	}

	.project-details-company view:nth-of-type(1) {
		font-size: 34upx;
		font-weight: 700;
		color: #2E2E30;
		padding-top: 40upx;
		padding-left: 30upx;
	}

	.project-details-company-two {
		font-size: 28upx;
		color: #2E2E30;
		font-weight: 700;
		padding-top: 18upx;
		padding-left: 30upx;
	}

	.project-details-company-thre {
		font-size: 28upx;
		color: #5D5D5D;
		padding-top: 0upx;
		padding-left: 35upx;
	}
	.project-details-company-one {
		width: 90%;
		border-top: 2upx solid #E2E2E2;
		height: 120upx;
		margin: 20upx auto auto auto;
	}

	.project-details-company-one view:nth-of-type(1) {
		font-size: 28upx;
		color: #2E2E30;
		font-weight: 700;
		margin-top: -32upx;
		margin-left: -32upx;
		width: 100%;
		height: 40upx;
	}

	.project-details-company-one view:nth-of-type(2) {
		font-size: 28upx;
		color: #5D5D5D;
		width: 100%;
		height: 40upx;
		overflow: hidden; //超出的文本隐藏
		text-overflow: ellipsis; //溢出用省略号显示
		white-space: nowrap; //溢出不换行
	}

	.gongsi {
		font-size: 26upx;
		color: #02C2A2;
		position: absolute;
		right: 40upx;
		top: 52upx;
		font-weight: 700;
	}

	.project-details-link {
		width: 100%;
	}

	.project-details-link view:nth-of-type(1) {
		font-size: 34upx;
		color: #2E2E30;
		padding-top: 40upx;
		padding-left: 30upx;
		font-weight: 700;
	}

	.project-details-link view:nth-of-type(2) {
		font-size: 28upx;
		color: #2E2E30;
		padding-top: 18upx;
		padding-left: 30upx;
		font-weight: 700;
	}
	.button-an{
		margin: 40upx auto 0 auto;
		width: 300upx;
		height: 80upx;
		border: 2upx solid #02C2A2;
		/* margin: 0 auto; */
		line-height: 80upx;
		text-align: center;
		font-size: 28upx;
		color: #02C2A2;
	}
	.add {
		width: 90%;
		margin: 0 auto;
		margin-top: 10upx;
		display: inline-block;
	}

	.add span {
		height: 80upx;
		font-size: 28upx;
		line-height: 80upx;
		color: #2E2E30;
		padding: 0upx 25upx 0upx 25upx;
		border: 2upx solid rgba(46, 46, 48, 0.30);
		margin-left: 50upx;
		float: left;
		display: block;
		margin-top: 20upx;
	}
	.team{
		width: 100%;
		min-height: 300upx;
		background: #FFFFFF;
		padding-bottom: 20upx;
	}
	.team view:nth-of-type(1){
		font-size: 34upx;
		color: #2E2E30;
		padding-top: 40upx;
		padding-left: 30upx;
		font-weight: 700;
	}
	.team-cheng{
		width: 90%;
		height: 176upx;
		border-bottom: 2upx solid #E2E2E2;
		margin: 0 auto;
		display: flex;
	}
	.team-cheng view:nth-of-type(1){
		width: 88upx;
		height: 88upx;
		border-radius: 50%;
		margin-left: 0;
	}
	.team-cheng view:nth-of-type(1) image{
		width: 100%;
		height: 100%;
		border-radius: 50%;
	}
	.team-cheng view:nth-of-type(2){
		width: 450upx;
		height: 88upx;
		margin-top: 40upx;
		margin-left: 20upx;
		display: flex;
		position: relative;
		overflow: hidden; //超出的文本隐藏
		text-overflow: ellipsis; //溢出用省略号显示
		white-space: nowrap; //溢出不换行
	}
	.team-cheng view:nth-of-type(2) span:nth-of-type(1){
		font-size: 32upx;
		color: #2E2E30;
	}.team-cheng view:nth-of-type(2) span:nth-of-type(2){
		font-size: 24upx;
		color: #9B9B9B;
		border-left: 2upx solid #9B9B9B;
		padding: 10upx;
		margin-left: 10upx;
		height: 7upx;
		display: block;
		line-height: 7upx;
		margin-top: 15upx;
	}
	.team-cheng view:nth-of-type(2) span:nth-of-type(3){
		font-size: 12px;
		color: #5D5D5D;
		position: absolute;
		top:50upx;
	}
	.team-cheng view:nth-of-type(3){
		width: 80upx;
		text-align: right;
		font-size: 26upx;
		color: #02C2A2;
		margin-top: 40upx;
		margin-right: 0;
		font-weight: 700;
	}
	
	.history{
		width: 100%;
		min-height: 300upx;
		background: #FFFFFF;
		padding-bottom: 20upx;
	}
	.history view:nth-of-type(1){
		font-size: 34upx;
		color: #2E2E30;
		padding-top: 40upx;
		padding-left: 30upx;
		font-weight: 700;
	}
	.history-cheng{
		width: 90%;
		height: 176upx;
		border-bottom: 2upx solid #E2E2E2;
		margin: 0 auto;
		display: flex;
		background: red;
	}
	
	
	
	.zhe {
		display: none;
	}
	
	.Mask {
		position: fixed;
		top: 0;
		width: 100%;
		height: 100%;
		background: #000000;
		background-color: rgba(000, 000, 0, 0.2);
	}

	.Mask-box {
		width: 100%;
		height: 540upx;
		position: absolute;
		bottom: 0;
		background: #FFFFFF;
	}

	.Mask-box-header {
		width: 100%;
		height: 112upx;
		border-bottom: 2upx solid #E2E2E2;
		display: flex;
		justify-content: space-between;
	}

	.Mask-box-header view:nth-of-type(1) {
		width: 150upx;
		height: 50upx;
		text-align: center;
		font-size: 32upx;
		color: #9B9B9B;
		line-height: 50upx;
		margin-top: 40upx;
	}

	.Mask-box-header view:nth-of-type(2) {
		width: 200upx;
		height: 50upx;
		text-align: center;
		font-size: 32upx;
		color: #2E2E30;
		line-height: 50upx;
		margin-top: 40upx;
	}

	.Mask-box-header view:nth-of-type(3) {
		width: 150upx;
		height: 50upx;
		text-align: center;
		font-size: 32upx;
		color: #02C2A2;
		line-height: 50upx;
		margin-top: 40upx;
	}

	.Mask-box-content {
		width: 100%;
		height: 500upx;
	}

	.Mask-box-content view:nth-of-type(1) {
		width: 90%;
		height: 186upx;
		border-bottom: 2upx solid #E2E2E2;
		margin: 0 auto;
	}

	.Mask-box-content view:nth-of-type(1) span {
		padding-top: 42upx;
		display: block;
		font-size: 32upx;
		color: #2E2E30;
		font-weight: 700;
	}

	.Mask-box-content view:nth-of-type(1) input {
		border: 0;
		width: 100%;
		height: 100upx;
	}

	.Mask-box-content view:nth-of-type(2) {
		width: 90%;
		height: 186upx;
		border-bottom: 2upx solid #E2E2E2;
		margin: 0 auto;
	}

	.Mask-box-content view:nth-of-type(2) span {
		padding-top: 42upx;
		display: block;
		font-size: 32upx;
		color: #2E2E30;
		font-weight: 700;
	}

	.Mask-box-content view:nth-of-type(2) input {
		border: 0;
		width: 100%;
		height: 100upx;
	}
</style>
