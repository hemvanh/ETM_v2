import Vue from 'vue'
import Vuex from 'vuex'

import mClient from './modules/client'
Vue.use(Vuex)

export const store = new Vuex.Store({
  modules: {
    mClient,
  },
  state: {},
  getters: {},
  mutations: {},
})
