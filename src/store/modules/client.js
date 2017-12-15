import _ from 'lodash'

const state = {
  isDetailShown: false,
  isAdd: false,
  selectedClient: {},
  backupClient: {},
}

const getters = {
  getSelectedClient: state => {
    return state.selectedClient
  },
  getIsAdd: state => {
    return state.isAdd
  },
}

const mutations = {
  setIsAdd: (state, payload) => {
    state.isAdd = payload
  },
  setSelectedClient: (state, payload) => {
    if (_.isEmpty(payload)) {
      // set the detail popup clean when Adding a new Client
      state.selectedClient = {}
      return
    }
    state.selectedClient = payload.rows[0].data
    state.backupClient = _.clone(payload.rows[0].data)
  },
  discardClientChange: state => {
    _.extend(state.selectedClient, state.backupClient)
    state.isDetailShown = false
  },
  applyClientChange: (state, payload) => {
    _.extend(state.selectedClient, payload)
    state.isDetailShown = false
  },
  showDetail: (state, payload) => {
    state.isDetailShown = payload
  },
}

export default {
  state,
  getters,
  mutations,
}
