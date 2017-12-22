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

export default {
  components: {popDetail},
  mixins: [mxGrid],
  data: () => ({
    config: {
      title: '<span class="text-negative"><b>Contacts Information</b></span>',
    },
  }),
  computed: {
    ...mapGetters('mContact', ['getFields', 'getRecs', 'getIsDeleting']),
  },
  methods: {
    ...mapActions('mContact', ['fetchRecs', 'popEdit', 'popAdd', 'deleteRec']),
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
