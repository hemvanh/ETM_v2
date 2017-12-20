<template>
  <div>
    <q-data-table class="full-height" :data="data" :config="config" :columns="getFields" @refresh="refresh">
      <!-- Custom renderer when user selected one or more rows -->
      <span slot="selection" slot-scope="selection">
        <q-btn color="primary" @click="editContact(selection)">
          <i>edit</i>
        </q-btn>
        <q-btn color="negative" @click="deleteContact(selection)" :disabled="isDeleting">
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
    isDeleting: false,
  }),
  computed: {
    ...mapGetters('mContact', ['getFields']),
  },
  methods: {
    refresh() {},
    editContact() {},
    deleteContact() {},
  },
}
</script>
