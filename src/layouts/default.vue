<template>
  <v-app @contextmenu.prevent data-tauri-drag-region>
    <MySystembar v-if="showSystemBar"></MySystembar>
    <MyMenubar data-tauri-drag-region></MyMenubar>
    <v-main>
      <NuxtPage></NuxtPage>
    </v-main>
  </v-app>
</template>

<script lang="ts">
export default {
  data() {
    return {
      showSystemBar: false
    }
  },
  mounted() {
    /* @ts-ignore */
    window.$nuxt = this;
    /* @ts-ignore */
    if (window.__TAURI__) {
      /* @ts-ignore */
      this.showSystemBar = true;
    }
  },
};
</script>
