<template>
  <q-modal v-model="$store.state.isDetailShown" ref="layoutModal" :content-css="{minWidth: '80vw', minHeight: '80vh'}">
    <q-modal-layout>
      <q-toolbar slot="header">
        <q-btn flat @click="$refs.layoutModal.close()">
          <q-icon name="keyboard_arrow_left" />
        </q-btn>
        <q-toolbar-title>
          Client Detail
        </q-toolbar-title>
      </q-toolbar>
      <div class="layout-padding">
        <h1>Modal</h1>
        <q-btn color="primary" @click="$refs.layoutModal.close()">Close</q-btn>
        <p class="caption" v-for="n in 5" :key="n">This is a Modal presenting a Layout.</p>
      </div>
    </q-modal-layout>
  </q-modal>
</template>

<script>
export default {}
</script>
