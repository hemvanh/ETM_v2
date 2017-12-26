import Vue from 'vue'
import Vuex from 'vuex'

import mClient from './modules/client'
import mContact from './modules/contact'
Vue.use(Vuex)

export const store = new Vuex.Store({
  modules: {
    mClient,
    mContact,
  },
  state: {},
  getters: {},
  mutations: {},
})
