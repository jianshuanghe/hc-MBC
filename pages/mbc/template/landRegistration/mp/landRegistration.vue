<template>
  <view class="landRegistration-content">
    <view class="landRegistration">
      <view class="phone-passWord-LR">
        <!--账号登陆-->
        <view class="passWord-LR">
          <view class="top-PWLR">
            <image :src="logo" alt="" class=""></image>
          </view>
        </view>
        <!--登录按钮-->
        <view class="landBtn">
          <view class="">
            <!--登录-->
            <!-- <view class="land-btn-box" @tap="clickMpLand">
              <p class="">登录</p>
            </vie -->
			<!-- <button open-type='getUserInfo' bindgetuserinfo="bindGetUserInfo" class="land-btn-box">登录</button> -->
			<!-- #ifdef MP-WEIXIN -->  
			<button  open-type="getUserInfo" withCredentials="true" lang="zh_CN" @getuserinfo="getPhoneNumber" class="land-btn-box">登录</button> 
			<!-- #endif -->  
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
    import logo from '@/static/mbcImg//landRegistration/logo.png';

    export default {
        name: '',
        components: {
        },
        data () {
          return {
            logo: logo
          };
        },
        created () {
        },
        mounted () {
          console.log(this.api2, '全局数据');
        },
        methods: {
			bindGetUserInfo: function(e) {    
                console.log(e); 
            },
			getPhoneNumber: function(e) {    
                console.log(e);    
                if (e.detail.errMsg == 'getPhoneNumber:fail user deny') {    
                    console.log('用户拒绝提供手机号');  
                } else {    
                    console.log('用户同意提供手机号');
					let evData = JSON.stringify(e.detail.encryptedData);
					let evIv = JSON.stringify(e.detail.iv); 
					this.mpWxLand(evData, evIv);
                }    

            },
			clickMpLand () {
				uni.showLoading({ // 展示loading
					title: '登陆中···'
				});  
				console.log('触发小程序登录');
				// #ifdef MP-WEIXIN
					this.mpWxLand();
				// #endif
				// #ifdef MP-TOUTIAO
					this.mpTtLand();
				// #endif
				// #ifdef  MP-BAIDU
					this.mpBdLand();
				// #endif
				// #ifdef MP-ALIPAY
					this.mpApLand();
				// #endif
			},
			mpWxLand (evData, evIv) {
				console.log('微信小程序登录');
				uni.showLoading({ // 展示loading
					title: '登陆中···'
				});
				let _this = this;
				uni.login({ // 授权登录 静默
					provider: 'weixin',
					scopes: 'auth_base',
					success: function (loginRes) {
						console.log(loginRes, '微信返回的code');
						uni.getUserInfo({ // 拉取用户信息
							provider: 'weixin',
							success: function (user) {
								console.log(user, '拉取到的用户信息');
								let params = { // 登录参数
									code: loginRes.code,
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
					}
				});  
			},
			mpTtLand () {
				console.log('头条小程序登录');
				uni.login({
					provider: 'toutiao',
					success: function (loginRes) {
						console.log(loginRes.authResult);
					}
				});		  
			},
			mpBdLand () {
				console.log('百度小程序登录');
				uni.login({
					provider: 'baidu',
					success: function (loginRes) {
						console.log(loginRes.authResult);
					}
				});		  
			},
			mpApLand () {
				console.log('支付宝小程序登录');
				uni.login({
					provider: 'alipay',
					success: function (loginRes) {
						console.log(loginRes.authResult);
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
							uni.setStorageSync('UserData', JSON.stringify(UserData)); // 缓存用户信息
							uni.showToast({
								title: '登陆成功',
								icon: 'none',
								duration: 500
							});
							uni.navigateBack({delta: 1});
							setTimeout(() => {
								uni.reLaunch({
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
  .top-PWLR>image{
    position: relative;
    width: 100%;
	height: 84upx;
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
	margin-top: 30vw;
	font-size: 4.266vw;
	color: #FFFFFF;
	letter-spacing: 0;
	text-align: center;
	line-height: 12vw;
	background: #02C2A2;
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
