<template>
  <q-modal content-classes="bg-grey-9" :no-backdrop-dismiss="true" :no-esc-dismiss="true" v-model="$store.state.mContact.isDetailShown" :content-css="{minWidth: '70vw', minHeight: '70vh'}">
    <q-modal-layout>
      <q-toolbar slot="header">
        <q-btn color="warning" @click="discardChange" :disabled="isProcessing">
          <q-icon name="block" /> Discard
        </q-btn>
        <q-btn color="positive" @click="updateSelectedRec">
          <q-icon :name="getIsAdd?'add':'save'" /> {{getIsAdd?"Add":"Save"}}
          <span slot="loading">
            <q-spinner-hourglass class="on-left" /> {{getIsAdd?"Adding...":" Saving..."}}
          </span>
        </q-btn>
        <q-toolbar-title>
          Contact Detail
        </q-toolbar-title>
      </q-toolbar>
      <div style="padding: 0 15px">
        <q-field icon="face" :label-width="3" label="Client">
          <q-select filter v-model="getSelectedRec.clientId" float-label="Tìm thông tin Khách Hàng ..." radio :options="clientList" dark color="red" />
        </q-field>
        <!-- <q-field :key="field.field" v-for="field in getFields" label-width="3" :icon="field.icon" :label="field.label" :helper="field.desc" error-label="Some error"> -->
        <q-field :key="field.field" v-for="field in getFields" :label-width="3" :icon="field.icon" :label="field.label">
          <q-input v-model="getSelectedRec[field.field]" dark color="yellow" />
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
    clientList: [
      {
        value: 1, // The value given, when selected
        label: 'Romania', // The value displayed as main label for this suggested selection
        sublabel: 'Continent: Europe', // optional
        stamp: '18 mil', // optional
      },
      {
        value: 2, // The value given, when selected
        label: 'Lollipop', // The value displayed as main label for this suggested selection
        sublabel: 'Continent: Europe', // optional
        stamp: '18 mil', // optional
      },
      {
        value: 3, // The value given, when selected
        label: 'Morning', // The value displayed as main label for this suggested selection
        sublabel: 'Continent: Europe', // optional
        stamp: '18 mil', // optional
      },
    ],
  }),
  computed: {
    ...mapGetters('mContact', ['getSelectedRec', 'getIsAdd', 'getFields']),
  },
  methods: {
    ...mapMutations('mContact', ['discardChange', 'applyChange']),
    updateSelectedRec(e, done) {
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
      let variables = {input: this.getSelectedRec}
      this.$http({
        method: 'post',
        url: '/api',
        headers: {'Content-Type': 'application/json'},
        data: JSON.stringify({query, variables}),
      })
        .then(({data}) => {
          this.isProcessing = false
          this.applyChange(data.saveClient)
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

