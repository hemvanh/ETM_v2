<template>
  <q-data-table ref="grdClient" class="full-height" :data="data" :config="config" :columns="columns" @refresh="getAllClients">
  </q-data-table>
</template>
<script>
export default {
  methods: {
    getAllClients() {
      this.$http
        .get('/api', {
          params: {
            query: `{
            getAllClients {
              code
              name
              tax_code
              invoice_addr
              delivery_addr
              tel
              fax
            }
          }`,
          },
        })
        .then(({data}) => {
          this.$refs.grdClient.refresh(false)
          this.data = data.getAllClients
        })
    },
  },
  data() {
    return {
      data: [],
      config: {
        rowHeight: '38px',
        title: '<span class="text-negative"><b>Clients List</b></span>',
        noHeader: false,
        refresh: true,
        columnPicker: true,
        // Height auto-resizing
        bodyStyle: {
          height: 'calc(100vh - 272px)',
        },
        responsive: true,
        pagination: {
          rowsPerPage: 15,
          options: [5, 10, 15, 30, 50, 500],
        },
        selection: 'multiple',
        messages: {
          noData: '<i>warning</i> No data available to show.',
          noDataAfterFiltering: 'No results. Please refine your search terms.',
        },
        labels: {
          columns: 'Columns',
          allCols: 'All Fields',
          rows: 'Rows',
          selected: {
            singular: 'Client selected.',
            plural: 'Clients selected.',
          },
          clear: 'clear',
          search: 'Search',
          all: 'All',
        },
      },
      columns: [
        {label: 'Code', field: 'code', width: '75px', filter: true, sort: true, type: 'string'},
        {label: 'Name', field: 'name', filter: true, sort: true, type: 'string'},
        {label: 'Tax Code', field: 'tax_code', width: '100px', filter: true, sort: true, type: 'string'},
        {label: 'Address', field: 'invoice_addr', filter: true, sort: true, type: 'string'},
        {label: 'Delivery', field: 'delivery_addr', filter: true, sort: true, type: 'string'},
        {label: 'Tel', field: 'tel', width: '120px', filter: true, sort: true, type: 'string'},
        {label: 'Fax', field: 'fax', width: '120px', filter: true, sort: true, type: 'string'},
      ],
    }
  },
}
</script>
