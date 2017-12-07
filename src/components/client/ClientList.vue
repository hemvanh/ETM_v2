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
      console.log('refresh')
    },
  },
  data() {
    return {
      config: {
        // [REQUIRED] Set the row height
        rowHeight: '38px',
        // (optional) Title to display
        title: 'Clients List',
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
            singular: 'item selected.',
            plural: 'items selected.',
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
      table: [
        {
          client_id: 3,
          client_code: 'HS_03',
          client_name: 'Công Ty TNHH Hyosung Việt Nam',
          client_tax_code: '3600890952',
          client_invoice_addr: 'Đường N2, khu Công Nghiệp Nhơn Trạch 5, huyện Nhơn Trạch, tỉnh Đồng Nai',
          client_delivery_addr: 'Đường N2, khu Công Nghiệp Nhơn Trạch 5, huyện Nhơn Trạch, tỉnh Đồng Nai',
          client_tel: '061-3569-454~747',
          client_fax: '061-3569-229',
        },
        {
          client_id: 4,
          client_code: 'MS_04',
          client_name: 'Công ty Cổ phần Maruichi Sun Steel',
          client_tax_code: '3700236207',
          client_invoice_addr: 'ĐT743, Khu phố Đông Tác, Phường Tân Đông Hiệp, Thị xã Dĩ An, Tỉnh Bình Dương',
          client_delivery_addr: 'ĐT743, Khu phố Đông Tác, Phường Tân Đông Hiệp, Thị xã Dĩ An, Tỉnh Bình Dương',
          client_tel: '0650-3742777',
          client_fax: '0650-3742223',
        },
        {
          client_id: 6,
          client_code: 'SR_06',
          client_name: 'Công ty TNHH Sopura Đông Nam Á',
          client_tax_code: '390110236',
          client_invoice_addr: 'Lô 24, Khu CX & CN Linh Trung III, Xã An Tịnh, huyện Trảng Bàng, Tây Ninh',
          client_delivery_addr: 'Lô 24, Khu CX & CN Linh Trung III, Xã An Tịnh, huyện Trảng Bàng, Tây Ninh',
          client_tel: '0913861018',
          client_fax: '',
        },
        {
          client_id: 10,
          client_code: 'KTD_10',
          client_name: 'Công ty TNHH Kim Thanh Duy',
          client_tax_code: '3700908829',
          client_invoice_addr: 'Đường ĐH407, Khu phố Tân Long, Phường Tân Hiệp, Thị xã Tân Uyên, tỉnh Bình Dương',
          client_delivery_addr: 'Đường ĐH407, Khu phố Tân Long, Phường Tân Hiệp, Thị xã Tân Uyên, tỉnh Bình Dương',
          client_tel: '',
          client_fax: '',
        },
        {
          client_id: 11,
          client_code: 'PT_11',
          client_name: 'CÔNG TY TNHH SẢN XUẤT-THƯƠNG MẠI PHẠM THU',
          client_tax_code: '0301624280',
          client_invoice_addr: '14/6 tổ 6, ấp Thới Tây 1, xã Tân Hiệp, huyện Hóc môn, TP.HCM',
          client_delivery_addr: '14/6 tổ 6, ấp Thới Tây 1, xã Tân Hiệp, huyện Hóc môn, TP.HCM',
          client_tel: '',
          client_fax: '',
        },
        {
          client_id: 12,
          client_code: 'ST_12',
          client_name: 'Công ty TNHH Srithai (Việt Nam)',
          client_tax_code: '3700255640',
          client_invoice_addr:
            'Số 9 đường số 2, KCN Sóng Thần 1, Phường Dĩ An, Thị xã Dĩ An, tỉnh Bình Dương, Việt Nam',
          client_delivery_addr:
            'Số 9 đường số 2, KCN Sóng Thần 1, Phường Dĩ An, Thị xã Dĩ An, tỉnh Bình Dương, Việt Nam',
          client_tel: '',
          client_fax: '',
        },
        {
          client_id: 13,
          client_code: 'AC_13',
          client_name: 'Công ty Cổ phần Bao Bì Á Châu',
          client_tax_code: '1100604134',
          client_invoice_addr: 'Cụm Công nghiệp nhựa Đức Hòa Hạ, huyện Đức Hóa, Long An',
          client_delivery_addr: 'Cụm Công nghiệp nhựa Đức Hòa Hạ, huyện Đức Hóa, Long An',
          client_tel: '090 231 1667',
          client_fax: '',
        },
        {
          client_id: 14,
          client_code: 'KP_14',
          client_name: 'Công ty TNHH Kleen-Pak Industries (Việt Nam)',
          client_tax_code: '3702272793',
          client_invoice_addr: 'Số 7, Lô CN6, Đường H1, KCN Kim Huy, TP. Thủ Dầu Một, Bình Dương',
          client_delivery_addr: 'Số 7, Lô CN6, Đường H1, KCN Kim Huy, TP. Thủ Dầu Một, Bình Dương',
          client_tel: '0650-3881288',
          client_fax: '0650-3881488',
        },
        {
          client_id: 121,
          client_code: 'KT_01',
          client_name: 'CÔNG TY TNHH KUANGTAI (VIỆT NAM)',
          client_tax_code: '3600645037',
          client_invoice_addr: 'Khu Công nghiệp Nhơn Trạch 3, huyện Nhơn Trạch, tỉnh Đồng Nai',
          client_delivery_addr: 'Khu Công nghiệp Nhơn Trạch 3, huyện Nhơn Trạch, tỉnh Đồng Nai',
          client_tel: null,
          client_fax: '061 3560 243',
        },
        {
          client_id: 122,
          client_code: 'RB_02',
          client_name: 'CÔNG TY TNHH RIVERBANK VIỆT NAM',
          client_tax_code: '3500789892',
          client_invoice_addr: 'Khu Công nghiệp Mỹ Xuân A, Huyện Tân Thành, tỉnh Bà Rịa Vũng Tàu',
          client_delivery_addr: 'Khu Công nghiệp Mỹ Xuân A, Huyện Tân Thành, tỉnh Bà Rịa Vũng Tàu',
          client_tel: null,
          client_fax: null,
        },
        {
          client_id: 123,
          client_code: 'KMW_05',
          client_name: 'CÔNG TY TNHH K.M.W VIỆT NAM',
          client_tax_code: '3700912984',
          client_invoice_addr: 'Lô 9-2, CCN Thành phố Đẹp, KP. Ông Đông, P. Tân Hiệp, Thị xã Tân Uyên, Tỉnh Bình Dương',
          client_delivery_addr:
            'Lô 9-2, CCN Thành phố Đẹp, KP. Ông Đông, P. Tân Hiệp, Thị xã Tân Uyên, Tỉnh Bình Dương',
          client_tel: null,
          client_fax: null,
        },
        {
          client_id: 130,
          client_code: 'FM_15',
          client_name: 'CÔNG TY TNHH FRAMAS VIỆT NAM',
          client_tax_code: '3700362748',
          client_invoice_addr: 'Số 9, Đường 12, Khu Công Nghiệp Sóng Thần 2, H. Dĩ An, tỉnh Bình Dương',
          client_delivery_addr: 'Số 9, Đường 12, Khu Công Nghiệp Sóng Thần 2, H. Dĩ An, tỉnh Bình Dương',
          client_tel: '+84 6503790761',
          client_fax: '',
        },
        {
          client_id: 131,
          client_code: 'TP_16',
          client_name: 'CÔNG TY CỔ PHẦN THƯƠNG MẠI VÀ GIẢI PHÁP KỸ THUẬT TRƯỜNG PHÁT',
          client_tax_code: '010 501 7353',
          client_invoice_addr: 'Số nhà 5, ngách 61/124 đường Nguyễn Hoàng Tôn, P. Phú Thượng, Q. Tây Hồ, TP. Hà Nội',
          client_delivery_addr: 'Tầng 5, số 34 Hoàng Cầu mới, Trung Liệt, Đống Đa, HN',
          client_tel: '04 3538 1441',
          client_fax: '',
        },
        {
          client_id: 138,
          client_code: 'BT_08',
          client_name: 'CÔNG TY TNHH SX TM HÓA KEO BÌNH THẠNH',
          client_tax_code: '3700589393',
          client_invoice_addr: 'Bình Phước B, Phường Bình Chuẩn, Thị xã Thuận An, tỉnh Bình Dương',
          client_delivery_addr: 'Bình Phước B, Phường Bình Chuẩn, Thị xã Thuận An, tỉnh Bình Dương',
          client_tel: '(0650) 3 789 991',
          client_fax: '(0650) 3789 996',
        },
        {
          client_id: 139,
          client_code: 'VC_09',
          client_name: 'CÔNG TY SỨ VIGLACERA BÌNH DƯƠNG - CHI NHÁNH TỔNG CÔNG TY VIGLACERA - CTCP',
          client_tax_code: '0100108173-017',
          client_invoice_addr: 'Khu sản xuất Tân Đông Hiệp-Phường Tân Đông Hiệp, Thị xã Dĩ An-Bình Dương',
          client_delivery_addr: 'Khu sản xuất Tân Đông Hiệp-Phường Tân Đông Hiệp, Thị xã Dĩ An-Bình Dương',
          client_tel: '0650-3710801',
          client_fax: '0650-3710334',
        },
        {
          client_id: 141,
          client_code: 'FMS_17',
          client_name: 'CÔNG TY TNHH SX LINH KIỆN CƠ KHÍ FORMOSA',
          client_tax_code: '1100727697',
          client_invoice_addr: 'Khu Công nghiệp Mỹ Xuân A, Huyện Tân Thành, tỉnh Bà Rịa Vũng Tàu',
          client_delivery_addr: 'Khu Công nghiệp Mỹ Xuân A, Huyện Tân Thành, tỉnh Bà Rịa Vũng Tàu',
          client_tel: '0643932099/932077',
          client_fax: '(84-643) 932 277',
        },
        {
          client_id: 152,
          client_code: 'THP_07',
          client_name: 'CÔNG TY TNHH THÁI HÒA PHÚ',
          client_tax_code: '4201387731',
          client_invoice_addr: '92 Trần Phú, Phường Lộc Thọ, Thành phố Nha Trang, tỉnh Khánh Hòa',
          client_delivery_addr: '92 Trần Phú, Phường Lộc Thọ, Thành phố Nha Trang, tỉnh Khánh Hòa',
          client_tel: '',
          client_fax: '',
        },
        {
          client_id: 154,
          client_code: 'TT_18',
          client_name: 'CÔNG TY CỔ PHẦN DỆT TÂN TIẾN',
          client_tax_code: '4200340233',
          client_invoice_addr: 'Khu Bình Tân, Phường Vĩnh Nguyễn, Tp. Nha Trang, tỉnh Khánh Hòa',
          client_delivery_addr: 'Khu Bình Tân, Phường Vĩnh Nguyễn, Tp. Nha Trang, tỉnh Khánh Hòa',
          client_tel: '',
          client_fax: '',
        },
        {
          client_id: 155,
          client_code: 'SD_19',
          client_name: 'CÔNG TY CỔ PHẦN DỊCH VỤ SONADEZI',
          client_tax_code: '3600890938',
          client_invoice_addr: 'Tầng 8, Tòa nhà Sonadezi, Số 1, Đường 1, KCN Biên Hòa, TP. Biên Hòa, Tỉnh Đồng Nai',
          client_delivery_addr: 'Tầng 8, Tòa nhà Sonadezi, Số 1, Đường 1, KCN Biên Hòa, TP. Biên Hòa, Tỉnh Đồng Nai',
          client_tel: '0618.8890777/888',
          client_fax: '0618 8890199',
        },
      ],
    }
  },
}
</script>
