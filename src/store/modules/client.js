import _ from 'lodash'
import {_post, _get, _alert} from '../../libs/util'

const state = {
  fields: [
    {
      field: 'id',
      width: '34px',
      detailHidden: true,
      classes: 'cell-edit',
    },
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
      type: 'string',
      icon: 'receipt',
      desc: 'Mã số thuế',
    },
    {
      label: 'Address',
      field: 'invoice_addr',
      filter: true,
      type: 'string',
      icon: 'location_on',
      desc: 'Địa chỉ xuất hóa đơn',
    },
    {
      label: 'Delivery',
      field: 'delivery_addr',
      filter: true,
      colHidden: true,
      type: 'string',
      icon: 'motorcycle',
      desc: 'Địa chỉ nhận hàng',
    },
    {label: 'Tel', field: 'tel', width: '120px', filter: true, type: 'string', icon: 'call', desc: ''},
    {label: 'Fax', field: 'fax', width: '120px', filter: true, type: 'string', icon: 'attachment', desc: ''},
  ],
  isDetailShown: false,
  isAdd: false,
  isDeleting: false,
  isProcessing: false,
  selectedRec: {},
  backupRec: {},
  recs: [],
}

const getters = {
  getSelectedRec: state => {
    return state.selectedRec
  },
  getIsAdd: state => {
    return state.isAdd
  },
  getFields: state => {
    return state.fields
  },
  getRecs: state => {
    return state.recs
  },
  getIsDeleting: state => {
    return state.isDeleting
  },
  getIsProcessing: state => {
    return state.isProcessing
  },
}

const mutations = {
  setIsAdd: (state, payload) => {
    state.isAdd = payload
  },
  setRecs(state, payload) {
    state.recs = payload
  },
  setIsDeleting(state, payload) {
    state.isDeleting = payload
  },
  setIsProcessing(state, payload) {
    state.isProcessing = payload
  },
  setSelectedRec: (state, payload) => {
    if (_.isEmpty(payload)) {
      // set the detail popup clean when Adding a new Rec
      state.selectedRec = {}
      return
    }
    state.selectedRec = payload.rows[0].data
    state.backupRec = _.clone(payload.rows[0].data)
  },
  discardChange: state => {
    _.extend(state.selectedRec, state.backupRec)
    state.isDetailShown = false
  },
  applyChange: (state, payload) => {
    _.extend(state.selectedRec, payload)
    state.isDetailShown = false
  },
  showDetail: (state, payload) => {
    state.isDetailShown = payload
  },
}

const actions = {
  popEdit({commit}, rec) {
    commit('setSelectedRec', rec)
    commit('showDetail', true)
    commit('setIsAdd', false)
  },
  popAdd({commit}) {
    commit('setSelectedRec')
    commit('showDetail', true)
    commit('setIsAdd', true)
  },
  fetchRecs({commit}, done) {
    _get(`{
      getAllClients {
        id
        code
        name
        tax_code
        invoice_addr
        delivery_addr
        tel
        fax
        contacts {
          id
          name
          tel
          email
          position
          note
          clientId
        }
      }
    }`)
      .then(({data}) => {
        commit('setRecs', data.getAllClients)
        done()
      })
      .catch(err => {
        _alert(err, 'negative')
        done()
      })
  },
  updateSelectedRec({commit, getters}, done) {
    commit('setIsProcessing', true)
    _post(
      getters.getSelectedRec,
      `mutation ($input: ClientInput) {
        saveClient(input: $input) {
          id
          code
          name
          tax_code
          invoice_addr
          delivery_addr
          tel
          fax
        }
      }`
    )
      .then(({data}) => {
        commit('setIsProcessing', false)
        commit('applyChange', data.saveClient)
      })
      .catch(err => {
        commit('setIsProcessing', false)
        _alert(err, 'negative')
        done()
      })
  },
  deleteRec({commit, getters}, selection) {
    commit('setIsDeleting', true)
    let ids = Array.from(selection.rows, client => client.data.id)
    _post(
      ids,
      `
      mutation ($input: [Int]) {
        deleteClient(input: $input)
      }`
    ).then(({data}) => {
      commit('setIsDeleting', false)
      _alert(data.deleteClient + ' client(s) deleted', 'info')
      _.remove(getters.getRecs, client => {
        return ids.includes(client.id)
      })
      // this is to re-activate the grid with new data
      // this.data = Object.assign([], this.data) --> it is ok too
      commit('setRecs', _.clone(getters.getRecs))
    })
  },
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
}
