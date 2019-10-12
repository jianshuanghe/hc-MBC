<template>
  <view class="landRegistration-content">
    <view class="landRegistration">
      <view class="phone-passWord-LR">
        <!--账号登陆-->
        <view class="passWord-LR">
          <view class="top-PWLR">
            <image :src="logo" alt="" class="" mode='widthFix'></image>
          </view>
		  <div class="nameLand">欢迎登录</div>
        </view>
        <!--登录按钮-->
        <view class="landBtn">
          <view class="">
			<!-- #ifdef MP-WEIXIN -->  
			<button  open-type="getUserInfo" withCredentials="true" lang="zh_CN" @getuserinfo="getPhoneNumber" class="land-btn-box" v-if="phoneIsGet">登录</button> 
			<button  open-type="getPhoneNumber" withCredentials="true" lang="zh_CN" @getphonenumber="getPhoneNumber" class="land-btn-box" v-else>注册</button> 
			<!-- #endif -->  
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
	import logo from '@/static/mbcImg/landRegistration/logo.png';
	import { mapMutations, mapGetters } from 'vuex';
    export default {
        name: '',
        components: {
        },
        data () {
          return {
            logo: logo,
			phoneIsGet: true // 判断用户是否再平台注册过，默认是注册过，如果没有注册需要获取用户手机号
          };
        },
		computed: {
			...mapGetters(['LANDREGIST'])
		},
		watch: {
		  LANDREGIST: {
		    handler (a, b) {
				console.log(a, b, '登录状态');
		    },
		    deep: true
		  }
		},
        created () {
			// 隐藏分享
			uni.hideShareMenu()
        },
        mounted () {
          console.log(this.api2, '全局数据');
		   this.getSessionKey();
        },
        methods: {
			...mapMutations({
				setLandRegist: 'setLandRegist'
			}),
			getSessionKey () { // 缓存用户sessionkey
				let _this = this;
				uni.login({ // 授权登录 静默
					provider: 'weixin',
					scopes: 'auth_base',
					success: function (loginRes) {
						console.log(loginRes, '微信返回的code mounted');
						uni.request({ // 获取key
							url: _this.api2 + '/wechat/portal/wxMiniSessionKey?code=' + loginRes.code, //接口地址。
							data: {},
							header: {
							},
							success: (response) => {
								console.log(response.data);
								if (String(response.data.code) === '200') {
									let sessionKey = response.data.content;
									uni.setStorageSync('sessionKey', sessionKey); // 缓存用户sessionKey
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
				}); 
			},
			bindGetUserInfo: function(e) {    
                console.log(e); 
            },
			getPhoneNumber: function(e) {    
                console.log(e);    
                if (e.detail.errMsg === 'getPhoneNumber:fail user deny') {    
                    console.log('用户拒绝提供手机号');  
                } else if (e.detail.errMsg === 'getUserInfo:fail auth deny') {    
                    console.log('用户拒绝授权');  
                } else {    
                    console.log('用户同意提供手机号且同意授权');
					let evData = JSON.stringify(e.detail.encryptedData);
					let evIv = JSON.stringify(e.detail.iv); 
					console.log(evData, evIv, '带你花------------');
					this.clickMpLand(evData, evIv);
                }    

            },
			clickMpLand (evData, evIv) {
				uni.showLoading({ // 展示loading
					title: '登陆中···'
				});
				let _this = this;
				console.log('触发小程序登录');
				// #ifdef MP-WEIXIN
					wx.checkSession({
					  success () {
					    //session_key 未过期，并且在本生命周期一直有效
						_this.mpWxLand(evData, evIv);
					  },
					  fail () {
					    // session_key 已经失效，需要重新执行登录流程
						console.log('session_key已经过期！');
					    _this.getSessionKey(); //重新登录
					  }
					})
					
				// #endif
				// #ifdef MP-TOUTIAO
					_this.mpTtLand();
				// #endif
				// #ifdef  MP-BAIDU
					_this.mpBdLand();
				// #endif
				// #ifdef MP-ALIPAY
					_this.mpApLand();
				// #endif
			},
			mpWxLand (evData, evIv) {
				console.log('微信小程序登录');
				uni.showLoading({ // 展示loading
					title: '登录中···'
				});
				let _this = this;
				uni.getUserInfo({ // 拉取用户信息
					provider: 'weixin',
					success: function (user) {
						console.log(user, '拉取到的用户信息');
						let sessionKey = uni.getStorageSync('sessionKey'); // 读取缓存的用户sessionKey
						let params = { // 登录参数
							sessionKey: sessionKey,
							nickname: user.userInfo.nickName,
							compLogo: user.userInfo.avatarUrl,
							signature: user.signature,
							rawData: user.rawData,
							phoneEncryptedData: JSON.parse(evData),
							phoneIv: JSON.parse(evIv),
							userEncryptedData: user.encryptedData,
							userIv: user.iv
						};
						uni.request({
							url: _this.api2 + '/wechat/portal/wxMiniLogin', //接口地址。
							data: params,
							method: 'POST',
							header: {},
							success: (response) => {
								console.log(response.data);
								if (String(response.data.code) === '200') {
									let landRegist = {
										randomKey: response.data.content.randomKey,
										token: response.data.content.token,
										user: {
											id: response.data.content.userId
										}
									};
									uni.setStorageSync('landRegist', JSON.stringify(landRegist));// 缓存用户登录信息
									_this.getUserData();
								} else if (String(response.data.code) === '400') {
									uni.hideLoading(); // 隐藏 loading
									_this.phoneIsGet = false; // 显示获取手机号
									uni.showToast({
										title: '请同意获取手机号注册，再登录！',
										icon: 'none',
										duration: 500
									});
								} else if (String(response.data.code) === '500') {
									uni.hideLoading(); // 隐藏 loading
									console.log(response.data, '---------------------response.data---------------------')
									console.log('------------------------5000-----------------------')
									uni.showToast({
										title: '网络开小差了，请再次点击登录！',
										icon: 'none',
										duration: 500
									});
									// _this.getWxMiniLogin(params);
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
				})	
			},
			mpTtLand () {
				console.log('头条小程序登录');
			},
			mpBdLand () {
				console.log('百度小程序登录');
			},
			mpApLand () {
				console.log('支付宝小程序登录');
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
							uni.setStorageSync('UserData', JSON.stringify(UserData)); // 缓存用户信息
							console.log('-----------------------------登录成功-----------------------')
							this.$store.commit('setLandRegist', 1); // 更新setLandRegist // 用户登录
							uni.showToast({
								title: '登录成功',
								icon: 'none',
								duration: 500
							});
							uni.navigateBack({delta: 1});
							// setTimeout(() => {
							// 	uni.reLaunch({
							// 		url: '/pages/mbc/home'
							// 	});
							// }, 500);
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
		}
	};
</script>

<style scoped>
  .landRegistration-content{
    position: relative;
    width: 750upx;
    height: 100vh;
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
    width: 150upx;
    margin-top: 6vw;
    margin: auto;
  }
  .top-PWLR>image{
    position: relative;
    width: 150upx;
    height: 150upx;
  }
  .nameLand{
	 font-family: PingFang-SC-Medium;
	 font-size: 36upx;
	 color: #5D5D5D;
	 letter-spacing: 0;
	 text-align: center;
	 line-height: 40upx; 
	 margin-top: 30upx;
  }
  .landBtn{
    position: relative;
    width: 100%;
    margin-top: 100upx;
  }
  .land-btn-box{
    position: relative;
    width: 550upx;
    height: 90upx;
    margin-bottom: 6vw;
	margin-top: 100upx;
	font-size: 32upx;
	color: #FFFFFF;
	letter-spacing: 0;
	text-align: center;
	line-height: 90upx;
	background: #02C2A2;
	margin: auto;
	border: none;
	border-radius: 0;
  }
  .land-btn-box>p{
    font-family: PingFangSC-Regular;
    font-size: 32upx;
    color: #FFFFFF;
    letter-spacing: 0;
    text-align: center;
   line-height: 90upx;
    background: #02C2A2;
	border-radius: 0;
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
