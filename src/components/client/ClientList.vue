<template>
  <div>
    <q-data-table class="full-height" :data="tableData" :config="config" :columns="columns" @refresh="refresh">
      <!-- Custom renderer when user selected one or more rows -->
      <span slot="selection" slot-scope="selection">
        <q-btn color="primary" @click="editClient(selection)">
          <i>edit</i>
        </q-btn>
        <q-btn color="negative" @click="deleteClient(selection)" :disabled="isDeleting">
          <i>delete</i>
        </q-btn>
      </span>
    </q-data-table>
    <client-detail></client-detail>
    <q-btn round color="positive" class="fixed btnAdd" @click="addClient">
      <q-icon name="add" />
    </q-btn>
  </div>
</template>
<script>
import mxGrid from '../_mixins/Grid'
import clientDetail from './ClientDetail.vue'
import {mapMutations} from 'vuex'
import {Toast} from 'quasar'
import _ from 'lodash'
export default {
  components: {
    clientDetail,
  },
  mixins: [mxGrid],
  computed: {
    tableData() {
      return this.data
    },
  },
  data() {
    return {
      isDeleting: false,
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
    ...mapMutations(['setSelectedClient', 'showDetail', 'setIsAdd']),
    editClient(client) {
      this.setSelectedClient(client)
      this.showDetail(true)
      this.setIsAdd(false)
    },
    addClient() {
      this.setSelectedClient()
      this.showDetail(true)
      this.setIsAdd(true)
    },
    deleteClient(selection) {
      this.isDeleting = true
      let ids = Array.from(selection.rows, client => client.data.id)
      let query = `
        mutation ($ids: [Int]) {
          deleteClient(ids: $ids)
        }`
      let variables = {ids}
      this.$http({
        method: 'post',
        url: '/api',
        headers: {'Content-Type': 'application/json'},
        data: JSON.stringify({query, variables}),
      }).then(({data}) => {
        this.isDeleting = false
        Toast.create.info({
          html: data.deleteClient + ' client(s) deleted',
          timeout: 2000,
        })
        _.remove(this.data, client => {
          return ids.includes(client.id)
        })
        console.log(this.data)
      })
    },
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
          Toast.create.negative({
            html: err.toString(),
            timeout: 2000,
          })
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

/* @media (max-width: 600px) {
  .btnAdd {
    right: 20px !important;
    bottom: 100px !important;
  }
} */
.btnAdd {
  right: 25px;
  bottom: 92px;
}
</style>

