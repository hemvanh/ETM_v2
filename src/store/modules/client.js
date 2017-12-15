import _ from 'lodash'

const state = {
  fields: [
    {label: 'Code', field: 'code', width: '75px', filter: true, sort: true, type: 'string'},
    {label: 'Name', field: 'name', filter: true, sort: true, type: 'string'},
    {label: 'Tax Code', field: 'tax_code', width: '100px', filter: true, sort: true, type: 'string'},
    {label: 'Address', field: 'invoice_addr', filter: true, sort: true, type: 'string'},
    {label: 'Delivery', field: 'delivery_addr', filter: true, sort: true, type: 'string'},
    {label: 'Tel', field: 'tel', width: '120px', filter: true, sort: true, type: 'string'},
    {label: 'Fax', field: 'fax', width: '120px', filter: true, sort: true, type: 'string'},
  ],
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
  getFields: state => {
    return state.fields
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
