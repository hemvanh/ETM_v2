<template>
  <q-data-table class="full-height" :data="table" :config="config" :columns="columns" @refresh="refresh">
    <!-- Custom renderer for "message" column -->
    <span class="light-paragraph" slot="col-client_name" slot-scope="cell">{{cell.data}}</span>
    <!-- Custom renderer for "source" column -->
    <span slot="col-source" slot-scope="cell">
      <span v-if="cell.data === 'Audit'" class="label text-white bg-primary">
        Audit
        <q-tooltip>Some data</q-tooltip>
      </span>
      <span v-else class="label text-white bg-negative">{{cell.data}}</span>
    </span>
    <!-- Custom renderer for "action" column with button for custom action -->
    <q-btn slot='col-action' slot-scope='cell' color="primary" @click='doSomethingMethod(cell.row.id)'>View</q-btn>
    <!-- Custom renderer when user selected one or more rows -->
    <span slot="selection" slot-scope="selection">
      <q-btn color="primary" @click="changeMessage(selection)">
        <i>edit</i>
      </q-btn>
      <q-btn color="negative" @click="deleteRow(selection)">
        <i>delete</i>
      </q-btn>
    </span>
  </q-data-table>
</template>
<script>
export default {
  methods: {
    doSomethingMethod() {},
    changeMessage() {},
    deleteRow() {},
    refresh() {
      // console.log('refresh')
      this.$http
        .get('localhost:3000/graphql', {
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
        .then(res => {
          console.log(res)
        })
    },
  },
  data() {
    return {
      config: {
        // [REQUIRED] Set the row height
        rowHeight: '38px',
        // (optional) Title to display
        title: '<span class="text-negative"><b>Clients List</b></span>',
        // (optional) No columns header
        noHeader: false,
        // (optional) Display refresh button
        refresh: true,
        // (optional)
        // User will be able to choose which columns
        // should be displayed
        columnPicker: true,
        // (optional) How many columns from the left are sticky
        // leftStickyColumns: 0,
        // (optional) How many columns from the right are sticky
        // rightStickyColumns: 2,
        // (optional)
        // Styling the body of the data table;
        // "minHeight", "maxHeight" or "height" are important
        bodyStyle: {
          height: 'calc(100vh - 272px)',
        },
        // (optional) By default, Data Table is responsive,
        // but you can disable this by setting the property to "false"
        responsive: true,
        // (optional) Use pagination. Set how many rows per page
        // and also specify an additional optional parameter ("options")
        // which forces user to make a selection of how many rows per
        // page he wants from a specific list
        pagination: {
          rowsPerPage: 15,
          options: [5, 10, 15, 30, 50, 500],
        },
        // (optional) Select one or more rows for an action
        // "single" adds a column with radio buttons for single row selection
        // "multiple" adds a column with checkboxes for multiple row selection
        // omitting the property will result in no selection column at all
        selection: 'multiple',
        // (optional) Override default messages when no data is available
        // or the user filtering returned no results.
        messages: {
          noData: '<i>warning</i> No data available to show.',
          noDataAfterFiltering: 'No results. Please refine your search terms.',
        },
        // (optional) Override default labels. Useful for I18n.
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
        {
          label: 'Code',
          field: 'client_code',
          width: '75px',
          filter: true,
          sort: true,
          type: 'string',
        },
        {
          label: 'Name',
          field: 'client_name',
          filter: true,
          sort: true,
          type: 'string',
        },
        {
          label: 'Tax Code',
          field: 'client_tax_code',
          width: '100px',
          filter: true,
          sort: true,
          type: 'string',
        },
        {
          label: 'Address',
          field: 'client_invoice_addr',
          filter: true,
          sort: true,
          type: 'string',
        },
        {
          label: 'Delivery',
          field: 'client_delivery_addr',
          filter: true,
          sort: true,
          type: 'string',
        },
        {
          label: 'Tel',
          field: 'client_tel',
          width: '120px',
          filter: true,
          sort: true,
          type: 'string',
        },
        {
          label: 'Fax',
          field: 'client_fax',
          width: '120px',
          filter: true,
          sort: true,
          type: 'string',
        },
      ],
      table: [],
    }
  },
}
</script>
