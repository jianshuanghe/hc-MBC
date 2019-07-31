<template>
  <view class="landRegistration-content">
    <view class="landRegistration">
      <view class="phone-passWord-LR">
        <!--手机号登录-->
        <view class="phonw-LR">
          <view class="LR-cont">
            <view class="inputPhone-PLR">
        <wInput
          v-model="phone"
          type="number"
          maxlength="11"
          placeholder="请输入手机号码"
        ></wInput>
              <view class="line"></view>
            </view>
            <view class="inputYan-PLR">
              <view class="yan-left-PLR left">
           <wInput
            v-model="code"
            type="number"
            maxlength="4"
            placeholder="请输入验证码"
          ></wInput>
              </view>
              <view class="ma-right-PLR left">
                <view v-bind:class="{ yazm: isOvertime , 're-yazm': !isOvertime }" type="primary" action-type="button" mini @click="sendMessage">{{word}}</view>
              </view>
              <view class="clear"></view>
              <view class="line"></view>
            </view>
            <view class="inputPhone-PLR">
        <wInput
          v-model="passWord"
          type="password"
          placeholder="请输入新密码"
        ></wInput>
              <view class="line"></view>
            </view>
            <view class="inputPhone-PLR">
        <wInput
          v-model="passWord1"
          type="password"
          placeholder="确认新密码"
        ></wInput>
              <view class="line"></view>
            </view>
          </view>
        </view>
        <!--登录按钮-->
        <view class="landBtn">
          <view class="">
            <!--登录-->
            <view class="land-btn-box" @click="clickSubmit">
              <p class="">提交</p>
            </view>
        </view>
      </view>
    </view>
  </view>
  </view>
</template>

