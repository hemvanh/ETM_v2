<template>
  <div>
    <q-data-table :data="table" :config="config" :columns="getFields" @refresh="refresh">
      <!-- Custom renderer when user selected one or more rows -->
      <span slot="selection" slot-scope="selection">
        <q-btn color="primary" @click="popEdit(selection)">
          <i>edit</i>
        </q-btn>
        <q-btn color="primary" @click="deleteRow(selection)">
          <i>delete</i>
        </q-btn>
      </span>
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
    popEdit() {},
    deleteRow() {},
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
