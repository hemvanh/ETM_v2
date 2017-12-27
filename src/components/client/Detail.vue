<template>
  <q-modal content-classes="bg-grey-9" :no-backdrop-dismiss="true" :no-esc-dismiss="true" v-model="$store.state.mClient.isDetailShown" :content-css="{minWidth: '70vw', minHeight: '70vh'}">
    <q-modal-layout>
      <q-toolbar slot="header">
        <q-btn color="warning" @click="discardChange" :disabled="getIsProcessing">
          <q-icon name="block" /> Discard
        </q-btn>
        <q-btn color="positive" @click="save">
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
          <q-field :key="field.field" v-for="field in getFields" v-if="!field.detailHidden" :label-width="3" :icon="field.icon" :label="field.label" :count="255" :helper="field.desc" error-label="Some error">
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
import {mapGetters, mapMutations, mapActions} from 'vuex'

export default {
  computed: {
    ...mapGetters('mClient', ['getSelectedRec', 'getIsAdd', 'getFields', 'getIsProcessing']),
  },
  methods: {
    ...mapMutations('mClient', ['discardChange']),
    ...mapActions('mClient', ['updateSelectedRec']),
    save(_, done) {
      this.updateSelectedRec(done)
    },
  },
}
</script>

<<style>
.q-toolbar .q-btn{
  padding: 0 13px
}
</style>

