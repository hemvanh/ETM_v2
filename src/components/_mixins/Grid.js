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
    }
  },
}
