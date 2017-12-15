import _ from 'lodash'

const state = {
  fields: [
    {
      label: 'Code',
      field: 'code',
      width: '75px',
      filter: true,
      sort: true,
      type: 'string',
      icon: 'book',
      desc: 'Mã công ty',
    },
    {
      label: 'Name',
      field: 'name',
      filter: true,
      sort: true,
      type: 'string',
      icon: 'assignment_ind',
      desc: 'Tên đăng ký Công ty',
    },
    {
      label: 'Tax Code',
      field: 'tax_code',
      width: '100px',
      filter: true,
      sort: true,
      type: 'string',
      icon: 'receipt',
      desc: 'Mã số thuế',
    },
    {
      label: 'Address',
      field: 'invoice_addr',
      filter: true,
      sort: true,
      type: 'string',
      icon: 'location_on',
      desc: 'Địa chỉ nhận hóa đơn',
    },
    {
      label: 'Delivery',
      field: 'delivery_addr',
      filter: true,
      sort: true,
      type: 'string',
      icon: 'motorcycle',
      desc: 'Địa chỉ nhận hàng',
    },
    {label: 'Tel', field: 'tel', width: '120px', filter: true, sort: true, type: 'string', icon: 'call', desc: ''},
    {label: 'Fax', field: 'fax', width: '120px', filter: true, sort: true, type: 'string', icon: 'attachment', desc: ''},
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
