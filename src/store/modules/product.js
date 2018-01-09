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
      label: 'Name',
      field: 'name',
      filter: true,
      sort: true,
      type: 'string',
      icon: 'book',
    },
    {
      label: 'Brand Name',
      field: 'brand_name',
      filter: true,
      sort: true,
      type: 'string',
      icon: 'branding_watermark',
    },
    {
      label: 'Model',
      field: 'model',
      filter: true,
      sort: true,
      type: 'string',
      icon: 'assignment_ind',
    },
    {
      label: 'Specifications',
      isMultiline: true,
      field: 'specs',
      filter: true,
      type: 'string',
      icon: 'build',
    },
    {
      label: 'Buying Price',
      field: 'buy',
      sort: true,
      type: 'string',
      icon: 'monetization_on',
    },
    {
      label: 'Selling Price',
      field: 'sell',
      sort: true,
      type: 'string',
      icon: 'attach_money',
    },
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
      getAllProducts {
        id
        name
        brand_name
        model
        specs
        buy
        sell
        suppliers {
          id
          code
          name
          tax_code
          invoice_addr
          tel
          fax
        }
        docs {
          id
          name
          link
        }
      }
    }`)
      .then(({data}) => {
        commit('setRecs', data.getAllProducts)
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
      `mutation ($input: ProductInput) {
        saveProduct(input: $input) {
          id
          name
          brand_name
          model
          specs
          buy
          sell
        }
      }`
    )
      .then(({data}) => {
        commit('setIsProcessing', false)
        commit('applyChange', data.saveProduct)
      })
      .catch(err => {
        commit('setIsProcessing', false)
        _alert(err, 'negative')
        done()
      })
  },
  deleteRec({commit, getters}, selection) {
    commit('setIsDeleting', true)
    let ids = Array.from(selection.rows, product => product.data.id)
    _post(
      ids,
      `
      mutation ($input: [Int]) {
        deleteProduct(input: $input)
      }`
    ).then(({data}) => {
      commit('setIsDeleting', false)
      _alert(data.deleteProduct + ' product(s) deleted', 'info')
      _.remove(getters.getRecs, product => {
        return ids.includes(product.id)
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
