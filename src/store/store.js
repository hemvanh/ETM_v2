import Vue from 'vue'
import Vuex from 'vuex'

import mClient from './modules/client'
import mContact from './modules/contact'
import mSupplier from './modules/supplier'
import mProduct from './modules/product'
import mDoc from './modules/doc'

Vue.use(Vuex)

export const store = new Vuex.Store({
  modules: {
    mClient,
    mContact,
    mSupplier,
    mProduct,
    mDoc,
  },
  getters: {},
  mutations: {},
})
