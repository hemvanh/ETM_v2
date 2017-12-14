export default {
  data() {
    return {
      data: [],
      config: {
        rowHeight: '38px',
        title: '<span class="text-negative"><b>XXX</b></span>',
        noHeader: false,
        refresh: true,
        columnPicker: true,
        // Height auto-resizing
        bodyStyle: {
          // height: 'calc(100vh - 235px)',
        },
        responsive: true,
        pagination: {
          rowsPerPage: 15,
          options: [5, 10, 15, 30, 50, 500],
        },
        selection: 'multiple',
        messages: {
          noData: '<cite class="text-info">No data available to show.</cite>',
          noDataAfterFiltering: '<cite class="text-info">No results. Please refine your search terms.</cite>',
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
    }
  },
}
