<template>
  <q-modal v-model="$store.state.isDetailShown" ref="popDetail" :content-css="{minWidth: '70vw', minHeight: '70vh'}">
    <q-modal-layout>
      <q-toolbar slot="header">
        <q-btn color="secondary" @click="$refs.popDetail.close()">
          <q-icon name="keyboard_arrow_left" />
        </q-btn>
        <q-btn color="secondary">
          <q-icon name="save" /> Save
        </q-btn>
        <q-toolbar-title>
          Client Detail
        </q-toolbar-title>
      </q-toolbar>
      <div class="bg-grey-9" style="padding: 15px">
        <q-field :label-width="3" icon="wifi" label="Client Code" :count="255" helper="Ma khach hang" :error="error" error-label="Some error">
          <q-input v-model="tax_code" dark color="yellow" />
        </q-field>
        <q-field :label-width="3" icon="account_circle" label="Full Name" :count="255" :error="error2" helper="Ten day du va chinh thuc cua cong ty." error-label="Hey, we got an error">
          <q-input v-model="name" dark color="yellow" type="textarea" :min-rows="1" />
        </q-field>
        <q-field :label-width="3" icon="wifi" label="Tax Code" :count="255" helper="Ma So Thue" :error="error" error-label="Some error">
          <q-input v-model="tax_code" dark color="yellow" />
        </q-field>
        <q-field :label-width="3" icon="account_circle" label="Invoice Address" :count="255" :error="error2" helper="Dia chi nhan hoa don" error-label="Hey, we got an error">
          <q-input v-model="name" dark color="yellow" type="textarea" :min-rows="1" />
        </q-field>
        <q-field :label-width="3" icon="account_circle" label="Delivery Address" :count="255" :error="error2" helper="Dia chi nhan hang" error-label="Hey, we got an error">
          <q-input v-model="name" dark color="yellow" type="textarea" :min-rows="1" />
        </q-field>
        <q-field :label-width="3" icon="wifi" label="Tel No." :count="255" :error="error" error-label="Some error">
          <q-input v-model="tax_code" dark color="yellow" />
        </q-field>
        <q-field :label-width="3" icon="wifi" label="Fax No." :count="255" :error="error" error-label="Some error">
          <q-input v-model="tax_code" dark color="yellow" />
        </q-field>

      </div>
    </q-modal-layout>
  </q-modal>
</template>

<script>
export default {
  data: () => ({
    name: 'Công ty TNHH Kleen-Pak Industries (Việt Nam)',
    tax_code: '3702272793',
  }),
}
</script>

<<style>
.q-toolbar .q-btn{
  padding: 0 16px
}


</style>

