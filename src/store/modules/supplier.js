const state = {
  fields: [
    {
      label: 'Code',
      field: 'code',
      filter: true,
      sort: true,
      width: '150px',
    },
    {
      label: 'Name',
      field: 'name',
      filter: true,
      sort: true,
      width: '150px',
    },
  ],
}
const getters = {
  getFields: state => state.fields,
}

export default {
  namespaced: true,
  state,
  getters,
}
