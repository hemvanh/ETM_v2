<template>
  <div>
    <q-data-table class="full-height" :data="data" :config="config" :columns="columns" @refresh="refresh">
      <!-- Custom renderer when user selected one or more rows -->
      <span slot="selection" slot-scope="selection">
        <q-btn color="primary" @click="editClient(selection)">
          <i>edit</i>
        </q-btn>
        <q-btn color="negative" @click="deleteClient(selection)">
          <i>delete</i>
        </q-btn>
      </span>
    </q-data-table>
    <client-detail></client-detail>
  </div>
</template>
<script>
import mxGrid from '../_mixins/Grid'
import clientDetail from './ClientDetail.vue'
import {mapMutations} from 'vuex'
export default {
  components: {
    clientDetail,
  },
  mixins: [mxGrid],
  data() {
    return {
      config: {
        title: '<span class="text-negative"><b>Clients Information</b></span>',
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
  methods: {
    ...mapMutations(['setSelectedClient', 'showDetail']),
    editClient(client) {
      this.setSelectedClient(client)
      this.showDetail(true)
    },
    deleteClient() {},
    refresh(done) {
      this.$http
        .get('/api', {
          params: {
            query: `{
            getAllClients {
              id
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
          this.data = data.getAllClients
          done()
        })
        .catch(err => {
          alert(err)
          done()
        })
    },
  },
}
</script>

<style>
/* fix Edit/Delete row button shrinking */
@media (max-width: 767px) {
  .q-data-table-toolbar .q-btn {
    padding: 0 16px;
  }
}

/* fix paging footer increase padding at @media(max-width: 767px) */
.q-data-table-toolbar {
  padding: 0.25rem 0.5rem !important;
  font-weight: 300;
}

/* fix grid height at smallest screen-size */
.q-data-table-body {
  overflow: auto;
  height: calc(100vh - 272px) !important;
}
</style>

