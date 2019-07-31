import Vue from 'vue'
import App from './App'
import store from './store'
import {api1, api2, api3} from './static/mbcJs/api';
import {endParams} from './static/mbcJs/endParams';
import {isWeiXin} from './static/mbcJs/browserType';

Vue.config.productionTip = false

Vue.prototype.$store = store

Vue.prototype.api1 = api1
Vue.prototype.api2 = api2
Vue.prototype.api3 = api3

Vue.prototype.endParams = endParams

Vue.prototype.isWeiXin = isWeiXin

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
