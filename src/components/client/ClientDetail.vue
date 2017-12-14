<template>
  <q-modal :no-backdrop-dismiss="isProcessing" :no-esc-dismiss="isProcessing" v-model="$store.state.isDetailShown" ref="popDetail" :content-css="{minWidth: '70vw', minHeight: '70vh'}">
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
      <div class="bg-grey-9" style="padding: 15px">
        <q-field :label-width="3" icon="wifi" label="Client Code" :count="255" helper="Ma khach hang" error-label="Some error">
          <q-input v-model="getSelectedClient.code" dark color="yellow" />
        </q-field>
        <q-field :label-width="3" icon="account_circle" label="Full Name" :count="255" helper="Ten day du va chinh thuc cua cong ty." error-label="Hey, we got an error">
          <q-input v-model="getSelectedClient.name" dark color="yellow" type="textarea" :min-rows="1" />
        </q-field>
        <q-field :label-width="3" icon="wifi" label="Tax Code" :count="255" helper="Ma So Thue" error-label="Some error">
          <q-input v-model="getSelectedClient.tax_code" dark color="yellow" />
        </q-field>
        <q-field :label-width="3" icon="account_circle" label="Invoice Address" :count="255" helper="Dia chi nhan hoa don" error-label="Hey, we got an error">
          <q-input v-model="getSelectedClient.invoice_addr" dark color="yellow" type="textarea" :min-rows="1" />
        </q-field>
        <q-field :label-width="3" icon="account_circle" label="Delivery Address" :count="255" helper="Dia chi nhan hang" error-label="Hey, we got an error">
          <q-input v-model="getSelectedClient.delivery_addr" dark color="yellow" type="textarea" :min-rows="1" />
        </q-field>
        <q-field :label-width="3" icon="wifi" label="Tel No." :count="255" error-label="Some error">
          <q-input v-model="getSelectedClient.tel" dark color="yellow" />
        </q-field>
        <q-field :label-width="3" icon="wifi" label="Fax No." :count="255" error-label="Some error">
          <q-input v-model="getSelectedClient.fax" dark color="yellow" />
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
    ...mapGetters(['getSelectedClient', 'getIsAdd']),
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

