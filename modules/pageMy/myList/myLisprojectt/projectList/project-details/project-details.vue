<template>
	<view class="project-details">
		<view class="project-details-header">
			<view class="project-details-header-one">
				<view>
					<image :src="green"></image>
				</view>
				<view>
					<span>如何秀</span>
					<span>移动智能说明书平台</span>
					<view>
						<span>企业服务</span>
						<span>企业服务</span>
						<span>企服务</span>
						<span>企业</span>
					</view>
					<view class="bianji">编辑</view>
				</view>
			</view>
			<view class="project-details-header-two" v-if="num!==0">
				<span>红包营销</span>
				<span>你好社会人</span>
				<view>编辑</view>
			</view>
			<view class="project-details-header-twos" v-if="num==0">
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
					<image :src="green" mode=""></image>
				</view>
				<view>
					<span>如何秀-移动说明书移动说明书移动如何秀说明书</span>
					<span>558.KB &nbsp;&nbsp; 2019.3.23 11:30S上传</span>
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
		<view class="project-details-data">
			<view>融资历史</view>
			<view @tap="gotodatasListme">
				填写融资历史
			</view>
		</view>
		<view class="jianxi"></view>
		<view class="project-details-data">
			<view>团队成员</view>
			<view @tap="gotodatasListme">
				填写团队成员
			</view>
		</view>
		<view class="jianxi"></view>
		<view class="project-details-company">
			<view>公司信息</view>
			<view>公司全称</view>
			<view>北京慧聪云信大数据科技有限公司</view>
			<view class="gongsi">编辑</view>
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
						<input type="text" placeholder="请输入" v-model="linkname"/>
					</view>
					<view>
						<span>链接地址</span>
						<input type="text" placeholder="请输入" v-model="linkaddress"/>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import green from '@/static/mbcImg/my/green.png'
	export default {
		data() {
			return {
				green: green,
				num: 0,
				hiden:true,
				linkname:'',
				linkaddress:'',
				list:[]
			};
		},
		computed: {},
		created() {

		},
		mounted() {},
		methods: {
			addlianjie(){
				this.hiden=false
			},
			cancel(){
				this.hiden=true
			},
			child(){//阻止事件冒泡
			},
			Preservation(){
				if(this.linkname==''){
					uni.showToast({
						title: '请填写链接名称',
						icon: 'none',
						duration: 1000
					});
					return false;
				}else if(this.linkaddress==''){
					uni.showToast({
						title: '请填写链接地址',
						icon: 'none',
						duration: 1000
					});
					return false;
				}else if(!/http[s]{0,1}:\/\/([\w.]+\/?)\S*/.test(this.linkaddress)){
					uni.showToast({
						title: '输入地址有误,请重新填写',
						icon: 'none',
						duration: 1000
					});
					return false;
				}else{
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
	}

	.project-details-header-one view:nth-of-type(1) image {
		width: 100%;
		height: 100%;
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
	}

	.project-details-header-one view:nth-of-type(2) view:nth-of-type(1) {
		display: flex;
		width: 400upx;
		height: 25upx;
		margin-top: 10upx;
		margin-left: 0;
	}

	.project-details-header-one view:nth-of-type(2) view:nth-of-type(1) span:nth-of-type(1) {
		margin-left: 0;
		font-size: 24upx;
		color: #9B9B9B;
		display: block;
		line-height: 25upx;
		padding-left: 0upx;
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
		height: 262upx;
		position: relative;
	}

	.project-details-company view:nth-of-type(1) {
		font-size: 34upx;
		font-weight: 700;
		color: #2E2E30;
		padding-top: 40upx;
		padding-left: 30upx;
	}

	.project-details-company view:nth-of-type(2) {
		font-size: 28upx;
		color: #2E2E30;
		font-weight: 700;
		padding-top: 18upx;
		padding-left: 30upx;
	}

	.project-details-company view:nth-of-type(3) {
		font-size: 28upx;
		color: #5D5D5D;
		padding-top: 0upx;
		padding-left: 30upx;
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
		/* min-height: 262upx; */
		/* padding-bottom: 30upx; */
		/* padding: 30upx; */
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

	.add span:nth-of-type(1) {
		/* margin-left: 0; */
	}
	.zhe{
		display: none;
	}
	.Mask{
		position: fixed;
		top: 0;
		width: 100%;
		height: 100%;
		background: #000000;
		background-color: rgba(000,000,0,0.2);
	}
	.Mask-box{
		width: 100%;
		height: 540upx;
		position: absolute;
		bottom: 0;
		background: #FFFFFF;
	}
	.Mask-box-header{
		width: 100%;
		height: 112upx;
		border-bottom: 2upx solid #E2E2E2;
		display: flex;
		justify-content: space-between;
	}
	.Mask-box-header view:nth-of-type(1){
		width: 150upx;
		height: 50upx;
		text-align: center;
		font-size: 32upx;
		color: #9B9B9B;
		line-height: 50upx;
		margin-top: 40upx;
	}.Mask-box-header view:nth-of-type(2){
		width: 200upx;
		height: 50upx;
		text-align: center;
		font-size: 32upx;
		color: #2E2E30;
		line-height: 50upx;
		margin-top: 40upx;
	}.Mask-box-header view:nth-of-type(3){
		width: 150upx;
		height: 50upx;
		text-align: center;
		font-size: 32upx;
		color: #02C2A2;
		line-height: 50upx;
		margin-top: 40upx;
	}
	.Mask-box-content{
		width: 100%;
		height: 500upx;
	}
	.Mask-box-content view:nth-of-type(1){
		width: 90%;
		height: 186upx;
		border-bottom: 2upx solid #E2E2E2;
		margin: 0 auto;
	}
	.Mask-box-content view:nth-of-type(1) span{
		padding-top: 42upx;
		display: block;
		font-size: 32upx;
		color: #2E2E30;
		font-weight: 700;
	}
	.Mask-box-content view:nth-of-type(1) input{
		border: 0;
		width: 100%;
		height: 100upx;
	}
	.Mask-box-content view:nth-of-type(2){
		width: 90%;
		height: 186upx;
		border-bottom: 2upx solid #E2E2E2;
		margin: 0 auto;
	}
	.Mask-box-content view:nth-of-type(2) span{
		padding-top: 42upx;
		display: block;
		font-size: 32upx;
		color: #2E2E30;
		font-weight: 700;
	}
	.Mask-box-content view:nth-of-type(2) input{
		border: 0;
		width: 100%;
		height: 100upx;
	}
</style>
