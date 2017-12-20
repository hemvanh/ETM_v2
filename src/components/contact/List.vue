<template>
  <div>
    <q-data-table class="full-height" :data="data" :config="config" :columns="getFields" @refresh="refresh">
      <!-- Custom renderer when user selected one or more rows -->
      <span slot="selection" slot-scope="selection">
        <q-btn color="primary" @click="editRec(selection)">
          <i>edit</i>
        </q-btn>
        <q-btn color="negative" @click="deleteRec(selection)" :disabled="isDeleting">
          <i>delete</i>
        </q-btn>
      </span>
    </q-data-table>
    <pop-detail></pop-detail>
    <q-btn round color="positive" class="fixed btnAdd" @click="addRec">
      <q-icon name="add" />
    </q-btn>
  </div>
</template>

<script>
import mxGrid from '../_mixins/Grid'
import popDetail from './Detail.vue'
import {mapGetters} from 'vuex'
import {Toast} from 'quasar'

export default {
  components: {popDetail},
  mixins: [mxGrid],
  data: () => ({
    isDeleting: false,
    config: {
      title: '<span class="text-negative"><b>Contacts Information</b></span>',
    },
  }),
  computed: {
    ...mapGetters('mContact', ['getFields']),
  },
  methods: {
    refresh(done) {
      this.$http
        .get('/api', {
          params: {
            query: `{
            getAllContacts {
              id
              name
              tel
              email
              position
              note
            }
          }`,
          },
        })
        .then(({data}) => {
          this.data = data.getAllContacts
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
    editRec() {},
    deleteRec() {},
    addRec() {},
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
