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
      label: 'Document Name',
      field: 'name',
      filter: true,
      sort: true,
      width: '200px',
      type: 'string',
      icon: 'assignment_ind',
    },
    {label: 'Link', field: 'link', type: 'string', icon: 'link', desc: ''},
  ],
  isDetailShown: false,
  isAdd: false,
  isProcessing: false,
  isDeleting: false,
  selectedRec: {},
  backupRec: {},
  recs: [],
  productList: [],
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
  getIsDeleting: state => {
    return state.isDeleting
  },
  getProductList: state => {
    return state.productList
  },
}

const mutations = {
  setIsAdd: (state, payload) => {
    state.isAdd = payload
  },
  setIsProcessing: (state, payload) => {
    state.isProcessing = payload
  },
  setIsDeleting: (state, payload) => {
    state.isDeleting = payload
  },
  setRecs: (state, payload) => {
    state.recs = payload
  },
  setProductList(state, payload) {
    state.productList = payload
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
  fetchRecs: ({commit, getters}, done) => {
    // done is passed from @refresh="fetchRecs" of Doc q-data-table
    _get(`{
      getAllDocs {
        id
        name
        link
        productId
      }
    }`)
      .then(({data}) => {
        commit('setRecs', data.getAllDocs)
        done()
      })
      .catch(err => {
        _alert(err, 'negative')
        done()
      })
  },
  updateSelectedRec: ({commit, getters}, done) => {
    commit('setIsProcessing', true)
    _post(
      getters.getSelectedRec,
      `mutation ($input: DocInput) {
        saveDoc(input: $input) {
          id
          name
          link
        }
      }`
    )
      .then(({data}) => {
        commit('setIsProcessing', false)
        commit('applyChange', data.saveDoc)
      })
      .catch(err => {
        commit('setIsProcessing', false)
        _alert(err, 'negative')
        done()
      })
  },
  deleteRec({commit, getters}, selection) {
    commit('setIsDeleting', true)
    let ids = Array.from(selection.rows, doc => doc.data.id)
    _post(
      ids,
      `mutation ($input: [Int]) {
      deleteDoc(input: $input)
    }`
    ).then(({data}) => {
      commit('setIsDeleting', false)
      _alert(data.deleteDoc + ' doc(s) deleted', 'info')
      _.remove(getters.getRecs, doc => {
        return ids.includes(doc.id)
      })
      // this is to re-activate the grid with new data
      // this.data = Object.assign([], this.data) --> it is ok too
      commit('setRecs', _.clone(getters.getRecs))
    })
  },
  fetchProducts({commit}) {
    _get(`{
        getAllProducts {
          value
          label
          sublabel
          stamp
        }
    }`)
      .then(({data}) => {
        commit('setProductList', data.getAllProducts)
      })
      .catch(err => {
        _alert(err, 'negative')
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
