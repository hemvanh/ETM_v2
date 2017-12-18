<template>
  <q-modal content-classes="bg-grey-9" :no-backdrop-dismiss="true" :no-esc-dismiss="true" v-model="$store.state.mClient.isDetailShown" ref="popDetail" :content-css="{minWidth: '70vw', minHeight: '70vh'}">
    <q-modal-layout>
      <q-toolbar slot="header">
        <q-btn color="warning" @click="discardClientChange" :disabled="isProcessing">
          <q-icon name="block" /> Discard
        </q-btn>
        <q-btn color="positive" @click="updateSelectedClient">
          <q-icon :name="getIsAdd?'add':'save'" /> {{getIsAdd?"Add":"Save"}}
          <span slot="loading">
            <q-spinner-hourglass class="on-left" /> {{getIsAdd?"Adding...":" Saving..."}}
          </span>
        </q-btn>
        <q-toolbar-title>
          Client Detail
        </q-toolbar-title>
      </q-toolbar>
      <div style="padding: 15px">
        <q-field :key="field.field" v-for="field in getFields" :label-width="3" :icon="field.icon" :label="field.label" :count="255" :helper="field.desc" error-label="Some error">
          <q-input v-model="getSelectedClient[field.field]" dark color="yellow" />
        </q-field>
      </div>
    </q-modal-layout>
  </q-modal>
</template>

<script>
import {mapGetters, mapMutations} from 'vuex'
import {Toast} from 'quasar'

export default {
  data: () => ({
    isProcessing: false,
  }),
  computed: {
    ...mapGetters(['getSelectedClient', 'getIsAdd', 'getFields']),
  },
  methods: {
    ...mapMutations(['discardClientChange', 'applyClientChange']),
    updateSelectedClient(e, done) {
      this.isProcessing = true
      let query = `
        mutation ($input: ClientInput) {
          saveClient(input: $input) {
            id
            code
            name
            tax_code
            invoice_addr
            delivery_addr
            tel
            fax
          }
        }`
      let variables = {input: this.getSelectedClient}
      this.$http({
        method: 'post',
        url: '/api',
        headers: {'Content-Type': 'application/json'},
        data: JSON.stringify({query, variables}),
      })
        .then(({data}) => {
          this.isProcessing = false
          this.applyClientChange(data.saveClient)
        })
        .catch(err => {
          this.isProcessing = false
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

<<style>
.q-toolbar .q-btn{
  padding: 0 13px
}
</style>

