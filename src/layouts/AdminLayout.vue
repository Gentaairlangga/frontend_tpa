<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="leftDrawerOpen = !leftDrawerOpen"
        />

        <q-toolbar-title> Admin TPA</q-toolbar-title>

        <div>
          <q-btn label="log out" flat icon="logout" @click="logout()" />
        </div>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered>
      <q-list>
        <q-item-label header> Menu </q-item-label>

        <q-item clickable :to="{ name: 'indexAdmin' }">
          <q-item-section avatar>
            <q-icon name="dashboard" />
          </q-item-section>

          <q-item-section>
            <q-item-label>Halaman Admin</q-item-label>
          </q-item-section>
        </q-item>
        <q-item clickable :to="{ name: 'dataTpaAdmin' }">
          <q-item-section avatar>
            <q-icon name="menu" />
          </q-item-section>

          <q-item-section>
            <q-item-label>Data TPA</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container class="bg-grey-2">
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
export default {
  data() {
    return {
      leftDrawerOpen: true,
    };
  },
  methods: {
    logout() {
      this.$q.localStorage.clear();
      this.$router.push({
        name: "halamanLogin",
      });
    },
  },
};
</script>
