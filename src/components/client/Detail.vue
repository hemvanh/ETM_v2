<template>
  <q-modal content-classes="bg-grey-9" :no-backdrop-dismiss="true" :no-esc-dismiss="true" v-model="$store.state.mClient.isDetailShown" :content-css="{minWidth: '70vw', minHeight: '70vh'}">
    <q-modal-layout>
      <q-toolbar slot="header">
        <q-btn color="warning" @click="discardChange" :disabled="isProcessing">
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
      <q-tabs color="orange" inverted no-pane-border>
        <!-- Tabs - notice slot="title" -->
        <q-tab slot="title" name="client-info" icon="event_note" default/>
        <q-tab slot="title" name="client-contact" icon="group" />
        <!-- Targets -->
        <q-tab-pane name="client-info">
          <q-field :key="field.field" v-for="field in getFields" :label-width="3" :icon="field.icon" :label="field.label" :count="255" :helper="field.desc" error-label="Some error">
            <q-input v-model="getSelectedRec[field.field]" dark color="yellow" />
          </q-field>
        </q-tab-pane>
        <q-tab-pane name="client-contact">
          <q-list link no-border>
            <q-item :key="contact.id" v-for="contact in getSelectedRec.contacts">
              <q-item-main>
                <q-item-tile color="yellow" label>{{contact.name}} ({{contact.position}})</q-item-tile>
                <q-item-tile color="green" sublabel>{{contact.tel}}</q-item-tile>
                <q-item-tile color="deep-purple-3" sublabel>{{contact.email}}</q-item-tile>
                <q-item-tile sublabel>{{contact.note}}</q-item-tile>
              </q-item-main>
            </q-item>
          </q-list>
        </q-tab-pane>
      </q-tabs>
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
    ...mapGetters('mClient', ['getSelectedRec', 'getIsAdd', 'getFields']),
  },
  methods: {
    ...mapMutations('mClient', ['discardChange', 'applyChange']),
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

