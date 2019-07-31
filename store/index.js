import Vue from 'vue'
import Vuex from 'vuex'
import state from "./modules/state.js"
import mutations from "./modules/mutations.js"
import actions from "./modules/actions.js"
import getters from "./modules/getters.js"
Vue.use(Vuex)

const store = new Vuex.Store({
	actions,
	getters,
	state,
	mutations
})

export default store
