import Vue from 'vue'
import Vuex from 'vuex'
import _ from 'lodash'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    isDetailShown: false,
    selectedClient: {},
    backupClient: {},
  },
  getters: {
    getSelectedClient: state => {
      return state.selectedClient
    },
  },
  mutations: {
    setSelectedClient: (state, payload) => {
      state.selectedClient = payload.rows[0].data
      state.backupClient = _.clone(payload.rows[0].data)
    },
    discardClientChange: state => {
      _.extend(state.selectedClient, state.backupClient)
      state.isDetailShown = false
    },
    showDetail: (state, payload) => {
      state.isDetailShown = payload
    },
  },
})
