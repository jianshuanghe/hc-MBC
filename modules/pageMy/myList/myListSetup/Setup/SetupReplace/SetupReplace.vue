<template>
  <view class="phoneBind-content">
    <view class="phoneBind">
      <view class="PB-top">
        <view class="PB-top-v">您当前绑定的手机号码为：<span class="phoneNum">{{UserData.userPhone}}</span></view>
        <view class="GH-PB">更换后可用新手机号登录</view>
        <view class="PB-subStep">
          <view class="substep">
            <view class="ST-items left">
              <view class="ST-box" @click="clickStep(1)">
                <view class="ST-img isST-view">
                  <p class="">1</p>
                  <view class="line line-right isST-line"></view>
                </view>
                <p class="isST-p">输入新手机号</p>
              </view>
            </view>
            <view class="ST-items left">
              <view class="ST-box"  @click="clickStep(2)">
                <view class="ST-img" :class="!isShow ? 'isST-view' : '' ">
                  <p class="">2</p>
                  <view class="line line-left " :class="!isShow ? 'isST-line' : '' "></view>
                </view>
                <p :class="!isShow ? 'isST-p' : '' ">验证并绑定</p>
              </view>
            </view>
            <view class="clear"></view>
          </view>
        </view>
      </view>
      <view class="MGT"></view>
      <view class="input-PB">
        <view class="input-PB-box" v-show="isShow">
			<wInput
				v-model="phoneLand.phone"
				type="number"
				maxlength="11"
				placeholder="请输入您要绑定的手机号"
			></wInput>
          <view class="line"></view>
        </view>
        <!--验证码-->
        <view class="input-PB-box" v-if="!isShow">
          <view class="yan-left-PLR left">
			  <wInput
			  	v-model="phoneLand.code"
			  	type="number"
			  	maxlength="4"
			  	placeholder="请输入验证码"
			  ></wInput>
          </view>
          <view class="ma-right-PLR left">
            <view v-bind:class="{ yazm: isOvertime , 're-yazm': !isOvertime }" slot="right" type="primary" action-type="button" mini @click="sendMessage">{{word}}</view>
          </view>
          <view class="clear"></view>
          <view class="line"></view>
        </view>
      </view>
      <view class="">
        <view :class="phoneLand.phone ? 'btn-RB' : 'btn-RB2'" v-if="isShow"  @click="clickNextStep">
          <p class="">下一步</p>
        </view>
        <view :class="phoneLand.phone && phoneLand.code ? 'btn-RB' : 'btn-RB2'" v-if="!isShow" @click="clickUpData">
          <p class="">完成绑定</p>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
	import wInput from '@/components/watch-login/watch-input.vue';
	import { mapMutations } from 'vuex';
    export default {
        name: 'phoneBind',
        data () {
          return {
            UserData: {},
            phoneLand: { // 账号登录
              phone: '',
              code: '',
              passWord: '' // 设置密码
            },
            isShow: true, // 显示
            loadingShow: false, // loading
            isOvertime: false,
            word: '发送验证码',
            setPassWorld: false // 设置密码，true，需要用户设置密码
          };
        },
		// 分享
		onShareAppMessage(res) {
			  if (res.from === 'button') {// 来自页面内分享按钮
				console.log(res.target)
			  }
			  return this.titleOrPathApp
		},
		components: {
		  wInput
		},
        computed: {
        },
        created () {
			if (uni.getStorageSync('UserData')) {
				this.UserData = JSON.parse(uni.getStorageSync('UserData')); // 读取缓存的用户信息
			}
        },
        mounted () {},
        methods: {
			...mapMutations({
				setheader: 'setheader',
				setMation:'setMation'
			}),
          clickStep (e) {
            console.log('触发步进器');
            if (e === 1) {
              if (this.isShow !== true) {
                this.isShow = !this.isShow;
              };
            };
            if (e === 2) {
              this.clickNextStep();
            };
          },
          sendMessage () {
            if (this.isOvertime) {
              return false;
            }
            this.getCode();  // 获取验证码方法
          },
          sendState () { // 成功发送短信倒计时
            let that = this;
            let time = 60;
            let sendTimer = setInterval(function () {
              that.isOvertime = true;
              time--;
              that.word = '重新获取(' + time + 's)';
              if (time < 0) {
                that.isOvertime = false;
                clearInterval(sendTimer);
                that.word = '获取验证码';
              };
            }, 1000);
          },
          getCode () {
            uni.showLoading({ // 展示loading
				title: '加载中'
			});
            let params = { // 发送短信参数
              phone: this.phoneLand.phone,
              businessName: '1',
              portal: 'iambuyer'
            };
			uni.request({
				url: this.api1 + '/rest-sso/phoneSms', //接口地址。
				data:  params,
				method: 'POST',
				header: {
					'custom-header': 'hello' //自定义请求头信息
				},
				success: (response) => {
					console.log(response.data);
					if (response.data.ret === '200') {
					  uni.hideLoading(); // 隐藏 loading
						uni.showToast({
							title: '短信发送成功',
							icon: 'none',
							duration: 1000
						});
					  this.sendState(); // 倒计时
					} else {
					  uni.hideLoading(); // 隐藏 loading
						uni.showToast({
							title: response.data.msg,
							icon: 'none',
							duration: 1000
						});
					}
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
          },
          clickNextStep () {
           console.log('触发下一步');
            let phone = this.phoneLand.phone;
            if (phone === '') { // 校验手机号不能为空
				uni.showToast({
					title: '手机号为不能为空',
					icon: 'none',
					duration: 500
				});
				return false;
            };
            if (!(/^1[34578]\d{9}$/.test(phone))) { // 校验手机号格式
				uni.showToast({
					title: '手机号码有误,请重填',
					icon: 'none',
					duration: 500
				});
				return false;
            };
            if (phone === this.UserData.userPhone) {
				uni.showToast({
					title: '不能和当前已经绑定的手机号相同',
					icon: 'none',
					duration: 500
				});
				return false;
            } else {
				this.isShow = !this.isShow;
            };
          },
          clickUpData () {
            console.log('触发完成绑定');
            let params = {
              phone: this.phoneLand.phone,
              businessName: '1',
              phoneCode: this.phoneLand.code,
              portal: 'iambuyer'
            };
            
			if (uni.getStorageSync('landRegist')) {
			    let landRegistLG = JSON.parse(uni.getStorageSync('landRegist')); // 读取缓存的用户信息
			    console.log(landRegistLG.user.id);
				uni.showLoading({ // 展示loading
					title: '加载中'
				});
				uni.request({
					url: this.api1 + '/rest-sso/phoneSmsVali', //接口地址。
					data: params,
					method: 'POST',
					header: {
						Authorization:"Bearer "+landRegistLG.token//将token放到请求头中
					},
					success: (response) => {
						if (response.data.ret === '200') {
						  	uni.hideLoading(); // 隐藏 loading
						  	uni.showToast({
						  		title: '验证码校验成功！',
						  		icon: 'none',
						  		duration: 1000
						  	});
							let paramsData = {
								userPhone: this.phoneLand.phone
							};
							 this.upDataUser(paramsData);
						} else {
							uni.hideLoading(); // 隐藏 loading
							uni.showToast({
								title: response.data.msg,
								icon: 'none',
								duration: 1000
							});
						}
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
		  getUserData () {
		  	console.log('获取用户信息，全部');
		  	let landRegistLG = JSON.parse(uni.getStorageSync('landRegist')); // 读取缓存的用户信息
		  	console.log(landRegistLG.user.id);
		  	uni.request({
		  		url: this.api2 + '/user/' + landRegistLG.user.id, //接口地址。
		  		data: {},
		  		header: {
		  			Authorization:"Bearer "+landRegistLG.token//将token放到请求头中
		  		},
		  		success: (response) => {
		  			console.log(response.data);
		  			if (String(response.data.code) === '200') {
		  				let UserData = response.data.content;
						this.$store.commit('setheader', UserData); // 更新vuex
						this.$store.commit('setMation', UserData); // 更新vuex
		  				uni.setStorageSync('UserData', JSON.stringify(UserData)); // 缓存用户信息
		  				uni.showToast({
		  					title: '更新成功',
		  					icon: 'none',
		  					duration: 500
		  				});
		  				setTimeout(() => {
		  					uni.navigateBack({delta: 1});
		  				}, 500);
		  			} else {
		  				uni.hideLoading(); // 隐藏 loading
		  				uni.showToast({
		  					title: response.data.msg,
		  					icon: 'none',
		  					duration: 500
		  				});
		  			}
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
		  },
          upDataUser (e) {
            console.log('更新手机号数据');
			if (uni.getStorageSync('landRegist')) {
			    let landRegistLG = JSON.parse(uni.getStorageSync('landRegist')); // 读取缓存的用户信息
			    console.log(landRegistLG.user.id);
				let params = e; // 请求总数居时 参数为空
				uni.showLoading({ // 展示loading
					title: '加载中'
				});
				uni.request({
					url: this.api2 + '/user/' + landRegistLG.user.id, //接口地址。
					data: this.endParams(params),
					method: 'POST',
					header: {
						Authorization:"Bearer "+landRegistLG.token//将token放到请求头中
					},
					success: (response) => {
						console.log(response.data);
						uni.hideLoading(); // 隐藏 loading
						if (response.data.code === 200) {
							this.getUserData();
						} else {
							uni.showToast({
								title: response.data.message,
								icon: 'none',
								duration: 1000
							});
						}
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

<style scoped>
  .phoneBind-content{
    position: fixed;
    width: 100%;
    min-height: 100vh;
    background: #fff;
    overflow: scroll;
  }
  .MGT{
    position: relative;
    width: 100%;
    height: 1.5vw;
    background: #F9F9F9;
  }
  .phoneBind{
    position: relative;
    width: 100%;
  }
  .PB-top{
    position: relative;
    padding: 4vw;
    background: #fff;
  }
  .PB-top .PB-top-v{
    font-family: PingFangSC-Regular;
    font-size: 32upx;
    color: #2E2E30;
    text-align: center;
    line-height: 11vw;
  }
  .phoneNum{
    color: #02C2A2 !important;
  }
  .GH-PB{
    position: relative;
    width: 100%;
    font-family: PingFangSC-Regular;
    font-size: 3.5vw;
    color: #9B9B9B;
    text-align: center;
  }
  .PB-subStep{
    position: relative;
    width: 80%;
    margin: auto;
    margin-top: 6vw;
  }
  .substep{
    position: relative;
    width: 100%;
  }
  .ST-items{
    position: relative;
    width: 50%;
  }
  .ST-box{
    position: relative;
    width: 100%;
  }
  .ST-box>p{
    font-family: PingFangSC-Regular;
    font-size: 3.5vw;
    color: #2E2E30;
    line-height: 10vw;
    text-align: center;
  }

  .yazm{
    font-family: PingFangSC-Light;
    font-size: 4vw;
    color: #ccc;
    line-height: 12vw;
    text-align: right;
  }
  .re-yazm{
    font-family: PingFangSC-Light;
    font-size: 4vw;
    color: #02C2A2;
    line-height: 12vw;
    text-align: right;
  }
  .ST-img{
    position: relative;
    width: 4.8vw;
    height: 4.8vw;
    background: #D2D2D2;
    border-radius: 50%;
    margin: auto;
  }
  .ST-img>p{
    width: 4.8vw;
    font-family: PingFangSC-Regular;
    font-size: 3.5vw;
    color: #FFFFFF;
    letter-spacing: 0;
    text-align: center;
    line-height: 4.8vw;
  }
  .line-left{
    position: absolute !important;
    right: 4.8vw !important;
    top: 2.4vw !important;
    width: 16.5vw !important;
  }
  .line-right{
    position: absolute !important;
    left: 4.8vw !important;
    top: 2.4vw !important;
    width: 16.5vw !important;
  }
  .isST-view{
    background: #24D5AA !important;
  }
  .isST-line{
    background: #24D5AA !important;
  }
  .isST-p{
    color: #24D5AA !important;
  }

  .input-PB{
    position: relative;
    width: 100%;
    background: #ffffff;
	height: 140upx;
  }
  .input-PB-box{
    position: relative;
    padding: 4vw;
  }
  .inputYan-PLR{
    position: relative;
    width: 100%;
    margin-top: 6vw;

  }
  .yan-left-PLR{
    position: relative;
    width: 60%;
  }
  .ma-right-PLR{
    position: relative;
    width: 40%;
  }
  .ma-right-PLR>p{
    font-family: PingFangSC-Light;
    font-size: 4vw;
    color: #02C2A2;
    line-height: 12vw;
    text-align: right;
  }




  .btn-RB{
    position: relative;
    padding: 4vw;
    margin-top: 6vw;
  }
  .btn-RB>p{
    background: #02C2A2;
    text-align: center;
    font-family: PingFangSC-Regular;
    font-size: 4.266vw;
    color: #FFFFFF;
    letter-spacing: 0;
    line-height: 12vw;
  }

  .btn-RB2{
    position: relative;
    padding: 4vw;
    margin-top: 6vw;
    opacity: 0.5;
  }
  .btn-RB2>p{
    background: #02C2A2;
    text-align: center;
    font-family: PingFangSC-Regular;
    font-size: 4.266vw;
    color: #FFFFFF;
    letter-spacing: 0;
    line-height: 12vw;
  }
</style>
