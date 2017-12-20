import _ from 'lodash'

const state = {
  fields: [
    {
      label: 'Name',
      field: 'name',
      filter: true,
      sort: true,
      type: 'string',
      icon: 'assignment_ind',
      desc: 'Tên liên hệ',
    },
    {label: 'Tel', field: 'tel', width: '120px', filter: true, type: 'string', icon: 'call', desc: ''},
    {
      label: 'Email',
      field: 'email',
      width: '100px',
      filter: true,
      type: 'string',
      icon: 'receipt',
    },
    {
      label: 'Position',
      field: 'position',
      filter: true,
      type: 'string',
      icon: 'motorcycle',
      desc: 'Chức vụ',
    },
    {
      label: 'Note',
      field: 'note',
      filter: true,
      type: 'string',
      icon: 'motorcycle',
      desc: 'Ghi chú thêm',
    },
  ],
  isDetailShown: false,
  isAdd: false,
  selectedRec: {},
  backupRec: {},
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
}

const mutations = {
  setIsAdd: (state, payload) => {
    state.isAdd = payload
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

export default {
  namespaced: true,
  state,
  getters,
  mutations,
}
