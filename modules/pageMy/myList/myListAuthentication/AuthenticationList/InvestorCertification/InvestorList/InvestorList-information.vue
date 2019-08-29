<template>
	<view class="InvestorList-information">
		<view class="Investor-name">
			<view class="Investor-name-box">
				<view>
					<image :src="xin"></image>
				</view>
				<view>真实姓名</view>
				<view><input type="text" placeholder="请输入" placeholder-style="color:#D2D2D2" v-model="name" /></view>
			</view>
		</view>
		<view class="Investor-wx">
			<view class="Investor-wx-box">
				<view>
					<image :src="xin"></image>
				</view>
				<view>微信号</view>
				<view><input type="text" placeholder="请输入" placeholder-style="color:#D2D2D2" v-model="weixin" /></view>
			</view>
		</view>
		<view class="Investor-mailbox">
			<view class="Investor-mailbox-box">
				<view>
					<image :src="xin"></image>
				</view>
				<view>邮箱</view>
				<view><input type="text" placeholder="请输入" placeholder-style="color:#D2D2D2" v-model="mailbox" /></view>
			</view>
		</view>
		<view class="Investor-City">
			<view class="Investor-City-box">
				<view>
					<image :src="xin"></image>
				</view>
				<view>常住城市</view>
				<view>
					<picker mode="multiSelector" @columnchange="columnChange" @cancel='cancelPC' @change='clickPC' :value="multiIndex"
					 :range="multiArray" range-key='name'>
						<view class="uni-input BI-picker ziti1" :class="paramsPC.ptext ? 'BI-pickered' : ''">{{paramsPC.ptext ? paramsPC.ptext + '-' + paramsPC.ctext : '请选择'}}</view>
					</picker>
				</view>
				<view>
					<image :src="right"></image>
				</view>
			</view>
		</view>
		<view class="Investor-identity">
			<view class="Investor-identity-box">
				<view>
					<image :src="xin"></image>
				</view>
				<view>投资人身份</view>
				<view>
					<picker @change="bindPickerChange1" :value="index1" :range="array1">
						<view class="ziti">{{pickerValue1? pickerValue1 : '请选择'}}</view>
					</picker>
				</view>
				<view>
					<image :src="right"></image>
				</view>
			</view>
		</view>
		<view class="Investor-identity" :class="{'xian':hideen}">
			<view class="Investor-identity-box">
				<view>
					<image :src="xin"></image>
				</view>
				<view>投资机构</view>
				<view>
					<picker @change="bind" :value="ind" :range="jigou" range-key='COMP_NAME'>
						<view class="ziti">{{pic? pic : '请选择'}}</view>
					</picker>
				</view>
				<view>
					<image :src="right"></image>
				</view>
			</view>
		</view>
		<view class="Entrepreneurs-position" :class="{'xian':hideen}">
			<view class="Entrepreneurs-position-box">
				<view>
					<image :src="xin"></image>
				</view>
				<view>职位</view>
				<view><input type="text" placeholder="请输入" placeholder-style="color:#D2D2D2" v-model="position" /></view>
			</view>
		</view>
		<view class="Investor-field">
			<view class="Investor-field-box">
				<view>
					<image :src="xin"></image>
				</view>
				<view>关注领域</view>
				<view>
					<picker @change="Finanarry" :value="index" :range="arry" range-key='name'>
						<view class="ziti">{{pickerarry? pickerarry : '请选择'}}</view>
					</picker>
				</view>
				<view>
					<image :src="right"></image>
				</view>
			</view>
		</view>
		<view class="Investor-Rotation">
			<view class="Investor-Rotation-box">
				<view>
					<image :src="xin"></image>
				</view>
				<view>关注轮次</view>
				<view>
					<picker @change="Finan" :value="index" :range="arr" range-key='name'>
						<view class="ziti">{{picker? picker : '请选择'}}</view>
					</picker>
				</view>
				<view>
					<image :src="right"></image>
				</view>
			</view>
		</view>
		<view class="BI-items">
			<view class="left BI-items-left">
				<view class="mustFill">
					<image :src='xin'></image>
				</view>
				<view class="BI-text-left">上传名片</view>
			</view>
			<view class="right BI-items-right">
				<view class="BI-text-right">
					<view class="zitia" v-if="!logo">点击上传</view>
					<view class="Img-logo">
						<!-- 图片上传 -->
						<view class="Img-Upload">
							<imageUploadOne v-model="imageData" :server-url="serverUrl" limit=1 @delete="deleteImage" @add="addImage">
							</imageUploadOne>
						</view>
					</view>
					<image :src="right" class="BI-rightArrow"></image>
				</view>
			</view>
			<view class="clear"></view>
		</view>
		<view class="Investor-Tips">
			上传名片会提高认证成功率
		</view>
		<view class="Investor-Submission">
			<view @tap="gotoSubmissionseccess">
				<view>
					提交
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import imageUploadOne from '@/components/imageUpload/imageUploadOne.vue'
	export default {
		data() {
			return {
				position: '',
				hideen: true,
				logo: '',
				xin: this.Static + 'mbcImg/common/xing.png',
				right: this.Static + 'mbcImg/my/right.png',
				imageData: [],
				serverUrl: 'https://img01.iambuyer.com/imgup/upLoad/fileUpload',
				pickerValue: "", // 选中的值
				index: '',
				index1: 0, // 默认选择第一个
				array1: ['个人投资人', '机构投资人'],
				pickerValue1: "", // 选中的值
				arr: [],
				picker: "",
				arry: [],
				pickerarry: "", // 选中的值
				id1: '',
				id2: '',
				name: '',
				weixin: '',
				mailbox: '',
				jigou: [],
				ind: 0,
				pic: '',
				picid: '',
				// 省市S
				multiArray: [],
				multiIndex: [0, 0],
				areaPorC: {}, // 获取缓存的省市
				province: { // 用户选择的省份
					index: 0, // 记录用户选择省份index
					text: '', // 页面显示字段
					pcode: '' // 传给后台参数
				},
				city: { // 用户选择的城市
					text: '', // 页面显示字段
					ccode: '' // 传给后台参数
				},
				paramsPC: { // 用于接口数据省和市
					ptext: '', // 页面显示字段
					pcode: '', // 传给后台参数
					ctext: '', // 页面显示字段
					ccode: '' // 传给后台参数
				},
				// 省市E
			};
		},
		components: {
			imageUploadOne
		},
		computed: {},
		created() {
			//融资列表
			this.Financingrounds()
			//融资领域
			this.Financinfield()
			//投资机构
			this.Finanjigou()
			//城市
			if (uni.getStorageSync('areaPorC')) {
				this.areaPorC = JSON.parse(uni.getStorageSync('areaPorC'));
				this.multiArray.push(this.areaPorC.province);
				this.multiArray.push(this.areaPorC.city[0]);
				this.province.text = this.areaPorC.province[0].name; // 省份 ----- 默认选择的省份
				this.province.pcode = this.areaPorC.province[0].value; //code ----默认选择的省份code
				console.log(this.areaPorC.city[0], '获取数据第一组数据-----城市');
				this.areaPorC.city[0].map((items, index) => {
					if (index === 0) {
						this.city.text = items.name; // 城市 ------默认选择的城市
						this.city.ccode = items.value; //code -----默认的城市code
					}
				})
				console.log(this.multiArray, 'created');
			}
		},
		mounted() {},
		methods: {
			cancelPC() {
				console.log('触发取消省市选择');
			},
			clickPC() {
				console.log('触发确认城市');
				this.paramsPC = { // 用于接口数据省和市
					ptext: this.province.text, // 页面显示字段
					pcode: this.province.pcode, // 传给后台参数
					ctext: this.city.text, // 页面显示字段
					ccode: this.city.ccode // 传给后台参数
				}
			},
			columnChange: function(e) {
				console.log('修改的列为：' + e.detail.column + '，值为：' + JSON.stringify(e.detail));
				this.multiIndex[e.detail.column] = e.detail.value
				let column = e.detail.column; // 第几列 0, 1
				let indexPC = e.detail.value; // 第一列滚动到的位置,1---31
				if (column === 0) { // 用户在操作第一列
					this.areaPorC.province.map((item, index) => {
						if (String(index) === String(indexPC)) {
							this.province.index = indexPC; // 记录用户选择是省份index
							this.province.text = item.name; // 省份 ----- 用户原则的省份
							this.province.pcode = item.value; //code ----用户选择的省份code
						};
					});
					this.areaPorC.city.map((items, index) => {
						if (String(index) === String(indexPC)) {
							console.log(items, '与当前省份联动的城市');
							this.multiArray[1] = items; // 赋值新数组
							this.city.text = items[0].name; // 城市 ------默认选择的城市
							this.city.ccode = items[0].value; //code -----默认的城市code
						}
					})
				} else if (column === 1) {
					this.areaPorC.city.map((item, index) => {
						if (String(index) === String(this.province.index)) { // 根据记录下的省份index,去查找对应的城市数组
							item.map((item2, index2) => {
								if (String(index2) === String(indexPC)) {
									this.city.text = item2.name; // 城市 ---- 用户选的城市
									this.city.ccode = item2.value; //code ---用户选的城市code
								}
							})
						}
					})
				};
			},
			deleteImage: function(e) {
				console.log(e, '删除图片')
				this.logo = ''; // 清空数据
			},
			addImage: function(e) {
				console.log(e, '添加图片')
				if (e.allImages) { // 上传成功
					this.logo = (e.allImages[0].imgName);
				}
			},
			bindPickerChange: function(e) {
				console.log('picker发送选择改变，携带值为', e.target.value);
				this.array.map((items, index) => {
					if (String(index) === String(e.target.value)) {
						this.pickerValue = items;
					}
				})
			},
			bind: function(e) {
				console.log('picker发送选择改变，携带值为', e.target.value);
				this.jigou.map((items, index) => {
					if (String(index) === String(e.target.value)) {
						this.pic = items.COMP_NAME;
						this.picid = items.ID
						console.log(this.picid, this.pic)
					}
				})
			},
			bindPickerChange1: function(e) {
				this.array1.map((items, index) => {
					if (String(index) === String(e.target.value)) {
						this.pickerValue1 = items;
						this.touziren = e.target.value
						if (this.pickerValue1 == '机构投资人') {
							this.hideen = false
						}else if(this.pickerValue1 == '个人投资人'){
							this.hideen = true
						}
						console.log(this.touziren)
					}
				})
			},
			Finan: function(e) {
				console.log(e)
				this.arr.map((items, index) => {
					if (String(index) === String(e.target.value)) {
						this.picker = items.name;
						this.id2 = items.id
						console.log(this.picker, this.id2)
					}
				})
			},
			Finanarry: function(e) {
				this.arry.map((items, index) => {
					if (String(index) === String(e.target.value)) {
						this.pickerarry = items.name;
						this.id1 = items.id
						console.log(this.pickerarry, this.id1)
					}
				})
			},
			gotoSubmissionseccess(e) {
				if (this.name === '') {
					uni.showToast({
						title: '姓名不能为空,请重填',
						icon: 'none',
						duration: 1000
					});
					return false;
				} else if (this.weixin === '') {
					uni.showToast({
						title: '微信号不能为空,请重填',
						icon: 'none',
						duration: 1000
					});
					return false;
				} else if (this.mailbox === '') {
					uni.showToast({
						title: '邮箱不能为空,请重填',
						icon: 'none',
						duration: 1000
					});
					return false;
				} else if (!/^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/.test(this.mailbox)) {
					uni.showToast({
						title: '邮箱格式有误,请重填',
						icon: 'none',
						duration: 1000
					});
					return false;
				} else if (this.paramsPC.ptext === '') {
					uni.showToast({
						title: '常住城市不能为空,请重填',
						icon: 'none',
						duration: 1000
					});
					return false;
				} else if (this.pickerValue1 === '') {
					uni.showToast({
						title: '投资人不能为空,请重填',
						icon: 'none',
						duration: 1000
					});
					return false;
				} else if (this.pickerValue1 === '机构投资人') {
					if (this.pic == '') {
						uni.showToast({
							title: '投资机构不能为空,请重填',
							icon: 'none',
							duration: 1000
						});
						return false;
					}
					if (this.position === '') {
						uni.showToast({
							title: '职位不能为空,请重填',
							icon: 'none',
							duration: 1000
						});
						return false;
					} else if (this.pickerarry === '') {
						uni.showToast({
							title: '关注领域不能为空,请重填',
							icon: 'none',
							duration: 1000
						});
						return false;
					} else if (this.picker === '') {
						uni.showToast({
							title: '关注轮次不能为空,请重填',
							icon: 'none',
							duration: 1000
						});
						return false;
					} else if (this.logo === '') {
						uni.showToast({
							title: '名片原件不能为空,请重填',
							icon: 'none',
							duration: 1000
						});
						return false;
					}
				} else if (this.pickerarry === '') {
					uni.showToast({
						title: '关注领域不能为空,请重填',
						icon: 'none',
						duration: 1000
					});
					return false;
				} else if (this.picker === '') {
					uni.showToast({
						title: '关注轮次不能为空,请重填',
						icon: 'none',
						duration: 1000
					});
					return false;
				} else if (this.logo === '') {
					uni.showToast({
						title: '名片原件不能为空,请重填',
						icon: 'none',
						duration: 1000
					});
					return false;
				}
				if (this.touziren == '0') {

					if (uni.getStorageSync('landRegist')) {
						let landRegistLG = JSON.parse(uni.getStorageSync('landRegist')); // 读取缓存的用户信息
						console.log(landRegistLG.user.id);
						let params = {
							userId: landRegistLG.user.id,
							userType: 1,
							userName: this.name,
							email: this.mailbox,
							wxCode: this.weixin,
							leves: this.id2,
							fields: this.id1,
							userCard: this.logo,
							pCode: this.province.pcode,
							cCode: this.province.ccode
						}; // 请求总数居时 参数为空
						uni.showLoading({ // 展示loading
							title: '加载中'
						});
						uni.request({
							url: this.api2 + '/auth/add', //接口地址。
							data: this.endParams(params),
							method: 'POST',
							header: {
								Authorization: "Bearer " + landRegistLG.token //将token放到请求头中
							},
							success: (response) => {
								uni.hideLoading();
								console.log(response.data);
								uni.navigateTo({
									'url': '../../AuthenticationList/Submission-success/Submission-success'
								})
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
				} else {
					if (uni.getStorageSync('landRegist')) {
						let landRegistLG = JSON.parse(uni.getStorageSync('landRegist')); // 读取缓存的用户信息
						console.log(landRegistLG.user.id);
						let params = {
							userId: landRegistLG.user.id,
							userType: 2,
							userName: this.name,
							email: this.mailbox,
							wxCode: this.weixin,
							leves: this.id2,
							fields: this.id1,
							userCard: this.logo,
							pCode: this.province.pcode,
							cCode: this.province.ccode,
							position: this.position,
							mechId: this.picid
						}; // 请求总数居时 参数为空
						uni.showLoading({ // 展示loading
							title: '加载中'
						});
						uni.request({
							url: this.api2 + '/auth/add', //接口地址。
							data: this.endParams(params),
							method: 'POST',
							header: {
								Authorization: "Bearer " + landRegistLG.token //将token放到请求头中
							},
							success: (response) => {
								uni.hideLoading();
								console.log(response.data);
								uni.navigateTo({
									'url': '../../AuthenticationList/Submission-success/Submission-success'
								})
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

			
			},
			Finanjigou() { //投资机构
				if (uni.getStorageSync('landRegist')) {
					let landRegistLG = JSON.parse(uni.getStorageSync('landRegist')); // 读取缓存的用户信息
					console.log(landRegistLG.user.id);
					// let params = {}; // 请求总数居时 参数为空
					uni.showLoading({ // 展示loading
						title: '加载中'
					});
					uni.request({
						url: this.api2 + '/auth/justAuth', //接口地址。
						// data: this.endParams(params),
						method: 'GET',
						header: {
							Authorization: "Bearer " + landRegistLG.token //将token放到请求头中
						},
						success: (response) => {
							uni.hideLoading();
							console.log(response.data);
							this.jigou = response.data.list
							console.log(this.jigou)
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
			Financingrounds() { //融资轮次列表
				if (uni.getStorageSync('landRegist')) {
					let landRegistLG = JSON.parse(uni.getStorageSync('landRegist')); // 读取缓存的用户信息
					console.log(landRegistLG.user.id);
					// let params = {}; // 请求总数居时 参数为空
					uni.showLoading({ // 展示loading
						title: '加载中'
					});
					uni.request({
						url: this.api2 + '/field/levelList', //接口地址。
						// data: this.endParams(params),
						method: 'GET',
						header: {
							Authorization: "Bearer " + landRegistLG.token //将token放到请求头中
						},
						success: (response) => {
							uni.hideLoading();
							this.arr = response.data.content
							
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
			Financinfield() { //融资领域
				if (uni.getStorageSync('landRegist')) {
					let landRegistLG = JSON.parse(uni.getStorageSync('landRegist')); // 读取缓存的用户信息
					console.log(landRegistLG.user.id);
					// let params = {}; // 请求总数居时 参数为空
					uni.showLoading({ // 展示loading
						title: '加载中'
					});
					uni.request({
						url: this.api2 + '/field/fieldList', //接口地址。
						// data: this.endParams(params),
						method: 'GET',
						header: {
							Authorization: "Bearer " + landRegistLG.token //将token放到请求头中
						},
						success: (response) => {
							uni.hideLoading();
							// console.log(response.data.content);
							this.arry = response.data.content
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
	};
</script>

<style>
	.xian {
		display: none;
	}

	.BI-items {
		position: relative;
		width: 100%;
		margin: 0 auto;
		background: #FFFFFF;
	}

	.BI-items-left {
		position: relative;
		width: 36%;
	}

	.BI-text-left {
		position: relative;
		font-family: PingFang-SC-Medium;
		font-size: 30upx;
		color: #2E2E30;
		letter-spacing: 0;
		padding: 0px;
		margin-top: 44upx;
		margin-bottom: 44upx;
		line-height: 36upx;
		margin-left: 70upx
	}

	.BI-items-right {
		position: relative;
		width: 64%;
	}

	.BI-text-right {
		position: relative;
		width: 90%;
		margin-top: 44upx;
		margin-bottom: 44upx;
		margin: 0 auto;
	}

	.Img-Upload {
		width: 120upx;
		height: 80upx;
		position: absolute;
		right: 28upx;
		top: 30upx !important;
	}

	.mustFill {
		position: absolute;
		left: 40upx;
		top: 10upx;
	}

	.mustFill>image {
		position: relative;
		width: 20upx;
		height: 20upx;
		top: 20upx;
	}

	.uni-input-wrapper {
		text-align: right;
	}

	.BI-rightArrow {
		position: absolute;
		width: 25upx;
		height: 18upx;
		right: 15upx;
		top: 50upx;
	}

	.uni-input-placeholder {
		color: #D2D2D2 !important;
	}

	.InvestorList-information {
		width: 100%;
		height: 100%;
		padding-bottom: 200upx;
	}

	

	.img {
		position: absolute;
		top: 0;
	}

	.Investor-name {
		width: 100%;
		height: 122upx;
		background: #FFFFFF;
	}

	.Investor-name-box {
		width: 90%;
		height: 100%;
		border-bottom: 2upx solid #F5F5F5;
		margin: 0 auto;
		display: flex;
		position: relative;
	}

	.Investor-name-box view:nth-of-type(1) {
		width: 20upx;
		height: 20upx;
		padding-top: 26upx;
	}

	.Investor-name-box view:nth-of-type(1) image {
		width: 100%;
		height: 100%;
	}

	.Investor-name-box view:nth-of-type(2) {
		width: 142upx;
		height: 32upx;
		font-size: 30upx;
		color: #2E2E30;
		padding-top: 30upx;
		padding-left: 10upx;
	}

	.Investor-name-box view:nth-of-type(3) {
		width: 200upx;
		height: 35upx;
		position: absolute;
		right: 0;
		top: 40upx;
		font-size: 30upx;
		color: #D2D2D2;
		text-align: right;
	}

	.Investor-wx {
		width: 100%;
		height: 122upx;
		background: #FFFFFF;
	}

	.Investor-wx-box {
		width: 90%;
		height: 100%;
		border-bottom: 2upx solid #F5F5F5;
		margin: 0 auto;
		display: flex;
		position: relative;
	}

	.Investor-wx-box view:nth-of-type(1) {
		width: 20upx;
		height: 20upx;
		padding-top: 26upx;
	}

	.Investor-wx-box view:nth-of-type(1) image {
		width: 100%;
		height: 100%;
	}

	.Investor-wx-box view:nth-of-type(2) {
		width: 142upx;
		height: 32upx;
		font-size: 30upx;
		color: #2E2E30;
		padding-top: 30upx;
		padding-left: 10upx;
	}

	.Investor-wx-box view:nth-of-type(3) {
		width: 200upx;
		height: 35upx;
		position: absolute;
		right: 0;
		top: 40upx;
		font-size: 30upx;
		color: #D2D2D2;
		text-align: right;
	}

	.Investor-mailbox {
		width: 100%;
		height: 122upx;
		background: #FFFFFF;
	}

	.Investor-mailbox-box {
		width: 90%;
		height: 100%;
		border-bottom: 2upx solid #F5F5F5;
		margin: 0 auto;
		display: flex;
		position: relative;
	}

	.Investor-mailbox-box view:nth-of-type(1) {
		width: 20upx;
		height: 20upx;
		padding-top: 26upx;
	}

	.Investor-mailbox-box view:nth-of-type(1) image {
		width: 100%;
		height: 100%;
	}

	.Investor-mailbox-box view:nth-of-type(2) {
		width: 142upx;
		height: 32upx;
		font-size: 30upx;
		color: #2E2E30;
		padding-top: 30upx;
		padding-left: 10upx;
	}

	.Investor-mailbox-box view:nth-of-type(3) {
		width: 200upx;
		height: 35upx;
		position: absolute;
		right: 0;
		top: 40upx;
		font-size: 30upx;
		color: #D2D2D2;
		text-align: right;
	}

	.ziti {
		position: absolute;
		right: 0upx;
		width: 300upx !important;
		height: 30upx;
		top: -30upx;
		font-size: 30upx !important;
	}
	.ziti1 {
		position: absolute;
		right: -20upx;
		width: 300upx !important;
		height: 30upx;
		top: -30upx;
		font-size: 30upx !important;
	}
	.pic{
		color: #000000!important;
	}
	.zitia {
		position: absolute;
		right: 50upx !important;
		height: 30upx;
		top: 30upx;
		font-size: 30upx !important;
		color: #D2D2D2;
	}

	.Investor-City {
		width: 100%;
		height: 122upx;
		background: #FFFFFF;
	}

	.Investor-City-box {
		width: 90%;
		height: 100%;
		border-bottom: 2upx solid #F5F5F5;
		margin: 0 auto;
		display: flex;
		position: relative;
	}

	.Investor-City-box view:nth-of-type(1) {
		width: 20upx;
		height: 20upx;
		padding-top: 26upx;
	}

	.Investor-City-box view:nth-of-type(1) image {
		width: 100%;
		height: 100%;
	}

	.Investor-City-box view:nth-of-type(2) {
		width: 142upx;
		height: 32upx;
		font-size: 30upx;
		color: #2E2E30;
		padding-top: 30upx;
		padding-left: 10upx;
	}

	.Investor-City-box view:nth-of-type(3) {
		width: 100upx;
		height: 35upx;
		position: absolute;
		right: 40upx;
		top: 40upx;

		color: #D2D2D2;
		text-align: right;
	}

	.Investor-City-box view:nth-of-type(4) {
		position: absolute;
		right: 0;
		top: 40upx;
		width: 25upx;
		height: 18upx;
	}

	.Investor-City-box view:nth-of-type(4) image {
		width: 100%;
		height: 100%;
	}

	.Investor-identity {
		width: 100%;
		height: 122upx;
		background: #FFFFFF;
	}

	.Investor-identity-box {
		width: 90%;
		height: 100%;
		border-bottom: 2upx solid #F5F5F5;
		margin: 0 auto;
		display: flex;
		position: relative;
	}

	.Investor-identity-box view:nth-of-type(1) {
		width: 20upx;
		height: 20upx;
		padding-top: 26upx;
	}

	.Investor-identity-box view:nth-of-type(1) image {
		width: 100%;
		height: 100%;
	}

	.Investor-identity-box view:nth-of-type(2) {
		width: 152upx;
		height: 32upx;
		font-size: 30upx;
		color: #2E2E30;
		padding-top: 30upx;
		padding-left: 10upx;
	}

	.Investor-identity-box view:nth-of-type(3) {
		width: 200upx;
		height: 35upx;
		position: absolute;
		right: 40upx;
		top: 40upx;
		font-size: 30upx;
		color: #D2D2D2;
		text-align: right;
	}

	.Investor-identity-box view:nth-of-type(4) {
		position: absolute;
		right: 0;
		top: 40upx;
		width: 25upx;
		height: 18upx;
	}

	.Investor-identity-box view:nth-of-type(4) image {
		width: 100%;
		height: 100%;
	}

	.Investor-field {
		width: 100%;
		height: 122upx;
		background: #FFFFFF;
		margin-top: 20upx;
	}

	.Investor-field-box {
		width: 90%;
		height: 100%;
		border-bottom: 2upx solid #F5F5F5;
		margin: 0 auto;
		display: flex;
		position: relative;
	}

	.Investor-field-box view:nth-of-type(1) {
		width: 20upx;
		height: 20upx;
		padding-top: 26upx;
	}

	.Investor-field-box view:nth-of-type(1) image {
		width: 100%;
		height: 100%;
	}

	.Investor-field-box view:nth-of-type(2) {
		width: 152upx;
		height: 32upx;
		font-size: 30upx;
		color: #2E2E30;
		padding-top: 30upx;
		padding-left: 10upx;
	}

	.Investor-field-box view:nth-of-type(3) {
		width: 200upx;
		height: 35upx;
		position: absolute;
		right: 40upx;
		top: 40upx;
		font-size: 30upx;
		color: #D2D2D2;
		text-align: right;
	}

	.Investor-field-box view:nth-of-type(4) {
		position: absolute;
		right: 0;
		top: 40upx;
		width: 25upx;
		height: 18upx;
	}

	.Investor-field-box view:nth-of-type(4) image {
		width: 100%;
		height: 100%;
	}

	.Investor-Rotation {
		width: 100%;
		height: 122upx;
		background: #FFFFFF;
	}

	.Investor-Rotation-box {
		width: 90%;
		height: 100%;
		border-bottom: 2upx solid #F5F5F5;
		margin: 0 auto;
		display: flex;
		position: relative;
	}

	.Investor-Rotation-box view:nth-of-type(1) {
		width: 20upx;
		height: 20upx;
		padding-top: 26upx;
	}

	.Investor-Rotation-box view:nth-of-type(1) image {
		width: 100%;
		height: 100%;
	}

	.Investor-Rotation-box view:nth-of-type(2) {
		width: 152upx;
		height: 32upx;
		font-size: 30upx;
		color: #2E2E30;
		padding-top: 30upx;
		padding-left: 10upx;
	}

	.Investor-Rotation-box view:nth-of-type(3) {
		width: 200upx;
		height: 35upx;
		position: absolute;
		right: 40upx;
		top: 40upx;
		font-size: 30upx;
		color: #D2D2D2;
		text-align: right;
	}

	.Investor-Rotation-box view:nth-of-type(4) {
		position: absolute;
		right: 0;
		top: 40upx;
		width: 25upx;
		height: 18upx;
	}

	.Investor-Rotation-box view:nth-of-type(4) image {
		width: 100%;
		height: 100%;
	}

	.Img-Upload {
		width: 120upx !important;
		height: 80upx;
		position: absolute;
		right: 58upx;
		top: -45upx;
		font-size: 226upx;
	}

	.imageUpload {
		width: 200upx !important;
	}

	.Investor-card {
		width: 100%;
		height: 122upx;
		background: #FFFFFF;
		margin-top: 20upx;
	}

	.Investor-card-box {
		width: 90%;
		height: 100%;
		border-bottom: 2upx solid #F5F5F5;
		margin: 0 auto;
		display: flex;
		position: relative;
	}

	.Investor-card-box view:nth-of-type(1) {
		width: 20upx;
		height: 20upx;
		padding-top: 26upx;
	}

	.Investor-card-box view:nth-of-type(1) image {
		width: 100%;
		height: 100%;
	}

	.Investor-card-box view:nth-of-type(2) {
		width: 152upx;
		height: 32upx;
		font-size: 30upx;
		color: #2E2E30;
		padding-top: 30upx;
		padding-left: 10upx;
	}

	.Investor-card-box view:nth-of-type(3) {
		width: 200upx;
		height: 35upx;
		position: absolute;
		right: 40upx;
		top: 40upx;
		font-size: 30upx;
		color: #D2D2D2;
		text-align: right;
	}

	.Investor-card-box view:nth-of-type(4) {
		position: absolute;
		right: 0;
		top: 40upx;
		width: 25upx;
		height: 18upx;
	}

	.Investor-card-box view:nth-of-type(4) image {
		width: 100%;
		height: 100%;
	}

	.Investor-Tips {
		width: 90%;
		height: 25upx;
		margin: 0 auto;
		font-size: 24upx;
		color: #9B9B9B;
	}

	.Investor-Submission {
		width: 100%;
		height: 122upx;
		background: #FFFFFF;
		bottom: 0;
		position: fixed;
	}

	.Investor-Submission view:nth-of-type(1) view {
		width: 690upx;
		height: 90upx;
		background: #02C2A2;
		border-radius: 2px;
		margin-top: 20upx;
		text-align: center;
		line-height: 90upx;
		font-size: 28upx;
		color: #FFFFFF;
	}

	.Investor-Submission view:nth-of-type(1) {
		margin: 0 auto;
	}

	.Entrepreneurs-position {
		width: 100%;
		height: 122upx;
		background: #FFFFFF;
	}

	.Entrepreneurs-position-box {
		width: 90%;
		height: 100%;
		border-bottom: 2upx solid #F5F5F5;
		margin: 0 auto;
		display: flex;
		position: relative;
	}

	.Entrepreneurs-position-box view:nth-of-type(1) {
		width: 20upx;
		height: 20upx;
		padding-top: 26upx;
	}

	.Entrepreneurs-position-box view:nth-of-type(1) image {
		width: 100%;
		height: 100%;
	}

	.Entrepreneurs-position-box view:nth-of-type(2) {
		width: 142upx;
		height: 32upx;
		font-size: 30upx;
		color: #2E2E30;
		padding-top: 30upx;
		padding-left: 10upx;
	}

	.Entrepreneurs-position-box view:nth-of-type(3) {
		width: 200upx;
		height: 35upx;
		position: absolute;
		right: 0;
		top: 40upx;
		font-size: 30upx;
		color: #D2D2D2;
		text-align: right;
	}
</style>
