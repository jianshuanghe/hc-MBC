<template>
  <view class="landRegistration-content">
    <view class="landRegistration">
      <view class="phone-passWord-LR">
        <!--手机号登录-->
        <view class="phonw-LR" v-if="landType === 1 && !setPassWorld">
          <view class="top-PLR">
            <p class="">你好，<br/>
              欢迎来到陌拜资本</p>
          </view>
          <view class="LR-cont">
            <view class="inputPhone-PLR">
				<wInput
					v-model="phoneLand.phone"
					type="number"
					maxlength="11"
					placeholder="请输入手机号码"
				></wInput>
              <view class="line"></view>
            </view>
            <view class="inputYan-PLR">
              <view class="yan-left-PLR left">
				  <wInput
				  	v-model="phoneLand.code"
				  	type="number"
				  	maxlength="4"
				  	placeholder="请输入验证码"
				  ></wInput>
              </view>
              <view class="ma-right-PLR left">
                <!--<p class="">获取验证码</p>-->
                <view :class="{ yazm: isOvertime , 're-yazm': !isOvertime }"  type="primary" action-type="button" mini @click="sendMessage">{{word}}</view>
              </view>
              <view class="clear"></view>
              <view class="line"></view>
            </view>
            <view class="switchPassWorld">
              <p class="" @click="clickPassWordLand">账号密码登录</p>
            </view>
          </view>
        </view>
        <!--账号登陆-->
        <view class="passWord-LR" v-if="landType === 2 && !setPassWorld">
          <view class="top-PWLR">
            <img :src="logo" alt="" class="">
          </view>
          <view class="LR-cont">
            <view class="inputPhone-PLR">
				<wInput
					v-model="passWordLand.phone"
					type="number"
					maxlength="11"
					placeholder="请输入手机号码"
				></wInput>
              <view class="line"></view>
            </view>
            <view class="inputPhone-PLR">
				<wInput
					v-model="passWordLand.passWord"
					type="password"
					placeholder="请输入密码"
				></wInput>
              <view class="line"></view>
            </view>
            <view class="switchPassWorld">
              <p class="left"  @click="clickPhoneLand">手机号验证码登录</p>
              <p class="right text-Right" @click="clickForgetPassWord">忘记密码</p>
              <view class="clear"></view>
            </view>
          </view>
        </view>
        <!--设置密码-->
        <view class="passWord-LR" v-if="setPassWorld">
          <view class="top-PWLR">
            <img :src="logo" alt="" class="">
          </view>
          <view class="LR-cont">
            <view class="inputPhone-PLR">
				<wInput
					v-model="phoneLand.passWord"
					type="password"
					placeholder="请设置登录密码"
				></wInput>
              <view class="line"></view>
            </view>
          </view>
        </view>
        <!--登录按钮-->
        <view class="landBtn">
          <view class="" v-if="!setPassWorld">
            <!--登录-->
            <view class="land-btn-box" @click="clickLand">
              <p class="">登录</p>
            </view>
            <!--微信登录-->
            <view class="land-btn-box" @click="clickWxLand" v-if="browserType === 'WX'">
              <p class="wx-land">微信账号登录</p>
            </view>
          </view>
          <!--保存密码-->
          <view class="land-btn-box"  v-if="setPassWorld" >
            <p class=""@click="clickSetPassWorld">保存</p>
            <view class="skipLand" @click="clickSkipLand">
              <p class="">暂不设置</p>
            </view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
	import wInput from './../../../../components/watch-login/watch-input.vue';
    import logo from '@/static/mbcImg//landRegistration/logo.png';

    export default {
        name: 'landRegistration',
        components: {
          wInput
        },
        data () {
          return {
            browserType: '', // 判断浏览器
            logo: logo,
            loadingShow: false, // loading
            isOvertime: false,
            phoneLand: { // 账号登录
              phone: '',
              code: '',
              passWord: '' // 设置密码
            },
            passWordLand: { // 密码登录
              phone: '',
              passWord: ''
            },
            word: '发送验证码',
            setPassWorld: false, // 设置密码，true，需要用户设置密码
            landType: 1, // 登录方式默认 1 账号登录， 2密码登录
            password: '' // 记录后台返回账户的密码
          };
        },
        created () {
          if (uni.getStorageSync('landRegist')) {
            let landRegistLG = JSON.parse(uni.getStorageSync('landRegist')); // 读取缓存的用户信息
            if (landRegistLG.user.password === '' || landRegistLG.user.password === null || landRegistLG.user.password === undefined) {
              this.setPassWorld = true; // 设置密码显示
            }
          } else {
            localStorage.setItem('tabItems', 1);
          }
          if (uni.getStorageSync('landType')) {
            this.landType = Number(uni.getStorageSync('landType'));
          };
          // if (uni.getStorageSync('browserType') === 'WX') {
          //   this.browserType = 'WX';
          // } else if (uni.getStorageSync('browserType') === 'FWX') {
          //   this.browserType = 'FWX';
          // }
        },
        mounted () {
          console.log(this.api2, '全局数据');
        },
        methods: {
          // ...mapMutations({
          //   setLoadingShow: 'setLoadingShow',
          //   setLoadingText: 'setLoadingText'
          // }),
          sendMessage () {
            let phone = this.phoneLand.phone;
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
          clickPassWordLand () {
            console.log('触发账号密码登录按钮');
            this.landType = 2;
            localStorage.setItem('landType', this.landType); // 缓存登录方式
          },
          clickPhoneLand () {
            console.log('触发手机号登录按钮');
            this.landType = 1;
            localStorage.setItem('landType', this.landType); // 缓存登录方式
          },
          clickForgetPassWord () {
            console.log('触发忘记密码按钮');
            uni.navigateTo({
				url: '/pages/mbc/template/landRegistration/forgetPassWord'
			});
          },
          clickLand () {
            console.log('触发登录按钮');
            if (this.landType === 1) { // 手机号登陆
              console.log('手机号登录');
              this.phoneLandFn();
            } else if (this.landType === 2) { // 密码登录
              console.log('密码登录');
              this.passWordLandFn();
            }
          },
          phoneLandFn () { // 手机号登录
            let code = this.phoneLand.code;
            let phone = this.phoneLand.phone;
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
            };
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
            } else {
            uni.showLoading({ // 展示loading
             	title: '加载中'
            });
			let params = { // 登录参数
				phone: this.phoneLand.phone,
				loginType: '0',
				phoneCode: this.phoneLand.code
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
						uni.setStorageSync('landRegist', JSON.stringify(landRegist));// 缓存用户登录信息
						console.log('登陆成功！');
						this.password = response.data.content.user.password; // 村密码
						this.getUserData();
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
          passWordLandFn () { // 密码登录
            let phone = this.passWordLand.phone;
            let passWord = this.passWordLand.passWord;
            console.log(this.passWordLand);
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
            if (passWord === '') { // 校验密码不能为空
				uni.showToast({
					title: '密码为不能为空',
					icon: 'none',
					duration: 1000
				});
              return false;
            }
            if (passWord.length < 6) { // 密码不能为空
				uni.showToast({
					title: '密码不能少于6个字符',
					icon: 'none',
					duration: 1000
				});
              return false;
            };
            uni.showLoading({ // 展示loading
            	title: '加载中'
            });
            let params = { // 登录参数
              phone: this.passWordLand.phone,
              loginType: '1',
              passWord: this.passWordLand.passWord
            };
			uni.request({
				url: this.api2 + '/rest-rp/mbUser/login', //接口地址。
				data:  params,
				method: 'POST',
				header: {
					'custom-header': 'hello' //自定义请求头信息
				},
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
					  uni.setStorageSync('landRegist', JSON.stringify(landRegist));// 缓存用户登录信息
					  this.password = response.data.content.user.password; // 村密码
					  this.getUserData();
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
					  localStorage.setItem('UserData', JSON.stringify(UserData)); // 缓存用户信息
					  if (this.password === '' || this.password === null || this.password === undefined) { // 查询没有密码，去设置密码
					    this.setPassWorld = true; // 设置密码显示
					  } else { // 查询存在密码 返回登录
						 uni.showToast({
							title: '登陆成功',
							icon: 'none',
							duration: 500
						 });
						 uni.navigateBack({delta: 1});
					    setTimeout(() => {
							uni.navigateTo({
								url: '/pages/mbc/home'
							});
					    }, 500);
					  }
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
          clickSetPassWorld () {
            console.log('触发保存密码按钮');
            let passWord = this.phoneLand.passWord;
            if (passWord === '') { // 密码不能为空
				 uni.showToast({
					title: '密码不能为空',
					icon: 'none',
					duration: 500
				});
              return false;
            };
            if (passWord.length < 6) { // 密码不能为空
				uni.showToast({
					title: '密码不能少于6个字符',
					icon: 'none',
					duration: 500
				});
              return false;
            };
            let params = {
              passWord: this.phoneLand.passWord
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
			  		if (String(response.data.ret) === '200') {
			  		  uni.hideLoading(); // 隐藏 loading
			  		  uni.showToast({
			  		  	title: '登陆成功！',
			  		  	icon: 'none',
			  		  	duration: 500
			  		  });
			  		  if (uni.getStorageSync('landRegist')) {
			  		    let landRegistLG = JSON.parse(uni.getStorageSync('landRegist')); // 读取缓存的用户信息
			  		    landRegistLG.user.password = this.phoneLand.passWord;
						uni.setStorageSync('landRegist', JSON.stringify(landRegistLG));// 缓存用户登录信息
			  		  }
			  		  setTimeout(() => {
			  		    uni.navigateTo({
			  		    	url: '/pages/mbc/home'
			  		    });
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
            }
          },
          clickSkipLand () {
            console.log('触发暂不设置');
			uni.navigateTo({
				url: '/pages/mbc/home'
			});
          },
          clickWxLand () {
            console.log('触发微信登录');
            let UUID = this.generateUUID(); // 用户唯一ID
			uni.setStorageSync('UUID', UUID);
            window.location.href = this.api2 + '/rest-rp/mbUser/goWxLogin?uuid=' + UUID;
          },
          generateUUID () { // 生成用户唯一ID
            var d = new Date().getTime();
            var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
              var r = (d + Math.random() * 16) % 16 | 0;
              d = Math.floor(d / 16);
              return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
            });
            return uuid;
          },
          goToMaterial () {
            console.log('to代理商注册');
            this.$router.push({
              path: '/agentRegistration',
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
    margin-top: 12vw;
  }
  .phonw-LR{
    position: relative;
    width: 100%;
    margin-top: 6vw;
  }
  .top-PLR{
    position: relative;
    width: 100%;
  }
  .top-PLR>p{
    font-family: PingFangSC-Semibold;
    font-size: 6.4vw;
    color: #2E2E30;
    line-height: 10vw;
  }
  .LR-cont{
    position: relative;
    width: 100%;
    margin-top: 8vw;

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
  .switchPassWorld{
    position: relative;
    width: 100%;
  }
  .switchPassWorld>p{
    font-family: PingFangSC-Light;
    font-size: 3.5vw;
    color: #02C2A2;
    line-height: 12vw;
    width: 50%;
  }
  .passWord-LR{
    position: relative;
    width: 100%;
  }
  .top-PWLR{
    position: relative;
    width: 33.6vw;
    margin-top: 6vw;
    margin: auto;
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
  .wx-land{
    font-family: PingFangSC-Regular;
    font-size: 4.266vw;
    color: #02C2A2 !important;
    letter-spacing: 0;
    text-align: center;
    line-height: 12vw;
    border: 1px solid #E2E2E2;
    background: #fff !important;
  }
  .text-Right{
    text-align: right;
  }
  .skipLand{
    position: relative;
    width: 100%;
    margin-top: 4vw;
  }
  .skipLand>p{
    position: relative;
    width: 100%;
    text-align: center;
    font-size: 4vw;
    line-height: 12vw;
    color: #15D49F;
  }
</style>
