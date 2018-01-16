<template>
  <q-modal content-classes="bg-grey-9" :no-backdrop-dismiss="true" :no-esc-dismiss="true" v-model="$store.state.mDoc.isDetailShown" :content-css="{minWidth: '70vw', minHeight: '70vh'}">
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
          Document Detail
        </q-toolbar-title>
      </q-toolbar>
      <div style="padding: 0 15px">
        <q-field icon="shopping_basket" :label-width="3" label="Pick a Product">
          <q-select filter v-model="getSelectedRec.productId" radio :options="getProductList" dark color="red" />
        </q-field>
        <q-field :key="field.id" v-for="field in getFields" v-if="!field.detailHidden" :label-width="3" :icon="field.icon" :label="field.label">
          <q-input v-model="getSelectedRec[field.field]" dark color="yellow" />
        </q-field>
      </div>
    </q-modal-layout>
  </q-modal>
</template>

<script>
import {mapGetters, mapMutations, mapActions} from 'vuex'

export default {
  mounted() {
    this.fetchProducts()
  },
  computed: {
    ...mapGetters('mDoc', [
      'getProductList',
      'getSelectedRec',
      'getIsAdd',
      'getFields',
      'getIsProcessing',
    ]),
  },
  methods: {
    ...mapMutations('mDoc', ['discardChange']),
    ...mapActions('mDoc', ['updateSelectedRec', 'fetchProducts']),
    save(_, done) {
      // Actions only allow a single payload (_, done) is passed by Quasar
      this.updateSelectedRec(done)
    },
  },
}
</script>

<<style>
.q-toolbar .q-btn {
  padding: 0 13px;
}
</style>
