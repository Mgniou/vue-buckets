import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './actions'
import getters from './getters'

Vue.use(Vuex)

const state = {
    user: null,   //个人信息
    temp: {},   //临时数据
}

export default new Vuex.Store({
    state,
    getters,
    actions,
    mutations,
})