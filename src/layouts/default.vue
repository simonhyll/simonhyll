<template>
  <v-app @contextmenu.prevent data-tauri-drag-region>
    <MyNavbar></MyNavbar>
    <v-main data-tauri-drag-region>
      <NuxtPage></NuxtPage>
    </v-main>
  </v-app>
</template>

<script lang="ts">
export default {
  mounted() {
    /* @ts-ignore */
    window.$nuxt = this;
  },
};
</script>
