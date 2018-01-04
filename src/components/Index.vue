<template>
  <q-layout ref="layout" view="hHh Lpr fFf">
    <q-toolbar slot="header" color="green" reveal="true">
      <q-btn flat @click="$refs.layout.toggleLeft()">
        <q-icon name="menu" />
      </q-btn>
      <q-search inverted v-model="search" color="none" />
    </q-toolbar>
    <div slot="footer" class="etm-footer">
      <small>
        <cite>© Copyright 2017 Elitetech Vietnam Co., Ltd. All rights reserved.</cite>
      </small>
    </div>
    <div slot="left">
      <q-side-link item to="/client" exact>
        <q-item-side icon="face" />
        <q-item-main label="Client" />
      </q-side-link>
      <q-side-link item to="/supplier">
        <q-item-side icon="local_library" />
        <q-item-main label="Supplier" />
      </q-side-link>
      <q-side-link item to="/contact" exact>
        <q-item-side icon="contact_phone" />
        <q-item-main label="Contact" />
      </q-side-link>
      <q-side-link item to="/product">
        <q-item-side icon="shopping_basket" />
        <q-item-main label="Product" />
      </q-side-link>
      <!--
      Notice "indent" Boolean property on QCollapsible
      which will make the sub-menu be indented.
      Also, notice the "label" property which defines the
      name of the menu item which opens up the sub-menu.
    -->
      <q-collapsible indent icon="event" label="Event" opened>
        <q-side-link item to="/app/event">
          <q-item-main label="Competitions" />
        </q-side-link>
        <q-side-link item to="/app/other-info">
          <q-item-main label="Other Information" />
        </q-side-link>
      </q-collapsible>

    </div>
    <router-view />
  </q-layout>
</template>
<script>
export default {
  data() {
    return {
      search: '',
    }
  },
}
</script>
<style>
.etm-footer {
  background-color: #0089d2;
  color: #fff;
  font-size: 0.8em;
}
.with-modal {
  padding-right: 0px !important;
}
</style>