<script>
	import wInput from './../../../../components/watch-login/watch-input.vue';
  export default {
    name: 'forgetPassWord',
    components: {
      wInput
    },
    data () {
      return {
        loadingShow: false, // loading
        word: '发送验证码',
        isOvertime: false,
        phone: '',
        code: '',
        passWord: '', // 输入新密码
        passWord1: '' // 确认新密码
      };
    },
    created () {
      uni.removeStorageSync('tabItems'); // 移除用户点击tabbar缓存数据
      uni.removeStorageSync('UserData'); // 移除用户信息缓存数据
      uni.removeStorageSync('landRegist'); // 移除用户登录缓存数据
      uni.removeStorageSync('userId'); // 移除用户登录缓存数据
    },
    mounted () {},
    methods: {
      sendMessage () {
        let phone = this.phone;
        if (phone === '') { // 校验手机号不能为空
		  uni.showToast({
		  	title: '手机号为不能为空',
		  	icon: 'none',
		  	duration: 1000
		  });
          return false;
        };
        if (!(/^1[34578]\d{9}$/.test(phone))) { // 校验手机号格式
		  uni.showToast({
		  	title: '手机号码有误,请重填',
		  	icon: 'none',
		  	duration: 1000
		  });
          return false;
        } else {
          if (this.isOvertime) {
            return false;
          }
          this.getCode();  // 获取验证码方法
        };
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
          phone: this.phone,
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
      clickSubmit () {
        console.log('触发提交按钮');
        let phone = this.phone;
        let code = this.code;
        let passWord = this.passWord;
        let passWord1 = this.passWord1;
        if (phone === '') { // 校验手机号不能为空
		  uni.showToast({
		  	title: '手机号为不能为空',
		  	icon: 'none',
		  	duration: 1000
		  });
          return false;
        };
        if (!(/^1[34578]\d{9}$/.test(phone))) { // 校验手机号格式
		  uni.showToast({
		  	title: '手机号码有误,请重填',
		  	icon: 'none',
		  	duration: 1000
		  });
          return false;
        }
        if (code === '') { // 短信验证码不能为空
		  uni.showToast({
		  	title: '短信验证码不能为空',
		  	icon: 'none',
		  	duration: 1000
		  });
          return false;
        };
        if (!(/^\d{4}$/.test(code))) { // 校验验证码格式
		  uni.showToast({
		  	title: '验证码格式有误,请重填',
		  	icon: 'none',
		  	duration: 1000
		  });
          return false;
        };
        if (passWord === '') { // 密码不能为空
		  uni.showToast({
		  	title: '密码不能为空',
		  	icon: 'none',
		  	duration: 1000
		  });
          return false;
        };
        if (passWord.length < 6) { // 密码不能为空
		  uni.showToast({
		  	title: '密码不能少于6个字符',
		  	icon: 'none',
		  	duration: 1000
		  });
          return false;
        };
        if (passWord1 === '') { // 确认密码不能为空
		  uni.showToast({
		  	title: '确认密码不能为空',
		  	icon: 'none',
		  	duration: 1000
		  });
          return false;
        };
        if (passWord1 !== passWord) { // 两次输入密码不一致
		  uni.showToast({
		  	title: '两次输入密码不一致！',
		  	icon: 'none',
		  	duration: 1000
		  });
          return false;
        } else {
			uni.showLoading({ // 展示loading
				title: '加载中'
			});
			let params = { // 登录参数
				phone: this.phone,
				loginType: '0',
				phoneCode: this.code
			};
			uni.request({
				url: this.api2 + '/user/login', //接口地址。
				data:  params,
				method: 'POST',
				header: {},
				success: (response) => {
					console.log(response.data);
					if (String(response.data.code) === '200') {
						uni.hideLoading(); // 隐藏 loading
						let landRegist = {
						  randomKey: response.data.content.randomKey,
						  token: response.data.content.token,
						  user: {
						    id: response.data.content.user.id
						  }
						};
						console.log(landRegist);
						uni.setStorageSync('landRegist', JSON.stringify(landRegist));// 缓存用户登录信息
						let params = {
							passWord: this.passWord
						};
						if (uni.getStorageSync('landRegist')) {
							let landRegistLG = JSON.parse(uni.getStorageSync('landRegist')); // 读取缓存的用户信息
							console.log(landRegistLG.user.id);
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
									if (String(response.data.code) === '200') {
										uni.hideLoading(); // 隐藏 loading
										uni.showToast({
											title: '密码重置成功！',
											icon: 'none',
											duration: 1000
										});
										uni.removeStorageSync('tabItems'); // 移除用户点击tabbar缓存数据
										uni.removeStorageSync('UserData'); // 移除用户信息缓存数据
										uni.removeStorageSync('landRegist'); // 移除用户登录缓存数据
										uni.removeStorageSync('userId'); // 移除用户登录缓存数据
										console.log('清空用户信息');
										setTimeout(() => {
											uni.navigateTo({
												url: '/pages/mbc/template/landRegistration/landRegistration'
											});
										}, 1000);
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
						} else {
							uni.hideLoading(); // 隐藏 loading
							uni.showToast({
								title: response.data.msg,
								icon: 'none',
								duration: 1000
							});
						}
					}
				}
			});
        }
      },
      goToMaterial () {
        console.log('to个人资料');
        this.$router.push({
          path: '/personMaterial',
          query: { }
        });
      }
    }
  };
</script>

<style scoped>
  .landRegistration-content{
    position: relative;
    width: 750upx;
    height: 1334upx;
    background: #fff;
  }
  .landRegistration{
    position: relative;
    padding: 18upx 40upx;
    background: #fff;
  }
  .phone-passWord-LR{
    position: relative;
    width: 100%;
  }
  .phonw-LR{
    position: relative;
    width: 100%;
  }
  .top-PLR1{
    position: relative;
    width: 100%;
  }
  .top-PLR1>p{
    ont-family: PingFangSC-Regular;
    font-size: 3.5vw;
    color: #2E2E30;
    letter-spacing: 0;
    text-align: center;
    line-height: 12vw;
  }
  .LR-cont{
    position: relative;
    width: 100%;

  }
  .inputPhone-PLR{
    position: relative;
    width: 100%;
    margin-top: 5vw;
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
  .top-PWLR>img{
    position: relative;
    width: 100%;
  }
  .landBtn{
    position: relative;
    width: 100%;
    margin-top: 8vw;
  }
  .land-btn-box{
    position: relative;
    width: 100%;
    height: 12vw;
    margin-bottom: 6vw;
  }
  .land-btn-box>p{
    font-family: PingFangSC-Regular;
    font-size: 4.266vw;
    color: #FFFFFF;
    letter-spacing: 0;
    text-align: center;
    line-height: 12vw;
    background: #02C2A2;
  }
</style>
