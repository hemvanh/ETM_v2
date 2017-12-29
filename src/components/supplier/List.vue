<template>
  <div>
    <q-data-table :data="table" :config="config" :columns="getFields" @refresh="refresh">
      <!-- Custom renderer for "message" column -->
      <template slot="col-message" scope="cell">
        <span class="light-paragraph">{{cell.data}}</span>
      </template>
      <!-- Custom renderer for "source" column -->
      <template slot="col-source" scope="cell">
        <span v-if="cell.data === 'Audit'" class="label text-white bg-primary">
          Audit
          <q-tooltip>Some data</q-tooltip>
        </span>
        <span v-else class="label text-white bg-negative">{{cell.data}}</span>
      </template>
      <!-- Custom renderer for "action" column with button for custom action -->
      <template slot='col-action' scope='cell'>
        <q-btn color="primary" @click='doSomethingMethod(cell.row.id)'>View</q-btn>
      </template>
      <!-- Custom renderer when user selected one or more rows -->
      <template slot="selection" scope="selection">
        <q-btn color="primary" @click="changeMessage(selection)">
          <i>edit</i>
        </q-btn>
        <q-btn color="primary" @click="deleteRow(selection)">
          <i>delete</i>
        </q-btn>
      </template>
    </q-data-table>
  </div>
</template>

<script>
import mxGrid from '../_mixins/Grid'
import {mapGetters} from 'vuex'

export default {
  mixins: [mxGrid],
  data: () => ({
    config: {
      title: '<span class="form-label text-white bg-negative"><b>Suppliers Information</b></span>',
    },
    table: [],
    columns: [],
  }),
  computed: {
    ...mapGetters('mSupplier', ['getFields']),
  },
  methods: {
    refresh() {},
  },
}
</script>

<style>
.form-label {
  width: 100%;
  padding: 5px;
  text-align: center;
  border-radius: 10px;
  display: inline-block;
}
</style>
