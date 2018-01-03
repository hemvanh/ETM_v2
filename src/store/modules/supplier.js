const state = {
  fields: [
    {
      field: 'id',
      width: '34px',
      // detailHidden: true,
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
    },
    {label: 'Tel', field: 'tel', width: '120px', filter: true, type: 'string', icon: 'call', desc: ''},
    {label: 'Fax', field: 'fax', width: '120px', filter: true, type: 'string', icon: 'attachment', desc: ''},
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
