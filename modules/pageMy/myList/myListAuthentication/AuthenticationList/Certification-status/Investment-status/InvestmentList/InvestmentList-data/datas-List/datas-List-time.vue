<template>
	<view class="datas-List-time">
		<view class="datas-List-vitae-yes">
			<view class="datas-List-vitae-yes-box">
				<view>
					<image :src="xin"></image>
				</view>
				<view>投资时间</view>
				<view>
					<picker @change="bindDateChange" mode="date" :value="date" :start="startDate" fields="month" :end="endDate">
						<view class="zitia">{{date}}</view>
					</picker>
				</view>
				<view>
					<image :src="right"></image>
				</view>
			</view>
		</view>
		<view class="datas-List-vitae-yes">
			<view class="datas-List-vitae-yes-box">
				<view>
					<image :src="xin"></image>
				</view>
				<view>投资轮次</view>
				<view>
					<picker @change="bindPickerChange2" :value="index" :range="array2" range-key='name'>
						<view class="ziti" :class="{'tou':tou}">{{pickerValue2? pickerValue2 : '请选择'}}</view>
					</picker>
				</view>
				<view>
					<image :src="right"></image>
				</view>
			</view>
		</view>
		<view class="datas-List-case-bao" @tap="gotodatasListcase">
			<view>
				<view>
					保存
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		mapMutations,
		mapGetters
	} from 'vuex';
	export default {
		data() {
			const currentDate = this.getDate({
				format: true
			})
			return {
				tou:false,
				xin: this.Static + 'mbcImg/common/xing.png',
				right: this.Static + 'mbcImg/my/right.png',
				index: 0, // 默认选择第一个
				array2: [],
				pickerValue2: '', // 选中的值
				date: currentDate,
				index:0,
				id:''
			};
		},
		computed: {
			...mapGetters(['GET_MY']),
			startDate() {
				return this.getDate('start');
			},
			endDate() {
				return this.getDate('currentDate');
			}
		},
		created() {

			this.Financingrounds()
		},
		mounted() {},
		methods: {
			...mapMutations({
				setTime: 'setTime'
			}),
			gotodatasListcase(){
				console.log(this.date,this.pickerValue2)
				if(this.date === ''){
					uni.showToast({
						title: '请填写融资时间',
						icon: 'none',
						duration: 1000
					});
					return false;
				}else if(this.pickerValue2 === ''){
					uni.showToast({
						title: '请填写融资轮次',
						icon: 'none',
						duration: 1000
					});
					return false;
				}
				let pamadd={
					levelCode:this.id,
					startTime:this.date+'-01',
					levelCodeStr:this.pickerValue2,
				}
				console.log(pamadd)
				let setLvliData = this.GET_MY.MyList.Time;
				setLvliData.unshift(pamadd);
				this.$store.commit('setTime', setLvliData);
				uni.navigateBack({
				})
			},
			getDate(type) {
				const date = new Date();
				let year = date.getFullYear();
				let month = date.getMonth() + 1;
				let day = date.getDate();

				if (type === 'start') {
					year = year - 60;
				} else if (type === 'end') {
					year = year + 2;
				}
				month = month > 9 ? month : '0' + month;;
				day = day > 9 ? day : '0' + day;
				return `${year}-${month}`;
			},
			bindDateChange: function(e) {
				// console.log(e)
				this.date = e.target.value
				console.log(this.date)
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
							console.log(response.data.content);
							this.array2=response.data.content
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
			bindPickerChange2: function(e) {
				console.log('picker发送选择改变，携带值为', e.target.value);
				console.log(this.array2, 'this.array2')
				this.array2.map((items, index) => {
					if (String(index) === String(e.target.value)) {
						if(this.pickerValue!=='请选择'){
							this.tou=true
						}
						this.pickerValue2 = items.name;
						this.id = items.id
					}
				})
			}
		}
	};
</script>

<style>
	.tou{
		color: black;
	}
	.datas-List-time {
		width: 100%;
	}

	.datas-List-vitae-yes {
		width: 100%;
		height: 122upx;
		background: #FFFFFF;
	}

	.datas-List-vitae-yes-box {
		width: 90%;
		height: 100%;
		border-bottom: 2upx solid #F5F5F5;
		margin: 0 auto;
		display: flex;
		position: relative;
	}

	.datas-List-vitae-yes-box view:nth-of-type(1) {
		width: 20upx;
		height: 20upx;
		padding-top: 26upx;
	}

	.datas-List-vitae-yes-box view:nth-of-type(1) image {
		width: 100%;
		height: 100%;
	}

	.datas-List-vitae-yes-box view:nth-of-type(2) {
		width: 142upx;
		height: 32upx;
		font-size: 30upx;
		color: #2E2E30;
		padding-top: 30upx;
		padding-left: 10upx;
	}

	.datas-List-vitae-yes-box view:nth-of-type(3) {
		width: 100upx;
		height: 35upx;
		position: absolute;
		right: 40upx;
		top: 40upx;

		color: #D2D2D2;
		text-align: right;
	}

	.datas-List-vitae-yes-box view:nth-of-type(4) {
		position: absolute;
		right: 0;
		top: 40upx;
		width: 25upx;
		height: 18upx;
	}

	.datas-List-vitae-yes-box view:nth-of-type(4) image {
		width: 100%;
		height: 100%;
	}

	.ziti {
		position: absolute;
		right: 0upx;
		width: 300upx !important;
		height: 30upx;
		top: -30upx;
		font-size: 30upx !important;
	}
	.zitia {
		position: absolute;
		right: 0upx;
		width: 300upx !important;
		height: 30upx;
		top: -30upx;
		font-size: 30upx !important;
		color: black;
	}

	.datas-List-case-bao {
		width: 100%;
		height: 122upx;
		background: #FFFFFF;
		bottom: 0;
		position: absolute;
	}

	.datas-List-case-bao view:nth-of-type(1) view {
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

	.datas-List-case-bao view:nth-of-type(1) {
		margin: 0 auto;
	}
</style>
