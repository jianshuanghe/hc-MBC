import Vue from 'vue'
import App from './App'
import store from './store'
import {api1, api2, api3} from './static/mbcJs/api';
import {endParams} from './static/mbcJs/endParams';
import {isWeiXin} from './static/mbcJs/browserType';
import {pageNums} from './static/mbcJs/pageNums';
import {dateTime} from './static/mbcJs/dateTime';
import {Static, dImg} from './static/mbcJs/static';

Vue.config.productionTip = false

Vue.prototype.$store = store

Vue.prototype.api1 = api1
Vue.prototype.api2 = api2
Vue.prototype.api3 = api3

Vue.prototype.endParams = endParams

Vue.prototype.isWeiXin = isWeiXin

Vue.prototype.pageNums = pageNums

Vue.prototype.dateTime = dateTime

Vue.prototype.Static = Static

Vue.prototype.dImg = dImg

Vue.prototype.APPID = 'wxfe5497e8a3f7578a'
Vue.prototype.SECRET = 'e7de9721ba154902733fa00ce2aa6641'
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
