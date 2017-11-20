<template>
  <q-layout ref="layout" view="lhh Lpp lpp">
    <q-toolbar slot="header" color="green" reveal="true">
      <q-btn flat @click="$refs.layout.toggleLeft()">
        <q-icon name="menu" />
      </q-btn>
      <q-search inverted v-model="search" color="none" />
    </q-toolbar>
    <!-- <div slot="footer" class="bg-negative">
      <small>
        <cite>© Copyright 2017 Elitech VN Co., Ltd. All rights reserved.</cite>
      </small>
    </div> -->
    <div slot="left">
      <q-list separator>
        <!-- collapsible to hide sub-level menu entries -->
        <q-collapsible icon="inbox" label="Inbox" >
          <q-item link to="/">
            <q-item-side icon="mail" />
            <q-item-main label="Email 1" />
          </q-item>
          <q-item link to="/">
            <q-item-side icon="mail" />
            <q-item-main label="Email 2" />
          </q-item>
          <q-collapsible icon="favorite" label="Favorites">
            <q-item link to="/">
              <q-item-side icon="mail" />
              <q-item-main label="Favorite 1" />
            </q-item>
            <q-item to="/">
              <q-item-side icon="mail" />
              <q-item-main label="Favorite 2" />
            </q-item>
          </q-collapsible>
          <q-item to="/">
            <q-item-side icon="mail" />
            <q-item-main label="Email 3" />
          </q-item>
        </q-collapsible>
        <!-- menu link -->
        <q-item link to="/">
          <q-item-side icon="schedule" />
          <q-item-main>
            <q-item-tile label>Snoozed</q-item-tile>
          </q-item-main>
        </q-item>
        <!-- collapsible to hide sub-level menu entries -->
        <q-collapsible icon="send" label="Sent">
          <q-item to="/">
            <q-item-side icon="mail" />
            <q-item-main label="Email 1" />
          </q-item>
        </q-collapsible>
        <!-- menu link -->
        <q-item link to="/">
          <q-item-side icon="delete" />
          <q-item-main>
            <q-item-tile label>Trash</q-item-tile>
          </q-item-main>
        </q-item>
      </q-list>

    </div>
    <!-- <div slot="navigation" class="bg-primary">nav</div> -->
    <div class="bg-deep-purple-3" style="height:200px">This is the content</div>
  </q-layout>
</template>
<script>
export default {}
</script>
