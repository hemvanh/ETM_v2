<template>
  <div>
    <q-data-table class="full-height" :data="getRecs" :config="config" :columns="getFields" @refresh="fetchRecs">
      <!-- Custom renderer when user selected one or more rows -->
      <span slot="selection" slot-scope="selection">
        <q-btn color="primary" @click="popEdit(selection)">
          <i>edit</i>
        </q-btn>
        <q-btn color="negative" @click="deleteRec(selection)" :disabled="getIsDeleting">
          <i>delete</i>
        </q-btn>
      </span>
      <!-- Custom renderer for "Edit" column -->
      <q-btn round icon="edit" color="primary" small slot="col-id" slot-scope="cell" @click="edit(cell.data)" />
    </q-data-table>
    <pop-detail></pop-detail>
    <q-btn round color="positive" class="fixed btnAdd" @click="popAdd">
      <q-icon name="add" />
    </q-btn>
  </div>
</template>

<script>
import mxGrid from '../_mixins/Grid'
import popDetail from './Detail.vue'
import {mapGetters, mapActions} from 'vuex'
import _ from 'lodash'

export default {
  components: {popDetail},
  mixins: [mxGrid],
  data: () => ({
    config: {
      title:
        '<span class="form-label text-white bg-negative"><i class="q-item-icon material-icons">contact_phone</i><span>Contacts Information</span></span>',
    },
  }),
  computed: {
    ...mapGetters('mContact', ['getFields', 'getRecs', 'getIsDeleting']),
  },
  methods: {
    ...mapActions('mContact', ['fetchRecs', 'popEdit', 'popAdd', 'deleteRec']),
    edit(id) {
      this.popEdit({rows: [{data: _.find(this.getRecs, {id})}]})
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

/* styling for Edit column */
.q-btn-round.q-btn-small {
  height: 28px;
  width: 28px;
  margin-left: 3px !important;
}
.q-btn-small .q-icon {
  font-size: 18px !important;
}
.cell-edit {
  padding: 4px 0px !important;
}

/* making label text to be vertivally align with the icon  */
.form-label {
  width: 100%;
  padding: 3px;
  text-align: center;
  border-radius: 10px;
  display: inline-block;
}
.form-label span {
  display: inline-block;
  height: 24px;
  vertical-align: middle;
  padding-top: 3px;
  margin-left: 5px;
}

@media (max-width: 600px) {
  .q-btn-round.q-btn-small {
    margin-left: 8px !important;
  }
}
</style>
