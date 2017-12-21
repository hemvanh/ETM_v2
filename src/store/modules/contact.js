import _ from 'lodash'
import {_ax, _alert} from '../../libs/util'

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
      icon: 'email',
    },
    {
      label: 'Position',
      field: 'position',
      filter: true,
      type: 'string',
      icon: 'work',
      desc: 'Chức vụ',
    },
    {
      label: 'Note',
      field: 'note',
      filter: true,
      type: 'string',
      icon: 'note',
      desc: 'Ghi chú thêm',
    },
  ],
  isDetailShown: false,
  isAdd: false,
  selectedRec: {},
  backupRec: {},
  recs: [],
  isProcessing: false,
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
  getIsProcessing: state => {
    return state.isProcessing
  },
}

const mutations = {
  setIsAdd: (state, payload) => {
    state.isAdd = payload
  },
  setIsProcessing: (state, payload) => {
    state.isProcessing = payload
  },
  setRecs: (state, payload) => {
    state.recs = payload
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
  fetchRecs: ({commit, getters}, done) => {
    // done is passed from @refresh="fetchRecs" of Contact q-data-table
    _ax
      .get('/api', {
        params: {
          query: `{
          getAllContacts {
            id
            name
            tel
            email
            position
            note
            clientId
          }
        }`,
        },
      })
      .then(({data}) => {
        commit('setRecs', data.getAllContacts)
        done()
      })
      .catch(err => {
        _alert(err, 'negative')
        done()
      })
  },
  updateSelectedRec: ({commit, getters}, done) => {
    commit('setIsProcessing', true)
    let query = `
      mutation ($input: ContactInput) {
        saveContact(input: $input) {
          id
          name
          tel
          email
          position
          note
          clientId
        }
      }`
    let variables = {input: getters.getSelectedRec}
    _ax({
      method: 'post',
      url: '/api',
      headers: {'Content-Type': 'application/json'},
      data: JSON.stringify({query, variables}),
    })
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
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
}
