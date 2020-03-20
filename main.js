import Vue from 'vue'
import App from './App'
import store from './store'
import {api1, api2, api3} from './static/mbcJs/api';
import {endParams, pathParams} from './static/mbcJs/endParams';
import {isWeiXin} from './static/mbcJs/browserType';
import {pageNums} from './static/mbcJs/pageNums';
import {dateTime} from './static/mbcJs/dateTime';
import {Static, dImg} from './static/mbcJs/static';
import {landRegistra} from './static/mbcJs/landRegistra';
import {landFail} from './static/mbcJs/landFail';
import {titleOrPathApp, shareToHome} from './static/mbcJs/shareAppTitleOrPath';
Vue.config.productionTip = false

Vue.prototype.$store = store

Vue.prototype.api1 = api1
Vue.prototype.api2 = api2
Vue.prototype.api3 = api3

Vue.prototype.endParams = endParams

Vue.prototype.pathParams = pathParams

Vue.prototype.isWeiXin = isWeiXin

Vue.prototype.pageNums = pageNums

Vue.prototype.dateTime = dateTime

Vue.prototype.Static = Static

Vue.prototype.dImg = dImg

Vue.prototype.landRegistra = landRegistra

Vue.prototype.landFail = landFail

Vue.prototype.titleOrPathApp = titleOrPathApp

Vue.prototype.shareToHome = shareToHome

Vue.prototype.APPID = ''
Vue.prototype.SECRET = ''
Vue.prototype.WX_AUTH_URL = 'https://api.weixin.qq.com/sns/jscode2session'

Vue.prototype.$backgroundAudioData = {
	playing: false,
	playTime: 0,
	formatedPlayTime: '00:00:00'
}

App.mpType = 'app'

const app = new Vue({
	store,
	...App
})
app.$mount()
