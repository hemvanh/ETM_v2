<template>
  <q-modal content-classes="bg-grey-9" :no-backdrop-dismiss="true" :no-esc-dismiss="true" v-model="$store.state.mProduct.isDetailShown" :content-css="{minWidth: '70vw', minHeight: '70vh'}">
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
          Product Detail
        </q-toolbar-title>
      </q-toolbar>
      <q-tabs color="orange" inverted no-pane-border>
        <!-- Tabs - notice slot="title" -->
        <q-tab slot="title" name="product-info" icon="event_note" default/>
        <q-tab slot="title" name="product-supplier" icon="local_library" />
        <q-tab slot="title" name="product-docs" icon="link" />
        <!-- Targets -->
        <q-tab-pane name="product-info">
          <q-field :key="field.field" v-for="field in getFields" v-if="!field.detailHidden" :label-width="3" :icon="field.icon" :label="field.label" :helper="field.desc" error-label="Some error">
            <q-input :type="field.isMultiline?'textarea':'text'" :max-height="96" v-model="getSelectedRec[field.field]" dark color="yellow" />
          </q-field>
        </q-tab-pane>
        <q-tab-pane name="product-supplier">
          <q-field icon="local_library" :label-width="2" label="Pick Suppliers...">
            <q-select dark filter multiple chips color="purple" v-model="arrSupplierIDs" :options="getSupplierList" @change="onSupplierChange" />
          </q-field>
          <q-list link no-border>
            <q-item :key="supplier.id" v-for="supplier in getSelectedRec.suppliers">
              <q-item-main>
                <q-item-tile color="yellow" label>{{supplier.name}}</q-item-tile>
                <q-item-tile color="green" sublabel>{{supplier.tel}}</q-item-tile>
                <q-item-tile sublabel>{{supplier.fax}}</q-item-tile>
              </q-item-main>
            </q-item>
          </q-list>
        </q-tab-pane>
        <q-tab-pane name="product-docs">
          <q-list link  no-border>
            <q-item @click="openLink(doc.link)" :key="doc.id" v-for="doc in getSelectedRec.docs">
              <q-item-main>
                <q-item-tile color="yellow" label>{{doc.name}}</q-item-tile>
                <q-item-tile color="green" sublabel>{{doc.link}}</q-item-tile>
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
import _ from 'lodash'
import {openURL} from 'quasar'
export default {
  mounted() {
    this.fetchSuppliers()
  },
  data() {
    return {
      arrSupplierIDs: [],
    }
  },
  computed: {
    ...mapGetters('mProduct', ['getSelectedRec', 'getIsAdd', 'getFields', 'getIsProcessing']),
    ...mapGetters('mContact', ['getSupplierList']),
  },
  watch: {
    getSelectedRec() {
      if (_.isEmpty(this.getSelectedRec) || _.isEmpty(this.getSelectedRec.suppliers)) this.arrSupplierIDs = []
      else this.arrSupplierIDs = this.getSelectedRec.suppliers.map(sup => sup.id)
    },
  },
  methods: {
    ...mapMutations('mProduct', ['discardChange']),
    ...mapActions('mProduct', ['updateSelectedRec']),
    ...mapActions('mContact', ['fetchSuppliers']),
    save(__, done) {
      this.updateSelectedRec(done)
    },
    onSupplierChange(selectedSupIDs) {
      this.getSelectedRec.suppliers = _.filter(this.getSupplierList, sup => selectedSupIDs.indexOf(sup.id) !== -1)
    },
    openLink(link) {
      openURL(link)
    },
  },
}
</script>

<<style>
.q-toolbar .q-btn {
  padding: 0 13px;
}
</style>
